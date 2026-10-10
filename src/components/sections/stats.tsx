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
    <section aria-label="Impact" className="px-5 py-20 md:px-10 md:py-28">
      <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-12 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse justify-end gap-4"
          >
            <dt className="max-w-[24ch] text-sm leading-relaxed text-muted">
              {stat.label}
            </dt>
            <dd className="font-display-wide text-[clamp(2.2rem,3.8vw,4rem)] leading-none font-semibold tabular-nums">
              <CountUp
                value={stat.value}
                decimals={"decimals" in stat ? stat.decimals : 0}
              />
              <span className="text-ember">{stat.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
