/**
 * Shared glassmorphism class fragments used across the public-facing pages
 * (Home, About, Students, Events, Gallery, Contact, Join, Mentor Request, FAQ).
 * Kept centralized so the look stays consistent and easy to tweak in one place.
 * Not used on /admin or /auth - those stay plain and fast on purpose.
 */
export const glassPanel =
  "border border-white/40 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]";

export const glassPanelSolid =
  "border border-white/40 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]";

export const glassCard =
  "border border-white/40 bg-white/50 shadow-[0_4px_24px_-8px_hsl(145_50%_25%/0.15)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_hsl(145_50%_25%/0.25)] dark:border-white/10 dark:bg-white/[0.04]";

export const glassChip =
  "border border-white/40 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]";
