"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const spring = { stiffness: 180, damping: 22, mass: 0.6 };

/**
 * Card that leans toward the cursor in 3D, with a soft light that follows
 * the pointer across its surface. Pass the card's radius in `className` so
 * the light is clipped to it. Mouse only; touch and reduced-motion users get
 * a flat card.
 */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  /** Largest lean in degrees. */
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useSpring(0, spring);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareX = useTransform(sx, [0, 1], ["-30%", "30%"]);
  const glareY = useTransform(sy, [0, 1], ["-30%", "30%"]);
  const glare = useMotionTemplate`translate3d(${glareX}, ${glareY}, 0)`;

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <div className="h-full [perspective:1200px]">
      <motion.div
        ref={ref}
        className={`relative h-full [transform-style:preserve-3d] ${className ?? ""}`}
        style={{ rotateX, rotateY }}
        onPointerEnter={(e) => e.pointerType === "mouse" && hover.set(1)}
        onPointerMove={onMove}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
          hover.set(0);
        }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          style={{ opacity: hover }}
        >
          <motion.div
            className="absolute -inset-1/2 bg-[radial-gradient(circle_at_center,rgb(236_238_240/0.1),transparent_45%)]"
            style={{ transform: glare }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
