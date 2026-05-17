import VendorMap from "./Vendor-Map";
import * as ven from "../Functions/login_vendor";
import styles from "../modules/PartnerDash.module.css";
import StoreDetails from "./Popups/StoreDetails";
import History from "./Popups/History";
import Orders from "./Popups/Orders";

import { useState, useEffect } from "react";
export default function ClientDash() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [center, setCenter] = useState([0, 0]);
  const [hasLocation, setHasLocation] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const closeBtn = () => {
    setActivePanel(null);
  };
  const toggleAvailability = () => {
    setShowAvailability((prev) => !prev);
  };
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch(
          "/api/order/listvendors",
        );
        const vendors_res = await res.json();
        console.log("RAW backend response:", vendors_res); // 👈 ADD HERE
        setVendors(vendors_res);
      } catch (err) {
        console.error("Failed to fetch vendors:", err);
      }
    };
    fetchVendors();
  }, []);
  return (
    <>
      {/* Partner Navigation */}

      <div className={styles.header}>
        <h2>Partner Dashboard</h2>
        <div className={styles.status}>
          <h3>Store Status</h3>
          <button onClick={toggleAvailability}>Change Status</button>
        </div>
      </div>
      <div id="availability-section" className={styles.order}>
        {showAvailability && (
          <div className={styles.availability}>
            <label>
              <input
                type="radio"
                name="availability"
                value="Available"
              />
              Available
            </label>
            <label>
              <input type="radio" name="availability" value="Busy" />{" "}
              Busy
            </label>
            <label>
              <input type="radio" name="availability" value="SBusy" />
              Slightly Busy
            </label>
            <label>
              <input
                type="radio"
                name="availability"
                value="Closed"
              />
              Closed
            </label>
            <br />
            <br />
            <button
              onClick={async () => {
                const selected = document.querySelector(
                  'input[name="availability"]:checked',
                );

                if (!selected) {
                  alert("Please select a status first");
                  return;
                }
                await ven.updateAvailability();

                setShowAvailability(false);
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>

      {/* Partner sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              setActivePanel("store");
            }}
          >
            See Store Details
          </button>

          <button onClick={() => setActivePanel("orders")}>
            Handling Order
          </button>

          <button onClick={() => setActivePanel("history")}>
            Transaction History
          </button>
        </div>

        <div className={styles.panel}>
          {activePanel === "store" && (
            <StoreDetails setActivePanel={setActivePanel} />
          )}

          {activePanel === "orders" && (
            <Orders setActivePanel={setActivePanel} />
          )}
          {activePanel === "history" && (
            <History setActivePanel={setActivePanel} />
          )}
        </div>
      </div>

      {/* Vendor Details Popup*/}
      {selectedVendor && (
        <div className={styles.vendorDetails}>
          <h3>{selectedVendor?.brand}</h3>

          <p>Black & White: ₱{selectedVendor?.bw_rate ?? "N/A"}</p>

          <p>Colored: ₱{selectedVendor?.clrd_rate ?? "N/A"}</p>

          <button
            className={styles.closeButton}
            type="button"
            onClick={() => setSelectedVendor(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* Client Map behind sidebar */}
      <div className={styles.mapContainer}>
        <VendorMap
          setSelectedVendor={setSelectedVendor}
          center={center}
          setCenter={setCenter}
          setHasLocation={setHasLocation}
        />
      </div>
    </>
  );
}
