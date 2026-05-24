import { useEffect, useState } from "react";

export default function StoreDetails() {
  const [vendor, setVendor] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendor() {
      try {
        const token = localStorage.getItem("vendor_token");

        // ======================
        // VENDOR (same style as client fetch)
        // ======================
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

        // ======================
        // ORDERS (client-style fetch)
        // ======================
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
      <div className="w-full h-full flex items-center justify-center">
        Loading store details...
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        No vendor found
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white border border-gray-300 shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Store Details</h2>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            <b>Brand:</b> {vendor.brand}
          </p>
          <p>
            <b>Email:</b> {vendor.email}
          </p>
          <p>
            <b>Status:</b> {vendor.availability}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p>
            <b>B/W Rate:</b> ₱{vendor.bw_rate ?? vendor.bwRate ?? 0}
          </p>

          <p>
            <b>Color Rate:</b> ₱
            {vendor.clrd_rate ?? vendor.colorRate ?? 0}
          </p>

          <p>
            <b>Latitude:</b> {vendor.lat}
          </p>
          <p>
            <b>Longitude:</b> {vendor.long}
          </p>
        </div>
      </div>

      <hr className="my-4" />

      <p className="font-semibold">Total Orders: {totalOrders}</p>
    </div>
  );
}
