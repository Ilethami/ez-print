export default function Orders({
  setActivePanel,
  orders = [],
  refreshOrders,
}) {
  const vendor_token = localStorage.getItem("vendor_token");

  async function setClaimed(pub_id) {
    await fetch("http://localhost:3001/vendor/set_claimed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pub_id),
    });

    refreshOrders();
  }

  async function setCompleted(pub_id) {
    await fetch("http://localhost:3001/vendor/set_completed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pub_id),
    });

    refreshOrders();
  }

  async function downloadFile(file_path, pub_id) {
    const res = await fetch(
      "http://localhost:3001/vendor/download_file",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + vendor_token,
        },
        body: JSON.stringify({ file_path, pub_id }),
      },
    );

    if (!res.ok) return;

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file_path;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full h-full bg-white p-4 flex flex-col gap-3 overflow-y-auto">
      <h3 className="text-lg font-semibold">Incoming Orders</h3>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders assigned to you</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.pub_id}
            className="border rounded p-3 bg-gray-50 flex flex-col gap-1"
          >
            <p>
              <b>Order ID:</b> {order.pub_id}
            </p>
            <p>
              <b>User:</b> {order.name}
            </p>
            <p>
              <b>Copies:</b> {order.copies}
            </p>
            <p>
              <b>Size:</b> {order.print_size}
            </p>
            <p>
              <b>Color:</b> {order.color}
            </p>
            <p>
              <b>Total:</b> ₱{order.total}
            </p>
            <p>
              <b>Status:</b> {order.status}
            </p>

            <button
              onClick={() =>
                downloadFile(order.file_path, order.pub_id)
              }
              className="mt-2 bg-black text-white p-2 rounded"
            >
              Download File
            </button>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setClaimed(order.pub_id)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Claim
              </button>

              <button
                onClick={() => setCompleted(order.pub_id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Complete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
