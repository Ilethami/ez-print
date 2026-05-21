import * as ven from "../../Functions/login_vendor";

export default function Orders({
  setActivePanel,
  orders = [],
  refreshOrders,
}) {
  const handleClaimed = async (pub_id) => {
    await ven.set_claimed(pub_id);
    if (refreshOrders) refreshOrders();
  };

  const handleCompleted = async (pub_id) => {
    await ven.set_completed(pub_id);
    if (refreshOrders) refreshOrders();
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[520px] max-h-[650px] bg-white border border-gray-300
                    rounded-lg shadow-lg z-[1000] p-4
                    flex flex-col gap-3 overflow-y-auto"
    >
      <h3 className="text-lg font-semibold">Orders</h3>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.pub_id}
            className="border border-gray-200 rounded-[10px] p-3 bg-[#fafafa]
                       flex flex-col gap-1 transition hover:bg-[#f3f7ff] hover:scale-[1.01]"
          >
            <p>
              <b>Order ID:</b> {order.pub_id}
            </p>
            <p>
              <b>File:</b> {order.file_path}
            </p>
            <p>
              <b>Copies:</b> {order.copies}
            </p>
            <p>
              <b>Type:</b> {order.color}
            </p>
            <p>
              <b>Size:</b> {order.print_size}
            </p>
            <p>
              <b>Status:</b> {order.status}
            </p>

            {/* Proof */}
            {order.gcash_url && (
              <div className="mt-2">
                <p>
                  <b>Proof of Payment:</b>
                </p>
                <img
                  src={order.gcash_url}
                  alt="GCash proof"
                  className="w-[200px] rounded"
                />
              </div>
            )}

            {/* Buttons */}
            <button
              onClick={() => handleClaimed(order.pub_id)}
              className="mt-2 px-3 py-1 bg-black text-white rounded hover:bg-gray-700 transition"
            >
              Mark as Claimed
            </button>

            <button
              onClick={() => handleCompleted(order.pub_id)}
              className="px-3 py-1 bg-black text-white rounded hover:bg-gray-700 transition"
            >
              Complete Order
            </button>
          </div>
        ))
      )}

      <button
        onClick={() => setActivePanel(null)}
        className="mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  );
}
