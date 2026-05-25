import { FaStar } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function FoodCard({ food }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  const cartItem = cart.find((i) => i.name === food.name);
  const inCart = cartItem?.qty > 0;

  return (
    <div
      className="food-card"
      onClick={() =>
        navigate(`/food/${encodeURIComponent(food.name)}`, { state: { food } })
      }
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/food/${encodeURIComponent(food.name)}`, { state: { food } })}
    >
      <div className="food-img-wrap">
        <img src={food.image} alt={food.name} className="food-img" loading="lazy" />
        {inCart && <span className="food-in-cart-badge">{cartItem.qty} in cart</span>}
      </div>

      <div className="food-content">
        <div className="food-header">
          <h3 className="food-name">{food.name}</h3>
          <div className="rating-box">
            <FaStar className="star" />
            <span>4.7</span>
          </div>
        </div>

        <p className="price">₹{food.price}</p>

        <button
          className="add-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(food);
          }}
          aria-label={`Add ${food.name} to cart`}
        >
          <FiPlus /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
