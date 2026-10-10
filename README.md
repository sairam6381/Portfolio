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

## Content

All copy lives in `src/content/site.ts`.

## Replacing the 3D avatar

The hero currently uses a stand-in model (three.js "RobotExpressive", CC0).
To use your own:

1. Make a rigged avatar from a selfie (e.g. Avaturn) and export a `.glb`.
2. Add animations in Mixamo: upload the avatar, pick an idle and a waving
   animation, download both as FBX "with skin".
3. Merge them into one `.glb` in Blender (import avatar + FBX clips, export
   glTF Binary with animations), name the clips `Idle` and `Wave`.
4. Save it as `public/models/avatar.glb` (keep it under ~5 MB; compress with
   `npx gltf-transform optimize in.glb out.glb` if needed).
5. If your clip names differ, update `avatar.idleClip` / `avatar.waveClip`
   in `src/content/site.ts`, and adjust the model offset/scale in
   `src/components/three/avatar-canvas.tsx`.

## Project layout

```
src/app/        routes, layouts, global styles
public/         static assets
.claude/skills/ Claude Code skills used while building this site
```
