"use client";

import { useEffect, useRef, type FC, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps extends HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

const MAX_DPR = 1.5;
const FRAME_INTERVAL = 1000 / 24;

function readRgb(colorValue: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "0, 0, 0";
  ctx.fillStyle = colorValue;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `${r}, ${g}, ${b}`;
}

function resolveRgb(color?: string): string {
  if (color && !color.startsWith("var(")) return readRgb(color);
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--foreground")
    .trim();
  return readRgb(raw || "rgb(0, 0, 0)");
}

export const FlickeringGrid: FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 4,
  flickerChance = 0.3,
  color,
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cols = 0;
    let rows = 0;
    let squares = new Float32Array(0);
    let dpr = 1;
    let rgb = resolveRgb(color);
    let visible = false;
    let running = false;
    let frame = 0;
    let lastTime = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const step = (squareSize + gridGap) * dpr;
      const size = squareSize * dpr;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          if (opacity < 0.04) continue;
          ctx.fillStyle = `rgba(${rgb}, ${opacity})`;
          ctx.fillRect(i * step, j * step, size, size);
        }
      }
    };

    const resize = () => {
      const nextWidth = width || container.clientWidth;
      const nextHeight = height || container.clientHeight;
      if (nextWidth < 1 || nextHeight < 1) return;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(nextWidth * dpr);
      canvas.height = Math.floor(nextHeight * dpr);
      cols = Math.max(1, Math.floor(nextWidth / (squareSize + gridGap)));
      rows = Math.max(1, Math.floor(nextHeight / (squareSize + gridGap)));
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      draw();
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = (time: number) => {
      frame = 0;
      if (!running) return;
      if (time - lastTime >= FRAME_INTERVAL) {
        const delta = lastTime
          ? (time - lastTime) / 1000
          : FRAME_INTERVAL / 1000;
        lastTime = time;
        const chance = flickerChance * delta;
        for (let i = 0; i < squares.length; i++) {
          if (Math.random() < chance) squares[i] = Math.random() * maxOpacity;
        }
        draw();
      }
      frame = requestAnimationFrame(tick);
    };

    // The static grid is painted once by resize()/draw() above; the flicker
    // loop is pure decoration, so it must never compete with page load,
    // hydration, or LCP. It starts only after the page fully loads (or after
    // a 3s fallback), and then only when the browser is idle.
    let waitingForLoad = false;

    const beginLoop = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const scheduleStart = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => beginLoop(), { timeout: 1500 });
      } else {
        window.setTimeout(beginLoop, 300);
      }
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      if (document.readyState !== "complete") {
        if (waitingForLoad) return;
        waitingForLoad = true;
        const onLoad = () => {
          waitingForLoad = false;
          scheduleStart();
        };
        window.addEventListener("load", onLoad, { once: true });
        window.setTimeout(() => {
          if (!waitingForLoad) return;
          waitingForLoad = false;
          window.removeEventListener("load", onLoad);
          scheduleStart();
        }, 3000);
        return;
      }
      scheduleStart();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const themeObserver = new MutationObserver(() => {
      rgb = resolveRgb(color);
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [squareSize, gridGap, flickerChance, color, width, height, maxOpacity]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="pointer-events-none size-full" />
    </div>
  );
};
