import GradientText from "../GradientText/GradientText";
import Carousel from "../Carousel/Carousel";
import HighlightsItem from "../HighlightsItem/HighlightsItem";
import { FaProjectDiagram, FaHeart, FaLaptopCode } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import "./Highlights.css";

function Highlights() {
  const HIGHLIGHTS_ITEM = [
    {
      id: 1,
      icon: <IoIosEye className="themed-text" />,
      title: "Views",
      counter: 100,
    },
    {
      id: 2,
      icon: <FaProjectDiagram className="themed-text" />,
      title: "Projects",
      counter: 200,
    },
    {
      id: 3,
      icon: <FaHeart className="themed-text" />,
      title: "Likes",
      counter: 100,
    },
    {
      id: 4,
      icon: <FaLaptopCode className="themed-text" />,
      title: "Skills",
      counter: 100,
    },
  ];
  return (
    <section className="highlights themed-bg">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
        children="Highlights"
      ></GradientText>
      <Carousel
        autoplay={true}
        autoplayDelay={3000}
        pauseOnHover={true}
        renderItem={HighlightsItem}
        items={HIGHLIGHTS_ITEM}
      />
    </section>
  );
}

export default Highlights;
