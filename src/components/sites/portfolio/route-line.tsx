"use client";

import { useEffect, useRef, useState } from "react";

/* One shipping route down the left margin of the home page, from About to the contact block: a faint dashed
   lane, a bright line that draws itself as you scroll, a stop at each section heading that lights up once
   passed, and a small container riding the head of the line. Wide screens only; with reduced motion the
   route is simply drawn in full. */

type Stop = { x: number; y: number };

const SECTIONS = ["about", "experience", "projects", "organizations", "certifications", "contact"];

export function RouteLine() {
  const svg = useRef<SVGSVGElement>(null);
  const lit = useRef<SVGPathElement>(null);
  const box = useRef<SVGGElement>(null);
  const [geo, setGeo] = useState<{ d: string; stops: Stop[]; h: number } | null>(null);

  // Measure the stops: each section's heading, in the left margin of the content column.
  useEffect(() => {
    const host = svg.current?.parentElement;
    if (!host) return;
    const measure = () => {
      if (window.innerWidth < 1100) return setGeo(null);
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      const wrap = document.querySelector<HTMLElement>("#about .wrap");
      if (!wrap) return;
      const gutter = parseFloat(getComputedStyle(wrap).paddingLeft) || 40;
      const x = wrap.getBoundingClientRect().left + gutter * 0.42;
      const stops: Stop[] = [];
      for (const id of SECTIONS) {
        const sec = document.getElementById(id);
        const head = sec?.querySelector<HTMLElement>("h2");
        if (!head) continue;
        const r = head.getBoundingClientRect();
        stops.push({ x, y: r.top + window.scrollY - hostTop + r.height / 2 });
      }
      if (stops.length < 2) return setGeo(null);
      // A lane that sways gently between stops, like a route on a chart.
      let d = `M ${stops[0].x} ${stops[0].y}`;
      for (let i = 1; i < stops.length; i++) {
        const a = stops[i - 1], b = stops[i];
        const sway = (i % 2 ? 1 : -1) * Math.min(14, gutter * 0.25);
        const dy = b.y - a.y;
        d += ` C ${a.x + sway} ${a.y + dy * 0.35}, ${b.x + sway} ${b.y - dy * 0.35}, ${b.x} ${b.y}`;
      }
      // The last stop (contact) sits in the footer, below this element: let the drawing run past its end.
      setGeo({ d, stops, h: Math.max(host.scrollHeight, stops[stops.length - 1].y + 40) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    window.addEventListener("resize", measure);
    window.addEventListener("portfolio:layout", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("portfolio:layout", measure);
    };
  }, []);

  // Draw the route up to the reading line (60% down the screen), light the stops behind it, move the container.
  useEffect(() => {
    const path = lit.current;
    const host = svg.current?.parentElement;
    if (!geo || !path || !host) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = svg.current!.querySelectorAll<SVGCircleElement>(".route__stop");
    let raf = 0;
    const update = () => {
      raf = 0;
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      const readY = window.scrollY + window.innerHeight * 0.6 - hostTop;
      const first = geo.stops[0].y, last = geo.stops[geo.stops.length - 1].y;
      const p = reduced ? 1 : Math.min(1, Math.max(0, (readY - first) / (last - first)));
      path.style.strokeDashoffset = `${len * (1 - p)}`;
      const head = path.getPointAtLength(len * p);
      box.current?.setAttribute("transform", `translate(${head.x} ${head.y})`);
      box.current?.setAttribute("opacity", p > 0 && p < 1 ? "1" : "0");
      dots.forEach((dot, i) => dot.classList.toggle("is-passed", reduced || readY >= geo.stops[i].y - 2));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [geo]);

  return (
    <svg ref={svg} className="route" width="100%" height={geo?.h ?? 0} aria-hidden="true" focusable="false">
      {geo && (
        <>
          <path className="route__lane" d={geo.d} />
          <path ref={lit} className="route__lit" d={geo.d} />
          {geo.stops.map((s, i) => (
            <circle key={i} className="route__stop" cx={s.x} cy={s.y} r={6} />
          ))}
          <g ref={box} className="route__box">
            <rect x={-7} y={-4.5} width={14} height={9} rx={1.5} />
          </g>
        </>
      )}
    </svg>
  );
}
