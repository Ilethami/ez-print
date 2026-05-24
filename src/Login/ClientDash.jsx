import ezIcon from "../assets/ezicon.png";
import { Link } from "react-router-dom";
import VendorMap from "../Vendor/Vendor-Map";
import ClientOrders from "./ClientOrders";
import { useEffect, useState } from "react";
import * as o from "../Functions/order";

export default function ClientDash() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [center, setCenter] = useState(null);

  // ✅ FIX: changed from 0 → "" so backspace works
  const [copies, setCopies] = useState("");

  const [color, setColor] = useState("bw");
  const [printSize, setPrintSize] = useState("A4");

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch(
          "/api/order/listvendors",
        );

        const data = await response.json();

        const formatted = data.map((v) => ({
          id: v.pub_id,
          brand: v.brand,
          availability: v.availability,
          latitude: v.lat,
          longitude: v.long,
          bwRate: v.bw_rate,
          colorRate: v.clrd_rate,
        }));

        setVendors(formatted);
      } catch (err) {
        console.error(err);
      }
    }

    fetchVendors();
  }, []);

  // TOTAL PRICE (preview only)
  const total =
    selectedVendor &&
    Number(copies) *
      (color === "bw"
        ? selectedVendor.bwRate
        : selectedVendor.colorRate);

  // SELECT VENDOR
  async function handleSelectVendor(vendor) {
    await o.selectVendor(vendor.id);

    setSelectedVendor(vendor);
    setCenter([vendor.latitude, vendor.longitude]);
  }

  // FILE CHANGE
  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(selected);
  }

  // UPLOAD FILE
  async function handleUploadFile() {
    if (!file || !selectedVendor) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("vendor_id", selectedVendor.id);

    const res = await fetch(
      "/api/order/attachfile",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    setUploadedFile(data);

    localStorage.setItem("uploaded_file", data);

    alert("File uploaded!");
  }

  // CREATE ORDER
  async function handleCreateOrder() {
    if (!selectedVendor) {
      return alert("Select a vendor first");
    }

    if (!uploadedFile) {
      return alert("Upload a file first");
    }

    if (!copies || Number(copies) <= 0) {
      return alert("Enter valid copies");
    }

    try {
      const totalRes = await fetch(
        "/api/order/total",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            copies: Number(copies),
            vendor: selectedVendor.id,
            color: color === "color",
          }),
        },
      );

      if (!totalRes.ok) {
        return alert("Failed to calculate total");
      }

      const totalData = await totalRes.json();

      await o.createOrder(
        selectedVendor.id,
        Number(copies),
        printSize,
        color === "color",
        totalData,
      );
    } catch (err) {
      console.error(err);
      alert("Failed to create order");
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* HEADER */}
      <div className="absolute top-0 w-full bg-[#F6f5f5] px-[50px] py-[15px] shadow flex justify-between items-center h-20">
        <Link to="/">
          <img src={ezIcon} alt="EzPrint" />
        </Link>

        <p className="text-lg font-bold">Welcome to Ez-Print</p>
      </div>

      {/* SIDEBAR */}
      <div className="mt-20 w-[300px] h-[calc(100vh-80px)] bg-gray-100 border-r flex flex-col">
        <div className="p-4 flex flex-col items-center overflow-y-auto flex-1">
          <h2 className="font-bold mb-3">Vendors</h2>

          {vendors.map((v) => (
            <div
              key={v.id}
              onClick={() => handleSelectVendor(v)}
              className={`p-3 mb-2 w-[200px] cursor-pointer rounded border hover:bg-blue-100 ${
                selectedVendor?.id === v.id
                  ? "bg-blue-100"
                  : "bg-white"
              }`}
            >
              <p className="font-semibold">{v.brand}</p>
              <p className="text-sm">{v.availability}</p>
            </div>
          ))}
        </div>

        <div className="p-4">
          <button
            onClick={() => setShowOrders(true)}
            className="w-full p-3 bg-gray-300 hover:bg-gray-400 rounded font-semibold"
          >
            Orders
          </button>
        </div>
      </div>

      {/* MAP */}
      <div className="flex-1 mt-20 relative z-0">
        <VendorMap
          vendors={vendors}
          setSelectedVendor={setSelectedVendor}
          center={center}
          setCenter={setCenter}
        />
      </div>

      {/* RIGHT PANEL */}
      {selectedVendor && (
        <div className="mt-20 w-[350px] h-[calc(100vh-80px)] bg-white border-l p-5 overflow-y-auto">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              {selectedVendor.brand}
            </h2>

            <button
              onClick={() => setSelectedVendor(null)}
              className="hover:cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p>Status: {selectedVendor.availability}</p>
          <p>BW Rate: ₱{selectedVendor.bwRate}</p>
          <p>Color Rate: ₱{selectedVendor.colorRate}</p>

          {/* UPLOAD */}
          <div className="mt-5">
            <h3 className="font-semibold">Upload File</h3>

            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              htmlFor="fileUpload"
              className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
            >
              {filePreview ? (
                <img
                  src={filePreview}
                  className="w-full h-40 object-contain rounded"
                />
              ) : (
                <p className="text-gray-500 font-semibold">
                  Click to upload file
                </p>
              )}
            </label>

            <button
              onClick={handleUploadFile}
              className="mt-3 w-full bg-gray-200 p-2 hover:bg-gray-300"
            >
              Upload
            </button>
          </div>

          {/* ORDER */}
          <div className="mt-5">
            <h3 className="font-semibold">Order</h3>

            <label className="block mt-3">Copies</label>

            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="border w-full p-2 mt-1"
            />

            <label className="block mt-3">Print Size</label>

            <select
              value={printSize}
              onChange={(e) => setPrintSize(e.target.value)}
              className="border w-full p-2 mt-1"
            >
              <option value="A4">A4</option>
              <option value="Short">Short</option>
              <option value="Long">Long</option>
              <option value="Letter">Letter</option>
              <option value="Legal">Legal</option>
            </select>

            <label className="block mt-3">Print Type</label>

            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border w-full p-2 mt-1"
            >
              <option value="bw">BW</option>
              <option value="color">Color</option>
            </select>

            <p className="mt-3 font-bold">
              Estimated Total: ₱{total || 0}
            </p>

            <button
              onClick={handleCreateOrder}
              className="mt-3 w-full bg-blue-600 text-white p-2"
            >
              Submit Order
            </button>
          </div>
        </div>
      )}

      {/* ORDERS MODAL */}
      {showOrders && (
        <div className="absolute inset-0 z-[9999] bg-black/40 flex items-center justify-center">
          <div className="w-[90%] h-[90%] bg-white rounded-xl shadow-xl relative overflow-hidden">
            <button
              onClick={() => setShowOrders(false)}
              className="absolute top-3 right-3 text-red-500 font-bold text-xl z-50"
            >
              ✕
            </button>

            <div className="h-full overflow-y-auto p-4">
              <ClientOrders />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
