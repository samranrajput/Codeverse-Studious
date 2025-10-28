import ServicesItem from "../ServicesItem/ServicesItem";
import GradientText from "../GradientText/GradientText";
import Carousel from "../Carousel/Carousel";
import { FaLaptopCode, FaDatabase, FaPalette } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { FcSmartphoneTablet } from "react-icons/fc";
import { VscRobot } from "react-icons/vsc";
import "./Services.css";

function Services() {
  const SERVICES_ITEM = [
    {
      id: 1,
      icon: <FaLaptopCode />,
      title: "Front-End Web Development",
      description:
        "I build visually stunning and responsive websites using modern front-end technologies like HTML, CSS, JavaScript, React, and Tailwind CSS. My focus is on creating fast, accessible, and user-friendly web interfaces that engage visitors and perform flawlessly on all devices.",
    },
    {
      id: 2,
      icon: <FaDatabase />,
      title: "Back-End Web Development",
      description:
        "I develop powerful and secure back-end systems with Python (Django) and PHP. From database design to API creation and authentication systems, I ensure your website is reliable, scalable, and efficient from the inside out.",
    },
    {
      id: 3,
      icon: <FcSmartphoneTablet />,
      title: "Mobile Application Development",
      description:
        "I create cross-platform mobile applications with smooth UI, fast performance, and real-time database integration. Whether it’s Android or iOS, I deliver user-focused mobile solutions that bring your ideas to life.",
    },
    {
      id: 4,
      icon: <BsBarChartFill />,
      title: "Website SEO Optimization",
      description:
        "I optimize websites for better ranking and visibility on Google through clean code, meta tags, page speed improvements, and mobile-friendly structures. Strong SEO ensures more organic traffic and long-term growth for your business.",
    },
    {
      id: 5,
      icon: <FaPalette />,
      title: "UI/UX Design for Website",
      description:
        "I design elegant and user-centered web interfaces focusing on usability, visual appeal, and smooth navigation. My goal is to create layouts that not only look amazing but also enhance user experience and engagement.",
    },
    {
      id: 6,
      icon: <VscRobot />,
      title: "Online Management System with AI Chatbot",
      description:
        "I develop complete online management systems (school, hospital, or business) with integrated AI chatbots that automate communication and handle user queries smartly. These systems improve efficiency, data handling, and real-time user support.",
    },
  ];
  return (
    <section className="services themed-bg">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
        children="Services"
      ></GradientText>
      <Carousel
        autoplay={true}
        autoplayDelay={3000}
        pauseOnHover={true}
        renderItem={ServicesItem}
        items={SERVICES_ITEM}
      />
    </section>
  );
}

export default Services;
