"use client";

import dynamic from "next/dynamic";

export const FlickeringGrid = dynamic(
  () =>
    import("@/components/magicui/flickering-grid").then(
      (mod) => mod.FlickeringGrid,
    ),
  { ssr: false },
);
