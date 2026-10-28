"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { getUI, type Lang } from "@/content/i18n";
import { experience } from "@/content/profile";
import { getProject, projectLabel } from "@/content/projects";

export function Experience({ lang }: { lang: Lang }) {
  const ui = getUI(lang);
  // Every entry starts closed; a click opens its description.
  const [openIds, setOpenIds] = useState<string[]>([]);
  const toggle = (id: string) => {
    setOpenIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
    window.setTimeout(() => window.dispatchEvent(new Event("portfolio:layout")), 650);
  };

  return (
    <ol className="xp" role="list">
      {experience.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <li key={item.id} className={open ? "xp__item is-open" : "xp__item"}>
            <button className="xp__btn" type="button" aria-expanded={open} aria-controls={`xp-${item.id}`} id={`xp-${item.id}-btn`} onClick={() => toggle(item.id)}>
              <span className="xp__org">{item.org}</span>
              <span className="xp__role">{item.role[lang]}</span>
              <span className="xp__date mono">{item.date[lang]}</span>
              <span className="xp__icon" aria-hidden="true">
                <Plus />
              </span>
            </button>
            <div className="xp__panel" id={`xp-${item.id}`} role="region" aria-labelledby={`xp-${item.id}-btn`}>
              <div>
                <div className="xp__body">
                  <div>
                    {item.intro && <p className="xp__panel-text">{item.intro[lang]}</p>}
                    <ul>
                      {item.bullets.map((b) => (
                        <li key={b.en}>
                          <span>{b[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {item.related.length > 0 && (
                    <div className="xp__aside">
                      <span className="mono">{ui.experience.related}</span>
                      {item.related.map((slug) => {
                        const p = getProject(slug);
                        if (!p) return null;
                        return (
                          <Link key={slug} className="link-arrow" href={`/${lang}/projects/${slug}`} data-transition={projectLabel(p, lang)}>
                            {projectLabel(p, lang)} <ArrowRight aria-hidden="true" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
