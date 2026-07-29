import { motion, useScroll, useSpring } from "framer-motion";

/** Thin fixed bar at the very top that fills in as the page is scrolled. */
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-primary via-accent to-primary"
    />
  );
};

export default ScrollProgressBar;
