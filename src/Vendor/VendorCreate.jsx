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
    if (password.length == 0)
      return alert("Password cannot be empty");

    const name = document.getElementById("name").value;
    if (name.trim() === "") return alert("Name cannot be empty");

    const email = document.getElementById("email").value;
    if (!email.includes("@") || !email.includes(".com"))
      return alert("Invalid email");

    await v.createVendor();
    navigate("/upload-gcash");
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation)
      return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lat = coords.latitude;
        const lng = coords.longitude;

        setCenter([lat, lng]);
        setHasLocation(true);

        const latInput = document.getElementById("lat");
        const longInput = document.getElementById("long");

        if (latInput) latInput.value = lat;
        if (longInput) longInput.value = lng;

        alert("Location acquired successfully!");
      },
      () => alert("Unable to get location"),
      { enableHighAccuracy: true },
    );
  };

  return (
    <>
      {/* Form */}
      <form className="flex flex-col items-center w-[90%] max-w-full mx-auto my-[80px] p-[40px] rounded-[20px] text-center text-[#33313B]">
        {/* HEADER */}
        <div className="relative flex items-center justify-center w-[870px]">
          {/* BACK BUTTON */}
          <div className="absolute left-0 group w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
            <div
              className="absolute inset-0 rounded-[7.5px] bg-[#4592af] opacity-0 group-hover:opacity-100 transition"
              onClick={() => navigate("/ez-print")}
            />

            <svg
              className="relative z-10"
              width="33"
              height="16"
              viewBox="0 0 33 16"
              fill="none"
            >
              <path
                d="M7.75 1.5L1.5 7.75L7.75 14M1.5 7.75H31.5"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="text-[30px] mb-[10px] font-bold text-white">
            Become Our Partner
          </h1>
        </div>

        {/* MAP */}
        <div className="hidden rounded-[12px] border border-[#33313B]/15 m-[20px] h-[500px] w-full shadow-sm">
          <VendorMap
            center={center}
            setCenter={setCenter}
            setHasLocation={setHasLocation}
          />
        </div>

        {/* FORM GRID */}
        <div className="self-center grid grid-cols-2 gap-[18px] mt-[20px] bg-[rgb(255,255,255,0.80)] px-[30px] pt-[35px] pb-[50px] border border-[#33313B]/15 rounded-[1em] w-[870px]">
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
          <InputField
            label="Phone Number"
            id="phone_number"
            type="number"
            ph="09123456789"
          />

          {/* BUTTONS */}
          <div className="col-span-2 flex justify-center gap-[15px] mt-[30px]">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="
                px-[24px] py-[15px]
                rounded-[40px]
                cursor-pointer
                bg-[#4592af]
                text-white
                transition
                hover:bg-[#e3c4ab]
                hover:text-[#33313B]
                active:bg-[#d6b394]
                active:scale-[0.98]
              "
            >
              Get Location
            </button>

            <button
              type="button"
              onClick={handleSignup}
              className="
                px-[32px] py-[15px]
                rounded-[40px]
                cursor-pointer
                bg-[#33313B]
                text-white
                transition
                hover:bg-[#e3c4ab]
                hover:text-[#33313B]
                active:bg-[#d6b394]
                active:scale-[0.98]
              "
            >
              Apply Now
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

/* INPUT */
function InputField({ label, id, type = "text", ph }) {
  return (
    <div className="flex flex-col gap-[6px] ml-[5px]">
      <p className="text-[13px] font-medium text-[#33313B] text-left">
        <span className="text-[#4592af]">* </span>
        {label}
      </p>

      <input
        id={id}
        type={type}
        placeholder={ph}
        className="
          p-[14px]
          rounded-[0.5em]
          border border-[#33313B]/15
          bg-[#f6f5f5]
          text-[#33313B]
          placeholder:text-[#33313B]/40
          outline-none
          focus:border-[#4592af]
          focus:bg-white
          transition
        "
      />
    </div>
  );
}
