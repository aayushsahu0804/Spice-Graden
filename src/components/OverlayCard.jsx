import React from "react";

const OverlayCard = ({ onClick }) => {
  return (
    <div className="overlay-card">
      <div className="overlay-logo">🍽️</div>
      <h1 className="overlay-title">
        Welcome to <br />
        <span className="overlay-brand">Spice Garden</span>
      </h1>
      <p className="overlay-subtitle">
        Authentic flavours, crafted with love
      </p>
      <button
        className="overlay-btn"
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
      >
        View Menu
      </button>
    </div>
  );
};

export default OverlayCard;
