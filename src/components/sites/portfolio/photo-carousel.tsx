"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Photo = { src: string; width: number; height: number; alt: string };

const AUTOPLAY_MS = 4000;

/**
 * Swipeable photo strip (scroll-snap) with previous/next buttons and dots. Works with touch, mouse, and keyboard.
 * Advances on its own every few seconds; pauses while hovered, focused, off screen, or when reduced motion is on.
 */
export function PhotoCarousel({ photos, label, prevLabel, nextLabel }: { photos: Photo[]; label: string; prevLabel: string; nextLabel: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + photos.length) % photos.length;
    const left = next * el.clientWidth;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = el.scrollLeft;
    el.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    setIndex(next);
    // Some browsers drop a smooth scroll that starts while the previous snap is still settling.
    // If the track hasn't moved shortly after, jump to the slide instead.
    window.setTimeout(() => {
      if (Math.abs(el.scrollLeft - from) < 1 && Math.abs(el.scrollLeft - left) > 1) el.scrollTo({ left, behavior: "auto" });
    }, 150);
  };

  // Only run while the carousel is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay. Restarts its timer after every slide change, so a manual move gets a full interval too.
  useEffect(() => {
    if (paused || !visible || photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- go only reads refs and the current index
  }, [index, paused, visible, photos.length]);

  return (
    <div
      className="carousel"
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div
        className="carousel__track"
        ref={track}
        tabIndex={0}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / Math.max(1, e.currentTarget.clientWidth)))}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(index + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(index - 1);
          }
        }}
      >
        {photos.map((ph, i) => (
          <figure className="carousel__slide" key={ph.src} aria-roledescription="slide" aria-label={`${i + 1} / ${photos.length}`}>
            {/* Blurred copy fills the sides when the photo is narrower than the frame; the photo itself is never cropped. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative backdrop */}
            <img className="carousel__backdrop" src={ph.src} alt="" aria-hidden="true" loading="lazy" draggable={false} />
            {/* eslint-disable-next-line @next/next/no-img-element -- static photo from the activity */}
            <img className="carousel__photo" src={ph.src} alt={ph.alt} width={ph.width} height={ph.height} loading="lazy" draggable={false} />
          </figure>
        ))}
      </div>
      <div className="carousel__bar">
        <button type="button" className="carousel__btn" onClick={() => go(index - 1)} aria-label={prevLabel}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <div className="carousel__dots">
          {photos.map((ph, i) => (
            <button
              key={ph.src}
              type="button"
              className={i === index ? "carousel__dot is-on" : "carousel__dot"}
              onClick={() => go(i)}
              aria-label={`${i + 1} / ${photos.length}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
        <button type="button" className="carousel__btn" onClick={() => go(index + 1)} aria-label={nextLabel}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
