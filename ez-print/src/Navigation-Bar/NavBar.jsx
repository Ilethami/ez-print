import { Link, useLocation } from "react-router-dom";
import styles from "../modules/Nav.module.css";
import ezIcon from "../assets/ezicon.png";

export default function NavBar() {
  const location = useLocation();
  const isVisible =
    location.pathname === "/" ||
    location.pathname === "/vendor-signup";
  const style = isVisible ? { display: "flex" } : { display: "none" };

  return (
    <div style={style} className={styles.header}>
      <img src={ezIcon} alt="EzPrint Icon" />
      <nav className={styles.navigation}>
        {/* Below will be changed to official designed navigation bar */}
        <button className={styles.navbtn}>
          <Link to="/client-login">Client Login</Link>
        </button>
        <button className={`${styles.navbtn} ${styles.login}`}>
          <Link to="/vendor-login">Login</Link>
        </button>
        <button className={styles.navbtn}>
          <Link to="/client-signup">Client Signup</Link>
        </button>
        <button className={styles.navbtn}>
          <Link to="/vendor-signup">Become a Partner</Link>
        </button>
      </nav>
    </div>
  );
}
