import * as Ven from "../../Functions/login_vendor";
import { useEffect } from "react";

export default function History() {
  useEffect(() => {
    Ven.loadHandlingOrders();
  }, []);

  return (
    <div className="w-full h-full bg-[#f6f5f5] text-[#33313B] p-6 flex flex-col gap-4 overflow-y-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-wide">
          Transaction History
        </h2>
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center gap-3 flex-wrap">
        <select
          id="order-filter"
          onChange={Ven.applyFilter}
          className="
            w-[220px]
            bg-white
            border border-[#33313B]/20
            rounded-lg
            p-2
            cursor-pointer
            outline-none
            transition
            hover:border-[#4592af]
            focus:border-[#4592af]
            text-[#33313B]
          "
        >
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Paid">Paid</option>
          <option value="Claimed">Claimed</option>
          <option value="Printed">Printed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* ORDERS GRID */}
      <div
        id="orders-list"
        className="
          grid grid-cols-1 md:grid-cols-2 gap-4 pt-2
        "
      />

      {/* GLOBAL STYLE OVERRIDES FOR INJECTED DOM */}
      <style>{`
        #orders-list > div {
          background: white;
          border: 1px solid rgba(51,49,59,0.12);
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: 0.2s ease;
        }

        #orders-list > div:hover {
          border-color: #e3c4ab;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        #orders-list h3 {
          font-size: 18px;
          font-weight: 700;
          color: #33313B;
        }

        #orders-list p {
          font-size: 13px;
          color: rgba(51,49,59,0.75);
        }

        #orders-list img {
          width: 180px;
          border-radius: 12px;
          margin: 0 auto;
          border: 1px solid rgba(51,49,59,0.12);
          object-fit: cover;
        }

        /* BUTTON SYSTEM */
        #orders-list button {
          margin-top: 8px;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s;
          font-weight: 500;
          border: none;
        }

        /* 1st button (primary - blue) */
        #orders-list button:nth-of-type(1) {
          background: #4592af;
          color: white;
        }
        #orders-list button:nth-of-type(1):hover {
          background: #33313B;
        }

        /* 2nd button (accent beige) */
        #orders-list button:nth-of-type(2) {
          background: #e3c4ab;
          color: #33313B;
        }
        #orders-list button:nth-of-type(2):hover {
          background: #4592af;
          color: white;
        }

        /* 3rd button (dark) */
        #orders-list button:nth-of-type(3) {
          background: #33313B;
          color: white;
        }
        #orders-list button:nth-of-type(3):hover {
          background: #e3c4ab;
          color: #33313B;
        }

        /* SELECTS INSIDE CARDS */
        #orders-list select {
          margin-top: 6px;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(51,49,59,0.2);
          outline: none;
          cursor: pointer;
        }

        #orders-list select:focus {
          border-color: #4592af;
        }
      `}</style>
    </div>
  );
}
