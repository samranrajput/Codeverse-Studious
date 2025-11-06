import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";
import "./ProjectsItem.css";

export default function ProjectslItem({
  item,
  isMobile,
  round,
  style,
  itemRef,
  className,
}) {
  return (
    <div
      ref={itemRef}
      className={`${className} ${
        isMobile ? "mobile-projects-item" : "desktop-projects-item"
      } themed-border ${round ? "round" : ""}`}
      style={style}
    >
      <img src={item.image} alt="Project" className="no-select"></img>
      <div className="ovelay">
        <p className="projects-item-title normal-heading">{item.title}</p>
        <p className="projects-item-description lg-text">{item.description}</p>
        <div className="projects-item-icon-container">
          <a
            href={item.projectLink}
            target="_blank"
            rel="noreferrer"
            className="new-tab-icon"
          >
            <FaArrowUpRightFromSquare />
          </a>
          <a
            href={item.githubLink}
            target="_blank"
            rel="noreferrer"
            className="github-icon"
          >
            <TbBrandGithubFilled />
          </a>
        </div>
      </div>
    </div>
  );
}
