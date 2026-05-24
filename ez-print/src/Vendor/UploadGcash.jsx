import { useNavigate } from "react-router-dom";
import * as Ven from "../Functions/login_vendor.jsx";

export default function UploadGcash() {

    const navigate = useNavigate();

    async function handleUpload() {

        const success = await Ven.uploadGcash();

        if (success) {
            navigate("/vendor-login");
        }
    }

    return (
        <div>
            <h3>Add a Gcash QR: </h3>

            <input type="file" id="gcash-file" />

            <button onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
}
