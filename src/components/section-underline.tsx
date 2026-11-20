"use client";

import { motion } from "motion/react";

/** The short orange rule under section headings, drawn left-to-right
    when the section scrolls into view. */
export function SectionUnderline() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-0.5 w-10 origin-left rounded-full bg-brand-accent/80"
    />
  );
}
