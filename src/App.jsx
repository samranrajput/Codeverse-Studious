import { useState, useEffect, useRef } from "react";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Highlights from "./components/Highlights/Highlights";
import Services from "./components/Services/Services";
import AboutUs from "./components/AboutUs/AboutUs";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
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
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

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
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Push Test */}
      <SmoothScroll />
      <header class="themed-bg" id="home" ref={homeRef}>
        <Home isActive={activeSection === "home"} />
      </header>

      <section className="about themed-bg" id="about" ref={aboutRef}>
        <AboutUs isActive={activeSection === "about"} />
      </section>

      <section
        className="highlights themed-bg"
        id="highlights"
        ref={highlightsRef}
      >
        <Highlights isActive={activeSection === "highlights"} />
      </section>

      <section className="services themed-bg" id="services" ref={highlightsRef}>
        <Services isActive={activeSection === "services"} />
      </section>

      <section className="skills themed-bg" id="skills" ref={skillsRef}>
        <Skills isActive={activeSection === "skills"} />
      </section>

      <section className="projects themed-bg" id="projects" ref={projectsRef}>
        <Projects isActive={activeSection === "projects"} />
      </section>
    </>
  );
}

export default App;
