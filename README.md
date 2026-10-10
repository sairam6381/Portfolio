# Portfolio

Personal portfolio site.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Motion: [Motion](https://motion.dev) for component animation, [GSAP](https://gsap.com) + ScrollTrigger for scroll-driven sequences, [Lenis](https://lenis.darkroom.engineering) for smooth scrolling

## Getting started

Requires Node 20.9+ (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command                | What it does                    |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Start the dev server            |
| `npm run build`        | Production build                |
| `npm run start`        | Serve the production build      |
| `npm run lint`         | ESLint                          |
| `npm run typecheck`    | TypeScript check, no emit       |
| `npm run format`       | Format everything with Prettier |
| `npm run format:check` | Check formatting (for CI)       |

## Project layout

```
src/app/        routes, layouts, global styles
public/         static assets
.claude/skills/ Claude Code skills used while building this site
```
