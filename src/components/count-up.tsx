"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Counts a stat value (e.g. "7+", "30+") up from 0 when it scrolls into
 * view. Non-numeric values render as-is. The hero stats are above the fold,
 * so the animation starts on mount — it never gates LCP content.
 */
export function CountUp({
  value,
  duration = 1.2,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState("0");

  const parsed = useMemo(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    return { target: parseFloat(match[1]), suffix: match[2] };
  }, [value]);

  useEffect(() => {
    if (!inView || !parsed) return;
    // The imperative animate() call doesn't pick up MotionConfig's
    // reducedMotion, so check it explicitly and render the final value.
    if (reduceMotion) {
      setDisplay(String(Math.round(parsed.target)));
      return;
    }
    const controls = animate(0, parsed.target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, parsed, duration, reduceMotion]);

  if (!parsed) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {display}
      {parsed.suffix}
    </span>
  );
}
