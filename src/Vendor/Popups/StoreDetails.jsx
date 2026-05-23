import { useEffect, useState } from "react";

const vendor_token = localStorage.getItem("vendor_token");

export default function StoreDetails() {
  const [vendor, setVendor] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // ======================
        // VENDOR DETAILS (same style as your vendor file)
        // ======================
        const vendorRes = await fetch(
          "http://localhost:3001/vendor/home",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + vendor_token,
            },
          },
        );

        const vendorText = await vendorRes.text();
        const vendorData = JSON.parse(vendorText);

        // handle array OR object (your backend is inconsistent)
        const currentVendor = Array.isArray(vendorData)
          ? vendorData[0]
          : vendorData;

        setVendor(currentVendor);

        // ======================
        // ORDERS (same style as your vendor/orders file)
        // ======================
        const ordersRes = await fetch(
          "http://localhost:3001/vendor/orders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + vendor_token,
            },
          },
        );

        const ordersText = await ordersRes.text();
        const orders = JSON.parse(ordersText);

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

    load();
  }, []);

  if (loading) {
    return <div className="p-4 w-full h-full">Loading...</div>;
  }

  if (!vendor) {
    return <div className="p-4 w-full h-full">No vendor found</div>;
  }

  return (
    <div className="w-full h-full bg-white border border-gray-300 shadow-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Store Details</h2>

      <div className="flex flex-col gap-2 text-sm">
        <p>
          <b>Brand:</b> {vendor.brand || "N/A"}
        </p>

        {/* FIX: supports both naming styles */}
        <p>
          <b>Email:</b> {vendor.email || "N/A"}
        </p>

        <p>
          <b>B/W Rate:</b> ₱{vendor.bw_rate ?? vendor.bwRate ?? "N/A"}
        </p>

        <p>
          <b>Color Rate:</b> ₱
          {vendor.clrd_rate ?? vendor.colorRate ?? "N/A"}
        </p>

        <p>
          <b>Latitude:</b> {vendor.lat}
        </p>
        <p>
          <b>Longitude:</b> {vendor.long}
        </p>

        <hr className="my-2" />

        <p>
          <b>Total Orders:</b> {totalOrders}
        </p>
      </div>
    </div>
  );
}
