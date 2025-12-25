"use client";

import { useState, useEffect, useRef } from "react";
import imageCompression from "browser-image-compression";
import { examRules } from "@/lib/examRules";
import { validateImage } from "@/utils/imageValidator";

export default function SignatureResizer() {
  const [file, setFile] = useState(null);
  const [exam, setExam] = useState("");
  const [preview, setPreview] = useState(null);
  const [bgWarning, setBgWarning] = useState("");
  const [processing, setProcessing] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [finalDimensions, setFinalDimensions] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [unit, setUnit] = useState("px");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const fileInputRef = useRef(null);

  const handleUpload = (img) => {
    if (!img) return;

    if (!["image/jpeg", "image/jpg"].includes(img.type)) {
      alert("Only JPG / JPEG allowed");
      return;
    }

    setFile(img);
    setPreview(null);
    setBgWarning("");
    setExam("");
    setSearch("");
    setFileInfo({
      name: img.name,
      size: (img.size / 1024).toFixed(2) + " KB",
    });
    setFinalDimensions(null);
    setCustomWidth("");
    setCustomHeight("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const copyToClipboard = async () => {
    if (!preview) return;

    if (!navigator.clipboard || !window.ClipboardItem) {
      alert("Copy not supported. Please download.");
      return;
    }

    const res = await fetch(preview);
    const blob = await res.blob();
    await navigator.clipboard.write([
      new window.ClipboardItem({ [blob.type]: blob }),
    ]);
    alert("Signature copied!");
  };

  // Convert unit to pixels
  const convertToPx = (value, unit) => {
    if (!value) return null;
    const val = parseFloat(value);
    switch (unit) {
      case "px":
        return val;
      case "cm":
        return val * 37.7952755906; // 1 cm ≈ 37.79 px
      case "in":
        return val * 96; // 1 inch = 96 px
      default:
        return val;
    }
  };

  useEffect(() => {
    if (!file || (!exam && !customWidth && !customHeight)) return;

    const processSignature = async () => {
      setProcessing(true);
      const rules = examRules[exam]?.sign || {};

      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: rules.maxKB ? rules.maxKB / 1024 : 1,
          useWebWorker: true,
          fileType: "image/jpeg",
        });

        const img = new Image();
        img.src = URL.createObjectURL(compressedFile);
        img.onload = async () => {
          let width = customWidth
            ? convertToPx(customWidth, unit)
            : rules.width || img.width;
          let height = customHeight
            ? convertToPx(customHeight, unit)
            : rules.height || img.height;

          // Maintain aspect ratio
          if (maintainRatio && img.width && img.height) {
            const originalRatio = img.width / img.height;
            if (customWidth && !customHeight) height = width / originalRatio;
            else if (!customWidth && customHeight) width = height * originalRatio;
          }

          const canvas = document.createElement("canvas");
          canvas.width = Math.round(width);
          canvas.height = Math.round(height);

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
          setPreview(dataUrl);

          const kb = (atob(dataUrl.split(",")[1]).length / 1024).toFixed(2);
          setFinalDimensions({
            width: canvas.width,
            height: canvas.height,
            sizeKB: kb,
          });

          if (rules.bg) {
            const check = await validateImage(file, rules);
            setBgWarning(check.backgroundIssue || "");
          } else {
            setBgWarning("");
          }

          setProcessing(false);
        };
      } catch {
        alert("Signature processing failed");
        setProcessing(false);
      }
    };

    processSignature();
  }, [exam, file, customWidth, customHeight, unit, maintainRatio]);

  const rules = exam ? examRules[exam]?.sign : null;

  const downloadName = exam
    ? `${exam.replace(/\s+/g, "_")}_Signature_${new Date().getFullYear()}.jpg`
    : "signature-govt-form.jpg";

  // Close dropdown on outside click
  useEffect(() => {
    const closeDropdown = () => setOpen(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT – TOOL */}
        <div className="md:col-span-2 bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-6">
          <h1 className="text-3xl font-extrabold text-center text-gradient">
            Government Exam Signature Resizer
          </h1>

          <p className="text-center text-gray-600 mt-2 mb-6">
            Upload → Select Exam → Download ready signature
          </p>

          {/* Upload */}
          <div
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-400"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              accept="image/jpeg"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
            {!file ? (
              <p className="text-gray-500">
                Tap or drag & drop signature here
              </p>
            ) : (
              <p className="text-gray-700">
                {fileInfo.name} ({fileInfo.size})
              </p>
            )}
          </div>

          {/* Searchable Exam Dropdown */}
          <div className="relative mt-4" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search & select exam..."
              value={exam ? examRules[exam]?.name : search}
              onChange={(e) => {
                setSearch(e.target.value);
                setExam("");
                setOpen(true);
              }}
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
                      onClick={() => {
                        setExam(key);
                        setSearch("");
                        setOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                    >
                      {val.name}
                    </div>
                  ))}

                {Object.entries(examRules).filter(([_, val]) =>
                  val.name.toLowerCase().includes(search.toLowerCase())
                ).length === 0 && (
                  <p className="px-4 py-2 text-sm text-gray-500">No exam found</p>
                )}
              </div>
            )}
          </div>

          {/* Custom Size Inputs */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Custom Width"
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
              className="p-3 rounded-lg border w-full"
            />
            <input
              type="number"
              placeholder="Custom Height"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              className="p-3 rounded-lg border w-full"
            />
          </div>

          {/* Unit & Aspect Ratio */}
          <div className="mt-2 flex items-center gap-4">
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="p-2 rounded-lg border"
            >
              <option value="px">px</option>
              <option value="cm">cm</option>
              <option value="in">inches</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={maintainRatio}
                onChange={() => setMaintainRatio(!maintainRatio)}
              />
              Maintain Aspect Ratio
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Optional: Custom size overrides exam defaults
          </p>

          {/* Processing */}
          {processing && (
            <p className="text-center text-blue-600 mt-4">
              Processing signature...
            </p>
          )}

          {/* Preview */}
          {preview && (
            <div className="mt-6 text-center">
              <img
                src={preview}
                className="mx-auto max-h-48 rounded-lg shadow border"
              />
              <p className="mt-2 text-gray-600">
                {finalDimensions.width} × {finalDimensions.height}px •{" "}
                {finalDimensions.sizeKB} KB
              </p>
            </div>
          )}

          {/* Warning */}
          {bgWarning && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded text-center">
              ❌ {bgWarning}
            </div>
          )}

          {/* Buttons */}
          {preview && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href={preview}
                download={downloadName}
                className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg"
              >
                Download Signature
              </a>
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-gray-200 py-3 rounded-lg"
              >
                Copy
              </button>
            </div>
          )}
        </div>

        {/* RIGHT – INSTRUCTIONS */}
        <div className="bg-white shadow-lg rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-3">✍️ Instructions</h2>

          {!exam ? (
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Upload JPG/JPEG signature</li>
              <li>• Clear, dark ink signature</li>
              <li>• White or light background</li>
              <li>• Select exam to auto resize or use custom size</li>
              <li>• Units: px, cm, inches, m</li>
              <li>• Optionally maintain aspect ratio</li>
            </ul>
          ) : (
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>✔ Width: {rules?.width || "Auto"} px</li>
              <li>✔ Height: {rules?.height || "Auto"} px</li>
              <li>✔ Max size: {rules?.maxKB || "No limit"} KB</li>
              <li>✔ Format: JPG</li>
              <li>✔ Background: {rules?.background || "White"}</li>
            </ul>
          )}

          <p className="text-xs text-red-500 mt-4">
            ⚠ Avoid capital letters, blur, or colored backgrounds.
          </p>
        </div>
      </div>
    </div>
  );
}
