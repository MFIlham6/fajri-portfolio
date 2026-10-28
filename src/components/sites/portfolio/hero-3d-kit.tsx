"use client";

import { createContext, useContext, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { Vec3 } from "./hero-3d-direction";

/* Shared pieces of the hero yard (hero-3d-scene.tsx, hero-3d-port.tsx): the time of day, the render mode,
   and small helpers. */

export const WARM = "#ffad55";

/* ---------- time of day ---------- */

type Palette = {
  sky: string; horizon: string; fog: string; hills: [string, string, string]; ground: string; road: string; sea: string;
  hemi: [string, string, number]; fill: [string, number]; key: { position: Vec3; color: string; intensity: number };
};
export const DAY: Palette = {
  sky: "#2f6fcf", horizon: "#cfe3f5", fog: "#b7cbe2", hills: ["#a9bcd8", "#93a8c8", "#7e95b8"], ground: "#56606f", road: "#2f3644", sea: "#3a6ea5",
  hemi: ["#d6e6ff", "#59606e", 1.3], fill: ["#fff3e3", 0.7], key: { position: [120, 90, 30], color: "#fff0d6", intensity: 3 },
};
export const DUSK: Palette = {
  sky: "#2a4a8a", horizon: "#f3a77c", fog: "#5a6c98", hills: ["#5a6a96", "#46557f", "#344267"], ground: "#1d2944", road: "#182136", sea: "#33476f",
  hemi: ["#a9bde8", "#2a2f45", 1.25], fill: ["#a8bce6", 0.8], key: { position: [60, 28, -160], color: "#ffb582", intensity: 2.2 },
};
export const NIGHT: Palette = {
  sky: "#03060c", horizon: "#0e1a30", fog: "#060b16", hills: ["#17253f", "#111c31", "#0b1424"], ground: "#0a1120", road: "#0b1019", sea: "#050c19",
  hemi: ["#6f88bd", "#070b14", 0.75], fill: ["#8ea6d8", 0.6], key: { position: [70, 90, -60], color: "#9db4ff", intensity: 1.5 },
};

/** The blended state for one moment of the day, shared by everything in the scene for that frame. */
export class Daylight {
  sky = new THREE.Color(); horizon = new THREE.Color(); fog = new THREE.Color(); ground = new THREE.Color(); road = new THREE.Color(); sea = new THREE.Color();
  hills = [new THREE.Color(), new THREE.Color(), new THREE.Color()];
  hemiSky = new THREE.Color(); hemiGround = new THREE.Color(); hemi = 1;
  fillColor = new THREE.Color(); fill = 1;
  keyColor = new THREE.Color(); key = 1; keyPosition = new THREE.Vector3();
  /** 0..1: the lamps (windows, floods, dock light), the sun disc and the moon disc. */
  lamps = 0; sun = 1; moon = 0;
  night = 0;

  set(night: number) {
    this.night = night;
    const [a, b, f] = night <= 0.5 ? [DAY, DUSK, night / 0.5] : [DUSK, NIGHT, (night - 0.5) / 0.5];
    const mix = (out: THREE.Color, x: string, y: string) => out.set(x).lerp(new THREE.Color(y), f);
    mix(this.sky, a.sky, b.sky); mix(this.horizon, a.horizon, b.horizon); mix(this.fog, a.fog, b.fog);
    mix(this.ground, a.ground, b.ground); mix(this.road, a.road, b.road); mix(this.sea, a.sea, b.sea);
    this.hills.forEach((c, i) => mix(c, a.hills[i], b.hills[i]));
    mix(this.hemiSky, a.hemi[0], b.hemi[0]); mix(this.hemiGround, a.hemi[1], b.hemi[1]); this.hemi = lerp(a.hemi[2], b.hemi[2], f);
    mix(this.fillColor, a.fill[0], b.fill[0]); this.fill = lerp(a.fill[1], b.fill[1], f);
    mix(this.keyColor, a.key.color, b.key.color); this.key = lerp(a.key.intensity, b.key.intensity, f);
    this.keyPosition.set(...a.key.position).lerp(new THREE.Vector3(...b.key.position), f);
    this.lamps = THREE.MathUtils.smoothstep(night, 0.3, 0.62);
    this.sun = 1 - THREE.MathUtils.smoothstep(night, 0.58, 0.72);
    this.moon = THREE.MathUtils.smoothstep(night, 0.7, 0.95);
  }
}

export const Day = createContext<Daylight>(new Daylight());

/** Render settings: a loop length in seconds makes every motion periodic over it, so the rendered clip loops
    without a seam; `tour` renders the camera path, starting on the loop's framing. */
export type SceneMode = { loop?: number; tour?: boolean };
export const Mode = createContext<SceneMode>({});
/** A frequency (rad/s) snapped to a whole number of cycles per loop, so it lines up at the seam. */
export const snap = (w: number, loop?: number) => (loop ? (Math.max(1, Math.round((w * loop) / (Math.PI * 2))) * Math.PI * 2) / loop : w);
export const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

/* ---------- helpers ---------- */

/** Small seeded random (mulberry32): the same dust and fog layout on every render. */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Put an object's footprint centre at the origin and its base on y = 0 (in the units it is shown at). */
export function normalise(object: THREE.Object3D) {
  object.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(object);
  const c = box.getCenter(new THREE.Vector3());
  object.position.x -= c.x;
  object.position.z -= c.z;
  object.position.y -= box.min.y;
}

export function shadows(object: THREE.Object3D, cast = true) {
  object.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.castShadow = cast;
      m.receiveShadow = true;
    }
  });
}

/** Soft round glow for lamps, the sun and moon halos and dust. */
export function glowTexture(stops: [number, string][] = [[0, "rgba(255,255,255,1)"], [0.25, "rgba(255,255,255,0.35)"], [1, "rgba(255,255,255,0)"]]) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  for (const [o, col] of stops) grad.addColorStop(o, col);
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Lamp haze: an additive sprite that never writes depth; it fades in with the lamps. */
export function Haze({ position, color = WARM, size = 3, opacity = 0.55 }: { position: Vec3; color?: string; size?: number; opacity?: number }) {
  const tex = useMemo(() => glowTexture(), []);
  const mat = useRef<THREE.SpriteMaterial>(null);
  const day = useContext(Day);
  useFrame(() => {
    if (mat.current) mat.current.opacity = opacity * day.lamps;
  });
  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial ref={mat} map={tex} color={color} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </sprite>
  );
}
