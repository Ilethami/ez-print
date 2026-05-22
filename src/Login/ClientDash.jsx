import ezIcon from "../assets/ezicon.png";
import { Link } from "react-router-dom";
import VendorMap from "../Vendor/Vendor-Map";

export default function PartnerDash() {
  return (
    <div className="flex overflow-hidden h-screen">
      {/* HEADER */}
      <div className="absolute top-0 left-0 z-50 w-full bg-[#ebeaea] pl-20 pr-8 py-[15px] shadow-[0px_0px_3px_5px_rgba(5,5,5,0.329)] flex items-center h-20">
        <div className="flex items-center gap-20">
          <Link to="/">
            <img
              src={ezIcon}
              alt="EzPrint Icon"
              className="cursor-pointer"
            />
          </Link>

          <p className="font-open-sans font-semibold text-[22px]">
            Welcome to Ez-Print!
          </p>
        </div>
      </div>

      {/* SIDEBAR SPACE ONLY */}
      <div className="mt-20 h-[calc(100vh-80px)] w-[300px] bg-[#f0f0f0] border-r-[0.5px] border-r-[#27221F]" />

      {/* MAIN SPACE */}
      <div className="flex-1 mt-20 h-[calc(100vh-80px)]">
        <div className="w-full h-full">
          <VendorMap />
        </div>
      </div>
    </div>
  );
}
