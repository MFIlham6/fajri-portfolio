"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Page-wide motion and the project page transition.
   Content is fully visible without this component; it only adds movement. */

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Motion({ label }: { label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const layerRef = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const [title, setTitle] = useState("");

  // Smooth in-page anchors + transition into project pages (capture phase, before next/link).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a) return;
      const raw = a.getAttribute("href") ?? "";

      if (raw.startsWith("#")) {
        const target = raw.length > 1 ? document.getElementById(raw.slice(1)) : null;
        if (!target) return;
        e.preventDefault();
        e.stopPropagation();
        target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
        history.pushState(null, "", raw);
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        return;
      }

      const name = a.getAttribute("data-transition");
      const layer = layerRef.current;
      if (!name || !layer || reduced() || a.target === "_blank") return;
      e.preventDefault();
      e.stopPropagation();
      setTitle(name);
      const r = a.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const from = `inset(${Math.max(r.top, 0)}px ${Math.max(vw - r.right, 0)}px ${Math.max(vh - r.bottom, 0)}px ${Math.max(r.left, 0)}px round 16px)`;
      const text = layer.firstElementChild;
      gsap.set(layer, { clipPath: from, visibility: "visible" });
      if (text) gsap.set(text, { opacity: 0, y: 20 });
      covering.current = true;
      gsap
        .timeline({ onComplete: () => router.push(a.getAttribute("href") ?? "/") })
        .to(layer, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 0.75, ease: "expo.inOut" })
        .to(text, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, "-=0.3");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // After navigation: lift the cover; reset scroll for new pages.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !covering.current) return;
    covering.current = false;
    if (!window.location.hash) window.scrollTo(0, 0);
    gsap.to(layer, {
      clipPath: "inset(0% 0% 100% 0% round 0px)",
      duration: 0.85,
      ease: "expo.inOut",
      delay: 0.1,
      onComplete: () => {
        gsap.set(layer, { visibility: "hidden", clipPath: "inset(100% 0% 0% 0% round 0px)" });
      },
    });
  }, [pathname]);

  // Scroll-driven motion for the current page.
  useEffect(() => {
    if (reduced()) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "expo.out" });

    const ctx = gsap.context(() => {
      $$("[data-draw]").forEach((r) => {
        gsap.fromTo(r, { "--draw": 0 }, { "--draw": 1, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: r, start: "top 90%", once: true } });
      });

      ["[data-reveal-list] > li", ".pgrid > li", ".certs > li"].forEach((sel) => {
        const items = $$(sel);
        if (!items.length) return;
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.06 }),
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px) and (min-height: 700px)", () => {
        const card = document.querySelector("[data-hero-card]");
        const handoff = document.querySelector(".handoff");
        if (card && handoff) {
          gsap.to(card, { scale: 0.93, opacity: 0.35, ease: "none", scrollTrigger: { trigger: handoff, start: "top bottom", end: "top 15%", scrub: true } });
        }
      });

      // Organizations ("How I work" band): each column brightens and its line fills in turn.
      // Pinned when the band fits the screen; otherwise it plays across the band's own scroll.
      mm.add("(min-width: 901px)", () => {
        const band = document.querySelector<HTMLElement>(".how");
        const steps = $$("[data-step]");
        if (!band || !steps.length) return;
        steps.forEach((st) => {
          gsap.set(st.querySelector(".rule"), { "--fill": 0 });
          gsap.set($$("h3, .step__list, .step__proof", st), { opacity: 0.3 });
        });
        const fits = band.offsetHeight <= window.innerHeight;
        const tl = gsap.timeline({
          scrollTrigger: fits
            ? { trigger: band, start: "top top", end: `+=${Math.round(window.innerHeight * 1.4)}`, pin: true, scrub: 0.6, anticipatePin: 1 }
            : { trigger: band, start: "top 60%", end: "bottom 85%", scrub: 0.6 },
        });
        steps.forEach((st, i) => {
          tl.to($$("h3, .step__list, .step__proof", st), { opacity: 1, duration: 0.4, ease: "none" }, i).to(st.querySelector(".rule"), { "--fill": 1, duration: 1, ease: "none" }, i);
        });
      });
      mm.add("(max-width: 900px)", () => {
        $$("[data-step] .rule").forEach((r) => {
          gsap.fromTo(r, { "--fill": 0 }, { "--fill": 1, duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: r, start: "top 85%", once: true } });
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("portfolio:layout", refresh);
    document.fonts?.ready.then(() => {
      refresh();
      const t = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
      if (t) t.scrollIntoView({ behavior: "instant", block: "start" });
    });

    return () => {
      window.removeEventListener("portfolio:layout", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div className="transition" aria-hidden="true" ref={layerRef}>
      <div className="transition__label">
        <span className="mono">{label}</span>
        <span>{title}</span>
      </div>
    </div>
  );
}
