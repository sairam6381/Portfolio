import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-20 overflow-hidden px-5 pt-24 pb-10 md:px-10 md:pt-36"
    >
      <div
        aria-hidden
        className="absolute bottom-[-40%] left-[-10%] -z-10 aspect-square w-[80vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgb(255_106_61/0.2)_0%,transparent_65%)]"
      />

      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="max-w-[14ch] font-display-wide text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.98] font-semibold">
            Building something with AI? Let&apos;s talk.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-12 inline-flex items-center gap-3 border-b border-ember pb-2 text-[clamp(1.1rem,2.4vw,1.75rem)] break-all transition-colors duration-300 hover:text-ember"
          >
            {profile.email}
            <ArrowUpRight
              weight="bold"
              className="size-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </Reveal>

        <footer className="mt-32 flex flex-col gap-6 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            {profile.name}, {profile.location}
          </p>
          <ul className="flex gap-6">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-fg"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
