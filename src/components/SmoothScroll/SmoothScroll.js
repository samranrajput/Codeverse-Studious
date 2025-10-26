import { useEffect } from "react";

function SmoothScroll() {
  useEffect(() => {
    const smoothScroll = (target, duration = 1800) => {
      const start = window.pageYOffset;
      const element = document.querySelector(target);
      if (!element) return;
      const end = element.offsetTop;
      const distance = end - start;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, start + distance * ease);
        if (elapsed < duration) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScroll(link.getAttribute("href"), 2000);
      });
    });
  }, []);

  return null;
}

export default SmoothScroll;
