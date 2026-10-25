import { Depth } from "@/components/motion/depth";
import { Tilt } from "@/components/motion/tilt";
import { certifications, education } from "@/content/site";

export function Credentials() {
  return (
    <section
      aria-labelledby="credentials-title"
      className="px-5 pb-20 md:px-10 md:pb-28"
    >
      <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-[7fr_5fr]">
        <Depth>
          <Tilt className="rounded-[var(--radius-glass)]">
            <div className="h-full rounded-[var(--radius-glass)] border border-line bg-surface p-6 md:p-10">
              <h2 id="credentials-title" className="text-sm text-muted">
                Education
              </h2>
              <p className="mt-8 text-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.1] font-semibold">
                {education.degree}
              </p>
              <p className="mt-4 text-fg/80 md:text-lg">{education.school}</p>
              <p className="mt-10 flex gap-6 font-mono text-sm text-muted">
                <span>{education.period}</span>
                <span className="text-lime">{education.grade}</span>
              </p>
            </div>
          </Tilt>
        </Depth>

        <Depth depth={320}>
          <Tilt className="rounded-[var(--radius-glass)]">
            <div className="h-full rounded-[var(--radius-glass)] border border-line bg-surface p-6 md:p-10">
              <h2 className="text-sm text-muted">Certifications</h2>
              <ul className="mt-8 space-y-6">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <p className="font-medium md:text-lg">{cert.name}</p>
                    <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Tilt>
        </Depth>
      </div>
    </section>
  );
}
