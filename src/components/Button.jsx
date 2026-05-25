import React from "react";
import "../index.css";

const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
}) => {
  return (
    <button
      className={`
        custom-button 
        ${disabled ? "disabled" : ""} 
        ${fullWidth ? "full-width" : ""} 
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;