export function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "Pending";
  }

  return new Date(timestamp).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export async function signup() {
  const payload = {
    name: document.getElementById("signup-name").value,
    email: document.getElementById("signup-email").value,
    pw_hash: document.getElementById("signup-password").value, // matches backend
  };

  const response = await fetch("/api/user/new_account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  if (!response.ok) {
    console.error("Signup failed:", text);
    return;
  }

  const res = JSON.parse(text);

  console.log("Created user:", res);

  alert("Account created!");

  window.location.href = "/client-login";
}

export async function login() {
  const payload = {
    name: document.getElementById("login-name").value,
    pw: document.getElementById("login-password").value,
  };

  const response = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const token = await response.json();

  if (!response.ok) {
    console.error("Login failed:", text);
    alert("Invalid credentials");
    return;
  }

  console.log("token :", token);

  // ✅ store session
  localStorage.setItem("usr_token", token);

  alert("Welcome Back");

  loadUserOrders();
}

export function apply_UserFilter() {
  loadUserOrders();
}

export async function loadUserOrders(setPaymentOpen, setPaymentData) { 
    const token = localStorage.getItem("usr_token");

  if (!token) {
    console.log("No user logged in");
    return;
  }

  const filter = document.getElementById("order-filter").value;

  let url = "/api/user/orders";

  if (filter) {
    url += `?state=${filter}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const text = await response.text();

  if (!response.ok) {
    console.error("Failed to load orders:", text);
    return;
  }

  const orders = JSON.parse(text);

  console.log("Orders:", orders);

    renderUserOrders(
        orders,
        setPaymentOpen,
        setPaymentData
    );
}

export function renderUserOrders(
    orders,
    setPaymentOpen,
    setPaymentData
) {
  const container = document.getElementById("orders-list");

  container.innerHTML = "";

  if (!orders.length) {
    container.innerHTML = "<p>No orders yet</p>";
    return;
  }

  orders.forEach((order) => {
    const div = document.createElement("div");

    div.innerHTML = `
            <h3>Order: ${order.o_pub_id}</h3>
            <p>Vendor: ${order.brand}</p>
            <p>Status: ${order.status}</p>
            <p>Total: ${order.total}</p>
            <p>created on: ${formatTimestamp(order.created_at)}</p>
            <p>paid on: ${formatTimestamp(order.paid_at)}</p>
            <p>claimed on: ${formatTimestamp(order.claimed_at)}</p>
            <p>completed on: ${formatTimestamp(order.completed_at)}</p>


            <button class="pay-btn">
                Pay
            </button>
    `;

      const payBtn = div.querySelector(".pay-btn");

    payBtn.addEventListener("click", async () => {

        const data = await openPayment(
            order.o_pub_id,
            order.v_pub_id
        );

        setPaymentData(data);

        setPaymentOpen(true);
    });

    container.appendChild(div);
  });
}

let currentOrderId = null;

export async function openPayment(orderId, vendorId) {

    currentOrderId = orderId;

    const response = await fetch(
        `/api/order/${vendorId}/gcash`
    );

    if (!response.ok) {
        console.error("Failed to load GCash QR");
        return null;
    }

    const blob = await response.blob();

    const imgUrl = URL.createObjectURL(blob);

    return {
        imgUrl,
        orderId
    };
}

export async function submitReceipt() {
  const fileInput = document.getElementById("receipt-input");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `/api/order/${currentOrderId}/submit_reciept`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    alert("Upload failed");
    return;
  }

  alert("Receipt submitted!");

  // optional refresh
  loadUserOrders();
}

export function logout() {
  localStorage.removeItem("usr_token");
  window.location.href = "https://ez-print.shop";
}
