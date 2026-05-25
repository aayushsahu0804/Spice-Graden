import React from "react";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

function CartFlash() {
  const { flashMsg } = useCart();

  if (!flashMsg) return null;

  return (
    <div className="cart-flash" role="alert" aria-live="polite">
      <FaShoppingCart className="flash-icon" />
      <span>
        <strong>{flashMsg.name}</strong> added to cart!
      </span>
    </div>
  );
}

export default CartFlash;
