import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Depth } from "@/components/motion/depth";
import { Tilt } from "@/components/motion/tilt";
import { TechIcon } from "@/components/ui/tech-icon";
import { projects, type Project } from "@/content/site";

// Each cover gets its own light so the grid never reads as identical cards.
const covers = [
  "bg-[radial-gradient(90%_120%_at_100%_0%,rgb(200_240_101/0.22),transparent_55%),linear-gradient(160deg,#171b14,#0b0d0a)]",
  "bg-[radial-gradient(90%_120%_at_0%_100%,rgb(200_240_101/0.16),transparent_55%),linear-gradient(160deg,#14171b,#0b0c0e)]",
  "bg-[radial-gradient(70%_90%_at_50%_0%,rgb(236_238_240/0.1),transparent_60%),linear-gradient(160deg,#16161a,#0b0b0d)]",
  "bg-[repeating-linear-gradient(135deg,rgb(236_238_240/0.04)_0_1px,transparent_1px_16px),linear-gradient(160deg,#131518,#0a0b0d)]",
  "bg-[radial-gradient(80%_100%_at_100%_100%,rgb(200_240_101/0.14),transparent_55%),linear-gradient(160deg,#15171a,#0b0c0e)]",
  "bg-[radial-gradient(circle_at_20%_30%,rgb(236_238_240/0.08),transparent_45%),linear-gradient(160deg,#141619,#0a0b0c)]",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={`flex h-full flex-col gap-6 overflow-hidden rounded-[var(--radius-glass)] border border-line p-6 md:p-7 ${covers[index % covers.length]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <ul aria-hidden className="flex gap-2">
          {project.icons.map((icon) => (
            <li
              key={icon}
              className="grid size-10 place-items-center rounded-xl border border-line bg-ink/50 text-fg"
            >
              <TechIcon icon={icon} className="size-5 text-lg" />
            </li>
          ))}
        </ul>
        <span className="pt-2 font-mono text-xs whitespace-nowrap text-muted">
          {project.period}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-sm text-muted">{project.kind}</p>
        <h3 className="mt-1.5 text-display text-2xl leading-tight font-semibold md:text-[1.7rem]">
          {project.name}
        </h3>
        <p className="mt-3 leading-relaxed text-fg/75">{project.summary}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line-strong px-2.5 py-1 text-xs text-fg/75"
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
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-lime"
          >
            {project.linkLabel}
            <ArrowUpRight
              weight="bold"
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * Every project in one screen: a three-column grid on desktop, and on
 * phones a single swipeable row, so the work never costs a long scroll.
 */
export function Work() {
  return (
    <section id="work" className="scroll-mt-20 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Depth>
          <h2 className="text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1] font-semibold">
            Selected work
          </h2>
          <p className="mt-4 max-w-[48ch] leading-relaxed text-muted md:text-lg">
            Production AI at Syncfusion, and the AR, hardware and automation
            projects that came before it.
          </p>
        </Depth>

        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li
              key={project.name}
              className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-auto"
            >
              {/* Columns arrive at different depths, so the grid lands in a wave. */}
              <Depth depth={180 + (i % 3) * 90} className="h-full">
                <Tilt max={6} className="rounded-[var(--radius-glass)]">
                  <ProjectCard project={project} index={i} />
                </Tilt>
              </Depth>
            </li>
          ))}
        </ul>
        <p aria-hidden className="mt-2 text-xs text-muted md:hidden">
          Swipe for more →
        </p>
      </div>
    </section>
  );
}
