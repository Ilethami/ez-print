import { Link } from "react-router-dom";
const vendor_token = localStorage.getItem("vendor_token");

export function formatTimestamp(timestamp) {
    if (!timestamp) {
        return "Pending";
    }

    return new Date(timestamp).toLocaleString("en-PH", {
        timeZone: "Asia/Manila",
        dateStyle: "medium",
        timeStyle: "short"
    });
}

export async function vendorDetails() {
    const vendor_token = localStorage.getItem("vendor_token");

    const response = await fetch("/api/vendor/vendor_details", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + vendor_token
        }
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Failed to load home:", text);
        return;
    }

    const data = JSON.parse(text);

    console.log("Vendor home:", data);

    renderVendorDetails(data);
}

export async function renderVendorDetails(data) {
     const container = document.getElementById("vendor-details");

    container.innerHTML = "";

    if (!data.length) {
        container.innerHTML = "<p>No data found</p>";
        return;
    }

    const vendor = data[0];

    container.innerHTML = `
        <h3>Vendor Dashboard</h3>
            <p>Brand: ${vendor.brand}</p>
            <p>Email: ${vendor.email}</p>
            <p>B/W Rate: ${vendor.bw_rate}</p>
            <p>Color Rate: ${vendor.clrd_rate}</p>
            <p>Location(lat): ${vendor.lat}<p>
            <p>Location(long): ${vendor.long}</p>
            <p>Phone number: ${vendor.number}</p>
    `;
}
  

export async function vendorLogin() {
    const payload = {
        name: document.getElementById("username").value,
        pw: document.getElementById("password").value
    };

    const response = await fetch("/api/vendor/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Login failed:", text);
        alert("Invalid credentials");
        return;
    }

    const token = JSON.parse(text);

    console.log("token:", token);

    localStorage.setItem("vendor_token", token);

    alert("Login successful!");
    loadVendorHome();
}

export async function loadVendorHome() {
    const vendor_token = localStorage.getItem("vendor_token");

    if (!vendor_token) {
        alert("No vendor logged in");
        return;
    }

    const response = await fetch("/api/vendor/home", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + vendor_token
        }
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Failed to load home:", text);
        return;
    }

    const data = JSON.parse(text);

    console.log("Vendor home:", data);

    renderVendorHome(data);
}

export function renderVendorHome(data) {
    const container = document.getElementById("vendor-home");

    container.innerHTML = "";

    if (!data.length) {
        container.innerHTML = "<p>No data found</p>";
        return;
    }

    const vendor = data[0];

    container.innerHTML = `
        <h3>Vendor Dashboard</h3>
        <p>Vacancy: ${vendor.vacancy}</p>
        <p>Latitude: ${vendor.lat}</p>
        <p>Longitude: ${vendor.long}</p>
    `;
}

let ordersVisible = false;

export async function toggleOrders() {
    const container = document.getElementById("orders-container");

    ordersVisible = !ordersVisible;

    if (!ordersVisible) {
        container.style.display = "none";
        return;
    }

    container.style.display = "block";

    await loadOrders();
}

export async function loadOrders() {
    const vendor_token = localStorage.getItem("vendor_token");

    if (!vendor_token) return;

    const response = await fetch("/api/vendor/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + vendor_token
        }
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Failed:", text);
        return;
    }

    const orders = JSON.parse(text);

    renderOrders(orders);
}

