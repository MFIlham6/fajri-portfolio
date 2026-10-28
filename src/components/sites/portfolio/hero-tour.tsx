"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { CHAPTERS, CHAPTER_FADE, DISSOLVE, TOUR } from "./hero-3d-direction";

/* Scroll tour: three forward pushes through the yard (into a warehouse window, into the truck's headlights,
   up through the crane toward the moon), each flying through into the next. Rendered from hero-3d-scene.tsx
   as a numbered image sequence and drawn on a canvas by scroll position, so it is as sharp and smooth as
   video and runs backwards when scrolling up; between two frames the canvas blends them. In the light theme
   the tour runs from day into night (the lamps come on as dusk falls); in the dark theme it stays at night.
   The loop film and the opening text give way as the tour starts, and each scene's caption takes the
   headline's place while the camera is on it. The end dissolves into the About background. Frames load after the page is idle, nearest-first;
   until a frame is in, the nearest loaded one shows. */

gsap.registerPlugin(ScrollTrigger);

type Look = "day" | "night";
type Shape = "wide" | "tall";

const frameUrl = (look: Look, shape: Shape, i: number) => `/video/tour-${look}-${shape}/${String(i).padStart(3, "0")}.webp`;

export function HeroTour() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const fade = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const hero = cv?.closest<HTMLElement>(".hero");
    const track = cv?.closest<HTMLElement>(".hero-track");
    if (!cv || !hero || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d")!;
    const root = document.documentElement;
    const tall = window.matchMedia("(max-aspect-ratio: 1/1)");
    const film = hero.querySelector<HTMLElement>(".hero__film");
    // The opening text gives way to the scene captions as the tour starts.
    const content = hero.querySelectorAll<HTMLElement>(".hero__content, .hero__cue");
    const chapters = hero.querySelectorAll<HTMLElement>(".hero__chapter");

    let frames: (HTMLImageElement | undefined)[] = [];
    let key = "";
    let alive = true;

    let at = 0; // exact position on the sequence, in frames
    let current = 0; // nearest frame, which loading starts from
    let drawn = "";
    const ready = (i: number) => !!frames[i]?.complete && !!frames[i]!.naturalWidth;
    const nearest = (i: number) => {
      for (let d = 0; d < TOUR.frames; d++) {
        if (ready(i - d)) return i - d;
        if (ready(i + d)) return i + d;
      }
      return -1;
    };

    // Cover-fit draw: the two frames around the position, blended; or the nearest loaded one.
    const draw = (force = false) => {
      const lo = Math.floor(at), hi = Math.min(TOUR.frames - 1, lo + 1), mix = at - lo;
      const both = ready(lo) && ready(hi);
      const a = both ? lo : nearest(Math.round(at));
      if (a < 0) return;
      const sig = both ? `${lo}:${mix.toFixed(2)}` : `${a}`;
      if (sig === drawn && !force) return;
      drawn = sig;
      const w = Math.round(cv.clientWidth * Math.min(devicePixelRatio, 2));
      const h = Math.round(cv.clientHeight * Math.min(devicePixelRatio, 2));
      if (cv.width !== w || cv.height !== h) Object.assign(cv, { width: w, height: h });
      const paint = (img: HTMLImageElement, alpha: number) => {
        const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, (w - img.naturalWidth * s) / 2, (h - img.naturalHeight * s) / 2, img.naturalWidth * s, img.naturalHeight * s);
      };
      paint(frames[a]!, 1);
      if (both && mix > 0.01) paint(frames[hi]!, mix);
      ctx.globalAlpha = 1;
    };

    // Load the sequence for the current theme and shape: the first frame at once, the rest when idle.
    const load = () => {
      const look: Look = root.dataset.theme === "dark" ? "night" : "day";
      const shape: Shape = tall.matches ? "tall" : "wide";
      if (`${look}-${shape}` === key) return;
      key = `${look}-${shape}`;
      frames = new Array(TOUR.frames);
      drawn = "";
      const order = Array.from({ length: TOUR.frames }, (_, i) => i).sort((a, b) => Math.abs(a - current) - Math.abs(b - current));
      const mine = key;
      let next = 0;
      const pump = () => {
        if (!alive || mine !== key) return;
        for (let n = 0; n < 6 && next < order.length; n++) {
          const i = order[next++];
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            if (mine === key && Math.abs(i - at) <= 1.5) draw(true);
            else if (mine === key && !drawn) draw(true);
          };
          img.src = frameUrl(look, shape, i);
          frames[i] = img;
        }
        if (next < order.length) setTimeout(pump, 120);
      };
      if ("requestIdleCallback" in window) requestIdleCallback(pump, { timeout: 2500 });
      else setTimeout(pump, 1200);
    };
    load();
    const mo = new MutationObserver(load);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    tall.addEventListener("change", load);
    const onResize = () => draw(true);
    window.addEventListener("resize", onResize);

    // Smooth scrolling, so the scrubbed frames glide instead of stepping with the wheel.
    const lenis = new Lenis({ anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: ({ progress: p }) => {
        // Linear: each shot carries its own push (see SHOTS), so scroll speed is camera speed.
        const path = p;
        at = path * (TOUR.frames - 1);
        current = Math.round(at);
        draw();
        // Hand-over from the loop to the tour, and the headline out, over the first stretch of scroll.
        const hand = gsap.utils.clamp(0, 1, p / TOUR.handover);
        cv.style.opacity = String(hand);
        if (film) film.style.opacity = String(1 - hand);
        content.forEach((el) => (el.style.opacity = String(1 - gsap.utils.clamp(0, 1, p / (TOUR.handover * 0.8)))));
        chapters.forEach((el, i) => {
          const c = CHAPTERS[i];
          const show = c ? Math.min(gsap.utils.clamp(0, 1, (path - c.from) / CHAPTER_FADE), gsap.utils.clamp(0, 1, (c.to - path) / CHAPTER_FADE)) : 0;
          el.style.setProperty("--show", show.toFixed(3));
        });
        const f = gsap.utils.clamp(0, 1, (p - DISSOLVE.from) / (DISSOLVE.to - DISSOLVE.from));
        if (fade.current) fade.current.style.opacity = String(f * f * (3 - 2 * f));
      },
    });

    return () => {
      alive = false;
      trigger.kill();
      mo.disconnect();
      tall.removeEventListener("change", load);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="hero__tour" aria-hidden="true" />
      <div ref={fade} className="hero__fade" aria-hidden="true" />
    </>
  );
}
