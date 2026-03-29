import React from "react";

const OverlayCard = ({ onClick }) => {
  return (
    <div
      style={{
        backdropFilter: "blur(50px)",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        borderRadius: "40px",
        padding: "50px 30px",
        width: "95%",
        maxWidth: "380px",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "30px", marginBottom: "35px" }}>
        Welcome to <br /> Spice Garden
      </h1>

      {/* 🔥 IMPORTANT FIX */}
      <button
        onClick={(e) => {
          e.stopPropagation();     // ✅ prevents any blocking
          console.log("button clicked"); // DEBUG
          onClick && onClick();    // ✅ SAFE CALL
        }}
        style={{
          backgroundColor: "#F8F1E7",
          color: "#4A3228",
          width: "100%",
          padding: "18px",
          borderRadius: "50px",
          fontSize: "18px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
      >
        View Menu
      </button>
    </div>
  );
};

export default OverlayCard;