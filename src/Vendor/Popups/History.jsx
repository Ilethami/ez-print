import * as Ven from "../../Functions/login_vendor";
import { useEffect } from "react";

export default function History({ setActivePanel }) {
  useEffect(() => {
    Ven.loadHandlingOrders();
  }, []);

  return (
    <div className="w-full h-full bg-white p-4 flex flex-col gap-3 overflow-y-auto">
      <div id="handling-container">
        <h2>Transaction History</h2>

        <select id="order-filter" onChange={Ven.applyFilter}>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Paid">Paid</option>
          <option value="Claimed">Claimed</option>
          <option value="Printed">Printed</option>
          <option value="Completed">Completed</option>
        </select>

        <div
          id="orders-list"
          className="
    grid grid-cols-1 md:grid-cols-2
    gap-4 pt-5

    [&>div]:bg-white
    [&>div]:border
    [&>div]:border-gray-300
    [&>div]:rounded-xl
    [&>div]:shadow-md
    [&>div]:p-4
    [&>div]:flex
    [&>div]:flex-col
    [&>div]:gap-2
    [&>div]:transition
    [&>div:hover]:shadow-lg

    [&_img]:w-[200px]
    [&_img]:rounded-lg
    [&_img]:border
    [&_img]:mx-auto
    [&_img]:object-cover

    [&_select]:border
    [&_select]:border-gray-300
    [&_select]:rounded-lg
    [&_select]:p-2
    [&_select]:mt-2
    [&_select]:outline-none

    [&_h3]:font-bold
    [&_h3]:text-lg

    [&_p]:text-gray-700
    [&_p]:text-sm
    [&_p]:font-inter

  "
        ></div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setActivePanel(null)}
        className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  );
}
