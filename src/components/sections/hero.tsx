import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { Reveal } from "@/components/motion/reveal";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { profile } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden px-5 pt-24 pb-14 md:px-10 md:pb-20"
    >
      <HeroBackdrop name={profile.name.split(" ")[0]} />

      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <p className="mb-6 font-mono text-xs tracking-[0.2em] text-ember uppercase">
            {profile.role}
          </p>
        </Reveal>

        <KineticHeading
          text={profile.headline}
          delay={0.15}
          className="max-w-[24ch] font-display-wide text-[clamp(2.4rem,4.6vw,4.5rem)] leading-[0.98] font-semibold"
        />

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.6}>
            <p className="max-w-[44ch] text-lg leading-relaxed text-muted">
              {profile.intro}
            </p>
          </Reveal>

          <Reveal delay={0.75} className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:scale-[0.98]"
            >
              View work
              <ArrowDownRight
                weight="bold"
                className="size-4 transition-transform duration-300 group-hover:rotate-[-45deg]"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-line px-6 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-fg/40"
            >
              Contact
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
