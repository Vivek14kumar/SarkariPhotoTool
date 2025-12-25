"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
// import heic2any from "heic2any"; // Uncomment if you want HEIC support
import { examRules } from "@/lib/examRules";
import ComingSoonPage from "../coming-soon/page";

export default function BulkImageResizer() {
  const [exam, setExam] = useState("");
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddImages = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Resize a single image
  const resizeImage = async (file, rule) => {
    try {
      // Optional HEIC conversion
      // if (file.type === "image/heic") {
      //   file = await heic2any({ blob: file, toType: "image/jpeg" });
      // }

      // Compress the image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: rule.maxKB / 1024,
        useWebWorker: true,
        fileType: "image/jpeg",
      });

      // Load image in DOM
      const img = new Image();
      img.src = URL.createObjectURL(compressedFile);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Cannot load image"));
      });

      // Draw on canvas
      const canvas = document.createElement("canvas");
      canvas.width = rule.width;
      canvas.height = rule.height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, rule.width, rule.height);

      // Convert canvas to blob safely
      const blob = await new Promise((resolve) =>
        canvas.toBlob(
          (b) => resolve(b),
          "image/jpeg",
          0.95
        )
      );

      if (!blob) throw new Error("Cannot create blob from canvas");

      const url = URL.createObjectURL(blob);

      return {
        name: file.name.replace(/\s+/g, "_").replace(/\.[^/.]+$/, ""),
        url,
        sizeKB: Math.round(blob.size / 1024),
        blob,
      };
    } catch (err) {
      console.warn("Skipping file (cannot process):", file.name, "Error:", err.message);
      return null; // Skip this file
    }
  };

  // Resize all selected images
  const resizeAllImages = async () => {
    if (!exam || files.length === 0) {
      alert("Select exam and upload images");
      return;
    }

    setLoading(true);
    setResults([]);

    const rule = examRules[exam];
    const output = [];

    for (const file of files) {
      const result = await resizeImage(file, rule);
      if (result) output.push(result);
    }

    setResults(output);
    setLoading(false);
  };

  // Download all resized images as ZIP
  const downloadZip = async () => {
    if (!results.length) return;

    const zip = new JSZip();
    results.forEach((img, i) => {
      zip.file(`image-${i + 1}.jpg`, img.blob);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${exam}-images.zip`;
    link.click();
  };

  return (
    <>
    <ComingSoonPage/>
    {/*<div className="max-w-5xl mx-auto p-6">
      
      <h1 className="text-2xl font-bold">Bulk Image Resizer (Govt Exam)</h1>

      <select
        className="border p-2 w-full mt-4"
        value={exam}
        onChange={(e) => setExam(e.target.value)}
      >
        <option value="">Select Exam</option>
        {Object.entries(examRules).map(([key, rule]) => (
          <option key={key} value={key}>
            {rule.name}
          </option>
        ))}
      </select>

      <label className="inline-block mt-4 bg-gray-100 px-4 py-2 rounded cursor-pointer border">
        ➕ Add Images
        <input
          type="file"
          multiple
          accept="image/jpeg"
          onChange={handleAddImages}
          className="hidden"
        />
      </label>

      {files.length > 0 && (
        <p className="mt-2 text-green-600">{files.length} images selected</p>
      )}

      {/* Before Resize 
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {files.map((file, i) => (
          <div key={i} className="relative border p-2">
            <img
              src={URL.createObjectURL(file)}
              className="h-32 w-full object-contain"
            />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded-full"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <button
          onClick={resizeAllImages}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Processing..." : "Resize All"}
        </button>
      )}

      {/* After Resize 
      {results.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8">Resized Preview</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {results.map((img, i) => (
              <div key={i} className="border p-2 text-center">
                <img src={img.url} className="mx-auto mb-2" />
                <p className="text-sm">{img.sizeKB} KB</p>
                <a
                  href={img.url}
                  download={`${img.name}.jpg`}
                  className="text-blue-600 underline text-sm"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={downloadZip}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
          >
            Download All as ZIP
          </button>
        </>
      )}
    </div>*/}
    </>
  );
}
