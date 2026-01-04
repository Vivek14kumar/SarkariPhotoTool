"use client";
import { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import { examRules } from "@/lib/examRules";
import { X } from 'lucide-react';

export default function BulkImageResizer() {
  const [exam, setExam] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const rule = exam ? examRules[exam].photo : null;

  /* ---------- FILE HANDLING ---------- */
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);

    // Prevent duplicates by name
    const filtered = newFiles.filter(
      (f) => !files.some((existing) => existing.name === f.name)
    );

    setFiles((prev) => [...prev, ...filtered]);
    setResults([]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  /* ---------- RESIZE ---------- */
  const resizeAll = async () => {
    if (!exam) return alert("Please select an exam first!");
    const out = [];
    for (const file of files) {
      try {
        const r = await resizeWithKB(
          file,
          rule.width,
          rule.height,
          rule.minKB,
          rule.maxKB
        );
        out.push(r);
      } catch (err) {
        console.warn("Skipped:", file.name);
      }
    }
    setResults(out);
  };

  /* ---------- ZIP DOWNLOAD ---------- */
  const downloadZip = async () => {
    const zip = new JSZip();
    results.forEach((img, i) => zip.file(`image-${i + 1}.jpg`, img.blob));

    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${exam}-photos.zip`;
    a.click();
  };

  /* ---------- CLOSE DROPDOWN ON CLICK OUTSIDE ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-center text-gradient mb-4">
        Govt Exam Photo / Signature Resizer
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Upload → Select Exam → Resize → Download
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT – UPLOAD & EXAM */}
        <div className="md:col-span-2 bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-6">

          {/* Upload Area */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer hover:border-blue-400 shadow-md bg-white/50 backdrop-blur-md mb-4"
          >
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            {files.length === 0 ? (
              <p className="text-gray-500">Tap or drag & drop images here</p>
            ) : (
              <p className="text-gray-700">{files.length} files ready</p>
            )}
          </div>

          {/* Searchable Exam Dropdown */}
          <div className="relative mb-4" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search & select exam..."
              value={exam ? examRules[exam]?.name : search}
              onChange={(e) => { setSearch(e.target.value); setExam(""); setOpen(true); }}
              onFocus={() => setOpen(true)}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {open && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow max-h-60 overflow-y-auto">
                {Object.entries(examRules)
                  .filter(([_, val]) =>
                    val.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(([key, val]) => (
                    <div
                      key={key}
                      onClick={() => { setExam(key); setSearch(""); setOpen(false); }}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                    >
                      {val.name}
                    </div>
                  ))}
                {Object.entries(examRules)
                  .filter(([_, val]) =>
                    val.name.toLowerCase().includes(search.toLowerCase())
                  ).length === 0 && (
                    <p className="px-4 py-2 text-gray-500 text-sm">No exam found</p>
                  )}
              </div>
            )}
          </div>

          {/* BEFORE Preview */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {files.map((f, i) => (
                <div key={i} className=" rounded-lg relative  ">
                  {/* Remove button as badge */}
                  <span
                    className="absolute -top-1 right-11 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm cursor-pointer z-10 shadow"
                    onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                  >
                    <X size={22}/>
                  </span>
                  <img
                    src={URL.createObjectURL(f)}
                    className="h-36  object-contain rounded-lg"
                  />
                  <p className="text-xs mx-8 mt-1">{(f.size / 1024).toFixed(1)} KB</p>
                </div>
              ))}
            </div>
          )}

          {/* Resize Button */}
          {files.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={resizeAll}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
              >
                Resize All
              </button>
            </div>
          )}

          {/* AFTER Preview */}
          {results.length > 0 && (
            <>
              <hr className="my-6 border-gray-300" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.map((img, i) => (
                  <div key={i} className=" rounded-lg   ">
                    <img src={img.url} className="h-36  object-contain rounded-lg shadow" />
                    <p className="text-xs mt-1 mx-10">{(img.size / 1024).toFixed(1)} KB</p>
                    <a
                      href={img.url}
                      download={img.name}
                      className="text-blue-600 underline text-xs block mt-1 mx-8"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={downloadZip}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
                >
                  Download ZIP
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT – INSTRUCTIONS */}
<div className="bg-white shadow-lg rounded-2xl p-5">
  <h2 className="text-xl font-bold mb-3">📋 How to Use</h2>
  
  <ul className="text-gray-700 space-y-2 text-sm list-disc list-inside">
    <li>📤 <strong>Upload Images:</strong> Click or drag & drop your photo/signature files in the upload area.</li>
    <li>🔍 <strong>Select Exam:</strong> Search and select the exam from the dropdown to apply its photo/signature rules.</li>
    <li>📏 <strong>Resize:</strong> Click the "Resize All" button to automatically adjust your images according to the exam requirements.</li>
    <li>👁️ <strong>Preview:</strong> Check the resized images in the "After" section to ensure they look correct.</li>
    <li>💾 <strong>Download:</strong> Download individual images or click "Download ZIP" to save all resized images at once.</li>
    <li className="text-red-600">⚠ <strong>Tip:</strong> Make sure your photos/signatures are clear, front-facing, and recent for best results.</li>
  </ul>

  {exam && (
    <>
      <hr className="my-4 border-gray-300" />
      <h3 className="text-lg font-semibold mb-2">📏 Exam Rules</h3>
      <ul className="text-gray-700 space-y-1 text-sm">
        <li>✔ Width: {rule.width}px</li>
        <li>✔ Height: {rule.height}px</li>
        <li>✔ Min Size: {rule.minKB} KB</li>
        <li>✔ Max Size: {rule.maxKB} KB</li>
        <li>✔ Background: {rule.bg}</li>
      </ul>
    </>
  )}
</div>

      </div>
    </div>
  );
}

/* ================= CORE LOGIC ================= */
async function resizeWithKB(file, w, h, minKB, maxKB) {
  const img = await loadImage(file);
  let best = null;

  for (let q = 0.95; q >= 0.3; q -= 0.05) {
    const blob = await draw(img, w, h, q);
    const kb = blob.size / 1024;

    if (!best || Math.abs(kb - minKB) < Math.abs(best.size / 1024 - minKB)) {
      best = { blob, size: blob.size };
    }

    if (kb >= minKB && kb <= maxKB) {
      return build(file, blob);
    }
  }

  return build(file, best.blob);
}

function loadImage(file) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}

function draw(img, w, h, q) {
  return new Promise((res) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");

    const scale = Math.max(w / img.width, h / img.height);
    const nw = img.width * scale;
    const nh = img.height * scale;
    const x = (w - nw) / 2;
    const y = (h - nh) / 2;

    ctx.drawImage(img, x, y, nw, nh);
    c.toBlob((b) => res(b), "image/jpeg", q);
  });
}

function build(file, blob) {
  return {
    name: file.name.replace(/\.\w+$/, ".jpg"),
    size: blob.size,
    blob,
    url: URL.createObjectURL(blob),
  };
}
