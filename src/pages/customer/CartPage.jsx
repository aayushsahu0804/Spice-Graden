import { useCart } from "../../context/CartContext";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import "../../index.css";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const itemTotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const taxes = itemTotal * 0.05;
  const grandTotal = itemTotal + taxes;

  return (
    <div className="cart-container">
      <Navbar title="Cart Page" />

      {/* Items */}
      <div className="cart-items">
        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} className="cart-img" />

            <div className="cart-info">
              <div className="top">
                <h4>{item.name}</h4>
                <button onClick={() => removeFromCart(item.name)}>
                  <IoClose />
                </button>
              </div>

              <div className="rating">
                <FaStar /> 4.7
              </div>

              <div className="bottom">
                <div className="qty">
                  <button onClick={() => updateQty(item.name, "dec")}>
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.name, "inc")}>
                    +
                  </button>
                </div>

                <p>₹{item.price * item.qty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bill */}
      <div className="bill">
        <h3>Bill Summary</h3>

        <div className="row">
          <span>Item Total</span>
          <span>₹{itemTotal}</span>
        </div>

        <div className="row">
          <span>Taxes</span>
          <span>₹{taxes.toFixed(2)}</span>
        </div>

        <div className="row total">
          <span>Grand Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="pay-btn"
        onClick={() => navigate("/payment")}
      >
        Proceed to Pay
      </button>
    </div>
  );
}

export default CartPage;