const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// ─────────────────────────────────────────────
// POST /api/orders
// Place a new order.
// After saving, increments MenuItem.orderCount for each ordered item
// so that next menu fetch returns popular items first (Note 2 & 3)
// ─────────────────────────────────────────────
const placeOrder = async (req, res) => {
  try {
    const { tableNumber, items, paymentMethod } = req.body;

    if (!tableNumber || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "tableNumber and items are required",
      });
    }

    // Validate items and fetch menu prices (don't trust client prices)
    const enrichedItems = [];
    for (const cartItem of items) {
      const menuItem = await MenuItem.findById(cartItem.menuItemId);
      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: `Menu item not found: ${cartItem.name}`,
        });
      }
      enrichedItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,       // use DB price, not client price
        qty: cartItem.qty,
        image: menuItem.image,
        status: "Pending",
      });
    }

    // Calculate totals server-side
    const itemTotal = enrichedItems.reduce((acc, i) => acc + i.price * i.qty, 0);
    const taxes = Math.round(itemTotal * 0.05);
    const grandTotal = itemTotal + taxes;

    // Create and save order
    const order = new Order({
  tableNumber,
  items: enrichedItems,
  itemTotal,
  taxes,
  grandTotal,
  paymentMethod: paymentMethod || "cash",

  estimatedTime: Math.max(
    10,
    enrichedItems.reduce((sum, item) => sum + item.qty * 3, 0)
  ),

  status: "Placed",
});

    await order.save();

    // ✅ Increment orderCount for each menu item (by qty ordered)
    // This is what makes popular items bubble to the top of the menu
    const bulkOps = enrichedItems.map((item) => ({
      updateOne: {
        filter: { _id: item.menuItemId },
        update: { $inc: { orderCount: item.qty } },
      },
    }));
    await MenuItem.bulkWrite(bulkOps);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: {
        id: order.displayId,
        _id: order._id,
        tableNumber: order.tableNumber,
        items: order.items,
        itemTotal: order.itemTotal,
        taxes: order.taxes,
        grandTotal: order.grandTotal,
        paymentMethod: order.paymentMethod,
        status: order.status,
        placedAt: order.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/orders
// All orders (for kitchen & waiter dashboards)
// Optional ?status=Placed,InProgress filter
// ─────────────────────────────────────────────
const getOrders = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      // e.g. ?status=Placed,InProgress
      filter.status = { $in: status.split(",") };
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();

    // Shape response to match what frontend expects
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
// GET /api/orders/:id
// Single order detail
// ─────────────────────────────────────────────
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ displayId: req.params.id }).lean();
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { placeOrder, getOrders, getOrderById };
