"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Makes every motion animation in the tree respect the user's
 * prefers-reduced-motion setting: transform/layout animations render
 * instantly instead of animating. (The CSS reduced-motion block in
 * globals.css only covers CSS animations, not JS-driven motion ones.)
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
