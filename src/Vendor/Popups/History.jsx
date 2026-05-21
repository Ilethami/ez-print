import * as log from "../../Functions/login_vendor";

export default function History({ setActivePanel }) {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[500px] h-[600px] bg-white border border-gray-300 
                    rounded-lg shadow-lg z-[1000] p-4 flex flex-col gap-4"
    >
      {/* Content */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Upload GCash QR</h3>

        <input
          type="file"
          id="gcash-file"
          className="border border-gray-300 p-2 rounded"
        />

        <button
          onClick={log.uploadGcash}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Upload
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setActivePanel(null)}
        className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  );
}
