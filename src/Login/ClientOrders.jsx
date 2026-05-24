import * as c from "../Functions/client";
import { useEffect, useState } from "react";

export default function ClientOrders() {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    c.loadUserOrders(setPaymentOpen, setPaymentData);
  }, []);

  return (
    <>
      {/* PAGE */}
      <div className="w-full h-full bg-[#f6f5f5] text-[#33313B] p-6 flex flex-col gap-4 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Orders</h2>
        </div>

        {/* FILTER */}
        <select
          id="order-filter"
          onChange={() =>
            c.loadUserOrders(setPaymentOpen, setPaymentData)
          }
          className="
            w-[200px]
            p-2
            rounded-lg
            border border-[#33313B]/20
            bg-white
            cursor-pointer
            focus:border-[#4592af]
            outline-none
          "
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
          <option value="Paid">Paid</option>
          <option value="Claimed">Claimed</option>
          <option value="Printed">Printed</option>
          <option value="Completed">Completed</option>
        </select>

        {/* ORDERS CONTAINER (JS DOM TARGET) */}
        <div
          id="orders-list"
          className="
            grid grid-cols-1 md:grid-cols-2 gap-4 pt-2

            [&>div]:bg-white
            [&>div]:border
            [&>div]:border-[#33313B]/10
            [&>div]:rounded-xl
            [&>div]:shadow-sm
            [&>div]:p-4
            [&>div]:flex
            [&>div]:flex-col
            [&>div]:gap-2
            [&>div]:transition
            [&>div]:cursor-pointer

            [&>div:hover]:shadow-md
            [&>div:hover]:border-[#e3c4ab]

            [&_h3]:font-bold
            [&_h3]:text-lg
            [&_h3]:text-[#33313B]

            [&_p]:text-sm
            [&_p]:text-[#33313B]/80

            /* BUTTONS */
            [&_button]:p-2
            [&_button]:rounded-lg
            [&_button]:cursor-pointer
            [&_button]:transition
            [&_button]:font-medium
            [&_button]:mt-2

            /* 1st button */
            [&_button:nth-of-type(1)]:bg-[#4592af]
            [&_button:nth-of-type(1)]:text-white
            [&_button:nth-of-type(1):hover]:bg-[#33313B]

            /* 2nd button */
            [&_button:nth-of-type(2)]:bg-[#e3c4ab]
            [&_button:nth-of-type(2)]:text-[#33313B]
            [&_button:nth-of-type(2):hover]:bg-[#4592af]
            [&_button:nth-of-type(2):hover]:text-white

            /* 3rd button */
            [&_button:nth-of-type(3)]:bg-[#33313B]
            [&_button:nth-of-type(3)]:text-white
            [&_button:nth-of-type(3):hover]:bg-[#e3c4ab]
            [&_button:nth-of-type(3):hover]:text-[#33313B]
          "
        />
      </div>

      {/* PAYMENT MODAL */}
      {paymentOpen && paymentData && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
          <div className="w-[420px] bg-white rounded-xl shadow-xl p-5 flex flex-col gap-4 border border-[#33313B]/10">
            {/* TITLE */}
            <h2 className="text-xl font-bold text-[#33313B]">
              Payment
            </h2>

            {/* QR */}
            <div className="w-full flex justify-center">
              <img
                src={paymentData.imgUrl}
                alt="GCash QR"
                className="w-[280px] rounded-lg border border-[#33313B]/10"
              />
            </div>

            {/* FILE INPUT */}
            <input
              type="file"
              id="receipt-input"
              className="
                w-full
                border border-[#33313B]/20
                p-2
                rounded-lg
                bg-[#f6f5f5]
                cursor-pointer
              "
            />

            {/* BUTTONS */}
            <button
              onClick={c.submitReceipt}
              className="
                w-full
                p-2
                rounded-lg
                bg-[#4592af]
                text-white
                hover:bg-[#33313B]
                transition
              "
            >
              Submit Receipt
            </button>

            <button
              onClick={() => setPaymentOpen(false)}
              className="
                w-full
                p-2
                rounded-lg
                bg-[#e3c4ab]
                text-[#33313B]
                hover:bg-[#33313B]
                hover:text-white
                transition
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
