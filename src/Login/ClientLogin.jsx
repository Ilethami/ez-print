import * as c from "../Functions/client";
import { useNavigate } from "react-router-dom";

export default function ClientLogin() {
  const navigate = useNavigate();

  async function handleLogin() {
    const password = document.getElementById("login-password").value;
    if (!password) return alert("Password cannot be empty");

    const name = document.getElementById("login-name").value;
    if (!name.trim()) return alert("Name cannot be empty");

    try {
      const res = await c.login(name, password);

      // IMPORTANT: check backend response
      if (!res || !res.ok) {
        return alert(res?.message || "Login failed");
      }

      navigate("/client-dash");
    } catch (err) {
      console.error(err);
      alert("Server error during login");
    }
  }

  return (
    <>
      <form className="flex flex-col items-center w-[90%] mx-auto my-[80px] p-[40px] rounded-[20px] text-center text-[#33313B]">
        <h1 className="text-[30px] font-bold mb-[20px] text-white">
          Login
        </h1>

        <div className="grid grid-cols-2 gap-[18px] mt-[20px] bg-[rgb(255,255,255,0.80)] px-[30px] pt-[35px] pb-[50px] border border-[#33313B]/15 rounded-[1em] w-[765px] max-[480px]:grid-cols-1 max-[768px]:w-full">
          {/* Name */}
          <div className="flex flex-col gap-[6px]">
            <p className="text-[13px] font-medium text-[#33313B] text-left">
              Name
            </p>
            <input
              id="login-name"
              placeholder="Name"
              className="
                p-[14px] rounded-[0.5em]
                border border-[#33313B]/15
                bg-[#f6f5f5]
                text-[#33313B]
                placeholder:text-[#33313B]/40
                outline-none
                transition
                hover:border-[#4592af]
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
              id="login-password"
              type="password"
              placeholder="Password"
              className="
                p-[14px] rounded-[0.5em]
                border border-[#33313B]/15
                bg-[#f6f5f5]
                text-[#33313B]
                placeholder:text-[#33313B]/40
                outline-none
                transition
                hover:border-[#4592af]
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
              col-span-2 mt-[30px]
              px-[60px] py-[15px]
              rounded-[40px]
              bg-[#33313B]
              text-white
              cursor-pointer
              transition
              hover:bg-[#e3c4ab]
              hover:text-[#33313B]
              active:bg-[#d6b394]
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-[#4592af]
              mx-auto w-fit
            "
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
