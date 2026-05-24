import ezIcon from "../assets/ezicon.png";
import store from "../assets/store.png";
import order from "../assets/order.png";
import history from "../assets/history.png";

import { Link, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PartnerDash() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("store"); // 👈 NEW
  const navigate = useNavigate();

  async function fetchVendorOrders() {
    const vendor_token = localStorage.getItem("vendor_token");
    if (!vendor_token) return;

    const res = await fetch("http://localhost:3001/vendor/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + vendor_token,
      },
    });

    if (!res.ok) return;

    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  function handleNav(tab, path) {
    setActiveTab(tab);
    navigate(path);
  }

  const baseBtn =
    "flex items-center gap-3 p-4 rounded transition cursor-pointer text-[#33313B] bg-[#f6f5f5]";

  const activeWarm = "bg-[#e3c4ab]/70";

  const activeBlue = "bg-[#4592af] text-white";

  const activeDark = "bg-[#33313B] text-white";

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f5f5] text-[#33313B]">
      {/* HEADER */}
      <div className="fixed top-0 w-full h-20 bg-[#f6f5f5] border-b border-[#33313B]/10 flex items-center px-10 z-50">
        <Link to="/">
          <img src={ezIcon} alt="EzPrint Icon" />
        </Link>

        <p className="text-xl font-semibold ml-10">
          Partner Dashboard
        </p>
      </div>

      {/* SIDEBAR */}
      <div className="mt-20 w-[300px] h-[calc(100vh-80px)] bg-[#e3c4ab]/25 border-r border-[#33313B]/10 p-5 flex flex-col gap-3">
        {/* STORE */}
        <button
          onClick={() => navigate("store")}
          className="
      flex items-center gap-3 p-4 rounded
      bg-[#f6f5f5]
      text-[#33313B]
      border-l-4 border-transparent

      transition-all duration-200

      hover:bg-[#e3c4ab]/70
      hover:border-[#e3c4ab]
      hover:translate-x-1

      active:bg-[#d6b394]
      focus:bg-[#d6b394]
      focus:border-[#33313B]

      cursor-pointer
    "
        >
          <img src={store} />
          See store details
        </button>

        {/* ORDERS */}
        <button
          onClick={() => navigate("orders")}
          className="
      flex items-center gap-3 p-4 rounded
      bg-[#f6f5f5]
      text-[#33313B]
      border-l-4 border-transparent

      transition-all duration-200

      hover:bg-[#e3c4ab]/70
      hover:border-[#e3c4ab]
      hover:translate-x-1

      active:bg-[#d6b394]
      focus:bg-[#d6b394]
      focus:border-[#33313B]

      cursor-pointer
    "
        >
          <img src={order} />
          Handling orders
        </button>

        {/* HISTORY */}
        <button
          onClick={() => navigate("history")}
          className="
      flex items-center gap-3 p-4 rounded
      bg-[#f6f5f5]
      text-[#33313B]
      border-l-4 border-transparent

      transition-all duration-200

      hover:bg-[#e3c4ab]/70
      hover:border-[#e3c4ab]
      hover:translate-x-1

      active:bg-[#d6b394]
      focus:bg-[#d6b394]
      focus:border-[#33313B]

      cursor-pointer
    "
        >
          <img src={history} />
          History
        </button>
      </div>
      {/* MAIN AREA */}
      <div className="flex-1 mt-20 bg-[#f6f5f5]">
        <Outlet
          context={{ orders, refreshOrders: fetchVendorOrders }}
        />
      </div>
    </div>
  );
}
