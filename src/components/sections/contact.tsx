import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { TechIcon } from "@/components/ui/tech-icon";
import { profile } from "@/content/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-20 overflow-hidden px-5 pt-24 pb-10 md:px-10 md:pt-40"
    >
      <div
        aria-hidden
        className="absolute bottom-[-30%] left-1/2 -z-10 aspect-square w-[90vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(200_240_101/0.14)_0%,transparent_62%)]"
      />

      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="max-w-[14ch] text-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] font-semibold">
            Let&apos;s build something together.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-12 inline-flex max-w-full items-center gap-4 rounded-full bg-lime py-4 pr-5 pl-7 text-[clamp(0.95rem,2vw,1.35rem)] font-semibold text-ink transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span className="truncate">{profile.email}</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-lime transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight weight="bold" className="size-4" />
            </span>
          </a>
        </Reveal>

        <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.socials.map((social, i) => (
            <li key={social.label}>
              <Reveal delay={0.05 * i}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-[var(--radius-glass)] p-6 glass transition-colors duration-300 hover:border-line-strong"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-[var(--radius-tile)] border border-line bg-ink/50">
                      <TechIcon icon={social.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block font-medium">{social.label}</span>
                      <span className="block text-sm text-muted">
                        {social.handle}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    className="size-4 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
                  />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <footer className="mt-24 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted md:flex-row md:justify-between">
          <p>
            {profile.name}, {profile.location}
          </p>
          <a href="#top" className="transition-colors hover:text-fg">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
