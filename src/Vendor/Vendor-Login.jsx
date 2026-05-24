import * as Ven from "../Functions/login_vendor.jsx";
import { useNavigate } from "react-router-dom";

export default function VenDash() {
  const navigate = useNavigate();

  async function handleLogin() {
    const password = document.getElementById("password").value;

    if (!password) return alert("Password cannot be empty");

    const name = document.getElementById("username").value;

    if (!name.trim()) return alert("Name cannot be empty");

    try {
      const success = await Ven.vendorLogin();

      if (success) {
        navigate("/partner-dash");
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-[9999] bg-[#f6f5f5]" />

      {/* Form */}
      <form className="flex flex-col items-center w-[90%] max-w-full mx-auto my-[80px] p-[40px] rounded-[20px] text-center text-[#f6f5f5]">
        <h1 className="text-[30px] font-bold mb-[20px]">
          Partner Login
        </h1>

        <div className="grid grid-cols-1 gap-[18px] mt-[20px] bg-[rgb(255,255,255,0.80)] px-[30px] pt-[35px] pb-[50px] border border-[#33313B]/15 rounded-[1em] w-[500px] max-[480px]:w-full shadow-sm">
          {/* Username */}
          <div className="flex flex-col gap-[6px]">
            <p className="text-[13px] font-medium text-[#33313B] text-left">
              Email or Username
            </p>
            <input
              id="username"
              placeholder="Enter email or username"
              className="
                p-[14px] rounded-[0.5em]
                border border-[#33313B]/15
                bg-[#f6f5f5]
                text-[#33313B]
                placeholder:text-[#33313B]/40
                focus:outline-none
                focus:border-[#4592af]
                focus:bg-white
              "
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[6px]">
            <p className="text-[13px] font-medium text-[#33313B] text-left">
              Password
            </p>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="
                p-[14px] rounded-[0.5em]
                border border-[#33313B]/15
                bg-[#f6f5f5]
                text-[#33313B]
                placeholder:text-[#33313B]/40
                focus:outline-none
                focus:border-[#4592af]
                focus:bg-white
              "
            />
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleLogin}
            className="
              mt-[20px]
              px-[32px] py-[15px]
              rounded-[40px]
              bg-[#33313B]
              text-white
              text-[16px]
              cursor-pointer
              transition
              hover:bg-[#e3c4ab]
              hover:text-[#33313B]
              active:bg-[#d6b394]
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-[#4592af]
            "
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
