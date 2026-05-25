const express = require("express");
const router = express.Router();
const {
  updateItemStatus,
  getActiveOrders,
  markOrderServed,
} = require("../controllers/kitchenController");

// GET /api/kitchen/orders  — active orders for kitchen display
router.get("/orders", getActiveOrders);

// PATCH /api/kitchen/orders/:orderId/items/:itemId
// Advance item status (Pending→Cooking→Ready→Served)
router.patch("/orders/:orderId/items/:itemId", updateItemStatus);

// PATCH /api/kitchen/orders/:orderId/serve
// Waiter marks full order as served/completed
router.patch("/orders/:orderId/serve", markOrderServed);

module.exports = router;
