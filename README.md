# Portfolio

Personal portfolio site.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Motion: [Motion](https://motion.dev) for component animation, [GSAP](https://gsap.com) + ScrollTrigger for scroll-driven sequences, [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- 3D: [three.js](https://threejs.org) via [React Three Fiber](https://github.com/pmndrs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) for the hero robot and the scroll-driven backdrop

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

## Content

All copy lives in `src/content/site.ts`.

## The hero robot

The 3D greeter in the hero is "RobotExpressive" from the
[three.js examples](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/RobotExpressive):
model by Tomás Laulhé, modified by Don McCurdy, released under CC0 1.0 (public
domain, no credit required). It lives at `public/models/avatar.glb`.

It waves when the page loads and whenever it's clicked, and turns to look at
the cursor. The file holds more than the site uses so far:

- Animation clips: `Idle` and `Wave` are in use. Also available: `Dance`,
  `Death`, `Jump`, `No`, `Punch`, `Running`, `Sitting`, `Standing`,
  `ThumbsUp`, `Walking`, `WalkJump`, `Yes`.
- Facial expressions (morph targets on the head): `Angry`, `Surprised`,
  `Sad`. Not used yet.

The model path, clip names and greeting text are set in `avatar` in
`src/content/site.ts`; the robot's position, scale and lighting are in
`src/components/three/avatar-canvas.tsx`.

## Project layout

```
src/app/        routes, layouts, global styles
public/         static assets
.claude/skills/ Claude Code skills used while building this site
```
