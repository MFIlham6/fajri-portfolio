"use client";

import { useEffect, useRef } from "react";

/* Flow wave behind the contact block: a field of points rolling like a slow swell, read as goods and data
   moving. Its own small WebGL program (no three.js), so it costs little on every page. It leans toward the
   pointer, pauses off screen and in a hidden tab, and holds one still frame with reduced motion.
   Pattern after GetLayers' free "Flow Wave" scene (commercial licence); written from scratch here. */

const COLS = 180;
const ROWS = 64;

const VERT = `
attribute vec2 a_grid;
uniform float u_time;
uniform float u_aspect;
uniform vec2 u_pointer;
varying float v_fade;
void main() {
  // grid: x across, z into the distance
  float x = (a_grid.x - 0.5) * 6.0;
  float z = a_grid.y * 4.5 + 0.6;
  float y = sin(x * 0.9 + u_time * 0.55) * 0.22
          + sin(x * 0.37 - z * 1.3 + u_time * 0.4) * 0.28
          + sin(z * 2.1 + u_time * 0.7) * 0.08;
  // the swell rises a little toward the pointer
  float d = distance(vec2(x / 3.0, (z - 2.6) / 2.2), u_pointer);
  y += 0.35 * exp(-d * d * 6.0);
  vec3 p = vec3(x, y - 0.75, -z);
  // simple perspective camera looking slightly down
  float py = p.y * 0.94 - p.z * 0.34;
  float pz = p.y * 0.34 + p.z * 0.94;
  float w = -pz;
  gl_Position = vec4(p.x / (w * 0.9 * u_aspect), py / (w * 0.9), 0.0, 1.0);
  gl_PointSize = clamp(10.0 / w, 1.6, 5.5);
  v_fade = clamp(1.4 - a_grid.y, 0.0, 1.0) * smoothstep(0.0, 0.15, a_grid.x) * (1.0 - smoothstep(0.85, 1.0, a_grid.x));
}`;

const FRAG = `
precision mediump float;
uniform vec3 u_color;
varying float v_fade;
void main() {
  float r = length(gl_PointCoord - 0.5);
  if (r > 0.5) discard;
  gl_FragColor = vec4(u_color, (1.0 - r * 1.6) * v_fade);
}`;

export function FlowWave() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const gl = cv?.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    if (!cv || !gl) return;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const grid = new Float32Array(COLS * ROWS * 2);
    for (let r = 0, i = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) grid.set([c / (COLS - 1), r / (ROWS - 1)], (i++) * 2);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, grid, gl.STATIC_DRAW);
    const aGrid = gl.getAttribLocation(prog, "a_grid");
    gl.enableVertexAttribArray(aGrid);
    gl.vertexAttribPointer(aGrid, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uTime = u("u_time"), uAspect = u("u_aspect"), uPointer = u("u_pointer"), uColor = u("u_color");
    gl.uniform3f(uColor, 0.45, 0.68, 1.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false;
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform1f(uAspect, cv.width / cv.height);
    };
    const draw = (now: number) => {
      raf = 0;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      gl.uniform1f(uTime, reduced ? 4 : (now - start) / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, COLS * ROWS);
      if (visible && !reduced && !document.hidden) raf = requestAnimationFrame(draw);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = 1 - ((e.clientY - r.top) / r.height) * 2;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      kick();
    });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(cv);
    document.addEventListener("visibilitychange", kick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvas} className="flow-wave" aria-hidden="true" />;
}
