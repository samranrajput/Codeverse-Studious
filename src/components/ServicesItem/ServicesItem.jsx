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
    <div
      ref={itemRef}
      className={`${className} ${
        isMobile ? "mobile-services-item" : "desktop-services-item"
      } ${round ? "round" : ""}`}
      style={style}
    >
      <i className="services-icon-container">{item.icon}</i>
      <p className="services-item-title normal-heading themed-text">
        {item.title}
      </p>
      <p className="services-item-description normal-text themed-text">
        {item.description}
      </p>
    </div>
  );
}
