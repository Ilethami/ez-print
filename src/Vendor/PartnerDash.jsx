import * as ven from "../Functions/login_vendor";
import ezIcon from "../assets/ezicon.png";
import store from "../assets/store.png";
import order from "../assets/order.png";
import history from "../assets/history.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VendorMap from "./Vendor-Map";

import StoreDetails from "./Popups/StoreDetails";
import Orders from "./Popups/OrdersPopup";
import History from "./Popups/History";

import { useState, useEffect } from "react";

export default function PartnerDash() {
  const [activePanel, setActivePanel] = useState("store");
  const [orders, setOrders] = useState([]);

  // =========================
  // FETCH VENDOR ORDERS
  // =========================
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

    if (!res.ok) {
      console.error("Failed to load vendor orders");
      return;
    }

    const data = await res.json();
    setOrders(data);
  }

  // =========================
  // LOAD ON OPEN
  // =========================
  useEffect(() => {
    fetchVendorOrders();
  }, []);

  return (
    <div className="flex flex-wrap overflow-hidden h-screen">
      {/* HEADER */}
      <div className="relative z-50 w-full bg-[#ebeaea] pl-20 pr-8 py-[15px] shadow flex items-center h-20">
        <div className="flex items-center gap-20">
          <Link to="/">
            <img src={ezIcon} alt="EzPrint Icon" />
          </Link>

          <p className="font-semibold text-[22px]">
            Partner Dashboard
          </p>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="h-screen w-[300px] bg-[#f0f0f0] p-5 flex flex-col items-center border-r">
        <div className="flex flex-col mt-8 gap-2.5 w-fit items-start">
          <button
            className="font-semibold text-xl font-open-sans flex gap-2 p-4 hover:bg-[#C5C5C5] rounded w-full"
            onClick={() => setActivePanel("store")}
          >
            <img src={store} alt="store" />
            See store details
          </button>

          <button
            className="font-semibold text-xl font-open-sans flex gap-2 p-4 hover:bg-[#C5C5C5] rounded w-full"
            onClick={() => setActivePanel("orders")}
          >
            <img src={order} alt="order" />
            Handling orders
          </button>

          <button
            className="font-semibold text-xl font-open-sans flex gap-2 p-4 hover:bg-[#C5C5C5] rounded w-full"
            onClick={() => setActivePanel("history")}
          >
            <img src={history} alt="history" />
            History
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 h-screen bg-white">
        <div className="h-full">
          {activePanel === "store" && (
            <StoreDetails setActivePanel={setActivePanel} />
          )}

          {activePanel === "orders" && (
            <Orders
              setActivePanel={setActivePanel}
              orders={orders}
              refreshOrders={fetchVendorOrders}
            />
          )}

          {activePanel === "history" && (
            <History setActivePanel={setActivePanel} />
          )}
        </div>
      </div>
    </div>
  );
}
