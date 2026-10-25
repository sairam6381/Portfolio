"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

const spring = { stiffness: 220, damping: 18, mass: 0.5 };

/** Pulls its child a little toward the cursor while hovered, then springs back. */
export function Magnetic({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  if (reduce) return <>{children}</>;

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
