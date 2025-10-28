import CountUp from "../CountUp/CountUp";
import "./HighlightsItem.css";

export default function HighlightslItem({
  item,
  isMobile,
  round,
  style,
  itemRef,
  className
}) {
  return (
    <div
      ref={itemRef}
      className={`${className} ${isMobile ? 'mobile-highlights-item' : 'desktop-highlights-item'} themed-border ${round ? 'round' : ''}`}
      style={style}
    >
      <span className="highlights-icon-container themed-bg">
        {item.icon}
      </span>

      <CountUp
        from={0}
        to={item.counter}
        separator=","
        direction="up"
        duration={1}
        className="count-up lg-heading themed-text"
      />
      <div className="highlights-item-title normal-heading themed-text">
        {item.title}
      </div>
    </div>
  );
}