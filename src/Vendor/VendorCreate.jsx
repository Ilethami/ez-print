import { createVendor } from "../Functions/create_vendor";
import styles from "../modules/Vendor.module.css";
import { useEffect } from "react";
import { useState } from "react";
import VendorMap from "./Vendor-Map";
import { useNavigate } from "react-router-dom";
export default function CreateVendor() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [center, setCenter] = useState([0, 0]);
  const [hasLocation, setHasLocation] = useState(false);
  const [latInput, setLatInput] = useState("");
  const [lngInput, setLngInput] = useState("");
  const navigate = useNavigate();
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude);
        const lng = Number(position.coords.longitude);
        setCenter([lat, lng]);
      },
      () => {
        // location access denied or unavailable
      },
    );
  };
  const applyCoordinates = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);

    if (!isNaN(lat) && !isNaN(lng)) {
      setCenter([Number(lat), Number(lng)]);
    }
  };
  async function handleSignup() {
    const email = document.getElementById("email").value;

    if (!email.includes("@") || !email.includes(".com")) {
      alert("Invalid email");
      return;
    }

    try {
      const result = await createVendor();
      console.log("createVendor result:", result);
      // 🔥 IMPORTANT: check result
      if (!result || result.error) {
        return;
      }

      navigate("/partner-dash");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }

  useEffect(() => {
    if (
      center &&
      center.length === 2 &&
      !isNaN(center[0]) &&
      !isNaN(center[1])
    ) {
      setLatInput(center[0]);
      setLngInput(center[1]);
    }
  }, [center]);
  return (
    <>
      <div className={styles.background}></div>

      <form className={styles.signUp}>
        <h1>Become Our Partner</h1>

        <div className={styles.mapContainer}>
          <VendorMap
            setSelectedVendor={setSelectedVendor}
            center={center}
            setCenter={setCenter}
            setHasLocation={setHasLocation}
          />
        </div>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <p className={styles.label}>Employee Name</p>
            <input id="name" placeholder="Name" />
          </div>
          <div className={styles.field}>
            <p className={styles.label}>Company Name/Brand</p>
            <input
              id="brand"
              className={styles.full}
              placeholder="Brand"
            />
          </div>
          <div className={styles.field}>
            <p className={styles.label}>Password</p>
            <input id="pw" placeholder="Password" type="password" />
          </div>
          <div className={styles.field}>
            <p className={styles.label}>Company Email</p>
            <input id="email" placeholder="Email" />
          </div>
          <div className={styles.field}>
            <p className={styles.label}>Black & White Rate</p>
            <input
              id="bw_rate"
              placeholder="B/W Rate"
              type="number"
            />
          </div>
          <div className={styles.field}>
            <p className={styles.label}>Colored Rate</p>
            <input
              id="clrd_rate"
              placeholder="Color Rate"
              type="number"
            />
          </div>
          {/* 👇 auto-filled */}
          <input
            id="lat"
            type="number"
            placeholder="Latitude"
            value={latInput}
            onChange={(e) => setLatInput(e.target.value)}
            onBlur={applyCoordinates}
          />
          <input
            id="long"
            type="number"
            placeholder="Longitude"
            value={lngInput}
            onChange={(e) => setLngInput(e.target.value)}
            onBlur={applyCoordinates}
          />
          <button
            type="button"
            className={styles.button}
            onClick={handleSignup}
          >
            Apply Now
          </button>
        </div>
      </form>
    </>
  );
}
