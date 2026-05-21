import { Link, useLocation, useNavigate } from "react-router-dom";
import ezIcon from "./assets/ezicon.png";
import ezbg from "./assets/homebg.png";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navbar =
    location.pathname === "/" ||
    location.pathname === "/vendor-signup";

  const hideImgRoutes = [
    "/client-login",
    "/partner-dash",
    "/vendor-signup",
    "/client-signup",
    "/vendor-login",
    "/test",
  ];

  const img = hideImgRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      <div
        className={`absolute top-0 w-full overflow-hidden bg-[#ebeaea] px-[50px] py-[15px] shadow-[0px_0px_3px_5px_rgba(5,5,5,0.329)] flex flex-row justify-between items-center h-20 ${
          navbar ? "flex" : "hidden"
        }`}
      >
        <Link to="/">
          <img
            src={ezIcon}
            alt="EzPrint Icon"
            className="cursor-pointer"
          />
        </Link>

        <nav className="flex flex-row gap-[10px] items-center">
          <button className="rounded-[15px] h-fit w-fit py-1.5 px-5 transition cursor-pointer hover:bg-[rgb(0,0,0,0.05)]">
            <Link
              to="/client-login"
              className="no-underline text-inherit font-inter font-semibold text-lg"
            >
              Client Login
            </Link>
          </button>

          <button className="rounded-[15px] bg-black h-fit w-fit py-1.5 px-5  text-white transition cursor-pointer hover:opacity-80">
            <Link
              to="/vendor-login"
              className="no-underline text-inherit font-inter font-semibold text-lg"
            >
              Login
            </Link>
          </button>

          <button className="rounded-[15px] h-fit w-fit py-1.5 px-5 transition cursor-pointer hover:bg-[rgb(0,0,0,0.05)]">
            <Link
              to="/client-signup"
              className="no-underline text-inherit font-inter font-semibold text-lg"
            >
              Client Signup
            </Link>
          </button>

          <button className="rounded-[15px] h-fit w-fit py-1.5 px-5 transition cursor-pointer hover:bg-[rgb(0,0,0,0.05)]">
            <Link
              to="/vendor-signup"
              className="no-underline text-inherit font-inter font-semibold text-lg"
            >
              Become a Partner
            </Link>
          </button>
        </nav>
      </div>

      <div
        className={`absolute -z-50 w-full ${img ? "hidden" : "block"}`}
      >
        <img
          src={ezbg}
          alt="Landing Page image under navbar"
          className="w-full h-auto"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gray-500 opacity-30 pointer-events-none" />
      </div>
    </>
  );
}
