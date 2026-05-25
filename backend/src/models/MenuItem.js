const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["Starters", "Main Course", "Salad", "Drinks", "Desserts"],
    },
    image: {
      type: String,
      default: "/default.jpg",
    },
    description: {
      type: String,
      default: "",
    },
    ingredients: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 4.7,
      min: 0,
      max: 5,
    },
    // 🔥 KEY FIELD: tracks how many times this item has been ordered
    // Used to sort menu by popularity (frequently ordered → top)
    orderCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast sorting by popularity
menuItemSchema.index({ orderCount: -1 });
menuItemSchema.index({ category: 1, orderCount: -1 });

module.exports = mongoose.model(
  "MenuItem",
  menuItemSchema,
  "menus"
);
