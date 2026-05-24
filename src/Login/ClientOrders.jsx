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
      <div className="w-full h-full bg-white p-6 flex flex-col gap-3 overflow-y-auto">

        <h2>Orders</h2>

        <select
          id="order-filter"
          onChange={() =>
            c.loadUserOrders(
              setPaymentOpen,
              setPaymentData
            )
          }
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

        <div id="orders-list"></div>

      </div>

      {
        paymentOpen && paymentData && (

          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000
            }}
          >

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "400px"
              }}
            >

              <h2>Payment</h2>

              <img
                src={paymentData.imgUrl}
                alt="GCash QR"
                width="300"
              />

              <input
                type="file"
                id="receipt-input"
              />

              <button onClick={c.submitReceipt}>
                Submit Receipt
              </button>

              <button
                onClick={() => setPaymentOpen(false)}
              >
                Close
              </button>

            </div>

          </div>
        )
      }
    </>
  );
}
