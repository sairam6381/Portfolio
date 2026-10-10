"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Ember light plus a giant outlined first name behind the hero copy.
 * On scroll the name drifts down and fades while the light dims, giving
 * the hero depth as it hands off to the next section.
 */
export function HeroBackdrop({ name }: { name: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(".hero-name", {
          yPercent: 35,
          opacity: 0,
          ease: "none",
          scrollTrigger,
        });
        gsap.to(".hero-light", {
          opacity: 0.2,
          scale: 1.2,
          ease: "none",
          scrollTrigger,
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="hero-light absolute -top-[30%] right-[-20%] aspect-square w-[90vw] max-w-[1100px] rounded-full bg-[radial-gradient(circle,rgb(255_106_61/0.28)_0%,rgb(255_106_61/0.06)_40%,transparent_68%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink to-transparent" />
      <span className="hero-name absolute top-[12%] left-1/2 -translate-x-1/2 font-display-wide text-[28vw] leading-none font-bold whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_rgb(237_237_234/0.07)]">
        {name}
      </span>
    </div>
  );
}
