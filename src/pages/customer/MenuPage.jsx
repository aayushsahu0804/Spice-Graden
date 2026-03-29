import { useState } from "react";
import Navbar from "../../components/Navbar";
import FoodCard from "../../components/FoodCard";
import "../../index.css";

function MenuPage() {
  const [category, setCategory] = useState("Starters");

  const foodData = [
    { name: "Burger", price: 150, category: "Starters", image: "/burger.jpg" },
    { name: "Pasta", price: 200, category: "Main Course", image: "/pasta.jpg" },
    { name: "Salad", price: 120, category: "Salad", image: "/salad.jpg" },
    { name: "Juice", price: 90, category: "Drinks", image: "/juice.jpg" },
    { name: "Pizza", price: 250, category: "Main Course", image: "/salad.jpg" },
    { name: "Ice Cream", price: 80, category: "Salad", image: "/burger.jpg" },
  ];

  const categories = ["Starters", "Main Course", "Salad", "Drinks"];

  const filtered = foodData.filter((item) => item.category === category);

  return (
    <div className="menu-container">
      {/* Navbar */}
      <Navbar title="Menu" />

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="food-grid">
        {filtered.map((food, index) => (
          <FoodCard key={index} food={food} />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;