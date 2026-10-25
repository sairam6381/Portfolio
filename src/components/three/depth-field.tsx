"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import {
  AdditiveBlending,
  Color,
  MathUtils,
  type Group,
  type Points,
} from "three";

const INK = "#07080a";
const LIME = "#c8f065";
const FG = "#eceef0";

/** Length of the corridor the camera travels through over the whole page. */
const DEPTH = 160;
const RINGS = 9;
const PARTICLES = 1600;

/** Scroll position of the page, 0 at the top and 1 at the bottom. */
const pageProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
};

/** Seeded PRNG (mulberry32), so the starfield is the same on every visit. */
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const buildDust = () => {
  const r = rng(7);
  const positions = new Float32Array(PARTICLES * 3);
  const colors = new Float32Array(PARTICLES * 3);
  const white = new Color(FG);
  const lime = new Color(LIME);
  for (let i = 0; i < PARTICLES; i++) {
    // Keep a clear lane down the middle so nothing sits on the camera path.
    const angle = r() * Math.PI * 2;
    const radius = 2.5 + Math.pow(r(), 0.7) * 16;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius * 0.65;
    positions[i * 3 + 2] = 12 - r() * (DEPTH + 30);
    const c = r() < 0.14 ? lime : white;
    colors.set([c.r, c.g, c.b], i * 3);
  }
  return { positions, colors };
};

/** A cloud of stars filling the corridor, mostly white with lime sparks. */
function Dust() {
  const points = useRef<Points>(null);
  const { positions, colors } = useMemo(() => buildDust(), []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.z += delta * 0.008;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/** Thin lime gates spaced down the corridor; the camera flies through them. */
function Gates({ spinRef }: { spinRef: RefObject<number> }) {
  const group = useRef<Group>(null);
  const gates = useMemo(
    () =>
      Array.from({ length: RINGS }, (_, i) => ({
        z: -8 - i * ((DEPTH - 10) / RINGS),
        tilt: (i % 2 ? 1 : -1) * (0.12 + (i % 3) * 0.05),
        radius: 5.5 + (i % 3) * 0.9,
      })),
    [],
  );

  useFrame((_, delta) => {
    group.current?.children.forEach((gate, i) => {
      gate.rotation.z +=
        delta * (i % 2 ? 0.05 : -0.05) + spinRef.current * 0.02;
    });
  });

  return (
    <group ref={group}>
      {gates.map((g) => (
        <mesh key={g.z} position={[0, 0, g.z]} rotation={[g.tilt, 0, 0]}>
          <torusGeometry args={[g.radius, 0.014, 6, 160]} />
          <meshBasicMaterial color={LIME} transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

/** Wireframe solids drifting beside the path, one roughly per section. */
function Solids({ spinRef }: { spinRef: RefObject<number> }) {
  const group = useRef<Group>(null);
  const solids = useMemo(
    () =>
      [
        { kind: "ico", pos: [4.6, 1.4, -14], s: 1.4 },
        { kind: "oct", pos: [-5.2, -1.6, -32], s: 1.2 },
        { kind: "knot", pos: [5.4, -1.2, -52], s: 0.9 },
        { kind: "dodeca", pos: [-4.8, 1.8, -72], s: 1.3 },
        { kind: "ico", pos: [5, 2, -94], s: 1 },
        { kind: "knot", pos: [-5.4, -1.4, -114], s: 1 },
        { kind: "oct", pos: [4.4, -1.8, -136], s: 1.5 },
      ] as const,
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    group.current?.children.forEach((solid, i) => {
      solid.rotation.x += delta * 0.12 + spinRef.current * 0.015;
      solid.rotation.y += delta * 0.18 + spinRef.current * 0.02;
      solid.position.y = solids[i].pos[1] + Math.sin(t * 0.6 + i) * 0.25;
    });
  });

  return (
    <group ref={group}>
      {solids.map((s, i) => (
        <mesh key={i} position={[s.pos[0], s.pos[1], s.pos[2]]} scale={s.s}>
          {s.kind === "ico" && <icosahedronGeometry args={[1, 1]} />}
          {s.kind === "oct" && <octahedronGeometry args={[1, 0]} />}
          {s.kind === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
          {s.kind === "knot" && (
            <torusKnotGeometry args={[0.9, 0.24, 120, 10]} />
          )}
          <meshBasicMaterial
            color={i % 2 ? FG : LIME}
            wireframe
            transparent
            opacity={i % 2 ? 0.18 : 0.32}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Flies the camera down the corridor in step with the page scroll, eased so
 * it glides rather than snaps, and leans it toward the cursor. Scroll speed
 * feeds `spinRef`, so the scene reacts to how fast you move through it.
 */
function Rig({
  reduceMotion,
  spinRef,
}: {
  reduceMotion: boolean;
  spinRef: RefObject<number>;
}) {
  const progress = useRef(-1);

  useFrame((state, delta) => {
    const target = pageProgress();
    const prev = progress.current < 0 ? target : progress.current;
    progress.current = reduceMotion
      ? target
      : MathUtils.damp(prev, target, 2.6, delta);
    const velocity = (progress.current - prev) / Math.max(delta, 1e-3);
    spinRef.current = MathUtils.damp(spinRef.current, velocity * 6, 4, delta);

    const cam = state.camera;
    const px = reduceMotion ? 0 : state.pointer.x;
    const py = reduceMotion ? 0 : state.pointer.y;
    cam.position.z = 8 - progress.current * (DEPTH - 14);
    cam.position.x = MathUtils.damp(cam.position.x, px * 0.9, 2.5, delta);
    cam.position.y = MathUtils.damp(cam.position.y, py * 0.6, 2.5, delta);
    cam.lookAt(cam.position.x * 0.4, cam.position.y * 0.4, cam.position.z - 12);
  });

  return null;
}

/**
 * The page-wide 3D backdrop: a dark corridor of dust, gates and wireframe
 * solids that the camera travels through as the visitor scrolls.
 */
export default function DepthField({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const spinRef = useRef(0);

  return (
    <Canvas
      // Phones already have dense screens; full DPR there is wasted GPU time.
      dpr={window.matchMedia("(pointer: coarse)").matches ? 1 : [1, 1.5]}
      // Reduced motion gets one still frame instead of a running loop.
      frameloop={reduceMotion ? "demand" : "always"}
      eventSource={document.body}
      eventPrefix="client"
      camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 80 }}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <AdaptiveDpr />
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 6, 46]} />
      <Rig reduceMotion={reduceMotion} spinRef={spinRef} />
      <Dust />
      <Gates spinRef={spinRef} />
      <Solids spinRef={spinRef} />
    </Canvas>
  );
}
