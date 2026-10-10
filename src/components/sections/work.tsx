"use client";

import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { gsap, useGSAP } from "@/lib/gsap";
import { TechIcon } from "@/components/ui/tech-icon";
import { projects, type Project } from "@/content/site";

// Each cover gets its own light so the stack never reads as identical cards.
const covers = [
  "bg-[radial-gradient(90%_120%_at_100%_0%,rgb(200_240_101/0.32),transparent_55%),linear-gradient(160deg,#171b14,#0b0d0a)]",
  "bg-[radial-gradient(90%_120%_at_0%_100%,rgb(200_240_101/0.22),transparent_55%),linear-gradient(160deg,#14171b,#0b0c0e)]",
  "bg-[radial-gradient(70%_90%_at_50%_0%,rgb(236_238_240/0.14),transparent_60%),linear-gradient(160deg,#16161a,#0b0b0d)]",
  "bg-[repeating-linear-gradient(135deg,rgb(236_238_240/0.04)_0_1px,transparent_1px_16px),linear-gradient(160deg,#131518,#0a0b0d)]",
  "bg-[radial-gradient(80%_100%_at_100%_100%,rgb(200_240_101/0.18),transparent_55%),linear-gradient(160deg,#15171a,#0b0c0e)]",
  "bg-[radial-gradient(circle_at_20%_30%,rgb(236_238_240/0.1),transparent_45%),linear-gradient(160deg,#141619,#0a0b0c)]",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={`work-card relative grid min-h-[70dvh] overflow-hidden rounded-[var(--radius-glass)] border border-line bg-ink md:grid-cols-[1.1fr_1fr] ${covers[index % covers.length]}`}
    >
      <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
        <div className="flex items-center justify-between gap-4 text-sm text-muted">
          <span>{project.kind}</span>
          <span className="font-mono">{project.period}</span>
        </div>

        <div>
          <h3 className="text-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] font-semibold">
            {project.name}
          </h3>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-fg/80">
            {project.summary}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Built with">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg/80"
              >
                {tech}
              </li>
            ))}
          </ul>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-lime"
            >
              {project.linkLabel}
              <ArrowUpRight
                weight="bold"
                className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>

      {/* Cover: the project's tools as large floating glass tiles. */}
      <div
        aria-hidden
        className="relative hidden items-center justify-center md:flex"
      >
        <div className="grid grid-cols-2 gap-5">
          {project.icons.map((icon, i) => (
            <div
              key={icon}
              className={`grid size-28 place-items-center rounded-[var(--radius-tile)] text-fg glass lg:size-36 ${i % 2 === 1 ? "translate-y-10" : ""} ${project.icons.length === 1 ? "col-span-2 size-40 lg:size-48" : ""}`}
            >
              <TechIcon
                icon={icon}
                className="size-12 text-[2.6rem] lg:size-14"
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/**
 * Sticky stacking cards: each project pins near the top and the previous
 * one sinks back and dims as the next slides over it.
 */
export function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top 15%",
              scrub: true,
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="work"
      className="scroll-mt-20 px-5 pb-24 md:px-10 md:pb-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] font-semibold">
          Selected work
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
          Production AI at Syncfusion, and the AR, hardware and automation
          projects that came before it.
        </p>

        <div className="mt-16 space-y-8">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className="sticky"
              style={{ top: `calc(6rem + ${i * 1.25}rem)`, zIndex: i + 1 }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
