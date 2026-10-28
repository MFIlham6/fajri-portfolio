import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getUI, type Lang } from "@/content/i18n";
import { figureSrc, projectContext, projectLabel, type Project } from "@/content/projects";
import { MiniDashboard } from "./mini-dashboards";
import type { ImageSizes } from "./project-grid";

/* Home list, laid out like a cargo manifest: a header row, then one line per project (number, industry and
   field, case, tools). Hover (or focus) opens the line and deals its dashboard or chart in like a card. */
export function ProjectList({ projects, lang, sizes }: { projects: Project[]; lang: Lang; sizes: ImageSizes }) {
  const ui = getUI(lang);
  const m = ui.projects.manifest;
  return (
    <>
    <div className="manifest__head" aria-hidden="true">
      <span>{m.no}</span>
      <span>{m.context}</span>
      <span>{m.case}</span>
      <span>{m.tools}</span>
    </div>
    <ol className="plist" role="list" data-reveal-list>
      {projects.map((p, i) => {
        const src = figureSrc(p, lang);
        const size = src ? sizes[src] : undefined;
        // Only images close to the 2:1 frame fill it; wider charts are shown whole so no labels are cut off.
        const wide = !!size && size.width / size.height > 2.15;
        return (
          <li className="prow" key={p.slug}>
            <Link className="prow__link" href={`/${lang}/projects/${p.slug}`} data-transition={projectLabel(p, lang)}>
              <span className="prow__idx mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="prow__meta">
                {projectContext(p, lang).map((x, n) => (
                  <span key={x}>
                    {n > 0 && <br />}
                    {x}
                  </span>
                ))}
              </span>
              <span className="prow__title">{projectLabel(p, lang)}</span>
              <span className="prow__tags">{p.tags.slice(0, 3).map((t) => t[lang]).join(" · ")}</span>
              <span className="prow__arrow" aria-hidden="true">
                <ArrowRight />
              </span>
              <span className="prow__reveal">
                <span>
                  <span className="prow__reveal-inner">
                    <span className={src ? `prow__thumb prow__thumb--img beam${wide ? " is-wide" : ""}` : "prow__thumb beam"} aria-hidden="true">
                      {src ? (
                        <span className="prow__img">
                          {/* eslint-disable-next-line @next/next/no-img-element -- chart exported from the case files */}
                          <img src={src} alt="" width={size?.width} height={size?.height} loading="lazy" />
                        </span>
                      ) : (
                        <span className="prow__dash">
                          <MiniDashboard slug={p.slug} />
                        </span>
                      )}
                    </span>
                    <span className="prow__sum">
                      <span className="prow__headline">{p.title[lang]}</span>
                      {p.sentence[lang]}
                      <span className="prow__cta">
                        {ui.projects.readSummary} <ArrowRight aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
    </>
  );
}
