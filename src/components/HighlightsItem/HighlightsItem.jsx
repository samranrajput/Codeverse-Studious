import CountUp from "../CountUp/CountUp";
import "./HighlightsItem.css";

export default function HighlightslItem({
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
        isMobile ? "mobile-highlights-item" : "desktop-highlights-item"
      } ${round ? "round" : ""}`}
      style={style}
    >
      <i className="highlights-icon-container">{item.icon}</i>
      <CountUp
        from={0}
        to={item.counter}
        separator=","
        direction="up"
        duration={1}
        className="count-up lg-heading themed-text"
      />
      <p className="highlights-item-title normal-heading themed-text">
        {item.title}
      </p>
    </div>
  );
}
