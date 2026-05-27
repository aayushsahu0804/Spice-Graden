import { useCart } from "../../context/CartContext";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import QuantityControl from "../../components/QuantityControl";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { calcTotals } from "../../utils/helpers";

function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();
  const { itemTotal, taxes, grandTotal } = calcTotals(cart);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <Navbar title="Your Cart" showCart={false} />
        <div className="empty-state cart-empty">
          <p>🛒</p>
          <strong>Your cart is empty</strong>
          <span>Add some delicious items from the menu!</span>
          <button className="pay-btn" onClick={() => navigate("/menu")}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <Navbar title="Your Cart" showCart={false} />

      <div className="cart-items">
        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} className="cart-img" />

            <div className="cart-info">
              <div className="top">
                <h4>{item.name}</h4>
                <button
                  className="cart-remove-btn"
                  onClick={() => removeFromCart(item.name)}
                  aria-label={`Remove ${item.name}`}
                >
                  <IoClose />
                </button>
              </div>

              <div className="rating">
                <FaStar /> <span>4.7</span>
              </div>

              <div className="bottom">
                <QuantityControl
                  qty={item.qty}
                  onInc={() => updateQty(item.name, "inc")}
                  onDec={() => updateQty(item.name, "dec")}
                />
                <p className="cart-item-price">₹{item.price * item.qty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bill">
        <h3>Bill Summary</h3>
        <div className="row">
          <span>Item Total</span>
          <span>₹{itemTotal}</span>
        </div>
        <div className="row">
          <span>Taxes (5%)</span>
          <span>₹{taxes.toFixed(2)}</span>
        </div>
        <div className="row total">
          <span>Grand Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button className="pay-btn" onClick={() => navigate("/payment")}>
        Proceed to Pay · ₹{grandTotal.toFixed(2)}
      </button>
    </div>
  );
}

export default CartPage;
