import * as Ven from "../../Functions/login_vendor";
import { useEffect } from "react";

export default function Orders({ setActivePanel }) {
  useEffect(() => {
    Ven.loadOrders();
  }, []);

  return <div id="orders-container"></div>;
}
