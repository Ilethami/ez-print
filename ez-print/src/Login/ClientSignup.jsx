import * as c from "../Functions/client";
import { useNavigate } from "react-router-dom";
export default function ClientSignup() {
  const navigate = useNavigate();
  function handleSignup() {
    const password = document.getElementById("signup-password").value;
    if (password.length == 0) {
      return alert("Password cannot be empty");
    }
    const name = document.getElementById("signup-name").value;
    if (name.trim() === "") {
      return alert("Name cannot be empty");
    }
    const email = document.getElementById("signup-email").value;
    if (!email.includes("@") || !email.includes(".com")) {
      return alert("Invalid email");
    }
    c.signup();
    navigate("/client-dash");
  }
  return (
    <div>
      <h3>Create Account</h3>
      <input id="signup-name" placeholder="Name" type="text" />
      <input id="signup-email" placeholder="Email" type="email" />
      <input
        id="signup-password"
        type="password"
        placeholder="Password"
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
