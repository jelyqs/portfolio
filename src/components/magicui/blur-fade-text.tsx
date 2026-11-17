"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
}

const BlurFadeText = ({
  text,
  className,
  variant,
  duration = 0.4,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) => {
  const combinedVariants: Variants = variant || {
    hidden: { y: yOffset, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (animateByCharacter) {
    return (
      <div className="flex">
        {Array.from(text).map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial="hidden"
            animate="visible"
            variants={combinedVariants}
            transition={{
              duration,
              delay: delay + i * characterDelay,
              ease: "easeOut",
            }}
            className={cn("inline-block", className)}
            style={{ width: char.trim() === "" ? "0.2em" : "auto" }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={combinedVariants}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn("inline-block whitespace-pre-line", className)}
    >
      {text}
    </motion.span>
  );
};

export default BlurFadeText;
