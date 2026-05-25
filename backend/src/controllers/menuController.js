const MenuItem = require("../models/MenuItem");

// ─────────────────────────────────────────────
// GET /api/menu
// Returns all available items sorted by orderCount DESC
// So frequently ordered items appear at the top (Note 2)
// Also includes orderCount in each item so frontend can show
// "Ordered X times" badge on FoodCard (Note 3)
// ─────────────────────────────────────────────
const getMenu = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = { isAvailable: true };

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Sort by orderCount DESC → popular items first
    const items = await MenuItem.find(filter).sort({ orderCount: -1 }).lean();

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/menu/:id
// Single item detail
// ─────────────────────────────────────────────
const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id).lean();
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/menu/popular
// Top 5 most ordered items (for homepage / special section)
// ─────────────────────────────────────────────
const getPopularItems = async (req, res) => {
  try {
    const items = await MenuItem.find({ isAvailable: true })
      .sort({ orderCount: -1 })
      .limit(5)
      .lean();

    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMenu, getMenuItemById, getPopularItems };
