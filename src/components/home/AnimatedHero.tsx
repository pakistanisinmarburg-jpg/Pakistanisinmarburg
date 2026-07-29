import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
  children?: ReactNode;
}

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

/**
 * A bespoke, more elaborate hero used only on the home page. Other pages
 * keep using the plain <Hero> component - this one adds scroll parallax,
 * staggered word-by-word title reveal, floating ambient blobs, and a
 * scroll-cue, which wouldn't suit a simple inner page banner.
 */
const AnimatedHero = ({ title, subtitle, badge, image, children }: AnimatedHeroProps) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const contentY = useTransform(scrollY, [0, 600], [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  const words = title.split(" ");

  return (
    <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, backgroundImage: `url(${image})` }}
        className="absolute inset-0 -top-16 h-[calc(100%+4rem)] bg-cover bg-center bg-no-repeat"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90" />

      {/* Ambient floating blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl"
        animate={{ y: [0, 24, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container relative z-10 mx-auto px-4 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: badge ? 0.15 : 0 } } }}
          className="mb-4 flex flex-wrap justify-center gap-x-3 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90 md:text-xl"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
            className="flex flex-wrap justify-center gap-4"
          >
            {Array.isArray(children)
              ? children.map((child, i) => (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {child}
                  </motion.div>
                ))
              : children}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
};

export default AnimatedHero;
