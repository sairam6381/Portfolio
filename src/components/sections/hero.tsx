import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { Reveal } from "@/components/motion/reveal";
import { AvatarStage } from "@/components/three/avatar-stage";
import { profile } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-5 pt-24 md:px-10"
    >
      {/* Lime light pooling behind the avatar, plus a faint floor grid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] right-[-10%] -z-10 aspect-square w-[75vw] max-w-[1000px] rounded-full bg-[radial-gradient(circle,rgb(200_240_101/0.16)_0%,rgb(200_240_101/0.04)_40%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-[linear-gradient(rgb(236_238_240/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(236_238_240/0.05)_1px,transparent_1px)] [mask-image:linear-gradient(to_top,black,transparent)] bg-[size:64px_64px]"
      />

      <div className="mx-auto grid min-h-[calc(100dvh-6rem)] max-w-[1400px] items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="order-2 pb-16 lg:order-1 lg:pb-0">
          <Reveal>
            <p className="mb-7 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-sm text-muted">
              <span className="font-medium text-fg">{profile.name}</span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              Software Engineer at Syncfusion
            </p>
          </Reveal>

          <KineticHeading
            text={profile.headline}
            delay={0.1}
            className="max-w-[17ch] text-display text-[clamp(2.6rem,4.8vw,4.9rem)] leading-[0.95] font-semibold"
          />

          <Reveal delay={0.55}>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted">
              {profile.intro}
            </p>
          </Reveal>

          <Reveal delay={0.7} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-semibold text-ink transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:scale-[0.98]"
            >
              View work
              <ArrowDownRight
                weight="bold"
                className="size-4 transition-transform duration-300 group-hover:-rotate-45"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full px-7 py-4 text-sm font-medium glass transition-colors duration-300 hover:border-line-strong"
            >
              Contact
            </a>
          </Reveal>
        </div>

        <div className="order-1 h-[52dvh] min-h-[340px] lg:order-2 lg:h-[82dvh]">
          <AvatarStage />
        </div>
      </div>
    </section>
  );
}
