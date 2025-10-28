import ShinyButtonText from "../ShinyButtonText/ShinyButtonText";
import ElectricBorder from "../ElectricBorder/ElectricBorder";
import "./ServicesItem.css";

export default function ServiceslItem({
  item,
  isMobile,
  round,
  style,
  itemRef,
  className,
}) {
  return (
    <ElectricBorder
      color="#00a384"
      speed={1}
      chaos={0.5}
      thickness={2}
      style={{ borderRadius: 16 }}
    >
      <div
        ref={itemRef}
        className={`${className} ${
          isMobile ? "mobile-services-item" : "desktop-services-item"
        } ${round ? "round" : ""}`}
        style={style}
      >
        <span className="services-icon-container">{item.icon}</span>
        <div className="services-item-title normal-heading themed-text">
          {item.title}
        </div>
        <p className="services-item-description normal-text themed-text">
          {item.description}
        </p>
        <a href="#" rel="noreferrer">
          <ShinyButtonText text="Read More" speed={2.5} />
        </a>
      </div>
    </ElectricBorder>
    // <div
    //   ref={itemRef}
    //   className={`${className} ${isMobile ? 'Mobile-highlights-item' : 'desktop-highlights-item'} themed-border ${round ? 'round' : ''}`}
    //   style={style}
    // >
    //   <span className="highlights-icon-container themed-bg">
    //     {item.icon}
    //   </span>

    //   <CountUp
    //     from={0}
    //     to={item.counter}
    //     separator=","
    //     direction="up"
    //     duration={1}
    //     className="count-up lg-heading themed-text"
    //   />
    //   <div className="highlights-item-title normal-heading themed-text">
    //     {item.title}
    //   </div>
    // </div>
  );
}
