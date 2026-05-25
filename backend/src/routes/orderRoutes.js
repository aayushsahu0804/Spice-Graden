const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");

// POST /api/orders  — place new order
router.post("/", placeOrder);

// GET /api/orders?status=Placed,InProgress
router.get("/", getOrders);

// GET /api/orders/:id  — single order by displayId
router.get("/:id", getOrderById);

module.exports = router;
