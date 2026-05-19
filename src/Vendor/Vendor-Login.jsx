import * as Ven from "../Functions/login_vendor.jsx";
import styles from "../modules/PartnerDash.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function VenDash() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  async function handleLogin() {
    const oldToken = localStorage.getItem("vendor_token");

    await Ven.vendorLogin();

    const newToken = localStorage.getItem("vendor_token");

    // if login failed, token won't change / won't exist
    if (!newToken || newToken === oldToken) {
      alert("Invalid credentials");
      return;
    }

    setLoggedIn(true);
    navigate("/partner-dash");
  }
  return (
    <>
      <div className="Ven-Info">
        <h3>Vendor Login</h3>

        <input id="username" placeholder="Email or Username" />
        <input id="password" type="password" placeholder="Password" />

        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}
