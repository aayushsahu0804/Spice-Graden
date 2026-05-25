import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../index.css";

function Navbar({ title, showCart = true, onSearch }) {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch && onSearch(val);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button
          className="icon-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>

        <span className="navbar-title">{title}</span>

        {showCart ? (
          <button
            className="icon-button cart-icon-btn"
            onClick={() => navigate("/cart")}
            aria-label="View cart"
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        ) : (
          <div className="icon-spacer" />
        )}
      </div>

      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="search"
          placeholder="Search dishes..."
          value={query}
          onChange={handleSearch}
          aria-label="Search dishes"
        />
      </div>
    </nav>
  );
}

export default Navbar;
