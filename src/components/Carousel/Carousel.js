import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import "./Carousel.css";
import CountUp from "../CountUp/CountUp";
// replace icons with your own if needed
import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
} from "react-icons/fi";

// ... (DEFAULT_ITEMS array waisa hi rahega) ...
const DEFAULT_ITEMS = [
  {
    title: "Text Animations",
    counter: 100,
    id: 1,
    icon: <FiFileText className="carousel-icon themed-text" />,
  },
  {
    title: "Animations",
    counter: 200,
    id: 2,
    icon: <FiCircle className="carousel-icon themed-text" />,
  },
  {
    title: "Components",
    counter: 100,
    id: 3,
    icon: <FiLayers className="carousel-icon themed-text" />,
  },
  {
    title: "Backgrounds",
    counter: 100,
    id: 4,
    icon: <FiLayout className="carousel-icon themed-text" />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 100, damping: 50 };

// --- 1. Custom Hook for Media Query (Unchanged) ---
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

// --- 2. Simple List Component for Desktop (Unchanged) ---
function DesktopList({
  items = DEFAULT_ITEMS,
  // desktopBaseWidth, // Removed
  round = false,
}) {
  return (
    <div className="desktop-list-container">
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className={`desktop-list-item themed-border ${round ? "round" : ""}`}
          style={{
            // width: `${desktopBaseWidth}px`, // Removed
            ...(round),
          }}
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
          <div className="carousel-item-title themed-text sm-heading">
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- 3. Full Carousel Component for Mobile (Unchanged) ---
function MobileCarousel({
  items = DEFAULT_ITEMS,
  // mobileBaseWidth = 300, // REMOVED
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  // ** NEW: State to store the measured width of an item **
  const [measuredItemWidth, setMeasuredItemWidth] = useState(0);
  const itemRef = useRef(null); // Ref to measure the first item

  // ** UPDATED: All calculations now depend on measuredItemWidth **
  const trackItemOffset = measuredItemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null); // This ref is still used for pauseOnHover

  // pauseOnHover useEffect (Unchanged)
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

  // autoplay useEffect (Unchanged)
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  // ** NEW: useEffect to measure item width using ResizeObserver **
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const newWidth = entries[0].contentRect.width;
        if (newWidth > 0) {
          setMeasuredItemWidth(newWidth);
        }
      }
    });

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []); // Run only once on mount

  const isMeasured = measuredItemWidth > 0;

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`carousel-container themed-border ${round ? "round" : ""}`}
      style={{
        // width: `${mobileBaseWidth}px`, // REMOVED - CSS will control this
        // ** NEW: Hide until measured to prevent flicker **
        visibility: isMeasured ? "visible" : "hidden",
        // ...(round && { height: `${mobileBaseWidth}px`, borderRadius: "50%" }), // REMOVED
        ...(round && { borderRadius: "50%" }),
      }}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        {...(isMeasured ? dragProps : {})} // Only apply props after measurement
        style={{
          // ** UPDATED: Track width (the "window") is set to the measured item width **
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
        onAnimationComplete={handleAnimationComplete}
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
              // ** NEW: Attach ref to the *first* item for measurement **
              ref={index === 0 ? itemRef : null}
              className={`carousel-item themed-border ${round ? "round" : ""}`}
              style={{
                // width: itemWidth, // REMOVED
                // height: round ? itemWidth : "100%", // REMOVED
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
              <div className="carousel-item-title sm-heading themed-text">
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
                currentIndex % items.length === index ? "active" : "inactive"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
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

// --- 4. Main Export (The Switcher) (MODIFIED) ---
export default function Carousel(props) {
  // ** YAHAN CHANGE KIYA GAYA HAI **
  // Ab hum check kar rahe hain ke screen 850px se choti HO AUR orientation "portrait" HO.
  const showCarouselEffect = useMediaQuery(
    "(max-width: 850px) and (orientation: portrait)"
  );

  if (showCarouselEffect) {
    // Agar screen choti hai AUR portrait mode mein hai, tab carousel dikhao
    return <MobileCarousel {...props} />;
  }

  // Baki tamam cases mein (Desktop, Tablet, Mobile Landscape) simple list dikhao
  return <DesktopList items={props.items} round={props.round} />;
}