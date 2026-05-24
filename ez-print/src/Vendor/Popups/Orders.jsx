import styles from "../../modules/PartnerDash.module.css";
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
    <div className={styles.orders}>
      <h3>Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.pub_id} className={styles.orderCard}>
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

            {/* GCash proof */}
            {order.gcash_url && (
              <div>
                <p>
                  <b>Proof of Payment:</b>
                </p>
                <img
                  src={order.gcash_url}
                  alt="GCash proof"
                  style={{ width: "200px" }}
                />
              </div>
            )}

            {/* Buttons */}
            <button onClick={() => handleClaimed(order.pub_id)}>
              Mark as Claimed
            </button>

            <button onClick={() => handleCompleted(order.pub_id)}>
              Complete Order
            </button>
          </div>
        ))
      )}

      <button onClick={() => setActivePanel(null)}>Close</button>
    </div>
  );
}
