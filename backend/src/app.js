const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
console.log("MONGO_URI =", process.env.MONGO_URI);
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Route imports
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const kitchenRoutes = require("./routes/kitchenRoutes");
const waiterRoutes = require("./routes/waiterRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://spice-graden.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Routes ────────────────────────────────────
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/kitchen", kitchenRoutes);
app.use("/api/waiter", waiterRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Endpoints:`);
  console.log(`   GET  /api/menu              — Menu (sorted by popularity)`);
  console.log(`   GET  /api/menu/popular      — Top 5 most ordered`);
  console.log(`   GET  /api/menu/:id          — Single item`);
  console.log(`   POST /api/orders            — Place order`);
  console.log(`   GET  /api/orders            — All orders`);
  console.log(`   GET  /api/kitchen/orders    — Active orders (kitchen)`);
  console.log(`   PATCH /api/kitchen/orders/:id/items/:itemId — Update item status`);
  console.log(`   PATCH /api/kitchen/orders/:id/serve         — Mark served`);
});
