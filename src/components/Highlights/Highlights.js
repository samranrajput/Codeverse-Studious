import React from "react";
import Carousel from "../Carousel/Carousel";
import GradientText from "../GradientText/GradientText";
import "./Highlights.css";

function Highlights({ isActive }) {
  return (
    <section className="highlights themed-bg">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class"
        children="Highlights"
      ></GradientText>
      <Carousel
        autoplay={true}
        autoplayDelay={3000}
        pauseOnHover={true}
        loop={true}
        round={false}
      />
    </section>
  );
}

export default Highlights;
