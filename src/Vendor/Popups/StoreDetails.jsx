import { useRef, useState, useEffect } from "react";
import * as log from "../../Functions/login_vendor"
;

export default function StoreDetails({ setActivePanel }) {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState("");
    
    useEffect(() => {
        log.vendorDetails();
    }, []);

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[500px] h-[600px] bg-white border border-gray-300
                    rounded-lg shadow-lg z-[1000] p-4 flex flex-col justify-between"
    >
      {/* Content */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Upload GCash QR</h3>

        {/* Hidden input */}
        <input
          ref={fileRef}
          type="file"
          id="gcash-file"
          className="hidden"
          onChange={(e) =>
            setFileName(e.target.files?.[0]?.name || "")
          }
        />

        {/* Custom file button */}
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Choose File
        </button>

        {/* File name display */}
        <p className="text-sm text-gray-600">
          {fileName || "No file selected"}
        </p>

        {/* Upload button */}
        <button
          onClick={log.uploadGcash}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Upload
        </button>
      </div>

    <div id="vendor-details"></div> 

      {/* Close Button */}
      <button
        onClick={() => setActivePanel(null)}
        className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  );
}
