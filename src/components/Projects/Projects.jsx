import ProjectsItem from "../ProjectsItem/ProjectsItem";
import GradientText from "../GradientText/GradientText";
import Carousel from "../Carousel/Carousel";
import Project1 from "../../assets/project1.png";
import Project2 from "../../assets/project2.png";

function Projects() {
  const PROJECTS_ITEM = [
    {
      id: 1,
      image: Project1,
      title: "Digital Clock Analog Clock",
      description:
        "I build visually stunning and responsive websites using modern front-end technologies like HTML, CSS, JavaScript, React, and Tailwind CSS.",
      projectLink: "https://digital-clock-and-analog-clock.vercel.app/",
      githubLink:
        "https://github.com/samranrajput/Digital-Clock-and-Analog-Clock",
    },
    {
      id: 2,
      image: Project2,
      title: "Character Scroll",
      description:
        "I build visually stunning and responsive websites using modern front-end technologies like HTML, CSS, JavaScript, React, and Tailwind CSS.",
      projectLink: "https://character-scroll-gamma.vercel.app/",
      githubLink: "https://github.com/samranrajput/Character-Scroll",
    },
    {
      id: 3,
      image: Project1,
      title: "Mobile Application Development",
      description:
        "I build visually stunning and responsive websites using modern front-end technologies like HTML, CSS, JavaScript, React, and Tailwind CSS.",
    },
    {
      id: 4,
      image: Project1,
      title: "Front-End Web Development",
      description:
        "I build visually stunning and responsive websites using modern front-end technologies like HTML, CSS, JavaScript, React, and Tailwind CSS.",
    },
    {
      id: 5,
      image: Project1,
      title: "Back-End Web Development",
      description:
        "I build visually stunning and responsive websites using modern front-end technologies like HTML, CSS, JavaScript, React, and Tailwind CSS.",
    },
    {
      id: 6,
      image: Project1,
      title: "Mobile Application Development",
      description:
        "I build visually stunning and responsive websites using modern front-end technologies like HTML, CSS, JavaScript, React, and Tailwind CSS.",
    },
  ];
  return (
    <>
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
        children="My Projects"
      ></GradientText>
      <Carousel
        autoplay={true}
        autoplayDelay={3000}
        pauseOnHover={true}
        renderItem={ProjectsItem}
        items={PROJECTS_ITEM}
      />
    </>
  );
}

export default Projects;
