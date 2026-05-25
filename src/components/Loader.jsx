import React from "react";
import "../index.css";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner" />
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;
