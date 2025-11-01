import ElectricBorder from "../ElectricBorder/ElectricBorder";
import "./ServicesItem.css";

export default function ServiceslItem({
  item,
  isMobile,
  round,
  style,
  itemRef,
  className,
  isActive,
}) {
  return (
    <ElectricBorder
      color="#00a384"
      speed={1}
      chaos={0.5}
      thickness={2}
      style={{ borderRadius: 16 }}
      isActive={isActive}
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
      </div>
    </ElectricBorder>
  );
}
