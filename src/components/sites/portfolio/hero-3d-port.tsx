"use client";

import { useContext, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { Day, Haze, Mode, glowTexture, seeded } from "./hero-3d-kit";

/* The port around the yard: the quay and the water behind it, blocks of stacked containers, high-mast
   floodlights, and the far shore across the bay with its lights, cranes and a lighthouse. Everything here is
   built from simple shapes or reuses the supplied container model, so it stays light. */

const DRACO = "/draco/";
/** Where the land ends: the quay edge, in world z. Everything further back is water. */
export const QUAY_Z = -72;
const SEA_Y = -2.2;

/* ---------- water and quay ---------- */

/** A tiling normal map of soft ripples, drawn once on a canvas. */
function rippleTexture() {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const img = g.createImageData(size, size);
  const rand = seeded(5);
  const waves = Array.from({ length: 7 }, () => ({ kx: Math.round(1 + rand() * 5), ky: Math.round(1 + rand() * 9), p: rand() * 6.28, a: 0.4 + rand() * 0.6 }));
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      let dx = 0, dy = 0;
      for (const w of waves) {
        const ph = ((x * w.kx + y * w.ky) / size) * Math.PI * 2 + w.p;
        dx += Math.cos(ph) * w.kx * w.a;
        dy += Math.cos(ph) * w.ky * w.a;
      }
      const o = (y * size + x) * 4;
      img.data[o] = 128 + dx * 6;
      img.data[o + 1] = 128 + dy * 6;
      img.data[o + 2] = 255;
      img.data[o + 3] = 255;
    }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(60, 24);
  return t;
}

function Water() {
  const day = useContext(Day);
  const { loop } = useContext(Mode);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const ripples = useMemo(() => rippleTexture(), []);
  useFrame(({ clock }) => {
    mat.current?.color.copy(day.sea);
    // One whole tile of drift per loop, so the looping clip has no seam on the water either.
    const k = clock.elapsedTime / (loop ?? 24);
    ripples.offset.set(k % 1, (k * 2) % 1);
  });
  const depth = 900;
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, SEA_Y, QUAY_Z - depth / 2]}>
      <planeGeometry args={[1600, depth]} />
      <MeshReflectorMaterial
        ref={mat as unknown as React.Ref<never>}
        normalMap={ripples}
        normalScale={new THREE.Vector2(0.35, 0.35)}
        roughness={0.3}
        metalness={0.2}
        mirror={0.75}
        mixStrength={2.2}
        mixBlur={0.6}
        blur={[180, 60]}
        resolution={1024}
        distortionMap={ripples}
        distortion={0.15}
        depthScale={0}
      />
    </mesh>
  );
}

