export async function createVendor() {
  const payload = {
    name: document.getElementById("name").value,
    pw: document.getElementById("pw").value,
    email: document.getElementById("email").value,
    bw_rate: parseFloat(document.getElementById("bw_rate").value),
    clrd_rate: parseFloat(document.getElementById("clrd_rate").value),
    lat: parseFloat(document.getElementById("lat").value),
    long: parseFloat(document.getElementById("long").value),
    brand: document.getElementById("brand").value,
  };

  console.log("Payload:", payload); // debug

<<<<<<< HEAD
  const response = await fetch("http://localhost:3001/vendor/new", {
=======
  const response = await fetch("/api/vendor/new", {
>>>>>>> 26eb9e1558d00b1e4a02572744487c24f8899772
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    alert("Vendor created!");
    const text = await response.text();
    const token = JSON.parse(text);
    localStorage.setItem("vendor_token", token);
<<<<<<< HEAD
    // window.location.href = "http://localhost/gcash-upload";
=======
    window.location.href = "https://ez-print.shop/uploadGcash";
>>>>>>> 26eb9e1558d00b1e4a02572744487c24f8899772
  } else {
    const err = await response.text();
    console.error("Error:", err);
    alert("Failed to create vendor");
  }
}
