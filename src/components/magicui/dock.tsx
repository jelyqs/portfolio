"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_SIZE_COMPACT = 36;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

/** Smaller icons on narrow screens so the 8-icon dock fits 360px wide. */
function useBaseSize() {
  const [base, setBase] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 400px)").matches
      ? BASE_SIZE_COMPACT
      : BASE_SIZE,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 400px)");
    const update = () => setBase(mq.matches ? BASE_SIZE_COMPACT : BASE_SIZE);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return base;
}

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  baseSize: number;
  register: (measure: () => void) => () => void;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = ({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const baseSize = useBaseSize();
  const measurers = useRef(new Set<() => void>());

  const register = useCallback((measure: () => void) => {
    measurers.current.add(measure);
    return () => {
      measurers.current.delete(measure);
    };
  }, []);

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    measurers.current.forEach((measure) => measure());
    mouseX.set(event.pageX);
  };

  return (
    <DockContext.Provider
      value={{ mouseX, magnification, distance, baseSize, register }}
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-full w-max items-end justify-center overflow-visible rounded-full border",
          className,
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  return (
    <DockIconInner context={context} className={className}>
      {children}
    </DockIconInner>
  );
};

const DockIconInner = ({
  className,
  children,
  context,
}: DockIconProps & { context: DockContextValue }) => {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useRef({ x: 0, width: 0 });
  const { mouseX, magnification, distance, baseSize, register } = context;

  useEffect(() => {
    const measure = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      bounds.current = { x: rect.x, width: rect.width };
    };
    measure();
    return register(measure);
  }, [register]);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    return val - bounds.current.x - bounds.current.width / 2;
  });

  const containerSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [baseSize, magnification, baseSize],
    ),
    SPRING,
  );
  const iconSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [
        baseSize * ICON_SIZE_RATIO,
        magnification * ICON_SIZE_RATIO,
        baseSize * ICON_SIZE_RATIO,
      ],
    ),
    SPRING,
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={cn(
        "relative flex aspect-square shrink-0 items-center justify-center rounded-full",
        className,
      )}
    >
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
