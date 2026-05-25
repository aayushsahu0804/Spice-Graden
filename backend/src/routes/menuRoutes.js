const express = require("express");
const router = express.Router();
const {
  getMenu,
  getMenuItemById,
  getPopularItems,
} = require("../controllers/menuController");

// GET /api/menu?category=Starters&search=burger
router.get("/", getMenu);

// GET /api/menu/popular  (must be before /:id)
router.get("/popular", getPopularItems);

// GET /api/menu/:id
router.get("/:id", getMenuItemById);

module.exports = router;
