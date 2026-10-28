"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/* Navbar highlight that slides to the active (or hovered) link, with a thin glow along its top edge.
   Pure React + CSS; the links themselves are unchanged. */

export function NavLamp({ activeKey, children }: { activeKey: string | null; children: ReactNode }) {
  const nav = useRef<HTMLElement>(null);
  const lamp = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  // Position is layout work, so it is written straight to the lamp element rather than through state.
  const measure = useCallback(() => {
    const el = nav.current;
    const l = lamp.current;
    if (!el || !l) return;
    const current = hover ?? el.querySelector<HTMLElement>("a[aria-current='true']");
    // Nothing active yet (top of the page): park on the first link, without the highlight.
    const target = current ?? el.querySelector<HTMLElement>(".nav > a");
    l.classList.toggle("is-on", !!current);
    if (!target) return;
    const n = el.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    l.style.transform = `translateX(${r.left - n.left}px)`;
    l.style.width = `${r.width}px`;
  }, [hover]);

  useLayoutEffect(measure, [measure, activeKey]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    // Turn on the slide transition only after the first placement, so the lamp doesn't fly in from the left.
    const id = requestAnimationFrame(() => setReady(true));
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(id);
    };
  }, [measure]);

  return (
    <nav
      ref={nav}
      className={ready ? "nav nav--lamp is-ready" : "nav nav--lamp"}
      aria-label="Primary"
      onMouseOver={(e) => {
        const a = (e.target as HTMLElement).closest<HTMLElement>(".nav > a, .nav > .navdrop > a");
        if (a) setHover(a);
      }}
      onMouseLeave={() => setHover(null)}
    >
      <span className="nav__lamp" ref={lamp} aria-hidden="true">
        <span className="nav__glow" />
      </span>
      {children}
    </nav>
  );
}
