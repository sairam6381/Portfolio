"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { avatar } from "@/content/site";

// WebGL never renders on the server; load it after the page is interactive.
const AvatarCanvas = dynamic(() => import("./avatar-canvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      {/* Silhouette placeholder while the 3D model loads. */}
      <div className="relative flex flex-col items-center gap-4">
        {/* Head */}
        <div className="size-20 animate-pulse rounded-full bg-raised" />
        {/* Torso */}
        <div className="h-28 w-16 animate-pulse rounded-xl bg-raised" />
        {/* Glow */}
        <div className="absolute -inset-10 -z-10 rounded-full bg-lime-dim blur-3xl" />
      </div>
    </div>
  ),
});

/**
 * The 3D greeter: waves on arrival, follows the cursor, and waves again
 * when clicked. A speech bubble says hello with each wave.
 */
export function AvatarStage() {
  const reduce = useReducedMotion() ?? false;
  const [waveSignal, setWaveSignal] = useState(0);
  const [greeting, setGreeting] = useState(false);

  const onWave = useCallback(() => {
    setGreeting(true);
    window.setTimeout(() => setGreeting(false), 3200);
  }, []);

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        onClick={() => setWaveSignal((n) => n + 1)}
        aria-label="Wave hello"
        className="absolute inset-0 z-10 cursor-pointer rounded-[var(--radius-glass)] focus-visible:outline-offset-[-6px]"
      />

      <AvatarCanvas
        reduceMotion={reduce}
        waveSignal={waveSignal}
        onWave={onWave}
      />

      <AnimatePresence>
        {(greeting || reduce) && (
          <motion.p
            key="greeting"
            role="status"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="pointer-events-none absolute top-[14%] right-[8%] z-20 rounded-full px-5 py-2.5 text-sm font-medium glass md:right-[14%]"
          >
            {avatar.greeting}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
