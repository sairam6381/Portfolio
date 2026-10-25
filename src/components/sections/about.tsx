"use client";

import { useRef } from "react";
import { Depth } from "@/components/motion/depth";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/content/site";

/**
 * The about statement lights up word by word as it scrolls through the
 * viewport, so the reader's eye is paced through the story.
 */
export function About() {
  const root = useRef<HTMLElement>(null);
  const words = profile.about.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".about-word",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-text",
              start: "top 75%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      aria-label="About"
      className="scroll-mt-20 px-5 py-20 md:px-10 md:py-32"
    >
      <Depth depth={320} tilt={18} lift={90}>
        <p className="about-text mx-auto max-w-[1200px] text-display text-[clamp(1.35rem,2.4vw,2.25rem)] leading-[1.25] font-medium">
          {words.map((word, i) => (
            <span key={i} className="about-word">
              {word}{" "}
            </span>
          ))}
        </p>
      </Depth>
    </section>
  );
}