/** The quay wall, its yellow edge line, rubber fenders and mooring bollards. */
function Quay() {
  const bollards = useMemo(() => Array.from({ length: 30 }, (_, i) => -210 + i * 14), []);
  const fenders = useMemo(() => Array.from({ length: 34 }, (_, i) => -230 + i * 14), []);
  return (
    <group>
      <mesh position={[0, (SEA_Y - 1) / 2, QUAY_Z - 0.6]} receiveShadow castShadow>
        <boxGeometry args={[1600, 1 - SEA_Y + 0.02, 1.2]} />
        <meshStandardMaterial color="#8a8f96" roughness={0.9} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.035, QUAY_Z + 0.6]}>
        <planeGeometry args={[1600, 0.35]} />
        <meshStandardMaterial color="#e2b13c" roughness={0.7} />
      </mesh>
      {bollards.map((x) => (
        <mesh key={x} position={[x, 0.4, QUAY_Z + 0.2]} castShadow>
          <cylinderGeometry args={[0.32, 0.4, 0.8, 12]} />
          <meshStandardMaterial color="#1d2430" roughness={0.6} metalness={0.4} />
        </mesh>
      ))}
      {fenders.map((x) => (
        <mesh key={x} position={[x, -0.9, QUAY_Z - 1.35]}>
          <boxGeometry args={[1.6, 1.8, 0.5]} />
          <meshStandardMaterial color="#14171c" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- container blocks ---------- */

/** Blocks of stacked containers: [centre x, centre z, columns, rows]. Columns run along x, rows along z. */
const BLOCKS: [number, number, number, number][] = [
  // the back row along the quay, behind the warehouse and the crane: the yard's skyline
  [-60, -60, 22, 2],
  [6, -60, 20, 2],
  [70, -60, 20, 2],
  [130, -60, 16, 2],
  // either side of the crane and the warehouse
  [52, -31, 12, 4],
  [100, -31, 10, 4],
  [-62, -31, 10, 4],
  [-106, -31, 10, 4],
  // near the road, at the edges of the frame
  [72, -4, 8, 2],
  [-86, -4, 8, 2],
];

/** The four containers of the supplied model, each as an upright 20 ft box (long side along z, base at y 0). */
function useContainerKinds() {
  const { scene } = useGLTF("/models/containers.glb", DRACO);
  return useMemo(() => {
    const root = scene.clone(true);
    root.position.set(0, 0, 0);
    root.updateMatrixWorld(true);
    const kinds: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = [];
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const geometry = m.geometry.clone().applyMatrix4(m.matrixWorld);
      geometry.computeBoundingBox();
      const size = geometry.boundingBox!.getSize(new THREE.Vector3());
      if (size.x > size.z) geometry.rotateY(Math.PI / 2);
      geometry.computeBoundingBox();
      const b = geometry.boundingBox!;
      geometry.translate(-(b.min.x + b.max.x) / 2, -b.min.y, -(b.min.z + b.max.z) / 2);
      kinds.push({ geometry, material: m.material as THREE.Material });
    });
    return kinds;
  }, [scene]);
}

function ContainerBlocks() {
  const kinds = useContainerKinds();
  const meshes = useRef<(THREE.InstancedMesh | null)[]>([]);
  // Lay out every stack once: seeded heights and kinds, a few empty slots, slight misalignment.
  const placements = useMemo(() => {
    const rand = seeded(23);
    const per: THREE.Matrix4[][] = kinds.map(() => []);
    const tints: THREE.Color[][] = kinds.map(() => []);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    for (const [cx, cz, cols, rows] of BLOCKS)
      for (let c = 0; c < cols; c++)
        for (let r = 0; r < rows; r++) {
          if (rand() < 0.1) continue;
          const height = 1 + Math.floor(rand() * rand() * 5);
          const x = cx + (c - (cols - 1) / 2) * 2.75;
          const z = cz + (r - (rows - 1) / 2) * 6.6;
          // Keep the ship-to-shore cranes' lanes clear between their legs.
          if (z < QUAY_Z + 24 && STS_X.some((sx) => Math.abs(x - sx) < 16)) continue;
          for (let h = 0; h < height; h++) {
            const k = Math.floor(rand() * kinds.length);
            q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (rand() - 0.5) * 0.02 + (rand() < 0.5 ? Math.PI : 0));
            m.compose(new THREE.Vector3(x + (rand() - 0.5) * 0.08, h * 2.6, z + (rand() - 0.5) * 0.15), q, new THREE.Vector3(1, 1, 1));
            per[k].push(m.clone());
            const v = 0.72 + rand() * 0.35;
            tints[k].push(new THREE.Color(v, v, v));
          }
        }
    return { per, tints };
  }, [kinds]);
  useLayoutEffect(() => {
    meshes.current.forEach((mesh, k) => {
      if (!mesh) return;
      placements.per[k].forEach((mat, i) => {
        mesh.setMatrixAt(i, mat);
        mesh.setColorAt(i, placements.tints[k][i]);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
    });
  }, [placements]);
  return (
    <group>
      {kinds.map((kind, k) => (
        <instancedMesh
          key={k}
          ref={(el) => void (meshes.current[k] = el)}
          args={[kind.geometry, kind.material, Math.max(1, placements.per[k].length)]}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
}

/* ---------- floodlights ---------- */

/** High-mast floodlights around the yard: [x, z]. */
const MASTS: [number, number][] = [
  [30, -14],
  [74, -46],
  [-38, -46],
  [-72, -14],
  [118, -14],
];
const MAST_HEIGHT = 32;
const SODIUM = "#ffb46b";

function Mast({ x, z }: { x: number; z: number }) {
  const day = useContext(Day);
  const light = useRef<THREE.SpotLight>(null);
  const lamps = useRef<THREE.MeshStandardMaterial>(null);
  const target = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    if (light.current) light.current.intensity = 2600 * day.lamps;
    if (lamps.current) lamps.current.emissiveIntensity = 4 * day.lamps;
  });
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, MAST_HEIGHT / 2, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.42, MAST_HEIGHT, 10]} />
        <meshStandardMaterial color="#9aa1aa" roughness={0.55} metalness={0.5} />
      </mesh>
      {/* lamp crown: a ring frame and a row of lamp panels */}
      <mesh position={[0, MAST_HEIGHT + 0.2, 0]}>
        <boxGeometry args={[4.4, 0.25, 1.6]} />
        <meshStandardMaterial color="#7d848d" roughness={0.6} metalness={0.5} />
      </mesh>
      <mesh position={[0, MAST_HEIGHT - 0.25, 0.3]} rotation-x={-0.5}>
        <boxGeometry args={[4, 0.6, 0.25]} />
        <meshStandardMaterial ref={lamps} color="#2b2f36" emissive={SODIUM} emissiveIntensity={0} roughness={0.4} />
      </mesh>
      <Haze position={[0, MAST_HEIGHT - 0.4, 0.8]} color={SODIUM} size={9} opacity={0.5} />
      <spotLight ref={light} position={[0, MAST_HEIGHT - 0.5, 0.5]} target={target} color={SODIUM} angle={0.95} penumbra={0.85} distance={90} decay={1.6} intensity={0} />
      <primitive object={target} position={[0, 0, 6]} />
    </group>
  );
}

/* ---------- far shore ---------- */
/* It sits just in front of the nearest coastline layer (z -420 in hero-3d-scene.tsx), across the open water. */

/** Across the bay: town and terminal lights, a few crane silhouettes with blinking warning lights, and a
    lighthouse. Lights glow with the lamps (faint by day). */
function FarShore() {
  const day = useContext(Day);
  const { loop } = useContext(Mode);
  const dots = useRef<THREE.PointsMaterial>(null);
  const warn = useRef<THREE.SpriteMaterial[]>([]);
  const beacon = useRef<THREE.SpriteMaterial>(null);
  const glow = useMemo(() => glowTexture(), []);
  const { positions, colors } = useMemo(() => {
    const rand = seeded(31);
    const n = 1100;
    const p = new Float32Array(n * 3);
    const c = new Float32Array(n * 3);
    const warmC = new THREE.Color("#ffc27a"), coolC = new THREE.Color("#dfe8ff");
    for (let i = 0; i < n; i++) {
      const x = (rand() - 0.5) * 1100;
      p[i * 3] = x;
      p[i * 3 + 1] = 0.5 + Math.pow(rand(), 3) * 18 + Math.max(0, 12 - Math.abs(x - 140) / 14) * rand();
      p[i * 3 + 2] = -404 - rand() * 13;
      const col = rand() < 0.7 ? warmC : coolC;
      c.set([col.r, col.g, col.b], i * 3);
    }
    return { positions: p, colors: c };
  }, []);
  // Crane silhouettes on the far terminal: [x, z, height].
  const cranes: [number, number, number][] = [
    [-150, -412, 42],
    [-120, -414, 46],
    [60, -412, 44],
    [92, -414, 40],
  ];
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (dots.current) dots.current.opacity = 0.15 + 0.85 * day.lamps;
    // Warning lights blink once a second (a whole number of blinks per loop), the lighthouse every 4 s.
    const period = loop ? loop / Math.round(loop) : 1;
    const on = (t / period) % 1 < 0.5 ? 1 : 0.15;
    warn.current.forEach((m) => m && (m.opacity = on * (0.3 + 0.7 * day.lamps)));
    const sweep = loop ? loop / Math.round(loop / 4) : 4;
    if (beacon.current) beacon.current.opacity = Math.pow(Math.max(0, Math.sin(((t / sweep) % 1) * Math.PI * 2)), 6) * (0.2 + 0.8 * day.lamps);
  });
  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={dots} map={glow} size={2.4} vertexColors transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} fog={false} />
      </points>
      {cranes.map(([x, z, h], i) => (
        <group key={x} position={[x, 0, z]}>
          {/* lit like everything else and fogged, so they sit back in the haze */}
          {[-6, 6].map((dx) => (
            <mesh key={dx} position={[dx, h / 2, 0]}>
              <boxGeometry args={[1, h, 1]} />
              <meshStandardMaterial color="#3a4458" roughness={0.8} />
            </mesh>
          ))}
          <mesh position={[4, h, 0]}>
            <boxGeometry args={[34, 1.6, 1.6]} />
            <meshStandardMaterial color="#3a4458" roughness={0.8} />
          </mesh>
          <sprite position={[-6, h + 2, 0]} scale={[3, 3, 1]}>
            <spriteMaterial ref={(m) => void (m && (warn.current[i] = m))} map={glow} color="#ff3b30" transparent depthWrite={false} blending={THREE.AdditiveBlending} fog={false} />
          </sprite>
        </group>
      ))}
      {/* lighthouse on the point of the far shore */}
      <group position={[-300, 0, -398]}>
        <mesh position={[0, 9, 0]}>
          <cylinderGeometry args={[1.4, 2.2, 18, 12]} />
          <meshBasicMaterial color="#d9dde3" fog={false} />
        </mesh>
        <sprite position={[0, 19, 0]} scale={[22, 22, 1]}>
          <spriteMaterial ref={beacon} map={glow} color="#fff3d6" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} fog={false} />
        </sprite>
      </group>
    </group>
  );
}

