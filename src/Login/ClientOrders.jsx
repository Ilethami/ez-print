import * as c from "../Functions/client";
import { useEffect } from "react";

export default function ClientOrders() {
  useEffect(() => {
    c.loadUserOrders();
  }, []);

  return (
    <div className="w-full h-full bg-[#f6f5f5] p-6 flex flex-col gap-4 overflow-y-auto text-[#33313B]">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      {/* FILTER */}
      <select
        id="order-filter"
        onChange={c.apply_UserFilter}
        className="
          w-[220px]
          bg-white
          border border-[#33313B]/20
          text-[#33313B]
          rounded-lg
          p-2
          outline-none
          cursor-pointer
          transition
          hover:border-[#e3c4ab]
          focus:border-[#e3c4ab]
        "
      >
        <option value="Paid">Paid</option>
        <option value="Claimed">Claimed</option>
        <option value="Printed">Printed</option>
        <option value="Completed">Completed</option>
      </select>

      {/* ORDERS GRID */}
      <div
        id="usr_orders-container"
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
          [&>div]:transition-all

          [&>div]:hover:shadow-md
          [&>div]:hover:border-[#e3c4ab]

          /* TITLE */
          [&_h3]:font-bold
          [&_h3]:text-lg
          [&_h3]:text-[#33313B]

          /* TEXT */
          [&_p]:text-sm
          [&_p]:text-[#33313B]/80

          /* BUTTONS */
          [&_button]:mt-2
          [&_button]:bg-[#33313B]
          [&_button]:text-white
          [&_button]:p-2
          [&_button]:rounded-lg
          [&_button]:cursor-pointer
          [&_button]:transition
          [&_button]:hover:bg-[#e3c4ab]
          [&_button]:hover:text-[#33313B]
        "
      >
        {/* backend injects cards here */}
        <div id="orders-list"></div>
      </div>
    </div>
  );
}
