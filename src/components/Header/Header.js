import React from "react";
import GradientBlinds from "../GradientBlinds/GradientBlinds";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="container">
      <Navbar />
      <div className="header-gradient">
        <GradientBlinds
          gradientColors={["#00a384", "#00a384"]}
          angle={50}
          noise={0}
          blindCount={64}
          blindMinWidth={40}
          spotlightRadius={0.6}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={1}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* 🌟 Overlay Content */}
      <div className="header-overlay">
        <h1>Welcome to My Website</h1>
        <p>Modern Design powered by React & WebGL ✨</p>
        <button onClick={() => alert("Button clicked!")}>Click Me</button>
      </div>
      </div>
    </header>
  );
}

export default Header;
