"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { getUI, type Lang } from "@/content/i18n";
import { LangSwitch, ThemeToggle } from "./controls";
import { NavLamp } from "./nav-lamp";
import { SoundToggle } from "./sound";

const sectionIds = ["about", "experience", "projects", "organizations", "certifications"] as const;

export function Header({ lang }: { lang: Lang }) {
  const ui = getUI(lang);
  const pathname = usePathname() || `/${lang}`;
  const home = `/${lang}`;
  const onHome = pathname === home || pathname === `${home}/`;
  const href = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);
  const projectsBase = `${home}/projects`;

  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [state, setState] = useState({ scrolled: false, hidden: false, dark: false });

  // Scroll state: hide on scroll down, dark styling over dark bands.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dark = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme='dark']")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 44 && r.bottom >= 44;
      });
      setState((s) => {
        let hidden = s.hidden;
        if (y > lastY + 4 && y > window.innerHeight * 0.9) hidden = true;
        else if (y < lastY - 4 || y < 80) hidden = false;
        return { scrolled: y > 12, hidden, dark };
      });
      lastY = y;
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
  }, [pathname]);

  // Active section in the pill (home: from scroll position; other pages: from the path).
  useEffect(() => {
    if (!onHome) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [onHome]);
  const current = onHome ? active : pathname.startsWith(projectsBase) ? "projects" : null;

  // Mobile menu: lock scroll, close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const cls = ["site-header", state.scrolled && "is-scrolled", state.hidden && !open && "is-hidden", (state.dark || open) && "on-dark"].filter(Boolean).join(" ");
  const navLink = (id: (typeof sectionIds)[number], label: string) => (
    <Link href={href(id)} className={current === id ? "is-active" : undefined} aria-current={current === id ? "true" : undefined}>
      {label}
    </Link>
  );

  return (
    <>
      <header className={cls} onFocus={() => setState((s) => ({ ...s, hidden: false }))}>
        <div className="wrap site-header__bar">
          {/* Left column of the header grid, kept empty so the nav pill stays centred. */}
          <span className="hdr-meta" aria-hidden="true" />

          <div className="pill">
            <Link className="pill__mark" href={onHome ? "#top" : home} aria-label={ui.backToTop}>
              <Image src="/images/profile/fajri-avatar.webp" alt="" width={40} height={40} priority />
            </Link>
            <NavLamp activeKey={current}>
              {navLink("about", ui.nav.about)}
              {navLink("experience", ui.nav.experience)}
              <div className="navdrop">
                <Link href={projectsBase} className={current === "projects" ? "is-active" : undefined} aria-current={current === "projects" ? "true" : undefined}>
                  {ui.nav.projects} <ChevronDown aria-hidden="true" className="navdrop__chev" />
                </Link>
                <div className="navdrop__panel">
                  <Link href={`${projectsBase}#data-analyst`}>{ui.projectsMenu.data}</Link>
                  <Link href={`${projectsBase}#business-system-analyst`}>{ui.projectsMenu.bsa}</Link>
                </div>
              </div>
              {navLink("organizations", ui.nav.organizations)}
              {navLink("certifications", ui.nav.certifications)}
            </NavLamp>
            <Link className="pill__cta" href="#contact">
              <Mail aria-hidden="true" />
              <span>{ui.letsTalk}</span>
            </Link>
            <button
              ref={toggleRef}
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ui.menuClose : ui.menuOpen}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>

          <div className="hdr-ctl">
            {onHome && <SoundToggle lang={lang} />}
            <LangSwitch lang={lang} />
            <ThemeToggle lang={lang} />
          </div>
        </div>
      </header>

      <div className={open ? "mobile-menu is-open" : "mobile-menu"} id="mobile-menu" aria-label="Menu" hidden={!open}>
        <ol>
          <li><Link className="mm-link" href={href("about")} onClick={() => setOpen(false)}>{ui.nav.about}</Link></li>
          <li><Link className="mm-link" href={href("experience")} onClick={() => setOpen(false)}>{ui.nav.experience}</Link></li>
          <li>
            <Link className="mm-link" href={projectsBase} onClick={() => setOpen(false)}>{ui.nav.projects}</Link>
            <div className="mm-sub">
              <Link href={`${projectsBase}#data-analyst`} onClick={() => setOpen(false)}>{ui.projectsMenu.data}</Link>
              <Link href={`${projectsBase}#business-system-analyst`} onClick={() => setOpen(false)}>{ui.projectsMenu.bsa}</Link>
            </div>
          </li>
          <li><Link className="mm-link" href={href("organizations")} onClick={() => setOpen(false)}>{ui.nav.organizations}</Link></li>
          <li><Link className="mm-link" href={href("certifications")} onClick={() => setOpen(false)}>{ui.nav.certifications}</Link></li>
          <li><Link className="mm-link" href="#contact" onClick={() => setOpen(false)}>{ui.nav.contact}</Link></li>
        </ol>
        <div className="mobile-menu__foot">
          <LangSwitch lang={lang} />
          <ThemeToggle lang={lang} />
        </div>
      </div>
    </>
  );
}
