"use client";

import { useRef } from "react";
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
      className="scroll-mt-20 px-5 py-28 md:px-10 md:py-44"
    >
      <p className="about-text mx-auto max-w-[1200px] text-display text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.15] font-medium">
        {words.map((word, i) => (
          <span key={i} className="about-word">
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
