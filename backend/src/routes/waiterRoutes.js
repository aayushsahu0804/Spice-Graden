const express = require("express");
const router = express.Router();

const {
  callWaiter,
  getCalls,
  completeCall,
} = require("../controllers/waiterController");

// Customer calls waiter
router.post("/", callWaiter);

// Waiter dashboard gets pending calls
router.get("/", getCalls);

// Waiter marks request completed
router.patch("/:id", completeCall);

module.exports = router;