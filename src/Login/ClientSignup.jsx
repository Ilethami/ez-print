import * as c from "../Functions/client";
import { useNavigate } from "react-router-dom";

export default function ClientSignup() {
  const navigate = useNavigate();

  async function handleSignup() {
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

    await c.signup();
    navigate("/client-dash");
  }

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-[9999] bg-[#ebeaea]" />

      {/* Form */}
      <form className="flex flex-col items-center w-[90%] max-w-full mx-auto my-[80px] p-[40px] rounded-[20px] text-center">
        <h1 className="text-[30px] font-bold mb-[20px] font-open-sans">
          Customer Registration
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-[18px] mt-[20px] bg-[rgb(220,220,220)] px-[30px] pt-[35px] pb-[50px] border border-[rgb(0,0,0,0.25)] rounded-[1em] w-[765px] max-[480px]:grid-cols-1 max-[768px]:w-full">
          {/* Name */}
          <div className="flex flex-col gap-[6px]">
            <p className="text-[13px] font-medium text-[#222] text-left">
              Name
            </p>
            <input
              id="signup-name"
              placeholder="Name"
              type="text"
              className="p-[14px] rounded-[0.5em] border border-[rgb(0,0,0,0.25)] bg-[#E8E8E8] text-black placeholder:text-[#9a9a9a]"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-[6px]">
            <p className="text-[13px] font-medium text-[#222] text-left">
              Email
            </p>
            <input
              id="signup-email"
              placeholder="Email"
              type="email"
              className="p-[14px] rounded-[0.5em] border border-[rgb(0,0,0,0.25)] bg-[#E8E8E8] text-black placeholder:text-[#9a9a9a]"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[6px]">
            <p className="text-[13px] font-medium text-[#222] text-left">
              Password
            </p>
            <input
              id="signup-password"
              placeholder="Password"
              type="password"
              className="p-[14px] rounded-[0.5em] border border-[rgb(0,0,0,0.25)] bg-[#E8E8E8] text-black placeholder:text-[#9a9a9a]"
            />
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleSignup}
            className="col-span-2 mt-[30px] px-[60px] py-[15px] rounded-[40px] bg-[#27221F] text-white text-[16px] cursor-pointer transition hover:scale-[1.05] hover:bg-[#35302E] max-[480px]:col-span-1 mx-auto w-fit "
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
