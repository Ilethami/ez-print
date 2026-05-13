import NavBar from "../Navigation-Bar/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientDash from "../Vendor/PartnerDash.jsx";
import CreateVendor from "../Vendor/VendorCreate.jsx";
import VendorMap from "../Vendor/Vendor-Map.jsx";
import VenDash from "../Vendor/Vendor-Dashboard.jsx";
import ClientLogin from "../Login/ClientLogin.jsx";
import ClientSignup from "../Login/ClientSignup.jsx";
import ezIcon from "../assets/ezicon.png";
export default function Home() {
  return (
    <BrowserRouter basename="/">
      <Routes>

        <Route path="/vendor-map" element={<VendorMap />} />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/client-signup" element={<ClientSignup />} />
        <Route path="/partner-dash" element={<ClientDash />} />
        <Route path="/vendor-signup" element={<CreateVendor />} />
        <Route path="/vendor-login" element={<VenDash />} />
      </Routes>
      <NavBar />
    </BrowserRouter>
  );
}
