import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createVendor } from "../Functions/create_vendor.jsx";
import VendorMap from "./Vendor-Map";

import styles from "../modules/Vendor.module.css";

export default function CreateVendor() {
  const navigate = useNavigate();

  const [center, setCenter] = useState([0, 0]);
  const [hasLocation, setHasLocation] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    pw: "",
    email: "",
    bw_rate: "",
    clrd_rate: "",
    lat: "",
    long: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lat = coords.latitude;
        const lng = coords.longitude;

        setCenter([lat, lng]);
        setHasLocation(true);

        setFormData((prev) => ({
          ...prev,
          lat: lat.toString(),
          long: lng.toString(),
        }));

        alert("Location acquired successfully!");
      },
      (error) => {
        console.log(error);
        alert("Unable to get location");
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  useEffect(() => {
    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.long);

    if (!isNaN(lat) && !isNaN(lng)) {
      setCenter([lat, lng]);
    }
  }, [formData.lat, formData.long]);

  const handleSignup = async () => {
    if (!formData.email.includes("@") || !formData.email.includes(".com")) {
      alert("Invalid email");
      return;
    }

    Object.entries(formData).forEach(([key, value]) => {
      let input = document.getElementById(key);

      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.id = key;
        document.body.appendChild(input);
      }

      input.value = value;
    });

    try {
      await createVendor();
      navigate("/partner-dash");
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <>
      <div className={styles.background}></div>

      <form className={styles.signUp}>
        <h1>Become Our Partner</h1>

        <div className={styles.mapContainer}>
          <VendorMap
            center={center}
            setCenter={setCenter}
            setHasLocation={setHasLocation}
          />
        </div>

        <div className={styles.formGrid}>
          <InputField label="Employee Name" id="name" value={formData.name} onChange={handleChange} />
          <InputField label="Company Name/Brand" id="brand" value={formData.brand} onChange={handleChange} />
          <InputField label="Password" id="pw" type="password" value={formData.pw} onChange={handleChange} />
          <InputField label="Email" id="email" value={formData.email} onChange={handleChange} />
          <InputField label="B/W Rate" id="bw_rate" type="number" value={formData.bw_rate} onChange={handleChange} />
          <InputField label="Color Rate" id="clrd_rate" type="number" value={formData.clrd_rate} onChange={handleChange} />
          <InputField label="Latitude" id="lat" type="number" value={formData.lat} onChange={handleChange} />
          <InputField label="Longitude" id="long" type="number" value={formData.long} onChange={handleChange} />

          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.locationButton}
              onClick={getCurrentLocation}
            >
              Get Location
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={handleSignup}
            >
              Apply Now
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function InputField({ label, id, type = "text", value, onChange }) {
  return (
    <div className={styles.field}>
      <p className={styles.label}>{label}</p>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
}