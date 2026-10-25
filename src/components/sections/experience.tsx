"use client";

import { useRef } from "react";
import { Depth } from "@/components/motion/depth";
import { Tilt } from "@/components/motion/tilt";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/content/site";

/**
 * Company column stays pinned while the roles scroll past. A progress rail
 * fills as you read down the career, and each role rises out of the depth
 * and brightens as it reaches the middle of the screen.
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".exp-rail",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".exp-list",
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
        gsap.utils.toArray<HTMLElement>(".exp-role").forEach((role) => {
          gsap.fromTo(
            role,
            {
              opacity: 0.2,
              z: -160,
              rotationX: 10,
              transformPerspective: 1100,
              transformOrigin: "0% 100%",
            },
            {
              opacity: 1,
              z: 0,
              rotationX: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: role,
                start: "top 85%",
                end: "top 50%",
                scrub: 1,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="experience"
      className="scroll-mt-20 px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Depth>
            <h2 className="text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1] font-semibold">
              Experience
            </h2>
          </Depth>
          <Depth className="mt-10">
            <Tilt className="rounded-[var(--radius-glass)]">
              <div className="rounded-[var(--radius-glass)] p-7 glass">
                <p className="text-display text-2xl font-semibold">
                  {experience.company}
                </p>
                <p className="mt-2 text-muted">
                  {experience.period}, {experience.location}
                </p>
                <p className="mt-6 leading-relaxed text-fg/80">
                  {experience.summary}
                </p>
              </div>
            </Tilt>
          </Depth>
        </div>

        <div className="exp-list relative pl-8 md:pl-12">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-0 w-px bg-line"
          />
          <div
            aria-hidden
            className="exp-rail absolute top-0 bottom-0 left-0 w-px origin-top bg-lime"
          />

          <ol className="space-y-14 md:space-y-16">
            {experience.roles.map((role) => (
              <li key={role.title} className="exp-role relative">
                <span
                  aria-hidden
                  className="absolute top-2.5 -left-8 size-2 -translate-x-1/2 rounded-full bg-lime md:-left-12"
                />
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {role.title}
                </h3>
                <p className="mt-2 font-mono text-sm text-muted">
                  {role.period}, {role.mode}
                </p>
                <ul className="mt-6 space-y-4">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="max-w-[60ch] leading-relaxed text-fg/80"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
