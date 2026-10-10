"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, type Project } from "@/content/site";

// Each card gets its own surface so the row never reads as identical tiles.
const surfaces = [
  "bg-[radial-gradient(120%_90%_at_0%_0%,rgb(255_106_61/0.35),transparent_60%),var(--color-surface)]",
  "bg-[radial-gradient(120%_90%_at_100%_100%,rgb(255_106_61/0.18),transparent_55%),var(--color-raised)]",
  "bg-[linear-gradient(160deg,var(--color-raised),var(--color-surface))]",
  "bg-[repeating-linear-gradient(135deg,rgb(237_237_234/0.03)_0_1px,transparent_1px_14px),var(--color-surface)]",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={`flex min-h-[26rem] flex-col justify-between rounded-[var(--radius-surface)] border border-line p-7 md:p-10 lg:h-[68vh] lg:w-[min(42vw,620px)] lg:shrink-0 ${surfaces[index % surfaces.length]}`}
    >
      <div className="flex items-start justify-between gap-6 text-sm text-muted">
        <span>{project.kind}</span>
        <span className="font-mono">{project.period}</span>
      </div>

      <div>
        <h3 className="font-display-wide text-[clamp(2.2rem,4vw,3.75rem)] leading-[1] font-semibold">
          {project.name}
        </h3>
        <p className="mt-5 max-w-[46ch] leading-relaxed text-fg/80">
          {project.summary}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tech used">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * Desktop: the section pins and vertical scroll pans the project row
 * sideways. Mobile and reduced motion: a plain vertical stack.
 */
export function Work() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current!;
          const distance = () => el.scrollWidth - window.innerWidth;
          gsap.to(el, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { scope: wrap },
  );

  return (
    <section
      ref={wrap}
      id="work"
      className="relative scroll-mt-20 overflow-hidden py-24 lg:flex lg:h-[100dvh] lg:items-center lg:py-0"
    >
      <div
        ref={track}
        className="grid gap-6 px-5 md:px-10 lg:flex lg:w-max lg:items-center lg:gap-8 lg:pr-[10vw]"
      >
        <div className="mb-6 lg:mb-0 lg:w-[34vw] lg:max-w-[460px] lg:shrink-0 lg:pr-10">
          <h2 className="font-display-wide text-[clamp(2.4rem,5vw,4.5rem)] leading-[1] font-semibold">
            Selected work
          </h2>
          <p className="mt-6 max-w-[34ch] leading-relaxed text-muted">
            Production AI at Syncfusion, plus the hardware and AR projects that
            got me here.
          </p>
        </div>

        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
