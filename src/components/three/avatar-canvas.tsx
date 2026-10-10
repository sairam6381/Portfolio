"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { LoopOnce, MathUtils, type Group } from "three";
import { avatar } from "@/content/site";

type Props = {
  reduceMotion: boolean;
  /** Bumped by the parent to replay the wave (e.g. on click). */
  waveSignal: number;
  onWave?: () => void;
};

function Avatar({ reduceMotion, waveSignal, onWave }: Props) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(avatar.src);
  const { actions, mixer } = useAnimations(animations, group);
  const look = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    scene.traverse((obj) => {
      obj.castShadow = true;
    });
  }, [scene]);

  // Idle loops underneath; the wave plays once and blends back to idle.
  useEffect(() => {
    const idle = actions[avatar.idleClip];
    idle?.reset().fadeIn(0.3).play();

    const onFinished = () => {
      actions[avatar.waveClip]?.fadeOut(0.4);
      idle?.reset().fadeIn(0.4).play();
    };
    mixer.addEventListener("finished", onFinished);
    return () => mixer.removeEventListener("finished", onFinished);
  }, [actions, mixer]);

  useEffect(() => {
    if (reduceMotion) return;
    const wave = actions[avatar.waveClip];
    if (!wave) return;
    const t = setTimeout(
      () => {
        actions[avatar.idleClip]?.fadeOut(0.25);
        wave.reset().setLoop(LoopOnce, 1).fadeIn(0.25).play();
        wave.clampWhenFinished = true;
        onWave?.();
      },
      waveSignal === 0 ? 900 : 0,
    );
    return () => clearTimeout(t);
  }, [actions, waveSignal, reduceMotion, onWave]);

  // The whole figure turns and leans toward the cursor. Rotating the root
  // (not a bone) works for any rig, so a custom avatar drops straight in.
  useFrame((state, delta) => {
    if (reduceMotion || !group.current) return;
    const l = look.current;
    // Pointer is tracked page-wide, so clamp values from outside the canvas.
    const px = MathUtils.clamp(state.pointer.x, -1.5, 1.5);
    const py = MathUtils.clamp(state.pointer.y, -1, 1);
    l.yaw = MathUtils.damp(l.yaw, px * 0.4, 3, delta);
    l.pitch = MathUtils.damp(l.pitch, -py * 0.06, 3, delta);
    group.current.rotation.set(l.pitch, l.yaw, 0);
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
        shadows
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        eventSource={document.body}
        eventPrefix="client"
        camera={{ position: [0, 0.4, 12.5], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
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
          <Environment resolution={256}>
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
          <ContactShadows
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
