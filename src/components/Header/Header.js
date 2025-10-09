import React from "react";
import GradientBlinds from "../GradientBlinds/GradientBlinds";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import image1 from "../../assets/image1.png";

function Header() {
  return (
    <header>
      <div className="container">
        <div class="header-design">
          <div class="shape"></div>
        </div>
        <div className="svg-animation" data-aos="zoom-in" data-aos-delay="400">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="-140 -90 1100 1100"
            style={{ enableBackground: "new 0 0 1000 1000" }}
          >
            <circle className="st0" cx="500" cy="500" r="320">
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 500 500"
                to="360 500 500"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>

            <circle
              className="st1"
              cx="500"
              cy="500"
              r="366.8"
              transform="rotate(0 500 500)"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 500 500"
                to="-360 500 500"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>

            <circle className="st2" cx="500" cy="500" r="385.1" />
          </svg>

          <figure className="svg-img-container">
            <img src={image1} alt="rotating design" />
          </figure>
        </div>
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
        <div className="header-content">
          <h1>Welcome to My Website</h1>
          <p>Modern Design powered by React & WebGL ✨</p>
          <button onClick={() => alert("Button clicked!")}>Click Me</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
