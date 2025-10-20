import React from "react";
import GooeyNav from "../GooeyNav/GooeyNav";

const items = [
  { label: "Home", href: "#home", aos: "fade-down"},
  { label: "About Us", href: "#about", aos: "fade-down", aosDelay: "400" },
  { label: "Highlights", href: "#", aos: "fade-down", aosDelay: "800" },
  { label: "Servisece", href: "#", aos: "fade-down", aosDelay: "1200" },
  { label: "Resume", href: "#", aos: "fade-down", aosDelay: "1600" },
  { label: "Projects", href: "#", aos: "fade-down", aosDelay: "2000" },
  { label: "Clients Reviews", href: "#", aos: "fade-down", aosDelay: "2400" },
  { label: "Contact Us", href: "#", aos: "fade-down", aosDelay: "2800" },
];

function Navbar() {
  return (
    <GooeyNav
      items={items}
      particleCount={10}
      particleDistances={[80, 10]}
      particleR={10}
      initialActiveIndex={0}
      animationTime={500}
      timeVariance={100}
      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
    />
  );
}

export default Navbar;
