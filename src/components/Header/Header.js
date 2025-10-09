import React from "react";
import GradientBlinds from "../GradientBlinds/GradientBlinds";
import Navbar from "../Navbar/Navbar";
import BlurText from "../BlurText/BlurText";
import "./Header.css";
import headerImage from "../../assets/header-image.png";

function Header() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <header>
      <div className="container">
        <div class="header-design">
          <div
            className="svg-animation"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1000 1000"
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
              <img src={headerImage} alt="Header Image" />
            </figure>
          </div>
          <div className="shape"></div>
        </div>
        {/* Skill Container */}
        <div className="skill-container">
          <div className="ring">
            <div className="skill skill1 lg-text text-center bg-light-mode text-them">
              <i className="fa-solid fa-code sm-heading"></i>
              <p className="lg-text">
                Frontend Web <br />
                Developer
              </p>
            </div>
            <div className="skill skill2 lg-text text-center bg-light-mode text-them">
              <i className="fa-solid fa-database sm-heading"></i>
              <p className="lg-text">
                Backend Web <br />
                Developer
              </p>
            </div>
            <div className="skill skill3 lg-text text-center bg-light-mode text-them">
              <i className="fa-solid fa-mobile-screen-button sm-heading"></i>
              <p className="lg-text">
                Mobile Application
                <br />
                Developer
              </p>
            </div>
            <div className="skill skill4 lg-text text-center bg-light-mode text-them">
              <i className="fa-solid fa-pen-nib sm-heading"></i>
              <p className="lg-text">Graphic Designer</p>
            </div>
          </div>
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
          <h1 className="lg-heading">
            <BlurText
              text="Hello, I'm"
              delay={200}
              animateBy="char"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl mb-4"
            />
            <i>
              <BlurText
                text="Muhammad Samran"
                delay={200}
                animateBy="char"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-4"
              />
            </i>
          </h1>
          <h1 className="lg-heading">
            <BlurText
              text="And I'm a"
              delay={200}
              animateBy="char"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl mb-4"
            />
            <i>
              <BlurText
                text="Software Engineer"
                delay={200}
                animateBy="char"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-4"
              />
            </i>
          </h1>
          <p>Modern Design powered by React & WebGL ✨</p>
          <button onClick={() => alert("Button clicked!")}>Click Me</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
