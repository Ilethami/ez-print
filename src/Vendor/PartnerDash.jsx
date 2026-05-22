import * as ven from "../Functions/login_vendor";
import ezIcon from "../assets/ezicon.png";
import store from "../assets/store.png";
import order from "../assets/order.png";
import history from "../assets/history.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VendorMap from "./Vendor-Map";

import StoreDetails from "./Popups/StoreDetails";
import History from "./Popups/History";
import Orders from "./Popups/Orders";

import { useState, useEffect } from "react";

export default function PartnerDash() {
  const [showAvailability, setShowAvailability] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

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

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-2 font-inter font-medium ">
            <h3 className="mr-3">{status}</h3>

            <button
              onClick={() => setShowAvailability((p) => !p)}
              className="bg-white text-black px-3 py-1 rounded font-inter  text-l hover:bg-[#C5C5C5]"
            >
              Change Status
            </button>
          </div>
        </div>

        {/* DROPDOWN (ANIMATED) */}
        <div
          className={` absolute
     top-20 right-8 w-[220px] bg-white rounded-xl shadow-lg p-4 z-[40]
    flex flex-col gap-3 font-sans

    transition-all duration-300 ease-out origin-top

    ${
      showAvailability
        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
    }
  `}
        >
          {/* OPTIONS */}
          {["Available", "Busy", "SBusy", "Closed"].map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-50"
            >
              <input
                type="radio"
                name="availability"
                value={status}
                className="scale-110 accent-blue-500"
              />
              {status}
            </label>
          ))}

          {/* CONFIRM BUTTON */}
          <button
            onClick={async () => {
              const selected = document.querySelector(
                'input[name="availability"]:checked',
              );

              if (!selected) {
                alert("Please select a status first");
                return;
              }

              await ven.updateAvailability();
              setShowAvailability(false);
            }}
            className="w-full font-inter font-medium text-l p-1  rounded-[10px]
    bg-black text-white hover:bg-gray-700
    transition-colors duration-300 ease-in-out"
          >
            Confirm
          </button>
        </div>
        {/* SIDEBAR */}
        <div className="  h-screen w-[300px]   bg-[#f0f0f0] p-5 flex flex-col items-center z-[10] border-r-[0.5px] border-r-[#27221F]">
          <div className="flex flex-col mt-8 gap-2.5 w-fit items-start">
            <button
              className="font-inter font-semibold text-xl flex gap-2.5 p-4 hover:bg-[#C5C5C5] rounded-[10px] transition-colors duration-300 ease-in-out w-full hover:cursor-pointer"
              onClick={() => setActivePanel("store")}
            >
              <img src={store} alt="" />
              See store details
            </button>
            <button
              className="font-inter font-semibold text-xl flex gap-2.5 p-4 hover:bg-[#C5C5C5] rounded-[10px] transition-colors duration-300 ease-in-out w-full hover:cursor-pointer"
              onClick={() => setActivePanel("orders")}
            >
              <img src={order} alt="" />
              Handling order
            </button>
            <button
              className="font-inter font-semibold text-xl flex gap-2.5 p-4 hover:bg-[#C5C5C5] rounded-[10px] transition-colors duration-300 ease-in-out w-full hover:cursor-pointer"
              onClick={() => setActivePanel("history")}
            >
              <img src={history} alt="" />
              History
            </button>
          </div>
        </div>
        {/* Main Space */}
        <div className="flex-1 h-screen bg-white">
          {" "}
          <div className="mt-5">
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
