"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Moves its children through real depth in step with the scroll.
 *
 * `enter` (default): rises out of the distance, tipped back, as it comes
 * into view, and settles flat by the time it reaches the upper half.
 * `exit`: recedes into the distance as its section scrolls off the top.
 *
 * Scrubbed with a short lag so it trails the scroll softly. Reversible, so
 * scrolling back up plays it backwards. Only transform and opacity animate.
 */
export function Depth({
  children,
  className,
  mode = "enter",
  depth = 240,
  tilt = 14,
  lift = 60,
}: {
  children: ReactNode;
  className?: string;
  mode?: "enter" | "exit";
  /** How far back it starts (enter) or ends (exit), in px along Z. */
  depth?: number;
  /** Tip back around the X axis, in degrees. */
  tilt?: number;
  /** Vertical travel, in px. */
  lift?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { transformPerspective: 1100, force3D: true });

        if (mode === "enter") {
          gsap.fromTo(
            el,
            {
              z: -depth,
              rotationX: tilt,
              y: lift,
              opacity: 0,
              transformOrigin: "50% 100%",
            },
            {
              z: 0,
              rotationX: 0,
              y: 0,
              opacity: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: el,
                start: "top 96%",
                end: "top 62%",
                scrub: 1,
              },
            },
          );
          return;
        }

        gsap.to(el, {
          z: -depth,
          rotationX: -tilt,
          y: -lift,
          opacity: 0,
          transformOrigin: "50% 0%",
          ease: "power1.in",
          scrollTrigger: {
            trigger: el.closest("section") ?? el,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: root, dependencies: [mode, depth, tilt, lift] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
