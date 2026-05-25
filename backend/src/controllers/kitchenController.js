const Order = require("../models/Order");

const STATUS_FLOW = {
  Pending: "Cooking",
  Cooking: "Ready",
  Ready: "Served",
};

const VALID_STATUSES = ["Pending", "Cooking", "Ready", "Served"];

// ─────────────────────────────────────────────
// PATCH /api/kitchen/orders/:orderId/items/:itemId
// Kitchen taps an item to advance its status
// After updating, syncs overall order status
// ─────────────────────────────────────────────
const updateItemStatus = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body; // optional: force a specific status

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const item = order.items.id(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in order" });
    }

    // If explicit status provided, use it; else advance in flow
    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        });
      }
      item.status = status;
    } else {
      item.status = STATUS_FLOW[item.status] || "Cooking";
    }

    // Sync the parent order's overall status
    order.syncStatus();
    await order.save();

    res.json({
      success: true,
      message: `Item status updated to ${item.status}`,
      data: {
        orderId: order.displayId,
        itemId: item._id,
        itemName: item.name,
        newStatus: item.status,
        orderStatus: order.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/kitchen/orders
// Active orders for kitchen (Placed + InProgress only)
// ─────────────────────────────────────────────
const getActiveOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Placed", "InProgress"] },
    })
      .sort({ createdAt: -1 })
      .lean();

    const shaped = orders.map((o) => ({
      id: o.displayId,
      _id: o._id,
      table: o.tableNumber,
      items: o.items,
      total: o.grandTotal,
      status: o.status,
      placedAt: o.createdAt,
    }));

    res.json({ success: true, count: shaped.length, data: shaped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// PATCH /api/kitchen/orders/:orderId/serve
// Waiter marks entire order/table as served
// ─────────────────────────────────────────────
const markOrderServed = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Mark all items served
    order.items.forEach((item) => {
      item.status = "Served";
    });
    order.status = "Completed";

    await order.save();

    res.json({
      success: true,
      message: "Order marked as completed",
      data: { orderId: order.displayId, status: order.status },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { updateItemStatus, getActiveOrders, markOrderServed };
