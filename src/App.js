import { useState, useEffect, useRef } from "react";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Highlights from "./components/Highlights/Highlights";
import Services from "./components/Services/Services";
import AboutUs from "./components/AboutUs/AboutUs";
import Home from "./components/Home/Home";
import "aos/dist/aos.css";
import AOS from "aos";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const [activeSection, setActiveSection] = useState("home");
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const highlightsRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    if (homeRef.current) observer.observe(homeRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (highlightsRef.current) observer.observe(highlightsRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SmoothScroll />
      <div id="home" ref={homeRef}>
        <Home isActive={activeSection === "home"} />
      </div>

      <div id="about" ref={aboutRef}>
        <AboutUs isActive={activeSection === "about"} />
      </div>

      <div id="highlights" ref={highlightsRef}>
        <Highlights isActive={activeSection === "highlights"} />
      </div>

      <div id="services" ref={highlightsRef}>
        <Services isActive={activeSection === "services"} />
      </div>
    </>
  );
}

export default App;
