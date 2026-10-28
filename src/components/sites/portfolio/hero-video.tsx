"use client";

import { useEffect, useRef, useState } from "react";

/* Hero film: a seamless 12 s loop rendered from the 3D yard (hero-3d-scene.tsx), day for the light theme and
   night for the dark one, wide for landscape screens and tall for portrait ones. The poster for the current
   theme is painted by CSS straight away; the video fades in over it once it plays. Switching the theme
   crossfades day and night: the new film starts at the same moment of the loop (both share the camera move
   and the crane's lift), so only the light changes. With reduced motion only the poster shows. */

type Look = "day" | "night";
type Shape = "wide" | "tall";
type Layer = { id: string; src: string; shown: boolean };

const CROSSFADE_MS = 1200;

export function HeroVideo() {
  const [layers, setLayers] = useState<Layer[]>([]);
  const videos = useRef(new Map<string, HTMLVideoElement>());
  const box = useRef<HTMLDivElement>(null);

  // Follow the theme toggle, the screen's shape and the motion setting.
  useEffect(() => {
    const root = document.documentElement;
    const tall = window.matchMedia("(max-aspect-ratio: 1/1)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => {
      if (reduced.matches) return setLayers([]);
      const look: Look = root.dataset.theme === "dark" ? "night" : "day";
      const shape: Shape = tall.matches ? "tall" : "wide";
      const id = `${look}-${shape}`;
      setLayers((now) => (now.at(-1)?.id === id ? now : [...now.filter((l) => l.shown).slice(-1), { id, src: `/video/hero-${id}.mp4`, shown: false }]));
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    tall.addEventListener("change", read);
    reduced.addEventListener("change", read);
    return () => {
      mo.disconnect();
      tall.removeEventListener("change", read);
      reduced.removeEventListener("change", read);
    };
  }, []);

  // Only spend decoding time while the hero is on screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) =>
      videos.current.forEach((v) => void (e.isIntersecting ? v.play().catch(() => {}) : v.pause())),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // A new film starts where the current one is, then fades in; the old one leaves once it is covered.
  const onReady = (id: string) => {
    const v = videos.current.get(id);
    const prev = layers.find((l) => l.id !== id && l.shown);
    const from = prev && videos.current.get(prev.id);
    if (v && from && Number.isFinite(from.currentTime)) v.currentTime = from.currentTime % (v.duration || Infinity);
  };
  const onPlaying = (id: string) => {
    setLayers((now) => now.map((l) => (l.id === id ? { ...l, shown: true } : l)));
    window.setTimeout(() => setLayers((now) => (now.at(-1)?.id === id ? now.filter((l) => l.id === id) : now)), CROSSFADE_MS);
  };

  return (
    <div className="hero__film" ref={box} aria-hidden="true">
      {layers.map((l) => (
        <video
          key={l.id}
          ref={(v) => void (v ? videos.current.set(l.id, v) : videos.current.delete(l.id))}
          className={l.shown ? "is-playing" : undefined}
          src={l.src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          onLoadedMetadata={() => onReady(l.id)}
          onPlaying={() => onPlaying(l.id)}
        />
      ))}
    </div>
  );
}
