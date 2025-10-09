import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <>
      <Header />
    </>
  );
}

export default App;
