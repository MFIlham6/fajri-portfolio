"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getUI, type Lang } from "@/content/i18n";
import { figureSrc, projectContext, projectLabel, type Project } from "@/content/projects";
import { MiniDashboard, miniDashboardSlugs } from "./mini-dashboards";

export type ImageSizes = Record<string, { width: number; height: number }>;

export function ProjectCard({ p, lang, size }: { p: Project; lang: Lang; size?: { width: number; height: number } }) {
  const ui = getUI(lang);
  const src = figureSrc(p, lang);
  return (
    <li className="pcard">
      <Link href={`/${lang}/projects/${p.slug}`} className="pcard__link" data-transition={projectLabel(p, lang)}>
        <span className={src ? "pcard__img" : "pcard__img pcard__img--empty"}>
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element -- static chart exported from the case files
            <img src={src} alt="" width={size?.width} height={size?.height} loading="lazy" decoding="async" />
          ) : miniDashboardSlugs.has(p.slug) ? (
            <span className="pcard__dash" aria-hidden="true">
              <MiniDashboard slug={p.slug} />
            </span>
          ) : (
            <span className="pcard__code" aria-hidden="true">{projectLabel(p, lang)}</span>
          )}
        </span>
        <span className="pcard__meta">
          <span className="mono">{projectContext(p, lang).join(", ")}</span>
          {p.featured && <span className="pcard__badge mono">{ui.projects.featuredBadge}</span>}
        </span>
        <span className="pcard__title">{projectLabel(p, lang)}</span>
        <span className="pcard__sum">{p.title[lang]}</span>
        <span className="pcard__tags">
          {p.tags.map((t) => (
            <span className="chip" key={t.en}>{t[lang]}</span>
          ))}
        </span>
        <span className="pcard__cta">
          {ui.projects.readSummary} <ArrowRight aria-hidden="true" />
        </span>
      </Link>
    </li>
  );
}

type FilterKey = "industry" | "field" | "tools";

/** The values a project has for one filter: its industry, its field, or each of its tools. */
function valuesOf(p: Project, key: FilterKey, lang: Lang): { key: string; label: string }[] {
  if (key === "tools") return (p.tools ?? []).map((t) => ({ key: t, label: t }));
  const v = p[key];
  return v ? [{ key: v.en, label: v[lang] }] : [];
}

/** Project grid with dropdown filters for industry, field, and tools (all projects shown by default).
    Each option shows how many projects it would leave given the other filters; options that would leave none are disabled. */
export function ProjectGrid({ projects, lang, sizes, filter = true }: { projects: Project[]; lang: Lang; sizes: ImageSizes; filter?: boolean }) {
  const ui = getUI(lang);
  const keys: FilterKey[] = ["industry", "field", "tools"];
  const [picked, setPicked] = useState<Record<FilterKey, string>>({ industry: "", field: "", tools: "" });
  const matches = (p: Project, skip?: FilterKey) =>
    keys.every((k) => k === skip || !picked[k] || valuesOf(p, k, lang).some((v) => v.key === picked[k]));
  const list = projects.filter((p) => matches(p));

  const options = useMemo(() => {
    const out = {} as Record<FilterKey, { key: string; label: string; n: number }[]>;
    for (const k of keys) {
      const seen = new Map<string, { key: string; label: string; n: number }>();
      projects.forEach((p) => valuesOf(p, k, lang).forEach((v) => seen.has(v.key) || seen.set(v.key, { ...v, n: 0 })));
      projects.filter((p) => matches(p, k)).forEach((p) => valuesOf(p, k, lang).forEach((v) => seen.get(v.key)!.n++));
      out[k] = [...seen.values()].sort((a, b) => a.label.localeCompare(b.label, lang));
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- matches only reads `picked`
  }, [projects, lang, picked]);
  const active = keys.some((k) => picked[k]);

  return (
    <>
      {filter && (
        <div className="filters" role="group" aria-label={ui.projects.filterLabel}>
          <div className="filters__group">
            {keys.map((k) => (
              <label className="fsel" key={k}>
                <span className="mono fsel__label">{ui.projects.filterBy[k]}</span>
                <select value={picked[k]} onChange={(e) => setPicked({ ...picked, [k]: e.target.value })}>
                  <option value="">{ui.projects.all}</option>
                  {options[k].map((o) => (
                    <option key={o.key} value={o.key} disabled={o.n === 0 && picked[k] !== o.key}>
                      {o.label} ({o.n})
                    </option>
                  ))}
                </select>
              </label>
            ))}
            {active && (
              <button type="button" className="filter" onClick={() => setPicked({ industry: "", field: "", tools: "" })}>
                {ui.projects.reset}
              </button>
            )}
          </div>
          <span className="filters__count mono" aria-live="polite">
            {ui.projects.count(list.length, projects.length)}
          </span>
        </div>
      )}
      <ol className="pgrid" role="list">
        {list.map((p) => (
          <ProjectCard key={p.slug} p={p} lang={lang} size={sizes[figureSrc(p, lang) ?? ""]} />
        ))}
      </ol>
    </>
  );
}
