import * as Ven from "../Functions/login_vendor.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VenDash() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    await Ven.vendorLogin();

    setLoggedIn(true);
    navigate("/partner-dash");
  }

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-[9999] bg-[#ebeaea]" />

      {/* Form */}
      <form className="flex flex-col items-center w-[90%] max-w-full mx-auto my-[80px] p-[40px] rounded-[20px] text-center">
        {/* Title */}
        <h1 className="text-[30px] font-bold mb-[20px] font-open-sans">
          Vendor Login
        </h1>

        {/* Grid Card */}
        <div className="grid grid-cols-1 gap-[18px] mt-[20px] bg-[rgb(220,220,220)] px-[30px] pt-[35px] pb-[50px] border border-[rgb(0,0,0,0.25)] rounded-[1em] w-[500px] max-[480px]:w-full">
          {/* Username / Email */}
          <div className="flex flex-col gap-[6px]">
            <p className="text-[13px] font-medium text-[#222] text-left font-inter">
              Email or Username
            </p>
            <input
              id="username"
              placeholder="Enter email or username"
              className="p-[14px] rounded-[0.5em] border border-[rgb(0,0,0,0.25)] bg-[#E8E8E8] text-black placeholder:text-[#9a9a9a]"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[6px]">
            <p className="text-[13px] font-medium text-[#222] text-left font-inter">
              Password
            </p>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="p-[14px] rounded-[0.5em] border border-[rgb(0,0,0,0.25)] bg-[#E8E8E8] text-black placeholder:text-[#9a9a9a]"
            />
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleLogin}
            className="mt-[20px] px-[32px] py-[15px] rounded-[40px] bg-[#27221F] text-white text-[16px] cursor-pointer transition hover:scale-[1.05] hover:bg-[#35302E]"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
