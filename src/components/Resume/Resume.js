import GradientText from "../GradientText/GradientText";
import LogoLoop from "../LogoLoop/LogoLoop";
import PythonIcon from "../PythonIcon/PythonIcon";
import { SiReact, SiPhp } from "react-icons/si";
import "./Resume.css";
import {
  RiTailwindCssFill,
  RiJavascriptFill,
  RiNodejsLine,
} from "react-icons/ri";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaDatabase,
  FaWordpress,
  FaLaravel,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { BiLogoDjango } from "react-icons/bi";
import { FaDartLang, FaFlutter } from "react-icons/fa6";

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
      node: <PythonIcon />,
      title: "Python",
      href: "https://tailwindcss.com",
    },
    {
      node: (
        <BiLogoDjango
          style={{
            borderRadius: "15px",
            background: "#092E20",
            color: "#fff",
          }}
        />
      ),
      title: "Django",
      href: "https://tailwindcss.com",
    },
    {
      node: <FaDatabase style={{ color: "#00618A" }} />,
      title: "Database",
      href: "https://tailwindcss.com",
    },
    {
      node: <SiPhp style={{ color: "#777BB4" }} />,
      title: "PHP",
      href: "https://tailwindcss.com",
    },
    {
      node: <FaWordpress style={{ color: "#21759B" }} />,
      title: "Wordpress",
      href: "https://tailwindcss.com",
    },
    {
      node: <FaLaravel style={{ color: "#FF2D20" }} />,
      title: "Laravel",
      href: "https://tailwindcss.com",
    },
    {
      node: <FaDartLang style={{ color: "#0175C2" }} />,
      title: "Dart",
      href: "https://tailwindcss.com",
    },
    {
      node: <FaFlutter style={{ color: "#02569B" }} />,
      title: "Flutter",
      href: "https://tailwindcss.com",
    },
    {
      node: <FaGitAlt style={{ color: "#F05032" }} />,
      title: "Git",
      href: "https://tailwindcss.com",
    },
    {
      node: <FaGithub className="themed-text" />,
      title: "Github",
      href: "https://tailwindcss.com",
    },
    {
      node: (
        <p className="themed-text ai">
          AI
        </p>
      ),
      title: "AI",
      href: "https://tailwindcss.com",
    },
  ];

  return (
    <section className="Resume themed-bg">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
        children="My Skills"
      ></GradientText>
      <LogoLoop
        logos={techLogos}
        speed={150}
        direction="left"
        gap={0.5}
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
