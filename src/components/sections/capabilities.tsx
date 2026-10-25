import { Depth } from "@/components/motion/depth";
import { Tilt } from "@/components/motion/tilt";
import { TechIcon } from "@/components/ui/tech-icon";
import { capabilities, type Capability } from "@/content/site";

// Bento layout: AI leads as the wide feature tile, the rest fill around it.
const spans = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-12",
];

function CapabilityTile({ cap, index }: { cap: Capability; index: number }) {
  const featured = index === 0;
  return (
    <Depth depth={200 + index * 60} className={`${spans[index]} h-full`}>
      <Tilt className="rounded-[var(--radius-glass)]">
        <article
          className={`flex h-full flex-col justify-between gap-10 rounded-[var(--radius-glass)] border border-line p-7 md:p-9 ${
            featured
              ? "bg-[radial-gradient(100%_80%_at_0%_0%,rgb(200_240_101/0.16),transparent_60%),var(--color-surface)]"
              : "glass"
          }`}
        >
          <div>
            <h3
              className={`text-display font-semibold ${featured ? "text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05]" : "text-2xl"}`}
            >
              {cap.title}
            </h3>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-muted">
              {cap.summary}
            </p>
            {cap.proof &&
              (featured ? (
                <p className="mt-12">
                  <span className="block text-display text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-semibold text-lime">
                    {cap.proof}
                  </span>
                  <span className="mt-3 block max-w-[34ch] text-sm text-muted">
                    {cap.proofNote}
                  </span>
                </p>
              ) : (
                <p className="mt-6 inline-flex rounded-full bg-lime-dim px-4 py-1.5 text-sm font-medium text-lime">
                  {cap.proof}
                </p>
              ))}
          </div>

          <ul className="flex flex-wrap gap-3">
            {cap.tools.map((tool) => (
              <li
                key={tool.label}
                className="flex items-center gap-2.5 rounded-[var(--radius-tile)] border border-line bg-ink/40 py-2.5 pr-4 pl-3 text-sm"
              >
                <TechIcon
                  icon={tool.icon}
                  className="size-5 text-base text-fg"
                />
                {tool.label}
              </li>
            ))}
          </ul>
        </article>
      </Tilt>
    </Depth>
  );
}

export function Capabilities() {
  return (
    <section id="skills" className="scroll-mt-20 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Depth>
          <h2 className="max-w-[16ch] text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1] font-semibold">
            What I bring to a team
          </h2>
        </Depth>
        <div className="mt-14 grid auto-rows-fr gap-5 lg:grid-cols-12">
          {capabilities.map((cap, i) => (
            <CapabilityTile key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
