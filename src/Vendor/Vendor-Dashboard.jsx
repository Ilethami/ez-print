import * as Ven from "../Functions/login_vendor.jsx";
import styles from "../modules/PartnerDash.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function VenDash() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  async function handleLogin() {
    await Ven.vendorLogin(); // your existing login logic

    // if login succeeds (you don't return status yet, so we assume success)
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
