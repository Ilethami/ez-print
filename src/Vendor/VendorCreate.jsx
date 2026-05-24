import { useEffect, useState } from "react";
import VendorMap from "./Vendor-Map";
import * as v from "../Functions/create_vendor.jsx";
import { useNavigate } from "react-router-dom";

export default function CreateVendor() {
  const [center, setCenter] = useState([0, 0]);
  const [hasLocation, setHasLocation] = useState(false);
  const navigate = useNavigate();

  async function handleSignup() {
    const password = document.getElementById("pw").value;
    if (password.length == 0) {
      return alert("Password cannot be empty");
    }

    const name = document.getElementById("name").value;
    if (name.trim() === "") {
      return alert("Name cannot be empty");
    }

    const email = document.getElementById("email").value;
    if (!email.includes("@") || !email.includes(".com")) {
      return alert("Invalid email");
    }

    await v.createVendor();
    navigate("/upload-gcash");
  }
  // Location getter
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

        // fill DOM inputs directly (required for your createVendor)
        const latInput = document.getElementById("lat");
        const longInput = document.getElementById("long");

        if (latInput) latInput.value = lat;
        if (longInput) longInput.value = lng;

        alert("Location acquired successfully!");
      },
      (error) => {
        console.log(error);
        alert("Unable to get location");
      },
      { enableHighAccuracy: true },
    );
  };
  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-[9999] bg-[#ebeaea]" />

      {/* Form */}
      <form className="flex flex-col items-center w-[90%] max-w-full mx-auto my-[80px] p-[40px] rounded-[20px] text-center max-[768px]:px-[20px] max-[768px]:py-[30px] max-[480px]:w-[95%] max-[480px]:px-[15px] max-[480px]:py-[25px]">
        <div className="relative flex items-center justify-center w-[870px]">
          {/* Left SVG */}
          <div className="absolute left-0 group cursor-pointer w-[40px] h-[40px] flex items-center justify-center">
            {/* Hover Background */}
            <div className="absolute inset-0 rounded-[7.5px] bg-[#E8E8E8] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="w-full h-full rounded-[7.5px] bg-black/10" />
            </div>

            {/* Arrow */}
            <svg
              className="relative z-10"
              width="33"
              height="16"
              viewBox="0 0 33 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75 1.5L1.5 7.75L7.75 14M1.5 7.75H31.5"
                stroke="#27221F"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-[30px] mb-[10px] font-bold font-open-sans max-[480px]:text-[24px]">
            Become Our Partner
          </h1>
        </div>

        {/* Map */}
        <div className="hidden rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#ddd] m-[20px] h-[500px] w-full">
          <VendorMap
            center={center}
            setCenter={setCenter}
            setHasLocation={setHasLocation}
          />
        </div>

        {/* GRID (UNCHANGED STYLING) */}
        <div className="self-center grid grid-cols-2 gap-[18px] mt-[20px] bg-[rgb(220,220,220)] px-[30px] pt-[35px] pb-[50px] border border-[rgb(0,0,0,0.25)] rounded-[1em] w-[870px] max-[768px]:gap-[14px] max-[768px]:w-full max-[480px]:grid-cols-1">
          <InputField
            label="Employee Name"
            id="name"
            ph="e.g. Zulueta, Eli"
          />
          <InputField
            label="Company Name/Brand"
            id="brand"
            ph="Enter company or brand name"
          />
          <InputField
            label="Company Email"
            id="email"
            ph="e.g. 1234@email.com"
          />
          <InputField
            label="Password"
            id="pw"
            type="password"
            ph="Enter password"
          />

          <InputField
            label="B/W Rate"
            id="bw_rate"
            type="number"
            ph="e.g. 2.00"
          />
          <InputField
            label="Color Rate"
            id="clrd_rate"
            type="number"
            ph="e.g. 5.00"
          />

          <InputField
            label="Latitude"
            id="lat"
            type="number"
            ph="Enter latitude"
          />
          <InputField
            label="Longitude"
            id="long"
            type="number"
            ph="Enter longitude"
          />

          {/* BUTTONS */}
          <div className="col-span-2 flex justify-center gap-[15px] mt-[30px] max-[480px]:col-span-1 max-[480px]:flex-col">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-[24px] py-[15px] rounded-[40px] bg-[rgb(104,177,94)] text-white text-[16px] cursor-pointer transition duration-300 hover:scale-[1.05] hover:bg-[rgb(62,189,45)]"
            >
              Get Location
            </button>

            <button
              type="button"
              onClick={handleSignup}
              className="px-[32px] py-[15px] rounded-[40px] bg-[#27221F] text-white text-[16px] cursor-pointer transition duration-300 hover:scale-[1.05] hover:bg-[#35302E]"
            >
              Apply Now
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

/* INPUT (STYLING UNCHANGED) */
function InputField({ label, id, type = "text", ph }) {
  return (
    <div className="flex flex-col gap-[6px] ml-[5px]">
      <p className="text-[13px] font-medium text-[#222] text-left font-inter">
        <span className="text-[#FF0000]">* </span>
        {label}
      </p>

      <input
        id={id}
        type={type}
        placeholder={ph}
        className="p-[14px] rounded-[0.5em] border border-[rgb(0,0,0,0.25)] bg-[#E8E8E8] text-[14px] outline-none appearance-none placeholder:text-[#9a9a9a] focus:placeholder:opacity-50 transition-all duration-200 max-[480px]:text-[13px] max-[480px]:p-[12px]"
      />
    </div>
  );
}
