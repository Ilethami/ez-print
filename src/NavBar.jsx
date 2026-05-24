import { Link, useLocation } from "react-router-dom";
import ezIcon from "./assets/ezicon.png";
import ezbg from "./assets/homebg.png";

export default function NavBar() {
  const location = useLocation();
  const path = location.pathname;

  const hideImgRoutes = [
    "/partner-dash",
    "/client-dash",
    "/upload-gcash",
  ];

  const hideImg = hideImgRoutes.some((route) =>
    path.startsWith(route),
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="absolute top-0 w-full overflow-hidden bg-[#f6f5f5] px-[50px] py-[15px] shadow-[0px_0px_3px_5px_rgba(5,5,5,0.329)] flex flex-row justify-between items-center h-20 text-[#33313B]">
        <Link to="/">
          <img
            src={ezIcon}
            alt="EzPrint Icon"
            className="cursor-pointer"
          />
        </Link>

        <nav className="flex flex-row gap-[10px] items-center text-[#33313B]">
          {/* CLIENT LOGIN */}
          {path !== "/client-login" && (
            <button className="rounded-[15px] h-fit w-fit py-1.5 px-5 transition cursor-pointer hover:bg-[#e3c4ab]/30">
              <Link
                to="/client-login"
                className="no-underline font-inter font-semibold text-lg text-[#33313B] hover:text-[#4592af]"
              >
                Sign In
              </Link>
            </button>
          )}

          {/* CLIENT SIGNUP */}
          {path !== "/client-signup" && (
            <button className="rounded-[15px] h-fit w-fit py-1.5 px-5 transition cursor-pointer hover:bg-[#e3c4ab]/30">
              <Link
                to="/client-signup"
                className="no-underline font-inter font-semibold text-lg text-[#33313B] hover:text-[#4592af]"
              >
                Create Account
              </Link>
            </button>
          )}

          {/* VENDOR SIGNUP */}
          {path !== "/vendor-signup" && (
            <button className="rounded-[15px] bg-[#33313B] h-fit w-fit py-1.5 px-5 text-white transition cursor-pointer hover:bg-[#e3c4ab]">
              <Link
                to="/vendor-signup"
                className="no-underline font-inter font-semibold text-lg text-white "
              >
                Become a Partner
              </Link>
            </button>
          )}

          {/* VENDOR LOGIN */}
          {path !== "/vendor-login" && (
            <button className="rounded-[15px] bg-[#33313B] h-fit w-fit py-1.5 px-5 text-white transition cursor-pointer hover:bg-[#4592af]">
              <Link
                to="/vendor-login"
                className="no-underline font-inter font-semibold text-lg text-white"
              >
                Partner Login
              </Link>
            </button>
          )}
        </nav>
      </div>

      {/* BACKGROUND IMAGE */}
      <div
        className={`absolute -z-50 w-full ${hideImg ? "hidden" : "block"}`}
      >
        <img
          src={ezbg}
          alt="Landing Page image under navbar"
          className="w-full h-auto"
        />

        <div className="absolute inset-0 bg-gray-500 opacity-20 pointer-events-none" />
      </div>
    </>
  );
}
