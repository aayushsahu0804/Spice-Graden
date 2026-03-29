import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

// React Icons
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";

function Navbar({ title, showCart = true }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Back Button */}
        <button
          className="icon-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>

        {/* Title */}
        <span className="navbar-title">{title}</span>

        {/* Cart */}
        {showCart ? (
          <button
            className="icon-button"
            onClick={() => navigate("/cart")}
            aria-label="View cart"
          >
            <FaShoppingCart />
          </button>
        ) : (
          <div className="icon-spacer"></div>
        )}
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="search" placeholder="Search..." />
      </div>
    </nav>
  );
}

export default Navbar;