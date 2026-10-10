import { profile } from "@/content/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-linear-to-b from-ink via-ink/70 to-transparent">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10"
      >
        <a
          href="#top"
          className="font-display-wide text-lg font-semibold tracking-tight"
        >
          {profile.name}
        </a>

        <div className="flex items-center gap-1 rounded-full border border-line bg-ink/60 p-1 backdrop-blur-md">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden rounded-full px-4 py-2 text-sm text-muted transition-colors duration-300 hover:text-fg md:inline-block"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform duration-300 ease-out-expo hover:-translate-y-px active:scale-[0.98]"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
