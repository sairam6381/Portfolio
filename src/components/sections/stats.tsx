"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
} from "motion/react";
import { Depth } from "@/components/motion/depth";
import { stats } from "@/content/site";

function CountUp({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? value : 0);
  const text = useTransform(count, (v) =>
    v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduce, count, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

export function Stats() {
  return (
    <section aria-label="Impact" className="px-5 py-14 md:px-10 md:py-20">
      <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-12 lg:grid-cols-4">
        {stats.map((stat, i) => (
          // Deeper starts for later stats, so the row arrives in a wave.
          <Depth
            key={stat.label}
            depth={180 + i * 90}
            className="flex flex-col-reverse justify-end gap-4"
          >
            <dt className="max-w-[24ch] text-sm leading-relaxed text-muted">
              {stat.label}
            </dt>
            <dd className="text-display text-[clamp(1.9rem,3vw,3rem)] leading-none font-semibold tabular-nums">
              <CountUp
                value={stat.value}
                decimals={"decimals" in stat ? stat.decimals : 0}
              />
              <span className="text-lime">{stat.suffix}</span>
            </dd>
          </Depth>
        ))}
      </dl>
    </section>
  );
}
