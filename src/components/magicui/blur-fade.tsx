"use client";

import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Blur is only animated on hover-capable (mouse) devices. Animating the
 * filter on touch devices costs GPU on low-end phones, where the same
 * entrance reads fine as fade + rise.
 */
function useCanBlur() {
  const [canBlur, setCanBlur] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanBlur(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return canBlur;
}

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
  blur = "5px",
}: BlurFadeProps) => {
  const canBlur = useCanBlur();
  const combinedVariants: Variants = variant || {
    hidden: {
      y: yOffset,
      opacity: 0,
      ...(canBlur ? { filter: `blur(${blur})` } : {}),
    },
    visible: {
      y: 0,
      opacity: 1,
      ...(canBlur ? { filter: "blur(0px)" } : {}),
    },
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
