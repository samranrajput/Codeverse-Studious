import GradientText from "../GradientText/GradientText";
import LogoLoop from "../LogoLoop/LogoLoop";
import PythonIcon from "../PythonIcon/PythonIcon";
import { SiReact } from "react-icons/si";
import {
  RiTailwindCssFill,
  RiJavascriptFill,
  RiNodejsLine,
} from "react-icons/ri";
import { FaHtml5, FaCss3Alt, FaBootstrap, FaPython } from "react-icons/fa";
import "./Resume.css";

function Resume() {
  const techLogos = [
    {
      node: <FaHtml5 style={{ color: "#E34F26" }} />,
      title: "HTML",
      href: "https://nextjs.org",
    },
    {
      node: <FaCss3Alt style={{ color: "#1572B6" }} />,
      title: "CSS",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <FaBootstrap style={{ color: "#7952B3" }} />,
      title: "Bootstrap",
      href: "https://tailwindcss.com",
    },
    {
      node: <RiTailwindCssFill style={{ color: "#06B6D4" }} />,
      title: "Tailwind",
      href: "https://tailwindcss.com",
    },
    {
      node: <RiJavascriptFill style={{ color: "#F7DF1E" }} />,
      title: "Javascript",
      href: "https://tailwindcss.com",
    },
    {
      node: <SiReact style={{ color: "#61DAFB" }} />,
      title: "React",
      href: "https://react.dev",
    },
    {
      node: <RiNodejsLine style={{ color: "#339933" }} />,
      title: "Nodejs",
      href: "https://tailwindcss.com",
    },
    {
      node: <PythonIcon/>,
      title: "Python",
      href: "https://tailwindcss.com",
    },
  ];

  return (
    <section className="Resume themed-bg">
      <h1 className="lg-text py">Samran</h1>
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
        children="My Resume"
      ></GradientText>
      <LogoLoop
        logos={techLogos}
        speed={150}
        direction="left"
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#000"
        ariaLabel="Technology partners"
      />
    </section>
  );
}

export default Resume;
