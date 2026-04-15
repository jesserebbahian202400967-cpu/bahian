const API = "http://localhost:3000/api/products";

// ================= LOAD ALL PRODUCTS =================
async function loadProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    display(data);
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// ================= DISPLAY PRODUCTS =================
function display(data) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div>
        <b>${p.name}</b><br/>
        Brand: ${p.brand}<br/>
        ₱${p.price} | Stock: ${p.stock}
      </div>

      <div>
        <button onclick="deleteProduct(${p.id})">Delete</button>
        <button onclick="updateProduct(${p.id})">Update</button>
      </div>
    `;

    list.appendChild(div);
  });
}

// ================= ADD PRODUCT (FIXED BUG HERE) =================
async function addProduct() {
  const name = document.getElementById("name").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  if (!name || !brand || !price || !stock) {
    alert("Please fill in all fields!");
    return;
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        brand,
        price: Number(price),
        stock: Number(stock)
      })
    });

    const data = await res.json();
    console.log("Added:", data);

    // clear inputs
    document.getElementById("name").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";

    loadProducts();
  } catch (err) {
    console.error("Error adding product:", err);
  }
}

// ================= DELETE PRODUCT =================
async function deleteProduct(id) {
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    loadProducts();
  } catch (err) {
    console.error("Error deleting product:", err);
  }
}

// ================= UPDATE PRODUCT =================
async function updateProduct(id) {
  const name = prompt("Enter new name:");
  const brand = prompt("Enter new brand:");
  const price = prompt("Enter new price:");
  const stock = prompt("Enter new stock:");

  if (!name || !brand || !price || !stock) {
    alert("Update cancelled or incomplete input!");
    return;
  }

  try {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        brand,
        price: Number(price),
        stock: Number(stock)
      })
    });

    loadProducts();
  } catch (err) {
    console.error("Error updating product:", err);
  }
}

// ================= SEARCH PRODUCT =================
async function searchProduct() {
  const name = document.getElementById("search").value;

  try {
    const res = await fetch(`http://localhost:3000/api/search?name=${name}`);
    const data = await res.json();

    display(data);
  } catch (err) {
    console.error("Error searching product:", err);
  }
}

// ================= STATS =================
async function loadStats() {
  try {
    const res = await fetch("http://localhost:3000/api/stats");
    const data = await res.json();

    document.getElementById("stats").innerText =
      `Total Products: ${data.totalProducts} | Total Stock: ${data.totalStock}`;
  } catch (err) {
    console.error("Error loading stats:", err);
  }
}

// ================= TOP PRODUCTS =================
async function loadTop() {
  try {
    const res = await fetch("http://localhost:3000/api/top");
    const data = await res.json();

    const list = document.getElementById("topList");
    list.innerHTML = "";

    data.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - ₱${p.price}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading top products:", err);
  }
}

// ================= INIT =================
loadProducts();