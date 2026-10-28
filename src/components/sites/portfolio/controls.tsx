"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { getUI, switchLangPath, type Lang } from "@/content/i18n";

type Theme = "light" | "dark";

/* The theme lives on <html data-theme>, set before paint by the root layout's inline script.
   Components subscribe to that attribute instead of keeping their own copy. */
function subscribeTheme(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const serverTheme = (): Theme | null => null;

function setTheme(next: Theme, persist: boolean) {
  document.documentElement.dataset.theme = next;
  if (!persist) return;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

function rememberLang(to: Lang) {
  document.cookie = `lang=${to}; path=/; max-age=31536000; samesite=lax`;
}

/** Light/dark switch. */
export function ThemeToggle({ lang }: { lang: Lang }) {
  const t = getUI(lang).theme;
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);

  // Follow the OS only until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      setTheme(e.matches ? "dark" : "light", false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const label = theme === "dark" ? t.toLight : t.toDark;
  return (
    <button
      type="button"
      className="ctl ctl--theme"
      onClick={() => setTheme(readTheme() === "dark" ? "light" : "dark", true)}
      aria-pressed={theme === "dark"}
      aria-label={label}
      title={label}
    >
      <Sun className="ctl__sun" aria-hidden="true" />
      <Moon className="ctl__moon" aria-hidden="true" />
    </button>
  );
}

/** EN / ID switch: same page, other language. Remembers the choice for the root redirect. */
export function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`;
  const ui = getUI(lang);
  return (
    <div className="ctl ctl--lang" role="group" aria-label={ui.langLabel}>
      {(["en", "id"] as const).map((l) =>
        l === lang ? (
          <span key={l} className="ctl__lang is-on" aria-current="true">
            {l.toUpperCase()}
          </span>
        ) : (
          // Plain <a>: a new language is a new root layout, so load it fresh (the boot script re-applies theme).
          <a key={l} href={switchLangPath(pathname, l)} className="ctl__lang" hrefLang={l} lang={l} onClick={() => rememberLang(l)} aria-label={ui.langSwitchTo}>
            {l.toUpperCase()}
          </a>
        ),
      )}
    </div>
  );
}
