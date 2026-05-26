import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FoodCard from "../../components/FoodCard";
import CartFlash from "../../components/CartFlash";
import "../../index.css";

const categories = ["All", "Starters", "Main Course", "Salad", "Drinks"];

function MenuPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [searchParams] = useSearchParams();

const tableNumber =
  searchParams.get("table") || 1;

  useEffect(() => {
  localStorage.setItem(
    "tableNumber",
    tableNumber
  );
}, [tableNumber]);

  // ✅ Fetch from backend
  useEffect(() => {
    fetch("http://https://spice-garden.onrender.com/api/menu")
      .then(res => res.json())
      .then(data => {
  console.log(data);
 setFoodData(data.data || []);
 console.log("MENU DATA:", data.data);
})
      .catch(err => console.log(err));
  }, []);

  // ✅ Filtering logic
  const filtered = foodData.filter((item) => {
 const matchesCat =
  category === "All" || item.category === category;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const callWaiter = async () => {
  try {
    const response = await fetch(
      "http://https://spice-garden.onrender.com/api/waiter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableNumber: 12,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("🛎 Waiter has been notified!");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to call waiter");
  }
};
 

  return (
    <div className="menu-container">
      
      <CartFlash />
      <Navbar title="Menu" onSearch={setSearch} />
      <div
  style={{
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#c45a00",
  }}
>
  🍽 Table {tableNumber}
</div>

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

      {/* Results count */}
      {search && (
        <p className="search-results-label">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
        </p>
      )}

      {/* Food Grid */}
      {filtered.length > 0 ? (
        <div className="food-grid">
          {filtered.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>🍽️ No dishes found</p>
          <span>Try a different search or category</span>
        </div>
      )}
      <button
  className="call-waiter-float"
  onClick={callWaiter}
  title="Call Waiter"
>
  🛎
</button>
    </div>
  );
}

export default MenuPage;