/* ---------- the ship at the quay, and its cranes ---------- */

const SHIP = { x: 12, scale: 1.1, draft: 3.6 };
/** Ship-to-shore cranes along the quay: x positions. Model in decimetres, boom along +x (turned out over the water). */
const STS_X = [-24, 96];

function Ship() {
  const { scene } = useGLTF("/models/ship.glb", DRACO);
  const day = useContext(Day);
  const lights = useRef<THREE.SpriteMaterial[]>([]);
  const glow = useMemo(() => glowTexture(), []);
  const fit = useMemo(() => {
    scene.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(scene);
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    return { cx: (b.min.x + b.max.x) / 2, cz: (b.min.z + b.max.z) / 2, length: b.max.x - b.min.x, beam: b.max.z - b.min.z, top: b.max.y };
  }, [scene]);
  useFrame(() => lights.current.forEach((m) => m && (m.opacity = 0.15 + 0.85 * day.lamps)));
  const s = SHIP.scale;
  const z = QUAY_Z - 1.8 - (fit.beam * s) / 2;
  // Navigation and deck lights: mast tops, the bridge, and a row along the deck.
  const lamps: { p: [number, number, number]; c: string; size: number }[] = [
    { p: [fit.length * 0.42, fit.top + 0.5, 0], c: "#ffffff", size: 4 },
    { p: [-fit.length * 0.46, 11, 0], c: "#ffffff", size: 3 },
    { p: [fit.length * 0.4, 13, fit.beam / 2], c: "#3cff8a", size: 2.4 },
    { p: [fit.length * 0.4, 13, -fit.beam / 2], c: "#ff4b4b", size: 2.4 },
    ...Array.from({ length: 7 }, (_, i) => ({ p: [-fit.length * 0.4 + i * fit.length * 0.11, 9.6, fit.beam / 2 + 0.2] as [number, number, number], c: "#ffd29a", size: 2.2 })),
  ];
  return (
    <group position={[SHIP.x, SEA_Y - SHIP.draft, z]} scale={s}>
      <group position={[-fit.cx, 0, -fit.cz]}>
        <primitive object={scene} />
      </group>
      {lamps.map((l, i) => (
        <sprite key={i} position={l.p} scale={[l.size, l.size, 1]}>
          <spriteMaterial ref={(m) => void (m && (lights.current[i] = m))} map={glow} color={l.c} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </sprite>
      ))}
    </group>
  );
}

