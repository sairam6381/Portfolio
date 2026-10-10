@AGENTS.md

# Portfolio

Personal portfolio built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

- Animation: `motion` (`motion/react`) for component/enter/hover animation, `gsap` + `@gsap/react` (`useGSAP`) for scroll-driven timelines, `lenis` for smooth scroll. Animation code lives in client components only; keep pages server-rendered.
- Animate only `transform` and `opacity`; respect `prefers-reduced-motion`.
- TypeScript runs side-by-side: `tsc` is TS 7 (native, from `@typescript/native`), while the `typescript` package is aliased to `@typescript/typescript6` because TS 7.0 has no JS API and typescript-eslint/Next.js still need it. Don't collapse these into a single `typescript@7` until typescript-eslint supports TS 7.
- Before finishing a change: `npm run lint`, `npm run typecheck`, `npm run build`.
