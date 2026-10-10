import { Reveal } from "@/components/motion/reveal";
import { skills } from "@/content/site";

export function Skills() {
  const all = skills.groups.flatMap((group) => group.items);

  return (
    <section id="skills" className="scroll-mt-20 py-24 md:py-36">
      {/* The page's one marquee: a quick read of the whole toolkit. */}
      <div
        aria-hidden
        className="relative overflow-hidden border-y border-line py-8"
      >
        <div className="flex w-max marquee gap-12">
          {[...all, ...all].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display-wide text-[clamp(2rem,5vw,4rem)] leading-none font-semibold whitespace-nowrap text-fg/15 even:text-fg/90"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[calc(1400px+5rem)] px-5 md:px-10">
        <h2 className="font-display-wide text-[clamp(2.2rem,4.5vw,4rem)] leading-[1] font-semibold">
          Toolkit
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {skills.groups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.08}>
              <h3 className="border-t border-ember pt-4 text-sm font-medium text-ember">
                {group.label}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