export function renderOrders(orders) {
    const container = document.getElementById("orders-container");

    container.innerHTML = "";

    if (!orders.length) {
        container.innerHTML = "<p>No pending orders</p>";
        return;
    }

    orders.forEach(order => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>Order: ${order.pub_id}</h3>
            <p>User: ${order.name}</p>
            <p>Copies: ${order.copies}</p>
            <p>Size: ${order.print_size}</p>
            <p>Color: ${order.color}</p>
            <p>Total: ${order.total}</p>
            <p>Status: ${order.status}</p>
           
            <button onclick="downloadFile('${order.file_path}', '${order.pub_id}')">
                Download File
            </button>

            <button onclick="acceptOrder('${order.pub_id}')">
                Accept
            </button>

            <button onclick="rejectOrder('${order.pub_id}')">
                Reject
            </button>
        `;

        container.appendChild(div);
    });
}

export async function acceptOrder(pub_id) {
    const response = await fetch("/api/vendor/accept", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pub_id)
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Accept failed:", text);
        return;
    }

    console.log("Accepted:", text);

    loadOrders();
}

export async function rejectOrder(pub_id) {
    const response = await fetch("/api/vendor/reject", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pub_id)
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Reject failed:", text);
        return;
    }

    console.log("Rejected:", text);

    loadOrders();
}

export async function see_reciept(pub_id) {
    const response = await fetch(`/api/order/${pub_id}/reciept`);

    if (!response.ok) {
        console.error("Failed to load GCash QR");
        return;
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
}

let handlingVisible = false;

/* export async function toggleHandlingOrders() {
    const container = document.getElementById("handling-container");

    handlingVisible = !handlingVisible;

    if (!handlingVisible) {
        container.style.display = "none";
        return;
    }

    container.style.display = "block";

    await loadHandlingOrders();
}*/

export async function loadHandlingOrders() {
    const vendor_token = localStorage.getItem("vendor_token");
    if (!vendor_token) return;

    const filter = document.getElementById("order-filter").value;

    let url = "/api/vendor/handling_orders";

    if (filter) {
        url += `?state=${filter}`;
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + vendor_token
        }
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Failed:", text);
        return;
    }

    const orders = JSON.parse(text);
    renderHandlingOrders(orders);

    console.log(orders);
}

export function applyFilter() {
    loadHandlingOrders();
}

export function handleOrderAction(action, pub_id) {
    if (!action) return;

    switch (action) {
        case "paid":
            set_paid(pub_id);
            break;
        case "claimed":
            set_claimed(pub_id);
            break;
        case "printed":
            set_printed(pub_id);
            break;
        case "completed":
            set_completed(pub_id);
            break;
    }
}


export async function renderHandlingOrders(orders) {
    const container = document.getElementById("orders-list");

    if (!container) {
        console.error("orders-list not found");
        return;
    }

    container.innerHTML = "";

    if (!orders.length) {
        container.innerHTML = "<p> Empty </p>";
        return;

    }

    for (const order of orders) {
        const div = document.createElement("div");

        const imgUrl = await see_reciept(order.pub_id);

        div.innerHTML = `
            <h3>Order ${order.pub_id}</h3>
            <p>User: ${order.name}</p>
            <p>Copies: ${order.copies}</p>
            <p>Size: ${order.print_size}</p>
            <p>Total: ${order.total}</p>
            <p>Status: ${order.status}</p>
            <img src="${imgUrl}" alt="No receipt available" width=200>
            <p>created on: ${formatTimestamp(order.created_at)}</p>
            <p>paid on: ${formatTimestamp(order.paid_at)}</p>
            <p>claimed on: ${formatTimestamp(order.claimed_at)}</p>
            <p>completed on: ${formatTimestamp(order.completed_at)}</p>
            
            <select>
                <option value="">${order.status}</option>
                <option value="paid">Confirm Payment</option>
                <option value="claimed">Claimed</option>
                <option value="printed">Printed</option>
                <option value="completed">Order Complete</option>
            </select>        
        `;

            const select = div.querySelector("select");
    
            select.addEventListener("change", (e) => {
                handleOrderAction(e.target.value, order.pub_id);
            });

            container.appendChild(div);
    }

    console.log(orders);
}

export async function set_printed(pub_id) {
    await fetch("/api/vendor/set_printed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pub_id)
    })

    loadHandlingOrders()
}

export async function set_paid(pub_id) {
    await fetch("/api/vendor/set_paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pub_id)
    });

    loadHandlingOrders()
}

export async function set_claimed(pub_id) {
    await fetch("/api/vendor/set_claimed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pub_id)
    });

    loadHandlingOrders()
}

export async function set_completed(pub_id) {
    await fetch("/api/vendor/set_completed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pub_id)
    });

    loadHandlingOrders()
}

export async function updateAvailability() {
    const vendor_token = localStorage.getItem("vendor_token");

    if (!vendor_token) {
        alert("Not logged in");
        return;
    }

    const selected = document.querySelector('input[name="availability"]:checked');

    if (!selected) {
        alert("Select a status");
        return;
    }

    const value = selected.value;

    const response = await fetch(`/api/vendor/change_status`, {
        method: "POST", // or PATCH (better, but POST is fine for now)
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + vendor_token
        },
        body: JSON.stringify(value) // sending raw string
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Failed:", text);
        alert("Failed to update");
        return;
    }

    console.log("Updated:", value);
    alert("Availability updated!");
}

export async function uploadGcash() {
    const vendor_token = localStorage.getItem("vendor_token");

    if (!vendor_token) {
        alert("Not logged in");
        return;
    }

    const fileInput = document.getElementById("gcash-file");
    const file = fileInput.files[0];

    if (!file) {
        alert("Select a file");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/vendor/add_gcash", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + vendor_token
        },
        body: formData
    });

    const text = await response.text();

    if (!response.ok) {
        console.error("Upload failed:", text);
        return {error: true};
    }

    const path = JSON.parse(text);

    console.log("Uploaded:", path);

    alert("GCash QR uploaded!");

    return { success: true }
}

export async function downloadFile(file_path, pub_id) {

    const response = await fetch("/api/vendor/download_file", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + vendor_token
        },
        body: JSON.stringify({
            file_path,
            pub_id
        })
    });

    if (!response.ok) {
        console.error("Download failed");
        return;
    }

    const blob = await response.blob();

    // create download link
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file_path; // match backend
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    console.log(file_path)
}

export async function logout_vendor() {
    const res = await fetch("/api/vendor/logout", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + vendor_token
        }
    });

    if (!res.ok) {
        cosole.log("try again");
        return;
    }

    localStorage.removeItem("vendor_token");
    window.location.href = <Link to="/" />;

}
