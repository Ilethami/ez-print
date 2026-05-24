import ezIcon from "../assets/ezicon.png";
import { Link } from "react-router-dom";
import VendorMap from "../Vendor/Vendor-Map";
import { useEffect, useState } from "react";
import * as o from "../Functions/order";
import ClientOrders from "./ClientOrders";

export default function ClientDash() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [center, setCenter] = useState(null);

  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState("bw");
  const [file, setFile] = useState(null);

  const [filePreview, setFilePreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [openOrders, setOpenOrders] = useState(false);

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
    copies *
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
    alert("File uploaded!");
  }

  async function handleCreateOrder() {
    const token = localStorage.getItem("usr_token");

    const payload = {
      copies,
      print_size: "A4",
      color: color === "color",
      file: uploadedFile,
      total,
      vendor: selectedVendor.id,
    };

    await fetch("http://localhost:3001/order/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    });

    alert("Order created!");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f5f5] text-[#33313B]">
      {/* GLOBAL SELECT FIX */}
      <style>{`
        select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: none;
        }
      `}</style>

      {/* HEADER */}
      <div className="absolute top-0 w-full h-20 bg-[#f6f5f5] border-b border-[#33313B]/10 px-[50px] flex justify-between items-center shadow-sm">
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={ezIcon} className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold tracking-wide">
            Welcome to Ez-Print
          </p>

          <button
            onClick={() => setOpenOrders(true)}
            className="
              px-4 py-2 rounded-lg cursor-pointer
              bg-[#33313B] text-white
              hover:bg-[#e3c4ab] hover:text-[#33313B]
              transition
            "
          >
            View Orders
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="mt-20 w-[300px] h-[calc(100vh-80px)] bg-white border-r border-[#33313B]/10 overflow-y-auto">
        <div className="p-4 flex flex-col items-center">
          <h2 className="font-bold text-lg mb-4">Vendors</h2>

          {vendors.map((v) => (
            <div
              key={v.id}
              onClick={() => handleSelectVendor(v)}
              className={`
                w-[220px] p-3 mb-3 cursor-pointer rounded-xl border transition-all
                ${
                  selectedVendor?.id === v.id
                    ? "bg-[#e3c4ab]/30 border-[#e3c4ab]"
                    : "bg-white border-[#33313B]/10 hover:bg-[#e3c4ab]/20 hover:border-[#e3c4ab]"
                }
              `}
            >
              <p className="font-semibold">{v.brand}</p>
              <p className="text-sm text-[#33313B]/70">
                {v.availability}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MAP */}
      <div className="flex-1 mt-20">
        <VendorMap
          vendors={vendors}
          setSelectedVendor={setSelectedVendor}
          center={center}
          setCenter={setCenter}
        />
      </div>

      {/* RIGHT PANEL */}
      {selectedVendor && (
        <div className="mt-20 w-[360px] h-[calc(100vh-80px)] bg-white border-l border-[#33313B]/10 p-5 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">
              {selectedVendor.brand}
            </h2>

            <button
              onClick={() => setSelectedVendor(null)}
              className="cursor-pointer text-[#33313B]/60 hover:text-[#33313B]"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-[#33313B]/70 mb-4">
            Status: {selectedVendor.availability}
          </p>

          {/* PRICING */}
          <div className="bg-[#f6f5f5] border border-[#33313B]/10 rounded-xl p-3 mb-5">
            <p className="text-sm">
              BW Rate: ₱{selectedVendor.bwRate}
            </p>
            <p className="text-sm">
              Color Rate: ₱{selectedVendor.colorRate}
            </p>
          </div>

          {/* FILE */}
          <div className="mb-6">
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
                  className="w-full h-40 object-contain rounded"
                />
              ) : (
                <p className="text-sm text-[#33313B]/60">
                  Click to upload file
                </p>
              )}
            </label>

            <button
              onClick={handleUploadFile}
              className="mt-3 w-full p-2 rounded-lg cursor-pointer bg-[#33313B] text-white hover:bg-[#e3c4ab] hover:text-[#33313B] transition"
            >
              Upload
            </button>
          </div>

          {/* ORDER */}
          <div>
            <h3 className="font-semibold mb-2">Order</h3>

            <input
              type="number"
              min={1}
              value={copies}
              onChange={(e) =>
                setCopies(Math.max(1, Number(e.target.value)))
              }
              className="border border-[#33313B]/20 rounded-lg w-full p-2 outline-none focus:border-[#e3c4ab]"
            />

            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border border-[#33313B]/20 rounded-lg w-full p-2 mt-2 bg-white outline-none cursor-pointer hover:border-[#e3c4ab]"
            >
              <option value="bw">BW</option>
              <option value="color">Color</option>
            </select>

            <p className="mt-3 font-bold">Total: ₱{total || 0}</p>

            <button
              onClick={handleCreateOrder}
              className="mt-3 w-full p-2 rounded-lg cursor-pointer bg-[#33313B] text-white hover:bg-[#e3c4ab] hover:text-[#33313B] transition"
            >
              Submit Order
            </button>
          </div>
        </div>
      )}

      {/* ORDERS POPUP */}
      {openOrders && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[90%] max-w-[1000px] bg-white rounded-xl p-4 relative">
            <button
              onClick={() => setOpenOrders(false)}
              className="absolute top-3 right-3 cursor-pointer"
            >
              ✕
            </button>

            <ClientOrders />
          </div>
        </div>
      )}
    </div>
  );
}
