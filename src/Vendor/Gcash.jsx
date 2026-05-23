import * as log from "../Functions/login_vendor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gcash() {
  const [fileName, setFileName] = useState("No GCash QR selected");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const file = e.target.files[0];

  const handleGcash = async () => {
    await log.uploadGcash();
    navigate("/partner-dash");
  };
  function handleFileChange(e) {
    if (!file) {
      setFileName("No GCash QR selected");
      setPreview(null);
      return;
    }

    setFileName(file.name);

    // show preview only if image
    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div
        className="w-[400px] bg-white border border-gray-300
                   rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold">Upload GCash QR</h3>

          {/* Hidden input */}
          <input
            type="file"
            id="gcash-file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Upload area */}
          <label
            htmlFor="gcash-file"
            className="w-[200px] h-[200px]
                       border border-gray-300 rounded
                       flex items-center justify-center
                       overflow-hidden cursor-pointer
                       hover:bg-gray-100"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-center text-gray-500 p-4">
                Select GCash QR
              </span>
            )}
          </label>

          {/* File name */}
          <p className="text-sm text-gray-600 text-center">
            {fileName}
          </p>

          {/* Upload */}
          <button
            onClick={handleGcash}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition w-full hover:cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
