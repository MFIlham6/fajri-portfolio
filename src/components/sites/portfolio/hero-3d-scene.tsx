"use client";

/* eslint-disable react-hooks/immutability -- three.js objects (camera, lights, materials, the hoist) are
   mutated every frame inside useFrame; that is how React Three Fiber animates without re-rendering. */

import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, useGLTF, useProgress } from "@react-three/drei";
import { Bloom, EffectComposer, LUT, ToneMapping, Vignette } from "@react-three/postprocessing";
import { Effect, EffectAttribute, LookupTexture, ToneMappingMode, type BloomEffect } from "postprocessing";
import { Day, Daylight, Haze, Mode, NIGHT, WARM, glowTexture, lerp, normalise, seeded, shadows, snap, type SceneMode } from "./hero-3d-kit";
import { Port, QUAY_Z } from "./hero-3d-port";
import { LOOK, LOOP_SHOT, PACE, PORTRAIT, SHOTS, SWAY, THROUGH, type Direction, type Shot } from "./hero-3d-direction";

/* Logistics yard for the hero films, built from four supplied models (public/models, Draco + WebP copies of
   site-next/models-src). The models keep their geometry and materials; only scale and pivots are normalised
   (warehouse in metres, truck in feet, crane in millimetres, containers in metres) and they share one light
   rig. Layout, left to right: warehouse, truck idling on a wet road, RTG crane over a container stack lifting
   the rust-red container. Time of day is one number (dir.night): sky, light and ground blend from day through
   dusk to night, the sun sets behind the hills, the moon comes up and the lamps come on through dusk.
   This is a film renderer, not a live hero: the page plays its output from public/video. */

const DRACO = "/draco/";
const URL = { warehouse: "/models/warehouse.glb", truck: "/models/truck.glb", crane: "/models/crane.glb", containers: "/models/containers.glb" };
Object.values(URL).forEach((u) => useGLTF.preload(u, DRACO));

const ROAD_Z = 8; // centre line of the road, in front of the yard

/* ---------- sky, sun, moon, hills ---------- */

function Sky() {
  const day = useContext(Day);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: { top: { value: new THREE.Color() }, bottom: { value: new THREE.Color() } },
        vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader:
          "uniform vec3 top; uniform vec3 bottom; varying vec3 vP; void main(){ float h = smoothstep(-0.02, 0.35, vP.y); gl_FragColor = vec4(mix(bottom, top, h), 1.0); }",
      }),
    [],
  );
  useFrame(() => {
    mat.uniforms.top.value.copy(day.sky);
    mat.uniforms.bottom.value.copy(day.horizon);
  });
  return (
    <mesh material={mat} renderOrder={-10}>
      <sphereGeometry args={[900, 32, 16]} />
    </mesh>
  );
}

/** How much further the sun and moon sit than they were drawn for (behind the far shore), at the same size. */
const FAR = 1.9;

