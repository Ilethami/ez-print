import * as Ven from "../../Functions/login_vendor";
import styles from "../../modules/PartnerDash.module.css";
import { useEffect } from "react";

export default function History({ setActivePanel }) {
    useEffect(() => {
        Ven.loadHandlingOrders();
    }, []);

  return (
    <div className={styles.store}>
    
    <div id="handling-container">

            <h2>Transaction History</h2>

            <select
                id="order-filter"
                onChange={Ven.applyFilter}
            >
                <option value="Paid">Paid</option>
                <option value="Claimed">Claimed</option>
                <option value="Printed">Printed</option>
                <option value="Completed">Completed</option>
            </select>

            <div id="orders-list"></div>

        </div>

      <button
        className={styles.closebtn}
        onClick={() => setActivePanel(null)}
      >
        Close
      </button>
   
    </div>
  );
}
