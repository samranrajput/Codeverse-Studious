import React from "react";
import GooeyNav from "../GooeyNav/GooeyNav";

const items = [
  { label: "Home", href: "#" },
  { label: "Highlights", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Resume", href: "#" },
  { label: "Servisece", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Clients Reviews", href: "#" },
  { label: "Contact Us", href: "#" },
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
