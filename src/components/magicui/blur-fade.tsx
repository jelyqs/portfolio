"use client";

import { motion, type Variants } from "motion/react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inViewMargin,
}: BlurFadeProps) => {
  const combinedVariants: Variants = variant || {
    hidden: { y: yOffset, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Animate when scrolled into view (once) instead of all at once on mount,
  // so below-the-fold sections don't burn main-thread time during page load.
  // Above-the-fold content must NOT use BlurFade at all — it delays LCP.
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: inViewMargin ?? "0px" }}
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
