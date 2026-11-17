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
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
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
    <DockContext.Provider value={{ mouseX, magnification, distance, register }}>
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
  const { mouseX, magnification, distance, register } = context;

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
      [BASE_SIZE, magnification, BASE_SIZE],
    ),
    SPRING,
  );
  const iconSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE],
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
