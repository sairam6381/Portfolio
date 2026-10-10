@AGENTS.md

# Portfolio

Personal portfolio built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

- Animation: `motion` (`motion/react`) for component/enter/hover animation, `gsap` + `@gsap/react` (`useGSAP`) for scroll-driven timelines, `lenis` for smooth scroll. Animation code lives in client components only; keep pages server-rendered.
- Animate only `transform` and `opacity`; respect `prefers-reduced-motion`.
- Before finishing a change: `npm run lint`, `npm run typecheck`, `npm run build`.
