import {
  Database,
  EnvelopeSimple,
  LinkedinLogo,
  PlugsConnected,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import {
  siArduino,
  siBlender,
  siC,
  siDotnet,
  siGit,
  siGithub,
  siLeetcode,
  siPython,
  siUipath,
  siUnity,
  siX,
  type SimpleIcon,
} from "simple-icons";
import type { IconKey } from "@/content/site";

const brands: Partial<Record<IconKey, SimpleIcon>> = {
  dotnet: siDotnet,
  python: siPython,
  c: siC,
  unity: siUnity,
  blender: siBlender,
  arduino: siArduino,
  uipath: siUipath,
  git: siGit,
  github: siGithub,
  leetcode: siLeetcode,
  x: siX,
};

const glyphs = {
  linkedin: LinkedinLogo,
  mail: EnvelopeSimple,
  ai: Sparkle,
  sql: Database,
  api: PlugsConnected,
} as const;

/** Brand logos from Simple Icons, generic glyphs from Phosphor. */
export function TechIcon({
  icon,
  className = "size-5",
}: {
  icon: IconKey;
  className?: string;
}) {
  const brand = brands[icon];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={className}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  if (icon === "csharp") {
    // C# was removed from Simple Icons; a plain typographic mark stands in.
    return (
      <span
        aria-hidden
        className={`inline-flex items-center justify-center font-display text-[0.8em] leading-none font-semibold ${className}`}
      >
        C#
      </span>
    );
  }

  const Glyph = glyphs[icon as keyof typeof glyphs];
  return <Glyph aria-hidden weight="regular" className={className} />;
}
