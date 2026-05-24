import { useEffect, useState } from "react";

export default function StoreDetails() {
  const [vendor, setVendor] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendor() {
      try {
        const token = localStorage.getItem("vendor_token");

        const vendorRes = await fetch(
          "http://localhost:3001/vendor/home",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );

        const vendorData = await vendorRes.json();
        const currentVendor = Array.isArray(vendorData)
          ? vendorData[0]
          : vendorData;

        setVendor(currentVendor);

        const ordersRes = await fetch(
          "http://localhost:3001/vendor/orders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );

        const orders = await ordersRes.json();

        const count = (orders || []).filter(
          (o) => o.vendor === currentVendor?.pub_id,
        ).length;

        setTotalOrders(count);
      } catch (err) {
        console.error("StoreDetails error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchVendor();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[#33313B] bg-[#f6f5f5]">
        Loading store details...
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[#33313B] bg-[#f6f5f5]">
        No vendor found
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#f6f5f5] p-6 text-[#33313B]">
      {/* Card */}
      <div className="bg-white border border-[#33313B]/10 rounded-[1em] shadow-sm p-6 max-w-[900px] mx-auto">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6">Store Details</h2>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <p>
              <span className="font-semibold">Brand:</span>{" "}
              {vendor.brand}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {vendor.email}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {vendor.availability}
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3">
            <p>
              <span className="font-semibold">B/W Rate:</span> ₱
              {vendor.bw_rate ?? vendor.bwRate ?? 0}
            </p>

            <p>
              <span className="font-semibold">Color Rate:</span> ₱
              {vendor.clrd_rate ?? vendor.colorRate ?? 0}
            </p>

            <p>
              <span className="font-semibold">Latitude:</span>{" "}
              {vendor.lat}
            </p>
            <p>
              <span className="font-semibold">Longitude:</span>{" "}
              {vendor.long}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-[#33313B]/10" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="font-semibold">Total Orders: {totalOrders}</p>

          <div className="text-xs text-[#33313B]/60">
            Vendor dashboard view
          </div>
        </div>
      </div>
    </div>
  );
}
