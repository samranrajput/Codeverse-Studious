import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo3.png";

function Navbar() {
  return (
    <nav>
      <figure>
        <img src={logo} alt="Codeverse Studious Logo"></img>
      </figure>
      <ul>
        <li>Home</li>
        <li>Heighlights</li>
        <li>About Us</li>
        <li>Servicese</li>
        <li>Resume</li>
        <li>Projects</li>
        <li>Contact Us</li>
      </ul>
      <div>
        <p>mode</p>
      </div>
    </nav>
  );
}

export default Navbar;
