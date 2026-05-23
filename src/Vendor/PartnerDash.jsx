import * as ven from "../Functions/login_vendor";
import ezIcon from "../assets/ezicon.png";
import store from "../assets/store.png";
import order from "../assets/order.png";
import history from "../assets/history.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import VendorMap from "./Vendor-Map";

import StoreDetails from "./Popups/StoreDetails";
import Orders from "./Popups/OrdersPopup";

import { useState, useEffect } from "react";

export default function PartnerDash() {
  const [showAvailability, setShowAvailability] = useState(false);
  const [activePanel, setActivePanel] = useState("store");

  return (
    <>
      <div className="flex flex-wrap overflow-hidden h-screen">
        {/* HEADER */}
        <div className="relative z-50 w-full overflow-hidden bg-[#ebeaea] pl-20 pr-8 py-[15px] shadow-[0px_0px_3px_5px_rgba(5,5,5,0.329)] flex items-center h-20">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-20">
            <Link to="/">
              <img
                src={ezIcon}
                alt="EzPrint Icon"
                className="cursor-pointer"
              />
            </Link>

            <p className="font-open-sans font-semibold text-[22px]">
              Partner Dashboard
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="  h-screen w-[300px]   bg-[#f0f0f0] p-5 flex flex-col items-center z-[10] border-r-[0.5px] border-r-[#27221F]">
          <div className="flex flex-col mt-8 gap-2.5 w-fit items-start">
            <button
              className="font-inter font-semibold text-xl flex gap-2.5 p-4 hover:bg-[#C5C5C5] rounded-[10px] transition-colors duration-300 ease-in-out w-full hover:cursor-pointer"
              onClick={() => setActivePanel("store")}
            >
              <img src={store} alt="store" />
              See store details
            </button>
            <button
              className="font-inter font-semibold text-xl flex gap-2.5 p-4 hover:bg-[#C5C5C5] rounded-[10px] transition-colors duration-300 ease-in-out w-full hover:cursor-pointer"
              onClick={() => setActivePanel("orders")}
            >
              <img src={order} alt="order" />
              Handling order
            </button>
            <button
              className="font-inter font-semibold text-xl flex gap-2.5 p-4 hover:bg-[#C5C5C5] rounded-[10px] transition-colors duration-300 ease-in-out w-full hover:cursor-pointer"
              onClick={() => setActivePanel("gcash")}
            >
              <img src={history} alt="history" />
              History
            </button>
          </div>
        </div>
        {/* Main Space */}
        <div className="flex-1 h-screen bg-white">
          {" "}
          <div className="h-full">
            {activePanel === "null" && (
              <StoreDetails setActivePanel={setActivePanel} />
            )}
            {activePanel === "store" && (
              <StoreDetails setActivePanel={setActivePanel} />
            )}
            {activePanel === "orders" && (
              <Orders setActivePanel={setActivePanel} />
            )}
            {activePanel === "history" && (
              <History setActivePanel={setActivePanel} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
