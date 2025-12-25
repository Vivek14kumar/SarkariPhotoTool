"use client";

import { useState, useRef } from "react";
import { Rnd } from "react-rnd";

/* ---------- Helper: Measure text width ---------- */
const getTextWidth = (text, fontSize, fontFamily) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = `${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
};

const FONTS = ["Arial", "Times New Roman", "Verdana", "Georgia", "Courier New"];

export default function PhotoResizerCanva() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ---------- Text ---------- */
  const [nameText, setNameText] = useState("Your Name");
  const [dateText, setDateText] = useState("DD/MM/YYYY");

  /* ---------- Fonts ---------- */
  const [nameFontSize, setNameFontSize] = useState(22);
  const [dateFontSize, setDateFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");

  const [lockText, setLockText] = useState(false);

  /* ---------- Show/Hide Name & Date ---------- */
  const [showName, setShowName] = useState(true);
  const [showDate, setShowDate] = useState(true);

  /* ---------- Positions ---------- */
  const [namePos, setNamePos] = useState({ x: 20, y: 20 });
  const [datePos, setDatePos] = useState({ x: 20, y: 60 });

  /* ---------- Refs ---------- */
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);

  /* ---------- Upload ---------- */
  const handleUpload = (img) => {
    if (!img) return;
    if (!["image/jpeg", "image/jpg"].includes(img.type)) {
      alert("Only JPG / JPEG allowed");
      return;
    }

    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  /* ---------- Download Final Image ---------- */
  const downloadFinalImage = () => {
    if (!preview || !previewRef.current) return;

    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const previewWidth = previewRef.current.offsetWidth;
      const previewHeight = previewRef.current.offsetHeight;

      const scaleX = img.width / previewWidth;
      const scaleY = img.height / previewHeight;

      ctx.fillStyle = fontColor;

      /* NAME */
      if (showName) {
        ctx.font = `${nameFontSize * scaleX}px ${fontFamily}`;
        ctx.fillText(
          nameText,
          namePos.x * scaleX,
          (namePos.y + nameFontSize) * scaleY
        );
      }

      /* DATE */
      if (showDate) {
        ctx.font = `${dateFontSize * scaleX}px ${fontFamily}`;
        ctx.fillText(
          dateText,
          datePos.x * scaleX,
          (datePos.y + dateFontSize) * scaleY
        );
      }

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.download = "Photo_With_Name_Date.jpg";
      link.click();
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* Editor Panel */}
      <div className="lg:w-2/3 bg-white/70 backdrop-blur rounded-2xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Photo Editor (Add Name & Date)
        </h1>

        {/* Upload */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg"
            hidden
            onChange={(e) => handleUpload(e.target.files[0])}
          />
          {file ? file.name : "Click to Upload JPG Image"}
        </div>

        {/* Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            value={nameText}
            onChange={(e) => setNameText(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter Name"
          />
          <input
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter Date"
          />
        </div>

        {/* Font Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Font Size Name</label>
            <input
              type="number"
              value={nameFontSize}
              onChange={(e) => setNameFontSize(+e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Font Size Date</label>
            <input
              type="number"
              value={dateFontSize}
              onChange={(e) => setDateFontSize(+e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {FONTS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Select Color
            </label>
            <span className="border rounded mt-1 py-0.5">
              <input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="w-full h-8 border-none cursor-pointer"
              />
            </span>
          </div>
        </div>

        {/* Lock Button */}
        <button
          onClick={() => setLockText(!lockText)}
          className={`mt-4 px-4 py-2 rounded text-white ${
            lockText ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {lockText ? "Unlock Text" : "Lock Text"}
        </button>

        {/* Show/Hide toggles */}
        <div className="flex gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showName}
              onChange={() => setShowName(!showName)}
              className="cursor-pointer"
            />
            Show Name
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showDate}
              onChange={() => setShowDate(!showDate)}
              className="cursor-pointer"
            />
            Show Date
          </label>
        </div>

        {/* Preview */}
        {preview && (
          <div
            ref={previewRef}
            className="relative mt-6 max-w-[420px] mx-auto border rounded"
          >
            <img src={preview} className="w-full" />

            {/* NAME */}
            {showName && (
              <Rnd
                bounds="parent"
                enableResizing={false}
                disableDragging={lockText}
                position={namePos}
                size={{
                  width: getTextWidth(nameText, nameFontSize, fontFamily) + 10,
                  height: nameFontSize + 10,
                }}
                onDragStop={(e, d) => setNamePos({ x: d.x, y: d.y })}
              >
                <span
                  style={{
                    fontSize: nameFontSize,
                    fontFamily,
                    color: fontColor,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    cursor: lockText ? "default" : "move",
                  }}
                >
                  {nameText}
                </span>
              </Rnd>
            )}

            {/* DATE */}
            {showDate && (
              <Rnd
                bounds="parent"
                enableResizing={false}
                disableDragging={lockText}
                position={datePos}
                size={{
                  width: getTextWidth(dateText, dateFontSize, fontFamily) + 10,
                  height: dateFontSize + 10,
                }}
                onDragStop={(e, d) => setDatePos({ x: d.x, y: d.y })}
              >
                <span
                  style={{
                    fontSize: dateFontSize,
                    fontFamily,
                    color: fontColor,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    cursor: lockText ? "default" : "move",
                  }}
                >
                  {dateText}
                </span>
              </Rnd>
            )}
          </div>
        )}

        {/* Download */}
        {preview && (
          <button
            onClick={downloadFinalImage}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg"
          >
            Download Image
          </button>
        )}
      </div>

      {/* Instructions Panel */}
      <div className="lg:w-1/3 border p-4 rounded-lg bg-white/70 shadow">
        <h2 className="text-xl font-bold mb-2">Instructions</h2>
        <ul className="list-disc ml-5 text-sm">
          <li>Upload your photo.</li>
          <li>Enter Name and Date.</li>
          <li>Select font size and style.</li>
          <li>Select color as you want.</li>
          <li>Drag and place the Name and Date on the photo.</li>
          <li>Lock the text to prevent moving.</li>
          <li>You can add both Name and Date or Only Name or Date by click on check box</li>
          <li>Click the Download button to save.</li>
        </ul>
      </div>
    </div>
  );
}