/** Striped retro disc with a soft halo: the sun by day, setting behind the hills at dusk, and the moon at night. */
function Disc({ which }: { which: "sun" | "moon" }) {
  const day = useContext(Day);
  const group = useRef<THREE.Group>(null);
  const disc = useRef<THREE.MeshBasicMaterial>(null);
  const glow = useRef<THREE.SpriteMaterial>(null);
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    g.fillStyle = "#fff";
    g.beginPath();
    g.arc(128, 128, 124, 0, Math.PI * 2);
    g.fill();
    g.globalCompositeOperation = "destination-out";
    [[150, 5], [172, 7], [196, 9], [222, 11]].forEach(([y, h]) => g.fillRect(0, y, 256, h));
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const halo = useMemo(() => glowTexture([[0, "rgba(255,255,255,0.5)"], [0.35, "rgba(255,255,255,0.12)"], [1, "rgba(255,255,255,0)"]]), []);
  const colors = useMemo(() => ({ noon: new THREE.Color("#fffbea"), setting: new THREE.Color("#ffd2a0"), haloNoon: new THREE.Color("#fff6dc"), haloSetting: new THREE.Color("#ff9f6a") }), []);
  useFrame(() => {
    if (!group.current || !disc.current || !glow.current) return;
    if (which === "moon") {
      group.current.position.set(150 * FAR, 120 * FAR, -420 * FAR);
      disc.current.opacity = day.moon;
      glow.current.opacity = 0.35 * day.moon;
      return;
    }
    // The sun sinks from high in the sky to the far shore by dusk, warming as it goes.
    const f = Math.min(1, day.night / 0.55);
    group.current.position.set(lerp(115, 100, f) * FAR, lerp(150, 16, f * f) * FAR, -420 * FAR);
    disc.current.color.copy(colors.noon).lerp(colors.setting, f);
    glow.current.color.copy(colors.haloNoon).lerp(colors.haloSetting, f);
    disc.current.opacity = day.sun;
    glow.current.opacity = lerp(0.3, 0.55, f) * day.sun;
  });
  return (
    <group ref={group} scale={FAR}>
      <mesh>
        <circleGeometry args={[which === "sun" ? 26 : 30, 64]} />
        <meshBasicMaterial ref={disc} map={tex} color={which === "moon" ? "#e9eef8" : "#fffbea"} transparent fog={false} toneMapped={false} depthWrite={false} />
      </mesh>
      <sprite scale={[190, 190, 1]} position={[0, 0, -1]}>
        <spriteMaterial ref={glow} map={halo} color="#9fb6e6" transparent opacity={0} fog={false} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

/** The far shore across the bay: three low layers of coastline, so the water reads all the way to them;
    distance reads through tone (lighter and hazier further away by day). */
function Hills() {
  const day = useContext(Day);
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const layers = useMemo(() => {
    const make = (z: number, height: number, seed: number) => {
      const shape = new THREE.Shape();
      const w = 1400;
      shape.moveTo(-w / 2, -40);
      for (let i = 0; i <= 120; i++) {
        const x = -w / 2 + (i / 120) * w;
        const y = height * (0.55 + 0.25 * Math.sin(x * 0.006 + seed) + 0.15 * Math.sin(x * 0.017 + seed * 2.3) + 0.05 * Math.sin(x * 0.05 + seed));
        shape.lineTo(x, y);
      }
      shape.lineTo(w / 2, -40);
      return { geo: new THREE.ShapeGeometry(shape, 1), z };
    };
    return [make(-640, 26, 1.3), make(-520, 16, 4.1), make(-420, 9, 7.7)];
  }, []);
  useFrame(() => mats.current.forEach((m, i) => m?.color.copy(day.hills[i])));
  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={l.z} geometry={l.geo} position={[0, 0, l.z]}>
          <meshBasicMaterial ref={(m) => void (mats.current[i] = m)} fog={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- ground and wet road ---------- */

/** Concrete yard paving: slab joints every 6 m, mottling, and a few oil stains; tinted by the time of day. */
function pavingTexture() {
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.fillStyle = "#e9e9e7";
  g.fillRect(0, 0, size, size);
  const rand = seeded(17);
  for (let i = 0; i < 2600; i++) {
    const v = 200 + rand() * 55;
    g.fillStyle = `rgba(${v},${v},${v - 4},${0.12 + rand() * 0.15})`;
    const r = 2 + rand() * 18;
    g.beginPath();
    g.arc(rand() * size, rand() * size, r, 0, Math.PI * 2);
    g.fill();
  }
  for (let i = 0; i < 14; i++) {
    const x = rand() * size, y = rand() * size, r = 10 + rand() * 40;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(60,58,55,0.35)");
    grad.addColorStop(1, "rgba(60,58,55,0)");
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // 1024 px = 96 m, so a joint every 64 px is a 6 m slab
  g.strokeStyle = "rgba(70,72,76,0.22)";
  g.lineWidth = 2;
  for (let p = 0; p <= size; p += 64) {
    g.beginPath(); g.moveTo(p, 0); g.lineTo(p, size); g.stroke();
    g.beginPath(); g.moveTo(0, p); g.lineTo(size, p); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

function Ground() {
  const day = useContext(Day);
  const paving = useMemo(() => {
    const t = pavingTexture();
    t.repeat.set(1600 / 96, 300 / 96);
    return t;
  }, []);
  const ground = useRef<THREE.MeshStandardMaterial>(null);
  const road = useRef<THREE.MeshStandardMaterial>(null);
  const dashes = useMemo(() => Array.from({ length: 34 }, (_, i) => -120 + i * 7.5), []);
  useFrame(() => {
    ground.current?.color.copy(day.ground);
    road.current?.color.copy(day.road);
  });
  return (
    <group>
      {/* land, from the quay edge forward; the water is in hero-3d-port.tsx */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, QUAY_Z + 150]} receiveShadow>
        <planeGeometry args={[1600, 300]} />
        <meshStandardMaterial ref={ground} map={paving} roughness={0.95} metalness={0} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, ROAD_Z]} receiveShadow>
        <planeGeometry args={[400, 9]} />
        <MeshReflectorMaterial
          ref={road as unknown as React.Ref<never>}
          roughness={0.55}
          metalness={0.15}
          mirror={0.6}
          mixStrength={1.6}
          mixBlur={1}
          blur={[300, 80]}
          resolution={1024}
          depthScale={0}
        />
      </mesh>
      {dashes.map((x) => (
        <mesh key={x} rotation-x={-Math.PI / 2} position={[x, 0.03, ROAD_Z]}>
          <planeGeometry args={[3.2, 0.18]} />
          <meshStandardMaterial color="#cfd6e2" roughness={0.6} emissive="#cfd6e2" emissiveIntensity={0.04} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- warehouse ---------- */

function Warehouse() {
  const { scene } = useGLTF(URL.warehouse, DRACO);
  const day = useContext(Day);
  const { loop } = useContext(Mode);
  const windows = useMemo(() => {
    const mats: THREE.MeshStandardMaterial[] = [];
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const list = Array.isArray(m.material) ? m.material : [m.material];
      for (const mat of list) if (/window/i.test(mat.name) && !mats.includes(mat as THREE.MeshStandardMaterial)) mats.push(mat as THREE.MeshStandardMaterial);
    });
    // Windows glow warm from inside: the window texture lights up, the material itself is unchanged otherwise.
    for (const mat of mats) {
      mat.emissive = new THREE.Color(WARM);
      mat.emissiveMap = mat.map;
      mat.emissiveIntensity = 0;
    }
    return mats;
  }, [scene]);
  const lights = useRef<THREE.Group>(null);
  const signMat = useRef<THREE.MeshStandardMaterial>(null);
  const washTarget = useMemo(() => new THREE.Object3D(), []);
  const sign = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const g = c.getContext("2d")!;
    g.fillStyle = "#0b1626";
    g.fillRect(0, 0, 512, 128);
    g.strokeStyle = "#ffd9a3";
    g.lineWidth = 6;
    g.strokeRect(8, 8, 496, 112);
    g.fillStyle = "#ffe2b8";
    g.font = "600 76px ui-monospace, Menlo, Consolas, monospace";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("DC-01", 256, 68);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  useLayoutEffect(() => {
    shadows(scene);
    normalise(scene);
  }, [scene]);

  const pulsePeriod = loop ? loop / 2 : 7;
  useFrame(({ clock }) => {
    // Lamps on through dusk, then a slow, gentle pulse in the windows.
    const k = day.lamps;
    const pulse = 1 + 0.06 * Math.sin((clock.elapsedTime / pulsePeriod) * Math.PI * 2);
    for (const m of windows) m.emissiveIntensity = 2.4 * k * pulse;
    if (signMat.current) signMat.current.emissiveIntensity = 1.6 * k;
    lights.current?.children.forEach((l) => {
      const light = l as THREE.PointLight | THREE.SpotLight;
      if ("intensity" in light && light.userData.base) light.intensity = (light.userData.base as number) * k;
    });
  });

  // The model's long window wall (x = +7.5 in its own axes) faces the camera after a -90° turn;
  // the main gate end (z = -15) then faces right, toward the truck and the crane.
  return (
    <group position={[-13, 0, -24]} rotation-y={-Math.PI / 2 + 0.42}>
      <primitive object={scene} />
      <group ref={lights}>
        {/* inside the hall, behind the long window rows */}
        <pointLight position={[4, 4.6, -7]} color={WARM} distance={30} decay={2} userData={{ base: 160 }} intensity={0} />
        <pointLight position={[4, 4.6, 5]} color={WARM} distance={30} decay={2} userData={{ base: 160 }} intensity={0} />
        {/* spill on the forecourt in front of the window wall */}
        <pointLight position={[11, 2.5, -2]} color={WARM} distance={22} decay={2} userData={{ base: 120 }} intensity={0} />
        {/* dock light over the main gate, pointing at the yard */}
        <spotLight position={[3.2, 6.6, -16.4]} color="#ffc68a" angle={0.75} penumbra={0.8} distance={30} decay={2} userData={{ base: 600 }} intensity={0} />
        {/* yard floodlight washing the window wall, so the building reads at night */}
        <spotLight position={[26, 11, -2]} target={washTarget} color="#ffe2bd" angle={0.7} penumbra={0.75} distance={60} decay={1.5} userData={{ base: 900 }} intensity={0} />
      </group>
      <primitive object={washTarget} position={[7.5, 3, -2]} />
      <Haze position={[3.2, 6.6, -16.6]} size={4} opacity={0.6} />
      {/* DC-01 sign on the clean stretch of the gate wall, left of the gate */}
      <mesh position={[-3.6, 4.4, -15.08]} rotation-y={Math.PI}>
        <planeGeometry args={[4.2, 1.05]} />
        <meshStandardMaterial ref={signMat} map={sign} emissive="#ffffff" emissiveMap={sign} emissiveIntensity={0} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ---------- truck ---------- */

function LightCone({ length = 12, radius = 2.6 }: { length?: number; radius?: number }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: { color: { value: new THREE.Color("#fff1d2") }, strength: { value: 1 } },
        vertexShader: "varying float vY; void main(){ vY = position.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: `uniform vec3 color; uniform float strength; varying float vY; void main(){ float a = smoothstep(${(-length / 2).toFixed(1)}, ${(length / 2).toFixed(1)}, vY); gl_FragColor = vec4(color, a * 0.011 * strength); }`,
      }),
    [length],
  );
  // Cone apex at the lamp, opening forward along -z.
  return (
    <mesh material={mat} rotation-x={-Math.PI / 2} position={[0, 0, -length / 2]}>
      <coneGeometry args={[radius, length, 24, 1, true]} />
    </mesh>
  );
}

function Truck() {
  const { scene } = useGLTF(URL.truck, DRACO);
  const day = useContext(Day);
  const body = useRef<THREE.Group>(null);
  const lamps = useRef<THREE.Group>(null);
  const streak = useMemo(() => glowTexture([[0, "rgba(255,255,255,0.9)"], [0.2, "rgba(255,255,255,0.25)"], [1, "rgba(255,255,255,0)"]]), []);
  const targets = useMemo(() => [new THREE.Object3D(), new THREE.Object3D()], []);
  const { loop } = useContext(Mode);
  const shake = useMemo(() => [34, 21.7, 27].map((w) => snap(w, loop)), [loop]);
  useLayoutEffect(() => {
    shadows(scene);
    normalise(scene);
  }, [scene]);
  useFrame(({ clock }) => {
    // Headlights: dipped running lights by day, full beams with haze, beam and lens streak at night.
    const h = 0.2 + 0.8 * day.lamps;
    lamps.current?.traverse((o) => {
      const base = o.userData.base as number | undefined;
      if ((o as THREE.SpotLight).isSpotLight && base !== undefined) (o as THREE.SpotLight).intensity = base * h;
      else if ((o as THREE.Sprite).isSprite && base !== undefined) ((o as THREE.Sprite).material as THREE.SpriteMaterial).opacity = base * h;
      else if ((o as THREE.Mesh).isMesh) {
        const u = ((o as THREE.Mesh).material as THREE.ShaderMaterial).uniforms;
        if (u?.strength) u.strength.value = day.lamps;
      }
    });
    if (!body.current) return;
    const t = clock.elapsedTime;
    // idling engine: a very small, uneven shake
    body.current.position.y = Math.sin(t * shake[0]) * 0.006 + Math.sin(t * shake[1]) * 0.004;
    body.current.rotation.z = Math.sin(t * shake[2]) * 0.0012;
  });
  // Front of the model is -z (feet). Turned to face right and a little toward the camera.
  // Headlamps sit 0.71 m either side of centre, 1.9 m up, 7.85 m ahead of the model's centre.
  const lamp = (x: number, i: number) => (
    <group key={x} position={[x, 1.9, -7.9]}>
      <spotLight target={targets[i]} color="#fff3dc" angle={0.32} penumbra={0.6} distance={42} decay={1.6} intensity={0} userData={{ base: 140 }} />
      <primitive object={targets[i]} position={[x * 0.4, -1.6, -20]} />
      <sprite position={[0, 0, -0.15]} scale={[1.4, 1.4, 1]} userData={{ base: 0.9 }}>
        <spriteMaterial map={streak} color="#fff6e2" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
      {/* subtle anamorphic lens streak */}
      <sprite position={[0, 0, -0.2]} scale={[6, 0.16, 1]} userData={{ base: 0.45 }}>
        <spriteMaterial map={streak} color="#ffe9c7" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
      <LightCone />
    </group>
  );
  return (
    <group position={[3, 0, ROAD_Z]} rotation-y={-Math.PI / 2 + 0.3}>
      <group ref={body}>
        <group scale={0.3048}>
          <primitive object={scene} />
        </group>
        <group ref={lamps}>{[-0.71, 0.71].map(lamp)}</group>
      </group>
    </group>
  );
}

/* ---------- crane and containers ---------- */

const RED_CRATE = "Crate3"; // material of the rust-red container, the one the crane lifts
const ROPE_TOP = 22589; // mm, where the hoist ropes meet the top beam
const ROPE_LEN = 22589 - 15519; // mm

function CraneAndStack() {
  const crane = useGLTF(URL.crane, DRACO).scene;
  const boxes = useGLTF(URL.containers, DRACO).scene;
  const day = useContext(Day);
  const floods = useRef<(THREE.SpotLight | null)[]>([]);
  const floodTargets = useMemo(() => [new THREE.Object3D(), new THREE.Object3D()], []);

  // Prepare once: rope pivot at the top beam, the red container hung under the spreader, the stack without it.
  const parts = useMemo(() => {
    const hoist = crane.getObjectByName("Hoist")!;
    const ropes = crane.getObjectByName("HoistRopes")!;
    let pivot = crane.getObjectByName("RopePivot") as THREE.Group | undefined;
    if (!pivot) {
      pivot = new THREE.Group();
      pivot.name = "RopePivot";
      pivot.position.y = ROPE_TOP;
      ropes.parent!.add(pivot);
      ropes.position.y -= ROPE_TOP;
      pivot.add(ropes);
    }
    // useGLTF caches the scene, so a remount finds it already prepared.
    const prepared = hoist.getObjectByName("LiftedBox");
    if (prepared) return { hoist, pivot };
    // Lifted container: a copy of the stack with only the rust-red crate left in it. It is found by its
    // material ("Crate3"), which the loader keeps as is; node names get rewritten ("Crate.002" -> "Crate002").
    const lifted = boxes.clone(true);
    let red: THREE.Mesh | undefined;
    lifted.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const isRed = (m.material as THREE.Material).name === RED_CRATE;
      m.visible = isRed;
      if (isRed) red = m;
    });
    // Its world box (metres) sets where it hangs: centred under the spreader, top touching it.
    lifted.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(red ?? lifted);
    const centre = box.getCenter(new THREE.Vector3());
    const holder = new THREE.Group();
    holder.name = "LiftedBox";
    holder.add(lifted);
    lifted.position.set(-centre.x, -box.max.y, -centre.z);
    holder.scale.setScalar(1000); // metres into the crane's millimetres
    holder.position.set(881, 14319, -865);
    hoist.add(holder);
    shadows(crane);
    shadows(boxes);
    return { hoist, pivot };
  }, [crane, boxes]);

  // The stack keeps its other three containers; the red one lives on the hoist.
  useLayoutEffect(() => {
    boxes.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && (m.material as THREE.Material).name === RED_CRATE) m.visible = false;
    });
  }, [boxes]);

  const period = useContext(Mode).loop ?? 16;
  useFrame(({ clock }) => {
    // Seamless loop: from 9.5 m below the hoist's modelled height (red box just above the ground) up to it and back.
    const phase = (1 - Math.cos((clock.elapsedTime / period) * Math.PI * 2)) / 2; // 0..1..0 over the period
    const drop = 9500 * (1 - phase);
    parts.hoist.position.y = -drop;
    parts.pivot.scale.y = (ROPE_LEN + drop) / ROPE_LEN;
    floods.current.forEach((l) => l && (l.intensity = (l.userData.base as number) * day.lamps));
  });

  return (
    <group position={[20, 0, -32]} rotation-y={-0.35}>
      <group scale={0.001}>
        <primitive object={crane} />
      </group>
      {/* floodlights under the girders, aimed straight down at the stack */}
      <spotLight ref={(l) => void (floods.current[0] = l)} position={[-6, 21.5, 0]} target={floodTargets[0]} color="#dfe8ff" angle={0.55} penumbra={0.9} distance={48} decay={2} intensity={0} userData={{ base: 520 }} />
      <primitive object={floodTargets[0]} position={[-6, 0, 0.5]} />
      <Haze position={[-6, 21.6, 0]} color="#dfe8ff" size={2.6} opacity={0.5} />
      <spotLight ref={(l) => void (floods.current[1] = l)} position={[6, 21.5, 0]} target={floodTargets[1]} color="#dfe8ff" angle={0.55} penumbra={0.9} distance={48} decay={2} intensity={0} userData={{ base: 420 }} />
      <primitive object={floodTargets[1]} position={[6, 0, 0.5]} />
      <Haze position={[6, 21.6, 0]} color="#dfe8ff" size={2.2} opacity={0.4} />
      {/* container stack inside the gantry, beside the red container's landing spot */}
      <group position={[-5.5, 0, 0.6]}>
        <primitive object={boxes} />
      </group>
    </group>
  );
}

/* ---------- atmosphere ---------- */

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, start, tex } = useMemo(() => {
    const rand = seeded(7);
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (rand() - 0.5) * 90;
      p[i * 3 + 1] = rand() * 14;
      p[i * 3 + 2] = -25 + rand() * 48;
    }
    return { positions: p, start: p.slice(), tex: glowTexture() };
  }, [count]);
  const { loop } = useContext(Mode);
  useFrame(({ clock }) => {
    const a = ref.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!a) return;
    // Each mote floats around its start point (once per loop in a looping clip).
    const w = (clock.elapsedTime / (loop ?? 14)) * Math.PI * 2;
    for (let i = 0; i < count; i++) a.setXY(i, start[i * 3] + 1.4 * Math.sin(w + i), start[i * 3 + 1] + 0.35 * Math.sin(2 * w + i * 1.7));
    a.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial map={tex} size={0.16} color="#b9c8e6" transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

/** Low fog drifting along the road: a few large soft cards that sway slowly sideways. */
function GroundFog({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const g = c.getContext("2d")!;
    const rand = seeded(11);
    for (let i = 0; i < 14; i++) {
      const x = 30 + rand() * 196, y = 40 + rand() * 48, r = 30 + rand() * 40;
      const grad = g.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, "rgba(255,255,255,0.35)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 256, 128);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const cards = useMemo(() => Array.from({ length: count }, (_, i) => ({ x: -60 + i * (120 / count), z: 6 + (i % 3) * 5, s: 0.6 + (i % 4) * 0.12 })), [count]);
  const { loop } = useContext(Mode);
  useFrame(({ clock }) => {
    group.current?.children.forEach((c, i) => {
      c.position.x = cards[i].x + 5 * Math.sin((clock.elapsedTime / (loop ?? 14)) * Math.PI * 2 + i * 1.3);
    });
  });
  return (
    <group ref={group}>
      {cards.map((c, i) => (
        <mesh key={i} position={[c.x, 1.1, c.z]} scale={[34 * c.s, 5 * c.s, 1]}>
          <planeGeometry />
          <meshBasicMaterial map={tex} color="#7f93b8" transparent opacity={0.09} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- camera ---------- */

/** Operator pacing through a shot (PACE): cubic Hermite through [shot fraction, path fraction, speed] keys. */
function pace(k: number) {
  const i = Math.max(0, PACE.findIndex((p, n) => n > 0 && k <= p[0]) - 1);
  const [k0, u0, m0] = PACE[i], [k1, u1, m1] = PACE[i + 1];
  const h = k1 - k0, t = (k - k0) / h, t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * u0 + (t3 - 2 * t2 + t) * h * m0 + (-2 * t3 + 3 * t2) * u1 + (t3 - t2) * h * m1;
}

/** Radial zoom blur toward the frame centre, for the fly-throughs between shots. */
class ZoomBlurEffect extends Effect {
  constructor() {
    super(
      "ZoomBlur",
      `uniform float strength;
       void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
         if (strength < 0.001) { outputColor = inputColor; return; }
         vec2 dir = uv - vec2(0.5);
         vec4 acc = vec4(0.0);
         float total = 0.0;
         for (int i = 0; i < 24; i++) {
           float t = float(i) / 23.0;
           float w = 1.0 - 0.6 * t;
           acc += texture2D(inputBuffer, uv - dir * strength * t) * w;
           total += w;
         }
         outputColor = acc / total;
       }`,
      { attributes: EffectAttribute.CONVOLUTION, uniforms: new Map([["strength", new THREE.Uniform(0)]]) },
    );
  }
}

/** The shot for a path fraction, and how far through it the camera is (0..1). */
function shotAt(s: number) {
  const i = Math.max(0, SHOTS.findIndex((sh) => s <= sh.to));
  const sh = SHOTS[i];
  return { i, sh, t: Math.min(1, Math.max(0, (s - sh.from) / (sh.to - sh.from))) };
}

/** Tour shots + loop move + handheld sway; also the bloom, fog and the fly-through colour for this frame. */
function Rig({ dir, bloom, zoom, fogBase }: { dir: Direction; bloom: React.MutableRefObject<number>; zoom: React.MutableRefObject<number>; fogBase: number }) {
  const { camera, size, scene } = useThree();
  const day = useContext(Day);
  const curves = useMemo(
    () =>
      SHOTS.map((sh) => ({
        pos: new THREE.CatmullRomCurve3(sh.pos.map((p) => new THREE.Vector3(...p)), false, "centripetal"),
        look: new THREE.CatmullRomCurve3(sh.look.map((p) => new THREE.Vector3(...p)), false, "centripetal"),
      })),
    [],
  );
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const veil = useRef<THREE.Mesh>(null);
  const colors = useMemo(() => ({ dark: new THREE.Color("#05070d"), warm: new THREE.Color(1.6, 1.25, 0.8), glare: new THREE.Color(1.7, 1.62, 1.45), out: new THREE.Color() }), []);
  const { loop, tour } = useContext(Mode);
  useFrame(({ clock }) => {
    const cam = camera as THREE.PerspectiveCamera;
    const t = clock.elapsedTime;
    const sc = dir.s;
    const { i, sh, t: k } = shotAt(sc);
    // Operator pacing: land, drift while the subject reads, then speed into the next shot.
    const u = Math.min(1, Math.max(0, pace(k)));
    curves[i].pos.getPoint(u, pos);
    curves[i].look.getPoint(u, look);

    // Portrait screens, at the start of the tour only: aim at the truck and the crane, with the yard up the frame.
    const aspect = size.width / size.height;
    const tall = Math.min(1, Math.max(0, (1.1 - aspect) / 0.6));
    const portrait = i === 0 ? tall * Math.max(0, 1 - k / 0.35) : 0;
    pos.x += PORTRAIT.x * portrait;
    look.x += PORTRAIT.x * portrait;
    look.y += PORTRAIT.lookY * portrait;
    pos.sub(look).multiplyScalar(1 + PORTRAIT.pullBack * portrait).add(look);

    // Looping clip: a slow sideways drift and a breath of push-in, back where it started at the seam.
    if (loop) {
      const w = (t / loop) * Math.PI * 2;
      pos.x -= LOOP_SHOT.shift * (1 - tall);
      look.x -= LOOP_SHOT.shift * (1 - tall);
      pos.x += LOOP_SHOT.drift * Math.sin(w);
      pos.y += LOOP_SHOT.rise * Math.sin(2 * w);
      pos.sub(look).multiplyScalar(1 - (LOOP_SHOT.push * (1 - Math.cos(w))) / 2).add(look);
    }
    // Tour: starts on the loop's framing, which eases out early in the first shot.
    if (tour && i === 0) {
      const off = (1 - tall) * (1 - THREE.MathUtils.smoothstep(k, 0, 0.45));
      pos.x -= LOOP_SHOT.shift * off;
      look.x -= LOOP_SHOT.shift * off;
    }

    // Handheld: a tiny drift, then the camera aims, then sway as small rotations.
    const periods = loop ? [loop, loop / 2] : [9.3, 13.1];
    pos.x += Math.sin((t / periods[0]) * Math.PI * 2) * SWAY.drift;
    pos.y += Math.sin((t / periods[1]) * Math.PI * 2) * SWAY.drift;
    cam.position.copy(pos);
    cam.lookAt(look);
    const sway = (period: number) => THREE.MathUtils.degToRad(SWAY.deg) * Math.sin((t / period) * Math.PI * 2);
    cam.rotateY(sway(periods[1]));
    cam.rotateX(sway(periods[0]));

    const fov = lerp(sh.fov[0], sh.fov[1], u);
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
    // Lamps bloom; daylight barely does.
    bloom.current = sh.bloom * (0.3 + 0.7 * day.lamps);
    if (scene.fog instanceof THREE.FogExp2) scene.fog.density = fogBase * sh.fog * lerp(0.55, 1, day.night);

    // Fly-through: zoom blur builds toward the cut and settles after it.
    const prev = SHOTS[i - 1];
    zoom.current = 0;
    if (sh.into && sc > sh.to - THROUGH.blur) zoom.current = THROUGH.strength * Math.pow(THREE.MathUtils.smoothstep(sc, sh.to - THROUGH.blur, sh.to), 2);
    else if (prev?.into && sc < sh.from + THROUGH.settle) zoom.current = THROUGH.strength * 0.8 * (1 - THREE.MathUtils.smoothstep(sc, sh.from, sh.from + THROUGH.settle));
    // ...and the end of a shot fills with what it flies into, and the next shot comes out of it.
    let amount = 0;
    let into: Shot["into"];
    if (sh.into && sc > sh.to - THROUGH.out) {
      amount = THREE.MathUtils.smoothstep(sc, sh.to - THROUGH.out, sh.to);
      into = sh.into;
    } else if (prev?.into && sc < sh.from + THROUGH.in) {
      amount = 1 - THREE.MathUtils.smoothstep(sc, sh.from, sh.from + THROUGH.in);
      into = prev.into;
    }
    const v = veil.current;
    if (v) {
      v.visible = amount > 0.001;
      const mat = v.material as THREE.MeshBasicMaterial;
      // A window is dark by day and glows warm once the lamps are on; a headlight is a white glare.
      if (into === "window") colors.out.copy(colors.dark).lerp(colors.warm, day.lamps);
      else colors.out.copy(colors.glare);
      mat.color.copy(colors.out);
      mat.opacity = amount;
      // Just in front of the lens, filling the frame.
      const h = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * 0.6;
      v.scale.set(h * aspect * 1.2, h * 1.2, 1);
      v.position.copy(cam.position).add(cam.getWorldDirection(look).multiplyScalar(0.6));
      v.quaternion.copy(cam.quaternion);
    }
  });
  return (
    <mesh ref={veil} renderOrder={999} visible={false}>
      <planeGeometry />
      <meshBasicMaterial transparent depthTest={false} depthWrite={false} fog={false} toneMapped={false} />
    </mesh>
  );
}

/* ---------- lights and post ---------- */

/** Blends the time of day for this frame (before anything else reads it) and applies it to sky, fog and lights. */
function TimeOfDay({ dir }: { dir: Direction }) {
  const day = useContext(Day);
  const { scene } = useThree();
  const hemi = useRef<THREE.HemisphereLight>(null);
  const fill = useRef<THREE.DirectionalLight>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  useLayoutEffect(() => {
    const l = key.current;
    if (!l) return;
    l.target.position.set(0, 0, -5);
    l.target.updateMatrixWorld();
    Object.assign(l.shadow.camera, { left: -70, right: 70, top: 45, bottom: -45, near: 10, far: 320 });
    l.shadow.camera.updateProjectionMatrix();
  }, []);
  useFrame(() => {
    day.set(dir.night);
    if (scene.background instanceof THREE.Color) scene.background.copy(day.sky);
    scene.fog?.color.copy(day.fog);
    if (hemi.current) {
      hemi.current.color.copy(day.hemiSky);
      hemi.current.groundColor.copy(day.hemiGround);
      hemi.current.intensity = day.hemi;
    }
    if (fill.current) {
      fill.current.color.copy(day.fillColor);
      fill.current.intensity = day.fill;
    }
    if (key.current) {
      key.current.color.copy(day.keyColor);
      key.current.intensity = day.key;
      key.current.position.copy(day.keyPosition);
    }
  }, -1);
  return (
    <>
      <hemisphereLight ref={hemi} />
      {/* soft fill from the camera side; the sun or moon is the only shadow-casting light */}
      <directionalLight ref={fill} position={[-40, 25, 70]} />
      <directionalLight ref={key} castShadow shadow-mapSize={[4096, 4096]} shadow-bias={-0.0004} shadow-normalBias={0.04} />
    </>
  );
}

/** Colour grade as a 3D LUT: S-curve contrast, teal-navy shadows, warm highlights, slightly lifted blacks. */
function gradeLUT() {
  const n = 32;
  const data = new Float32Array(n * n * n * 4);
  const { lift, shadowTint, highlightTint, sCurve } = LOOK.grade;
  const curve = (x: number) => x + sCurve * (x * x * (3 - 2 * x) - x);
  for (let b = 0; b < n; b++)
    for (let g = 0; g < n; g++)
      for (let r = 0; r < n; r++) {
        const c = [r / (n - 1), g / (n - 1), b / (n - 1)].map(curve);
        const lum = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
        const sh = (1 - lum) * (1 - lum), hi = lum * lum;
        const o = (r + g * n + b * n * n) * 4;
        for (let k = 0; k < 3; k++) data[o + k] = Math.min(1, Math.max(0, lift + (1 - lift) * (c[k] + sh * shadowTint[k] + hi * highlightTint[k])));
        data[o + 3] = 1;
      }
  return new LookupTexture(data, n);
}

/** Post chain, kept sharp for the films: bloom on lights, ACES, grade, vignette. No blur, no grain. */
function Post({ bloom, zoom }: { bloom: React.MutableRefObject<number>; zoom: React.MutableRefObject<number> }) {
  const effect = useRef<BloomEffect>(null);
  const lut = useMemo(() => gradeLUT(), []);
  const zoomBlur = useMemo(() => new ZoomBlurEffect(), []);
  useFrame(() => {
    if (effect.current) effect.current.intensity = bloom.current;
    zoomBlur.uniforms.get("strength")!.value = zoom.current;
  });
  return (
    <EffectComposer multisampling={4}>
      <Bloom ref={effect} mipmapBlur luminanceThreshold={0.85} luminanceSmoothing={0.2} intensity={0.85} radius={0.7} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <LUT lut={lut} />
      <primitive object={zoomBlur} />
      <Vignette offset={LOOK.vignetteOffset} darkness={LOOK.vignetteDarkness} />
    </EffectComposer>
  );
}

function Yard({ dir }: { dir: Direction }) {
  const bloom = useRef(SHOTS[0].bloom);
  const zoom = useRef(0);
  const fogBase = 0.0052;
  const day = useMemo(() => new Daylight(), []);
  return (
    <Day.Provider value={day}>
      <color attach="background" args={[NIGHT.sky]} />
      <fogExp2 attach="fog" args={[NIGHT.fog, fogBase]} />
      <TimeOfDay dir={dir} />
      <Sky />
      <Disc which="sun" />
      <Disc which="moon" />
      <Hills />
      <Ground />
      <Warehouse />
      <Truck />
      <CraneAndStack />
      <Port />
      <Dust count={320} />
      <GroundFog count={7} />
      <Rig dir={dir} bloom={bloom} zoom={zoom} fogBase={fogBase} />
      <Post bloom={bloom} zoom={zoom} />
    </Day.Provider>
  );
}

/** Reports the container's size at once. A hidden browser pane never fires real resize events, and the
    canvas does not start until it has a size. */
class ImmediateResize {
  constructor(private cb: ResizeObserverCallback) {}
  observe(el: Element) {
    this.cb([{ target: el, contentRect: el.getBoundingClientRect() } as ResizeObserverEntry], this as unknown as ResizeObserver);
  }
  unobserve() {}
  disconnect() {}
}

/** The yard, drawn only when its owner calls advance(time) from @react-three/fiber: one frame per call. */
export default function HeroScene({ dir, mode, onLoad }: { dir: Direction; mode: SceneMode; onLoad: (percent: number) => void }) {
  const { progress } = useProgress();
  useEffect(() => onLoad(progress), [progress, onLoad]);
  return (
    <Canvas
      dpr={1}
      resize={{ polyfill: ImmediateResize as unknown as typeof ResizeObserver }}
      shadows
      flat
      frameloop="never"
      camera={{ fov: SHOTS[0].fov[0], near: 0.3, far: 1500, position: SHOTS[0].pos[0] }}
      gl={{ antialias: false, powerPreference: "high-performance", stencil: false, preserveDrawingBuffer: true }}
      aria-hidden="true"
    >
      <Mode.Provider value={mode}>
        <Yard dir={dir} />
      </Mode.Provider>
    </Canvas>
  );
}
