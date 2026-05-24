import ezIcon from "../assets/ezicon.png";
import { Link } from "react-router-dom";
import VendorMap from "../Vendor/Vendor-Map";
import { useEffect, useState } from "react";

export default function ClientDash() {
  // =========================
  // VENDOR STATE (from backend later)
  // =========================
  const [vendors, setVendors] = useState([]);

  // =========================
  // FETCH VENDORS (PLACEHOLDER)
  // Replace this with your backend function later
  // =========================
  useEffect(() => {
    // Example:
    // fetchVendors().then(data => setVendors(data));

    // TEMP MOCK DATA (remove later)
    const mockVendors = [
      { id: 1, name: "Vendor A", status: "Active" },
      { id: 2, name: "Vendor B", status: "Pending" },
      { id: 3, name: "Vendor C", status: "Inactive" },
    ];

    setVendors(mockVendors);
  }, []);

  return (
    <div className="flex overflow-hidden h-screen">
      {/* HEADER */}
      <div className="absolute top-0 left-0 z-50 w-full bg-[#ebeaea] pl-20 pr-8 py-[15px] shadow-[0px_0px_3px_5px_rgba(5,5,5,0.329)] flex items-center h-20">
        <div className="flex items-center gap-20">
          <Link to="/">
            <img
              src={ezIcon}
              alt="EzPrint Icon"
              className="cursor-pointer"
            />
          </Link>

          <p className="font-open-sans font-semibold text-[22px]">
            Welcome to Ez-Print!
          </p>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="mt-20 h-[calc(100vh-80px)] w-[300px] bg-[#f0f0f0] border-r-[0.5px] border-r-[#27221F] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Vendors</h2>

          {/* VENDOR LIST */}
          <div className="flex flex-col gap-3">
            {vendors.length === 0 ? (
              <p className="text-sm text-gray-500">
                No vendors available
              </p>
            ) : (
              vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="p-3 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  {/* Vendor Name */}
                  <p className="font-medium text-sm">{vendor.name}</p>

                  {/* Status (placeholder styling) */}
                  <p
                    className={`text-xs mt-1 ${
                      vendor.status === "Active"
                        ? "text-green-600"
                        : vendor.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-500"
                    }`}
                  >
                    {vendor.status}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MAIN SPACE */}
      <div className="flex-1 mt-20 h-[calc(100vh-80px)]">
        <div className="w-full h-full">
          <VendorMap vendors={vendors} setVendors={setVendors} />
        </div>
      </div>
    </div>
  );
}
