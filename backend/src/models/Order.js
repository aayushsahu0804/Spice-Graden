const mongoose = require("mongoose");

// Embedded sub-document for each item in an order
const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
    image: { type: String, default: "/default.jpg" },
    // Per-item kitchen status
    status: {
      type: String,
      enum: ["Pending", "Cooking", "Ready", "Served"],
      default: "Pending",
    },
  },
  { _id: true }
);

const orderSchema = new mongoose.Schema(
  {
    // Short display ID like "01201066234"
    displayId: {
      type: String,
      unique: true,
    },
    tableNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    items: [orderItemSchema],
    itemTotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentMethod: {
      type: String,
      default: "cash",
    },

    estimatedTime: {
  type: Number,
  default: 15, // minutes
},
    // Overall order status
    status: {
      type: String,
      enum: ["Placed", "InProgress", "Completed", "Cancelled"],
      default: "Placed",
    },
  },
  {
    timestamps: true, // createdAt = placedAt
  }
);

// Auto-generate displayId before saving
orderSchema.pre("save", function (next) {
  if (!this.displayId) {
    this.displayId = "0" + Date.now().toString().slice(-10);
  }
  next();
});

// Auto-update order status based on item statuses
orderSchema.methods.syncStatus = function () {
  const statuses = this.items.map((i) => i.status);
  if (statuses.every((s) => s === "Served")) {
    this.status = "Completed";
  } else if (statuses.some((s) => s === "Cooking" || s === "Ready")) {
    this.status = "InProgress";
  } else {
    this.status = "Placed";
  }
};

module.exports = mongoose.model("Order", orderSchema);
