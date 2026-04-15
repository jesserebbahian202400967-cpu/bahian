const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// serve frontend folder
app.use(express.static(path.join(__dirname, "bahian")));

// ================= DATA =================
let products = [
  { id: 1, name: "Laptop", brand: "Dell", price: 45000, stock: 10 },
  { id: 2, name: "Phone", brand: "Samsung", price: 20000, stock: 15 },
  { id: 3, name: "Tablet", brand: "Apple", price: 30000, stock: 5 }
];

// ================= GET ALL =================
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ================= ADD PRODUCT (FIXED) =================
app.post("/api/products", (req, res) => {
  const { name, brand, price, stock } = req.body;

  if (!name || !brand || price == null || stock == null) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newProduct = {
    id: Date.now(),
    name: name.trim(),
    brand: brand.trim(),
    price: Number(price),
    stock: Number(stock)
  };

  products.push(newProduct);

  return res.status(201).json({
    message: "Product added successfully",
    product: newProduct
  });
});

// ================= UPDATE =================
app.put("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  products[index] = { ...products[index], ...req.body };

  res.json(products[index]);
});

// ================= DELETE =================
app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  products.splice(index, 1);

  res.json({ message: "Deleted" });
});

// ================= SEARCH =================
app.get("/api/search", (req, res) => {
  const name = req.query.name || "";

  const result = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(result);
});

// ================= STATS =================
app.get("/api/stats", (req, res) => {
  res.json({
    totalProducts: products.length,
    totalStock: products.reduce((a, b) => a + b.stock, 0)
  });
});

// ================= TOP =================
app.get("/api/top", (req, res) => {
  const sorted = [...products].sort((a, b) => b.price - a.price);
  res.json(sorted.slice(0, 3));
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});