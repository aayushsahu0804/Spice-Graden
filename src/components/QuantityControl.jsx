import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import "../index.css";

const QuantityControl = ({ qty, onInc, onDec, min = 1 }) => {
  return (
    <div className="qty-control">
      <button
        className="qty-control-btn"
        onClick={onDec}
        disabled={qty <= min}
        aria-label="Decrease quantity"
      >
        <FiMinus />
      </button>
      <span className="qty-control-num">{qty}</span>
      <button
        className="qty-control-btn"
        onClick={onInc}
        aria-label="Increase quantity"
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantityControl;
