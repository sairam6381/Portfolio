import { Reveal } from "@/components/motion/reveal";
import { certifications, education } from "@/content/site";

export function Credentials() {
  return (
    <section
      aria-labelledby="credentials-title"
      className="px-5 pb-24 md:px-10 md:pb-36"
    >
      <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-[7fr_5fr]">
        <Reveal className="rounded-[var(--radius-surface)] border border-line bg-surface p-8 md:p-12">
          <h2 id="credentials-title" className="text-sm text-muted">
            Education
          </h2>
          <p className="mt-8 font-display-wide text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.05] font-semibold">
            {education.degree}
          </p>
          <p className="mt-4 text-lg text-fg/80">{education.school}</p>
          <p className="mt-10 flex gap-6 font-mono text-sm text-muted">
            <span>{education.period}</span>
            <span className="text-ember">{education.grade}</span>
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="rounded-[var(--radius-surface)] border border-line p-8 md:p-12"
        >
          <h2 className="text-sm text-muted">Certifications</h2>
          <ul className="mt-8 space-y-6">
            {certifications.map((cert) => (
              <li key={cert.name}>
                <p className="text-lg font-medium">{cert.name}</p>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
