import { Link, useLocation } from "react-router-dom";
import styles1 from "../modules/Nav.module.css";
import ezIcon from "../assets/ezicon.png";
import styles2 from "../modules/HomePage.module.css";
import ezbg from "../assets/homebg.png";
import { useNavigate } from "react-router-dom";


export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navbar =
    location.pathname === "/" ||
    location.pathname === "/vendor-signup";
  const img =
    location.pathname === "/";
  const st = navbar ? { display: "flex" } : { display: "none" };
  const sty = img ? { display: "block" } : { display: "none" };


  return (
    <>
      <div style={st} className={styles1.header}>
        <img src={ezIcon} alt="EzPrint Icon" />
        <nav className={styles1.navigation}>
          {/* Below will be changed to official designed navigation bar */}
          <button className={styles1.navbtn}>
            <Link to="/client-login">Client Login</Link>
          </button>
          <button className={`${styles1.navbtn} ${styles1.login}`}>
            <Link to="/vendor-login">Login</Link>
          </button>
          <button className={styles1.navbtn}>
            <Link to="/client-signup">Client Signup</Link>
          </button>
          <button className={styles1.navbtn}>
            <Link to="/vendor-signup">Become a Partner</Link>
          </button>
        </nav>

      </div>
      <div className={styles2.bg} style={sty}><img src={ezbg} alt="Landing Page image under navbar" /></div>
    </>
  );
}
