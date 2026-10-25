"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

// WebGL never renders on the server; the plain ink background stands in.
const DepthField = dynamic(() => import("./depth-field"), { ssr: false });

/** Fixed full-viewport 3D scene sitting behind every section. */
export function DepthBackdrop() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <DepthField reduceMotion={reduce} />
      {/* Vignette keeps text contrast high over the busiest parts. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_35%,rgb(7_8_10/0.75)_100%)]" />
    </div>
  );
}
