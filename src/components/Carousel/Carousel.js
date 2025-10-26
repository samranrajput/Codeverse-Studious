import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { FaProjectDiagram, FaHeart, FaLaptopCode } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import CountUp from "../CountUp/CountUp";
import "./Carousel.css";

const DEFAULT_ITEMS = [
  {
    title: "Views",
    counter: 100,
    id: 1,
    icon: <IoIosEye className="carousel-icon themed-text" />,
  },
  {
    title: "Projects",
    counter: 200,
    id: 2,
    icon: <FaProjectDiagram className="carousel-icon themed-text" />,
  },
  {
    title: "Likes",
    counter: 100,
    id: 3,
    icon: <FaHeart className="carousel-icon themed-text" />,
  },
  {
    title: "Skills",
    counter: 100,
    id: 4,
    icon: <FaLaptopCode className="carousel-icon themed-text" />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 100, damping: 50 };

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

function DesktopList({ items = DEFAULT_ITEMS, round = false }) {
  return (
    <div className="desktop-list-container">
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className={`desktop-list-item themed-border ${round ? "round" : ""}`}
          // style={{
          //   ...(round ? { /* custom round desktop styles */ } : {}),
          // }}
        >
          <span className="carousel-icon-container themed-bg">{item.icon}</span>
          <CountUp
            from={0}
            to={item.counter}
            separator=","
            direction="up"
            duration={1}
            className="count-up lg-heading themed-text"
          />
          <div className="carousel-item-title themed-text normal-heading">
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileCarousel({
  items = DEFAULT_ITEMS,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  round = false,
}) {
  const [measuredItemWidth, setMeasuredItemWidth] = useState(0);
  const itemRef = useRef(null);
  const carouselItems = items;
  const trackItemOffset = measuredItemWidth + GAP;
  const numItems = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const effectiveTransition = SPRING_OPTIONS;
  const containerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === numItems - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, numItems, pauseOnHover]);

  useEffect(() => {
    const currentItemRef = itemRef.current;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const newWidth = entries[0].contentRect.width;
        if (newWidth > 0) {
          setMeasuredItemWidth(newWidth);
        }
      }
    });

    if (currentItemRef) {
      observer.observe(currentItemRef);
    }

    return () => {
      if (currentItemRef) {
        observer.unobserve(currentItemRef);
      }
    };
  }, []);

  const isMeasured = measuredItemWidth > 0;

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, numItems - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const dragProps = {
    dragConstraints: {
      left: isMeasured ? -trackItemOffset * (numItems - 1) : 0,
      right: 0,
    },
  };

  return (
    <div
      ref={containerRef}
      className={`carousel-container themed-border ${round ? "round" : ""}`}
      style={{
        visibility: isMeasured ? "visible" : "hidden",
        ...(round && { borderRadius: "50%" }),
      }}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        {...(isMeasured ? dragProps : {})}
        style={{
          width: measuredItemWidth ? measuredItemWidth : "auto",
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + measuredItemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: isMeasured ? -(currentIndex * trackItemOffset) : 0 }}
        transition={effectiveTransition}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });

          return (
            <motion.div
              key={index}
              ref={index === 0 ? itemRef : null}
              className={`carousel-item themed-border ${round ? "round" : ""}`}
              style={{
                rotateY: isMeasured ? rotateY : 0,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              <div className={`carousel-item-header ${round ? "round" : ""}`}>
                <span className="carousel-icon-container themed-bg">
                  {item.icon}
                </span>
              </div>
              <CountUp
                from={0}
                to={item.counter}
                separator=","
                direction="up"
                duration={1}
                className="count-up lg-heading themed-text"
              />
              <div className="carousel-item-title normal-heading themed-text">
                {item.title}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`carousel-indicator ${
                currentIndex % numItems === index ? "active" : "inactive"
              }`}
              animate={{
                scale: currentIndex % numItems === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Carousel(props) {
  const showCarouselEffect = useMediaQuery(
    "(max-width: 850px) and (orientation: portrait)"
  );

  if (showCarouselEffect) {
    return <MobileCarousel {...props} />;
  }

  return <DesktopList items={props.items} round={props.round} />;
}
