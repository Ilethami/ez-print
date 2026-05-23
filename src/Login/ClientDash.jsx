import ezIcon from "../assets/ezicon.png";
import { Link } from "react-router-dom";
import VendorMap from "../Vendor/Vendor-Map";
import { useEffect, useState } from "react";

export default function ClientDash() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [center, setCenter] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);

  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState("bw");
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch(
          "http://localhost:3001/order/listvendors",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }

        const data = await response.json();

        // map backend fields → frontend format
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
        console.error("Error loading vendors:", err);
      }
    }

    fetchVendors();
  }, []);

  // =========================
  // TOTAL PRICE
  // =========================
  const total =
    selectedVendor &&
    copies *
      (color === "bw"
        ? selectedVendor.bwRate
        : selectedVendor.colorRate);

  function submitOrder() {
    alert(
      `Order sent to\n${selectedVendor.brand}\nThank you for your order!`,
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* HEADER */}
      <div className="absolute top-0 w-full overflow-hidden bg-[#F6f5f5] px-[50px] py-[15px] shadow-[0px_0px_3px_5px_rgba(5,5,5,0.329)] flex flex-row justify-between items-center h-20">
        <Link to="/">
          <img src={ezIcon} />
        </Link>
        <p className="ml-10 text-lg font-bold font-open-sans ">
          Welcome to Ez-Print
        </p>
      </div>

      {/* SIDEBAR */}
      <div className="mt-20 w-[300px] h-[calc(100vh-80px)] bg-gray-100 border-r overflow-y-auto">
        <div className="p-4 flex-col flex items-center">
          <h2 className="font-bold mb-3">Vendors</h2>

          {vendors.map((v) => (
            <div
              key={v.id}
              onClick={() => {
                setSelectedVendor(v);
                setCenter([v.latitude, v.longitude]);
              }}
              className={`p-3 mb-2 w-[200px] cursor-pointer rounded border hover:scale-110 hover:bg-blue-100 ${
                selectedVendor?.id === v.id
                  ? "bg-blue-100 scale-110"
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
          setHasLocation={setHasLocation}
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

          <p className="mt-2">
            Status: {selectedVendor.availability}
          </p>

          <p>BW Rate: ₱{selectedVendor.bwRate}</p>
          <p>Color Rate: ₱{selectedVendor.colorRate}</p>

          {/* Upload */}
          <div className="mt-5">
            <h3 className="font-semibold">Upload File</h3>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Order */}
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
              onClick={submitOrder}
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
