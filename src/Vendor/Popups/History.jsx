import * as log from "../../Functions/login_vendor";
import styles from "../../modules/PartnerDash.module.css";

export default function History({ setActivePanel }) {
  return (
    <div className={styles.store}>
      <div>
        <h3>Upload GCash QR</h3>
        <input type="file" id="gcash-file" />
        <button onClick={log.uploadGcash}>Upload</button>
      </div>

      <button
        className={styles.closebtn}
        onClick={() => setActivePanel(null)}
      >
        Close
      </button>
    </div>
  );
}
