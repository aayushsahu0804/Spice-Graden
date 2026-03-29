import { FaStar } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} className="food-img" />

      <div className="food-content">
        <div className="food-header">
          <h3>{food.name}</h3>
          <FaStar className="star" />
        </div>

        <p className="price">₹{food.price}</p>

        {/* ✅ FIXED BUTTON */}
        <button className="add-btn" onClick={() => addToCart(food)}>
          <FiPlus /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;