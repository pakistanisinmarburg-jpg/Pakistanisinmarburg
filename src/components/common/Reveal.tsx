import { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/** Fades + slides an element in once it scrolls into view. */
export const Reveal = ({ children, delay = 0, className, y = 16 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

/** Wrap a grid/list with this, then wrap each child in <RevealItem>, for a
 * cascading entrance animation as the section scrolls into view. */
export const RevealStagger = ({ children, className, stagger = 0.08 }: RevealStaggerProps) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    className={className}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({ children, className, y = 16 }: { children: ReactNode; className?: string; y?: number }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
