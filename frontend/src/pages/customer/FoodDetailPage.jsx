import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaHeart, FaStar, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import CartFlash from "../../components/CartFlash";
import QuantityControl from "../../components/QuantityControl";
import "../../index.css";

const allFoods = [
  {
    name: "Burger", price: 150, category: "Starters", image: "/burger.jpg",
    description: "Welcome to our restaurant with our delicious homemade Burger. A taste sensation with bold flavours — crispy on the outside, juicy on the inside.",
    ingredients: ["Paneer", "Flour", "Salsa", "Cheddar", "Parsley"], rating: 4.7,
  },
  {
    name: "Pasta", price: 200, category: "Main Course", image: "/pasta.jpg",
    description: "Creamy pasta made with fresh ingredients, herbs and rich tomato sauce.",
    ingredients: ["Pasta", "Tomato", "Basil", "Garlic", "Cheese"], rating: 4.7,
  },
  {
    name: "Salad", price: 120, category: "Salad", image: "/salad.jpg",
    description: "Fresh garden salad with crispy greens and tangy dressing.",
    ingredients: ["Lettuce", "Tomato", "Cucumber", "Olive Oil", "Lemon"], rating: 4.7,
  },
  {
    name: "Juice", price: 90, category: "Drinks", image: "/juice.jpg",
    description: "Freshly squeezed seasonal fruit juice, chilled and refreshing.",
    ingredients: ["Orange", "Mango", "Pineapple", "Mint"], rating: 4.7,
  },
 
  {
    name: "Cheese Burger", price: 80, category: "Desserts", image: "/burger.jpg",
    description: "Creamy hand-churned ice cream in assorted flavours.",
    ingredients: ["Milk", "Cream", "Sugar", "Vanilla", "Cocoa"], rating: 4.7,
  },
];

function FoodDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = useParams();
  const { addToCart, cartCount } = useCart();

  const food =
    location.state?.food ||
    allFoods.find((f) => f.name === decodeURIComponent(name)) ||
    allFoods[0];

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(food);
  };

  return (
    <div className="detail-page">
      <CartFlash />

      {/* Hero Image */}
      <div className="detail-hero">
        <img src={food.image} alt={food.name} className="detail-hero-img" />

        <div className="detail-topnav">
          <button className="detail-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <FaArrowLeft />
          </button>
          <button className="detail-cart-btn" onClick={() => navigate("/cart")} aria-label="View cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        <button
          className={`detail-like-btn ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <FaHeart />
        </button>
      </div>

      {/* Content Sheet */}
      <div className="detail-sheet">
        <div className="detail-title-row">
          <h2 className="detail-title">{food.name}</h2>
          <div className="detail-rating">
            <FaStar className="star" />
            <span>{food.rating}</span>
          </div>
        </div>

        <p className="detail-category-tag">{food.category}</p>
        <p className="detail-desc">{food.description}</p>

        {/* Ingredients */}
        <h4 className="detail-section-label">Ingredients</h4>
        <div className="detail-ingredients">
          {food.ingredients?.map((ing, i) => (
            <span key={i} className="ingredient-chip">{ing}</span>
          ))}
        </div>

        {/* Bottom Row — Qty + Add to Cart */}
        <div className="detail-bottom">
          <QuantityControl
            qty={qty}
            onInc={() => setQty(qty + 1)}
            onDec={() => setQty(Math.max(1, qty - 1))}
          />
          <button className="detail-add-btn" onClick={handleAdd}>
            Add {qty > 1 ? `(${qty}) ` : ""}to Cart · ₹{food.price * qty}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodDetailPage;
