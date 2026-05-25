import * as log from "../Functions/login_vendor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gcash() {
  const [fileName, setFileName] = useState("No GCash QR selected");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleGcash = async () => {
    try {
      const success = await log.uploadGcash(file);

      if (success) {
        navigate("/vendor-login");
      } else {
        alert("Failed to upload GCash QR");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setFileName("No GCash QR selected");
      setPreview(null);
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);

    // show preview only if image
    if (selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
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

          <input
            type="file"
            id="gcash-file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

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

          <p className="text-sm text-gray-600 text-center">
            {fileName}
          </p>

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
