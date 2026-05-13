import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as c from "../Functions/client";
import ClientDash from "../Vendor/PartnerDash.jsx";

export default function ClientLogin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    await c.login(); // your existing login logic

    // if login succeeds (you don't return status yet, so we assume success)
    setLoggedIn(true);
    navigate("/client");
  }

  return (
    <>
      <div className="login-container">
        <h3>User Login</h3>

        <input id="login-name" placeholder="Name" type="text" />
        <input
          id="login-password"
          type="password"
          placeholder="Password"
        />

        <button onClick={handleLogin}>Login</button>
      </div>

      <div id="payment-section" style={{ display: "none" }}>
        <h3>Payment</h3>

        <img id="gcash-img" width="200" />
        <input type="file" id="receipt-input" />
        <button onClick={c.submitReceipt}>Submit Receipt</button>
      </div>

      <div id="orders-container"></div>
    </>
  );
}
