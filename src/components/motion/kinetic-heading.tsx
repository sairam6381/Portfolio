"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Headline whose words rise out of a clipping mask in sequence.
 * The full text stays in the DOM for screen readers and SEO.
 */
export function KineticHeading({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
