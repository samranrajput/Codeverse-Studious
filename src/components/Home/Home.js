import ShinyButtonText from "../ShinyButtonText/ShinyButtonText";
import GradientBlinds from "../GradientBlinds/GradientBlinds";
import myResume from "../../assets/docs/my_resume.pdf";
import { FaMobileScreenButton } from "react-icons/fa6";
import headerImage from "../../assets/my_image.png";
import GlassIcons from "../GlassIcons/GlassIcons";
import TextType from "../TextType/TextType";
import BlurText from "../BlurText/BlurText";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import {
  FaGithub,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
  FaCode,
  FaDatabase,
  FaPenNib,
} from "react-icons/fa";

function Home({ isActive }) {
  const items = [
    {
      icon: <FaInstagram />,
      color: "#00a384",
      label: "Instagram",
      link: "https://www.instagram.com/codeverse_studious/",
      aos: "fade-right",
    },
    {
      icon: <FaTiktok />,
      color: "#00a384",
      label: "Tiktok",
      link: "https://www.tiktok.com/@codeverse_studious",
      aos: "fade-right",
    },
    {
      icon: <FaLinkedinIn />,
      color: "#00a384",
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/codeverse-studios/",
      aos: "fade-down",
    },
    {
      icon: <FaWhatsapp />,
      color: "#00a384",
      label: "Whatsapp",
      link: "https://whatsapp.com/channel/0029VaDYqDWHVvTRrQ5OoN3p",
      aos: "fade-down",
    },
    {
      icon: <FaFacebookF />,
      color: "#00a384",
      label: "Facebook",
      link: "https://www.facebook.com/codeversestudious",
      aos: "fade-left",
    },
    {
      icon: <FaGithub />,
      color: "#00a384",
      label: "GibHub",
      link: "https://github.com/samranrajput",
      aos: "fade-left",
    },
  ];

  return (
    <header class="themed-bg">
      <div className="container">
        <div className="header-gradient themed-bg">
          <GradientBlinds
            gradientColors={["#00a384", "#00a384"]}
            angle={50}
            noise={0}
            blindCount={64}
            blindMinWidth={40}
            spotlightRadius={0.6}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={1}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
            paused={!isActive}
          />
        </div>
        <Navbar />
        <div class="header-design">
          <div
            className="svg-animation"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1000 1000"
              style={{ enableBackground: "new 0 0 1000 1000" }}
            >
              <circle className="st0" cx="500" cy="500" r="320">
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 500 500"
                  to="360 500 500"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                className="st1"
                cx="500"
                cy="500"
                r="366.8"
                transform="rotate(0 500 500)"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 500 500"
                  to="-360 500 500"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle className="st2" cx="500" cy="500" r="385.1" />
            </svg>

            <figure className="svg-img-container">
              <img src={headerImage} alt="My Frame" />
            </figure>
          </div>
          <div className="shape"></div>
        </div>
        <div className="skill-container">
          <div className="ring">
            <div className="skill skill1 lg-text text-center bg-light-mode text-them">
              <i className="normal-heading">
                <FaCode />
              </i>
              <p className="lg-text">
                Frontend Web <br />
                Developer
              </p>
            </div>
            <div className="skill skill2 lg-text text-center bg-light-mode text-them">
              <i className="normal-heading">
                <FaDatabase />
              </i>
              <p className="normal-text">
                Backend Web <br />
                Developer
              </p>
            </div>
            <div className="skill skill3 lg-text text-center bg-light-mode text-them">
              <i className="normal-heading">
                <FaMobileScreenButton />
              </i>
              <p className="lg-text">
                Mobile Application
                <br />
                Developer
              </p>
            </div>
            <div className="skill skill4 lg-text text-center bg-light-mode text-them">
              <i className="normal-heading">
                <FaPenNib />
              </i>
              <p className="lg-text">Graphic Designer</p>
            </div>
          </div>
        </div>
        <div className="header-content">
          <h1 className="lg-heading">
            <BlurText
              text="Hello, I'm"
              delay={200}
              animateBy="char"
              direction="top"
              className="stylish-heading themed-text"
            />
            <BlurText
              text="Muhammad Samran"
              delay={200}
              animateBy="char"
              direction="top"
              className="stylish-font"
            />
          </h1>
          <h1 className="lg-heading">
            <BlurText
              text="And I'm a"
              delay={200}
              animateBy="char"
              direction="top"
              className="stylish-heading themed-text"
            />
            <BlurText
              text="Software Engineer"
              delay={200}
              animateBy="char"
              direction="top"
              className="stylish-font"
            />
          </h1>
          <TextType
            text={[
              "I'm a Full Stack Web Developer who loves building websites that don't just look great they perform beautifully.",
              "From dynamic business websites to full-scale web applications, I turn ideas into reality with clean code and modern design.",
              "My goal is to help businesses grow online through fast, secure, and engaging digital experiences.",
              "If you're looking for a developer who truly cares about quality, you're in the right place.",
            ]}
            typingSpeed={30}
            pauseDuration={5000}
            showCursor={true}
            cursorCharacter="_"
            className="lg-text paragraph themed-text"
          />
          <div className="icon-container">
            <GlassIcons items={items} className="custom-class" />
          </div>
          <div className="btn-container">
            <a
              href={myResume}
              target="_blank"
              rel="noreferrer"
              data-aos="fade-right"
            >
              <ShinyButtonText text="My Resume" speed={2.5} />
            </a>
            <a
              href="https://wa.me/923172960156"
              target="_blank"
              rel="noreferrer"
              data-aos="fade-left"
            >
              <ShinyButtonText text="Hire Me Now !" speed={2.5} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
