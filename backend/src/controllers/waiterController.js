const WaiterCall = require("../models/WaiterCall");

// Customer presses Call Waiter
const callWaiter = async (req, res) => {
  try {
    const { tableNumber } = req.body;

    const call = await WaiterCall.create({
      tableNumber,
    });

    res.status(201).json({
      success: true,
      data: call,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Waiter dashboard
const getCalls = async (req, res) => {
  try {
    const calls = await WaiterCall.find({
      status: "Pending",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: calls,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Mark completed
const completeCall = async (req, res) => {
  try {
    await WaiterCall.findByIdAndUpdate(
      req.params.id,
      {
        status: "Completed",
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  callWaiter,
  getCalls,
  completeCall,
};