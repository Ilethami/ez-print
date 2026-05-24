import ezIcon from "../assets/ezicon.png";
import { Link } from "react-router-dom";
import VendorMap from "../Vendor/Vendor-Map";
import { useEffect, useState } from "react";
import * as o from "../Functions/order";

export default function ClientDash() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [center, setCenter] = useState(null);

  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState("bw");
  const [file, setFile] = useState(null);

  // NEW
  const [filePreview, setFilePreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

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

  // TOTAL PRICE
  const total =
    selectedVendor &&
    copies *
      (color === "bw"
        ? selectedVendor.bwRate
        : selectedVendor.colorRate);

  // SELECT VENDOR
  async function handleSelectVendor(vendor) {
    await o.selectVendor(vendor.id);

    setSelectedVendor(vendor);
    setCenter([vendor.latitude, vendor.longitude]);
  }

  // FILE CHANGE (with preview)
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

  // CREATE ORDER
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
    <div className="flex h-screen overflow-hidden">
      {/* HEADER */}
      <div className="absolute top-0 w-full bg-[#F6f5f5] px-[50px] py-[15px] shadow flex justify-between items-center h-20">
        <Link to="/">
          <img src={ezIcon} />
        </Link>
        <p className="text-lg font-bold">Welcome to Ez-Print</p>
      </div>

      {/* SIDEBAR */}
      <div className="mt-20 w-[300px] h-[calc(100vh-80px)] bg-gray-100 border-r overflow-y-auto">
        <div className="p-4 flex flex-col items-center">
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
        <div className="mt-20 w-[350px] h-[calc(100vh-80px)] bg-white border-l p-5 overflow-y-auto">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              {selectedVendor.brand}
            </h2>
            <button onClick={() => setSelectedVendor(null)}>✕</button>
          </div>

          <p>Status: {selectedVendor.availability}</p>

          <p>BW Rate: ₱{selectedVendor.bwRate}</p>
          <p>Color Rate: ₱{selectedVendor.colorRate}</p>

          {/* UPLOAD FILE */}
          <div className="mt-5">
            <h3 className="font-semibold">Upload File</h3>

            <input
              type="file"
              id="fileUpload"
              accept="image/*"
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
                  alt="preview"
                  className="w-full h-40 object-contain rounded"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p className="font-semibold">
                    Click to upload file
                  </p>
                  <p className="text-sm">PNG, JPG, JPEG</p>
                </div>
              )}
            </label>

            <button
              onClick={handleUploadFile}
              className="mt-3 w-full bg-gray-200 p-2 hover:bg-gray-300 transition"
            >
              Upload
            </button>
          </div>

          {/* ORDER */}
          <div className="mt-5">
            <h3 className="font-semibold">Order</h3>

            <input
              type="number"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
              className="border w-full p-2 mt-2"
            />

            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border w-full p-2 mt-2"
            >
              <option value="bw">BW</option>
              <option value="color">Color</option>
            </select>

            <p className="mt-3 font-bold">Total: ₱{total || 0}</p>

            <button
              onClick={handleCreateOrder}
              className="mt-3 w-full bg-blue-600 text-white p-2"
            >
              Submit Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
