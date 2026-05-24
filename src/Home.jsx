import NavBar from "./NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PartnerDash from "./Vendor/PartnerDash.jsx";
import CreateVendor from "./Vendor/VendorCreate.jsx";
import VendorMap from "./Vendor/Vendor-Map.jsx";
import VenDash from "./Vendor/Vendor-Login.jsx";
import ClientLogin from "./Login/ClientLogin.jsx";
import ClientSignup from "./Login/ClientSignup.jsx";
import ezIcon from "./assets/ezicon.png";
import Gcash from "./Vendor/Gcash.jsx";
import ClientDash from "./Login/ClientDash.jsx";
import History from "./Vendor/Popups/History.jsx";
import Orders from "./Vendor/Popups/OrdersPopup.jsx";
import StoreDetails from "./Vendor/Popups/StoreDetails.jsx";
import ClientOrders from "./Login/ClientOrders.jsx";

const vite_env = import.meta.env.VITE_BASE_PATH;

export default function Home() {
  return (
    <>
      <BrowserRouter basename={vite_env}>
        <NavBar />
        <Routes>
          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/client-signup" element={<ClientSignup />} />
          <Route path="/partner-dash" element={<PartnerDash />}>
            <Route path="store" element={<StoreDetails />} />
            <Route path="orders" element={<Orders />} />
            <Route path="history" element={<History />} />
          </Route>
          <Route path="/client-dash" element={<ClientDash />}>
            <Route path="orders" element={<ClientOrders />} />
          </Route>
          <Route path="/vendor-signup" element={<CreateVendor />} />
          <Route path="/vendor-login" element={<VenDash />} />
          <Route path="/upload-gcash" element={<Gcash />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
