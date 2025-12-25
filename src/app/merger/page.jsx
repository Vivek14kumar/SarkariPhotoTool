"use client";

import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useLanguage } from "@/context/LanguageContext";
import ExamSelector from "@/components/ExamSelector";
import RuleInfo from "@/components/RuleInfo";

export default function MergerTool() {
  const [exam, setExam] = useState("");
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [preview, setPreview] = useState(null);
  const [position, setPosition] = useState("bottom"); // bottom or overlay
  const { t } = useLanguage();

  // Draggable/Resizable signature
  const [signPos, setSignPos] = useState({ x: 50, y: 50 });
  const [signSize, setSignSize] = useState({ width: 100, height: 50 });

  const photoRef = useRef(null);

  const loadImage = (file) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve(img);
    });

  const mergeImages = async () => {
    if (!photo || (position === "overlay" && !signature)) {
      alert("Please upload required images");
      return;
    }

    const photoImg = await loadImage(photo);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const photoWidth = 300;
    const photoHeight = 300;

    if (position === "overlay") {
      canvas.width = photoWidth;
      canvas.height = photoHeight;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(photoImg, 0, 0, photoWidth, photoHeight);

      if (signature) {
        const signImg = await loadImage(signature);

        // Draw the signature respecting drag position & size
        ctx.drawImage(
          signImg,
          (signPos.x / photoRef.current.offsetWidth) * photoWidth,
          (signPos.y / photoRef.current.offsetHeight) * photoHeight,
          (signSize.width / photoRef.current.offsetWidth) * photoWidth,
          (signSize.height / photoRef.current.offsetHeight) * photoHeight
        );
      }
    } else {
      const signImg = await loadImage(signature);
      const signHeight = 100;
      const signWidth = 300;
      const gap = 20;
      canvas.width = photoWidth;
      canvas.height = photoHeight + signHeight + gap;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(photoImg, 0, 0, photoWidth, photoHeight);
      ctx.drawImage(signImg, 0, photoHeight + gap, signWidth, signHeight);
    }

    setPreview(canvas.toDataURL("image/png"));
  };

  const handleDrop = (e, setFile) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes("jpeg")) setFile(file);
  };
  const handleDragOver = (e) => e.preventDefault();

  const copyToClipboard = async () => {
    if (!preview) return;
    try {
      const res = await fetch(preview);
      const blob = await res.blob();
      await navigator.clipboard.write([new window.ClipboardItem({ [blob.type]: blob })]);
      alert("✅ Image copied to clipboard!");
    } catch {
      alert("❌ Failed to copy. Please download instead.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* Editor Panel */}
      <div className="lg:w-2/3 bg-white/70 backdrop-blur rounded-2xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Photo & Signature Merger
        </h1>

        {/* Uploads */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div
            className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition"
            onDrop={(e) => handleDrop(e, setPhoto)}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("photoInput").click()}
          >
            <input
              id="photoInput"
              type="file"
              accept="image/jpeg"
              className="hidden"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            {photo ? <p>{photo.name}</p> : <p>Upload Photo</p>}
          </div>

          <div
            className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition"
            onDrop={(e) => handleDrop(e, setSignature)}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("signInput").click()}
          >
            <input
              id="signInput"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) => setSignature(e.target.files[0])}
            />
            {signature ? <p>{signature.name}</p> : <p>Upload Signature</p>}
          </div>
        </div>

        {/* Signature position */}
        <div className="mt-4 mb-2 flex items-center gap-4">
          <label className="font-medium">Signature Position:</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <option value="bottom">Bottom of Photo</option>
            <option value="overlay">Overlay on Photo</option>
          </select>
        </div>

        <ExamSelector selected={exam} onChange={setExam} />
        <RuleInfo exam={exam} />

        <button
          onClick={mergeImages}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Merge Images
        </button>

        {/* Preview */}
        {photo && (
          <div
            ref={photoRef}
            className="relative mt-6 w-full max-w-[400px] mx-auto border rounded-lg overflow-hidden"
          >
            <img
              src={photo ? URL.createObjectURL(photo) : ""}
              alt="Photo Preview"
              className="w-full h-auto"
            />

            {/* Overlay signature draggable */}
            {position === "overlay" && signature && (
  <Rnd
    bounds="parent"
    size={{ width: signSize.width, height: signSize.height }}
    position={{ x: signPos.x, y: signPos.y }}

    onDrag={(e, d) => {
      setSignPos({ x: d.x, y: d.y });
    }}

    onResize={(e, direction, ref, delta, pos) => {
      setSignSize({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      });
      setSignPos(pos);
    }}

    enableResizing={{
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true,
    }}

    resizeHandleStyles={{
      bottomRight: {
        width: "14px",
        height: "14px",
        background: "#2563eb",
        borderRadius: "50%",
      },
    }}

    style={{
      border: "1px dashed #2563eb",
      cursor: "move",
      touchAction: "none",
    }}
  >
    <img
      src={URL.createObjectURL(signature)}
      alt="Signature"
      draggable={false}
      className="w-full h-full object-contain pointer-events-none select-none"
    />
  </Rnd>
)}

          </div>
        )}

        {preview && (
          <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={preview}
              download="photo-signature.png"
              className="flex-1 text-center bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Download Merged Image
            </a>
            <button
              onClick={copyToClipboard}
              className="flex-1 text-center bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-md transition-all"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>

      {/* Instructions Panel */}
      <div className="lg:w-1/3 border p-4 rounded-lg bg-white/70 shadow">
        <h2 className="text-xl font-bold mb-2">Instructions</h2>
        <ul className="list-disc ml-5 text-sm space-y-1">
          <li>Upload your Photo (JPG only).</li>
          <li>Upload your Signature <span className="text-green-500 font-bold">(PNG recommended for transparency for <span className="underline decoration-yellow-500">"Overlay of Photo"</span> option)</span>.</li>
          <li>Select Signature Position: Overlay or Bottom.</li>
          <li>
            If Overlay: drag and resize your signature freely on the photo.
          </li>
          <li>Click Merge Images to generate final image.</li>
          <li>Download or copy the merged image.</li>
        </ul>
      </div>
    </div>
  );
}
