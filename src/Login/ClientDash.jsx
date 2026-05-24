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
          "http://localhost:3001/order/listvendors",
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

  const total =
    selectedVendor &&
    Number(copies) *
      (color === "bw"
        ? selectedVendor.bwRate
        : selectedVendor.colorRate);

  async function handleSelectVendor(vendor) {
    await o.selectVendor(vendor.id);
    setSelectedVendor(vendor);
    setCenter([vendor.latitude, vendor.longitude]);
  }

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result);
    reader.readAsDataURL(selected);
  }

  async function handleUploadFile() {
    if (!file || !selectedVendor) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("vendor_id", selectedVendor.id);

    const res = await fetch(
      "http://localhost:3001/order/attachfile",
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

  async function handleCreateOrder() {
    if (!selectedVendor) return alert("Select a vendor first");
    if (!uploadedFile) return alert("Upload a file first");
    if (!copies || Number(copies) <= 0)
      return alert("Enter valid copies");

    try {
      const totalRes = await fetch(
        "http://localhost:3001/order/total",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            copies: Number(copies),
            vendor: selectedVendor.id,
            color: color === "color",
          }),
        },
      );

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
    <div className="flex h-screen overflow-hidden bg-[#f6f5f5] text-[#33313B]">
      {/* HEADER */}
      <div className="absolute top-0 w-full h-20 bg-[#f6f5f5] border-b border-[#33313B]/10 px-[50px] flex justify-between items-center shadow-sm z-20">
        <Link to="/" className="cursor-pointer">
          <img src={ezIcon} alt="EzPrint" className="h-10" />
        </Link>

        <p className="text-lg font-semibold">Welcome to Ez-Print</p>
      </div>

      {/* SIDEBAR */}
      <div className="mt-20 w-[300px] h-[calc(100vh-80px)] bg-white border-r border-[#33313B]/10 flex flex-col z-10">
        <div className="p-4 flex flex-col items-center overflow-y-auto flex-1">
          <h2 className="font-bold mb-4">Vendors</h2>

          {vendors.map((v) => (
            <div
              key={v.id}
              onClick={() => handleSelectVendor(v)}
              className={`
                w-[220px] p-3 mb-3 cursor-pointer rounded-xl border transition
                ${
                  selectedVendor?.id === v.id
                    ? "bg-[#e3c4ab]/30 border-[#e3c4ab]"
                    : "bg-white border-[#33313B]/10 hover:bg-[#e3c4ab]/20"
                }
              `}
            >
              <p className="font-semibold">{v.brand}</p>
              <p className="text-sm opacity-70">{v.availability}</p>
            </div>
          ))}
        </div>

        <div className="p-4">
          <button
            onClick={() => setShowOrders(true)}
            className="w-full p-3 rounded-lg bg-[#33313B] text-white hover:bg-[#4592af] cursor-pointer transition"
          >
            Orders
          </button>
        </div>
      </div>

      {/* MAP (FIXED Z-INDEX STACKING) */}
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
        <div className="mt-20 w-[350px] h-[calc(100vh-80px)] bg-white border-l border-[#33313B]/10 p-5 overflow-y-auto z-10">
          <div className="flex justify-between mb-3">
            <h2 className="text-xl font-bold">
              {selectedVendor.brand}
            </h2>

            <button
              onClick={() => setSelectedVendor(null)}
              className="cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-sm opacity-70 mb-3">
            Status: {selectedVendor.availability}
          </p>

          {/* UPLOAD */}
          <div className="mb-5">
            <h3 className="font-semibold mb-2">Upload File</h3>

            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center border border-dashed border-[#33313B]/30 rounded-xl p-4 cursor-pointer bg-[#f6f5f5] hover:bg-[#e3c4ab]/20 transition"
            >
              {filePreview ? (
                <img
                  src={filePreview}
                  className="w-full h-40 object-contain"
                />
              ) : (
                <p className="opacity-60">Click to upload file</p>
              )}
            </label>

            <button
              onClick={handleUploadFile}
              className="mt-3 w-full p-2 rounded-lg bg-[#33313B] text-white hover:bg-[#e3c4ab] hover:text-[#33313B] transition cursor-pointer"
            >
              Upload
            </button>
          </div>

          {/* ORDER */}
          <div>
            <h3 className="font-semibold mb-2">Order</h3>

            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="border border-[#33313B]/20 w-full p-2 rounded-lg outline-none focus:border-[#e3c4ab]"
            />

            <select
              value={printSize}
              onChange={(e) => setPrintSize(e.target.value)}
              className="border w-full p-2 mt-2 rounded-lg cursor-pointer focus:border-[#4592af]"
            >
              <option>A4</option>
              <option>Short</option>
              <option>Long</option>
              <option>Letter</option>
              <option>Legal</option>
            </select>

            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border w-full p-2 mt-2 rounded-lg cursor-pointer focus:border-[#4592af]"
            >
              <option value="bw">BW</option>
              <option value="color">Color</option>
            </select>

            <p className="mt-3 font-bold">Total: ₱{total || 0}</p>

            <button
              onClick={handleCreateOrder}
              className="mt-3 w-full p-2 rounded-lg bg-[#4592af] text-white hover:bg-[#33313B] transition cursor-pointer"
            >
              Submit Order
            </button>
          </div>
        </div>
      )}

      {/* ORDERS MODAL (ABOVE EVERYTHING INCLUDING MAP) */}
      {showOrders && (
        <div className="absolute inset-0 z-[9999] bg-black/40 flex items-center justify-center">
          <div className="w-[90%] h-[90%] bg-white rounded-xl shadow-xl relative overflow-hidden">
            <button
              onClick={() => setShowOrders(false)}
              className="absolute top-3 right-3 text-red-500 font-bold text-xl cursor-pointer"
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
