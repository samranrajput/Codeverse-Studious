import ProfileCard from "../ProfileCard/ProfileCard";
import SplitText from "../SplitText/SplitText";
import GradientText from "../GradientText/GradientText";
import aboutImage from "../../assets/my_image2.png";
import sideBarLogo from "../../assets/logo2.png";
import "./AboutUs.css";

function AboutUs({ isActive }) {
  return (
    <div className="about-content">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
        children="About Us"
      ></GradientText>
      <div className="container">
        <div className="profile-card">
          <ProfileCard
            name="Muhammad Samran"
            title="Software Engineer"
            handle="codeverse_studious"
            status="Online"
            contactText="Contact Me"
            avatarUrl={aboutImage}
            iconUrl={sideBarLogo}
            miniAvatarUrl={sideBarLogo}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
        </div>
        <div className="story sm-heading">
          <SplitText
            text="I started learning programming at the age of 15, and now at 18, I proudly hold 6 programming certificates. My passion for coding drives me to create powerful, dynamic, and visually appealing websites that bring ideas to life. Over the past three years, I have built many real-world projects some of which you can explore below in the projects section."
            className="text-2xl font-semibold text-center themed-text"
            delay={20}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
