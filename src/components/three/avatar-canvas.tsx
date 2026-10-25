"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  PerformanceMonitor,
  AdaptiveDpr,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import {
  Euler,
  LoopOnce,
  MathUtils,
  Quaternion,
  Vector3,
  type AnimationAction,
  type Bone,
  type Group,
  type Object3D,
} from "three";
import { avatar } from "@/content/site";

type Props = {
  reduceMotion: boolean;
  /** Bumped by the parent to replay the wave (e.g. on click). */
  waveSignal: number;
  onWave?: () => void;
};

/**
 * Fuzzy clip finder – Ready Player Me / Mixamo clip names vary wildly
 * ("Idle", "idle", "Armature|mixamo.com|Idle", etc.). This grabs the
 * first action whose name includes the target substring, case-insensitive.
 */
function findAction(
  actions: Record<string, AnimationAction | null>,
  hint: string,
): AnimationAction | null {
  const lower = hint.toLowerCase();
  // Exact match first.
  if (actions[hint]) return actions[hint];
  // Substring match.
  for (const [name, action] of Object.entries(actions)) {
    if (name.toLowerCase().includes(lower) && action) return action;
  }
  return null;
}

// Scratch objects reused every frame.
const headPos = new Vector3();
const pose = {
  base: new Quaternion(),
  written: new Quaternion(),
  turn: new Quaternion(),
  parent: new Quaternion(),
  local: new Quaternion(),
  euler: new Euler(),
};

function Avatar({ reduceMotion, waveSignal, onWave }: Props) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(avatar.src);
  const { actions, mixer } = useAnimations(animations, group);
  const look = useRef({ yaw: 0, pitch: 0 });

  const idle = useMemo(() => findAction(actions, avatar.idleClip), [actions]);
  const wave = useMemo(() => findAction(actions, avatar.waveClip), [actions]);

  // Idle loops underneath; the wave plays once and blends back to idle.
  useEffect(() => {
    idle?.reset().fadeIn(0.3).play();

    const onFinished = () => {
      wave?.fadeOut(0.4);
      idle?.reset().fadeIn(0.4).play();
    };
    mixer.addEventListener("finished", onFinished);
    return () => mixer.removeEventListener("finished", onFinished);
  }, [idle, wave, mixer]);

  useEffect(() => {
    if (reduceMotion || !wave) return;
    const t = setTimeout(
      () => {
        idle?.fadeOut(0.25);
        wave.reset().setLoop(LoopOnce, 1).fadeIn(0.25).play();
        wave.clampWhenFinished = true;
        onWave?.();
      },
      waveSignal === 0 ? 900 : 0,
    );
    return () => clearTimeout(t);
  }, [idle, wave, waveSignal, reduceMotion, onWave]);

  // The head bone, if the rig has one. Falls back to turning the whole body.
  const head = useMemo(() => {
    let bone: Object3D | null = null;
    scene.traverse((obj) => {
      if (!bone && (obj as Bone).isBone && /^head$/i.test(obj.name)) bone = obj;
    });
    return bone as Object3D | null;
  }, [scene]);

  // Where the cursor is on screen, in client pixels. Tracked on the window so
  // it is right wherever the canvas sits on the page.
  const cursor = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      cursor.current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Looks straight at the cursor: the head's on-screen position is compared
  // with the cursor's, turned into yaw and pitch, and eased toward. The body
  // takes a third of the turn and the head the rest, like a person would.
  // Runs after the animation mixer, so the offset rides on top of the idle.
  useFrame((state, delta) => {
    if (reduceMotion || !group.current) return;
    const l = look.current;
    let yaw = 0;
    let pitch = 0;
    const c = cursor.current;
    if (c) {
      const rect = state.gl.domElement.getBoundingClientRect();
      (head ?? group.current).getWorldPosition(headPos);
      headPos.project(state.camera);
      const hx = rect.left + ((headPos.x + 1) / 2) * rect.width;
      const hy = rect.top + ((1 - headPos.y) / 2) * rect.height;
      // A viewer about 800px in front of the screen. Looking up is capped
      // lower than looking down so the face never tips out of view.
      yaw = MathUtils.clamp(Math.atan2(c.x - hx, 800), -0.95, 0.95);
      pitch = MathUtils.clamp(Math.atan2(c.y - hy, 800), -0.16, 0.45);
    }
    l.yaw = MathUtils.damp(l.yaw, yaw, 7, delta);
    l.pitch = MathUtils.damp(l.pitch, pitch, 7, delta);

    const bodyShare = head ? 0.35 : 1;
    group.current.rotation.set(0, l.yaw * bodyShare, 0);
    if (!head?.parent) return;

    // If the mixer didn't key the head this frame, it still holds last
    // frame's result; strip our old offset so it never accumulates.
    const q = head.quaternion;
    if (!q.equals(pose.written)) pose.base.copy(q);

    // The turn is built in world space (yaw about up, pitch about screen
    // right) and moved into the bone's frame, so it is correct whatever
    // axes the rig was exported with.
    pose.turn.setFromEuler(
      pose.euler.set(l.pitch, l.yaw * (1 - bodyShare), 0, "YXZ"),
    );
    head.parent.updateWorldMatrix(true, false);
    head.parent.getWorldQuaternion(pose.parent);
    pose.local
      .copy(pose.parent)
      .invert()
      .multiply(pose.turn)
      .multiply(pose.parent);
    q.copy(pose.local).multiply(pose.base);
    pose.written.copy(q);
  });

  return (
    <group ref={group} position={[0, -2.2, 0]} scale={0.95} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(avatar.src);

export default function AvatarCanvas({
  reduceMotion,
  waveSignal,
  onWave,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  // Stop rendering when the hero is off screen.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="absolute inset-0">
      <Canvas
        // No shadow maps: the baked contact shadow below grounds the figure
        // for a fraction of the cost. Cursor tracking is done by hand in
        // <Avatar>, measured against the whole window.
        dpr={dpr}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.4, 12.5], fov: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          // Avoid stalls when the browser composites the GL layer.
          preserveDrawingBuffer: false,
        }}
        // Lower internal resolution on slow GPUs automatically.
        performance={{ min: 0.5 }}
      >
        {/* Adaptively lower DPR when framerate drops below 45fps. */}
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />
        <AdaptiveDpr pixelated />

        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        {/* Lime rim light from behind for the brand accent. */}
        <spotLight
          position={[-4, 3, -4]}
          intensity={60}
          angle={0.6}
          penumbra={1}
          color="#c8f065"
        />
        <Suspense fallback={null}>
          <Avatar
            reduceMotion={reduceMotion}
            waveSignal={waveSignal}
            onWave={onWave}
          />
          {/* Studio lighting built from light panels, no HDR download. */}
          <Environment resolution={128}>
            <Lightformer intensity={2} position={[0, 4, 4]} scale={[8, 2, 1]} />
            <Lightformer
              intensity={1}
              position={[-5, 1, 2]}
              scale={[2, 6, 1]}
            />
            <Lightformer
              intensity={1.5}
              color="#c8f065"
              position={[5, 1, -3]}
              scale={[2, 6, 1]}
            />
          </Environment>
          {/* Rendered once, not every frame: the robot stays on its spot. */}
          <ContactShadows
            frames={1}
            position={[0, -2.2, 0]}
            opacity={0.55}
            scale={9}
            blur={2.6}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