function StsCranes() {
  const { scene } = useGLTF("/models/sts.glb", DRACO);
  const copies = useMemo(() => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    // Industrial red-orange paint with a little metal sheen, instead of the model's flat pink.
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const mat = m.material as THREE.MeshStandardMaterial;
      if (mat.color && mat.color.r > 0.6 && mat.color.g < 0.5) mat.color.set("#b8432c");
      mat.roughness = 0.55;
      mat.metalness = 0.35;
    });
    return STS_X.map(() => scene.clone(true));
  }, [scene]);
  return (
    <group>
      {copies.map((c, i) => (
        <group key={i} position={[STS_X[i], 0, QUAY_Z + 4]}>
          <group rotation-y={Math.PI / 2} scale={0.085}>
            <primitive object={c} />
          </group>
          {/* work lights under the boom, over the ship */}
          <Haze position={[0, 36, -26]} color="#e8eeff" size={7} opacity={0.55} />
          <Haze position={[0, 36, -48]} color="#e8eeff" size={6} opacity={0.45} />
          <Haze position={[0, 50, 2]} color="#ff3b30" size={3} opacity={0.6} />
        </group>
      ))}
    </group>
  );
}

/* ---------- pallets at the warehouse ---------- */

/** Pallets of boxes on hand pallet trucks (a photogrammetry scan), on the forecourt in front of the warehouse's
    window wall: [x, z, turn]. The scan is about 10.5 units tall for 1.6 m. */
const PALLETS: [number, number, number][] = [
  [-8.6, -4.6, 0.2],
  [-14.4, -2.4, -0.5],
  [-3.2, -6.8, 1.3],
];
const PALLET_SCALE = 0.152;

function Pallets() {
  const { scene } = useGLTF("/models/forklift.glb", DRACO);
  const copies = useMemo(() => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    scene.updateMatrixWorld(true);
    const floor = new THREE.Box3().setFromObject(scene).min.y;
    return { list: PALLETS.map(() => scene.clone(true)), lift: -floor * PALLET_SCALE };
  }, [scene]);
  return (
    <group>
      {copies.list.map((c, i) => (
        <group key={i} position={[PALLETS[i][0], copies.lift, PALLETS[i][1]]} rotation-y={-Math.PI / 2 + 0.42 + PALLETS[i][2]} scale={PALLET_SCALE}>
          <primitive object={c} />
        </group>
      ))}
    </group>
  );
}

/** Everything around the yard that makes it a port. */
export function Port() {
  return (
    <group>
      <Water />
      <Quay />
      <Ship />
      <StsCranes />
      <Pallets />
      <ContainerBlocks />
      {MASTS.map(([x, z]) => (
        <Mast key={`${x},${z}`} x={x} z={z} />
      ))}
      <FarShore />
    </group>
  );
}
