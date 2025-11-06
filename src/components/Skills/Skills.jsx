import GradientText from "../GradientText/GradientText";
import LogoLoop from "../LogoLoop/LogoLoop";
import PythonIcon from "../PythonIcon/PythonIcon";
import { SiReact, SiPhp } from "react-icons/si";
import "./Skills.css";
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

function Skills() {
  const techLogos = [
    {
      node: <FaHtml5 style={{ color: "#E34F26" }} />,
      title: "HTML",
      href: "https://www.w3schools.com/html/",
    },
    {
      node: <FaCss3Alt style={{ color: "#1572B6" }} />,
      title: "CSS",
      href: "https://www.w3schools.com/css/",
    },
    {
      node: <FaBootstrap style={{ color: "#7952B3" }} />,
      title: "Bootstrap",
      href: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
    },
    {
      node: <RiTailwindCssFill style={{ color: "#06B6D4" }} />,
      title: "Tailwind",
      href: "https://v2.tailwindcss.com/docs",
    },
    {
      node: <RiJavascriptFill style={{ color: "#F7DF1E" }} />,
      title: "Javascript",
      href: "https://www.w3schools.com/js/",
    },
    {
      node: <SiReact style={{ color: "#61DAFB" }} />,
      title: "React",
      href: "https://react.dev/learn",
    },
    {
      node: <RiNodejsLine style={{ color: "#339933" }} />,
      title: "Nodejs",
      href: "https://www.w3schools.com/nodejs/",
    },
    {
      node: <PythonIcon />,
      title: "Python",
      href: "https://docs.python.org/3/",
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
      href: "https://docs.djangoproject.com/en/5.2/",
    },
    {
      node: <FaDatabase style={{ color: "#00618A" }} />,
      title: "Database",
      href: "https://www.w3schools.com/sql/",
    },
    {
      node: <SiPhp style={{ color: "#777BB4" }} />,
      title: "PHP",
      href: "https://www.w3schools.com/php/",
    },
    {
      node: <FaWordpress style={{ color: "#21759B" }} />,
      title: "Wordpress",
      href: "https://wordpress.org/documentation/",
    },
    {
      node: <FaLaravel style={{ color: "#FF2D20" }} />,
      title: "Laravel",
      href: "https://laravel.com/docs/12.x",
    },
    {
      node: <FaDartLang style={{ color: "#0175C2" }} />,
      title: "Dart",
      href: "https://dart.dev/docs",
    },
    {
      node: <FaFlutter style={{ color: "#02569B" }} />,
      title: "Flutter",
      href: "https://docs.flutter.dev/",
    },
    {
      node: <FaGitAlt style={{ color: "#F05032" }} />,
      title: "Git",
      href: "https://git-scm.com/docs",
    },
    {
      node: <FaGithub className="themed-text" />,
      title: "Github",
      href: "https://docs.github.com/en",
    },
    {
      node: <p className="themed-text ai">AI</p>,
      title: "AI",
      href: "https://chatgpt.com/",
    },
  ];

  return (
    <>
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
    </>
  );
}

export default Skills;
