import React from "react";
import "./ShinyButtonText.css";

const ShinyButtonText = ({ text = "Shiny Button", speed = 3, disabled = false, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <button
      className={`shiny-button-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ "--shine-speed": animationDuration }}
      disabled={disabled}
    >
      <span className="shine-text normal-text">{text}</span>
    </button>
  );
};

export default ShinyButtonText;
