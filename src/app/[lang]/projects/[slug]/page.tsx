import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Rich } from "@/components/sites/portfolio/rich";
import { getUI, isLang, locales } from "@/content/i18n";
import { profile } from "@/content/profile";
import { figureSrc, getProject, projectLabel, projects, publicFiles, type BsaRow, type L } from "@/content/projects";
import { publicImageMeta } from "@/lib/studi-kasus";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!isLang(lang) || !p) return {};
  return {
    title: `${projectLabel(p, lang)}: ${p.title[lang]} | ${profile.name}`,
    description: p.sentence[lang],
    alternates: { canonical: `/${lang}/projects/${slug}`, languages: { en: `/en/projects/${slug}`, id: `/id/projects/${slug}` } },
    openGraph: { type: "article", title: p.title[lang], description: p.sentence[lang], images: [figureSrc(p, lang) ?? "/og-image.png"] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!isLang(lang) || !p) notFound();
  const ui = getUI(lang);
  const t = ui.project;
  const fullHref = p.fullCase ? `/${lang}/projects/${p.slug}/full` : undefined;
  const src = figureSrc(p, lang);
  const meta = src ? await publicImageMeta(src) : undefined;
  const siblings = projects.filter((x) => x.category === p.category);
  const next = siblings[(siblings.indexOf(p) + 1) % siblings.length];

  const list = (items: L[]) => <ul>{items.map((d) => <li key={d.en}><Rich text={d[lang]} /></li>)}</ul>;
  const table = (rows: BsaRow[], head: [string, string]) => (
    <div className="md-table proj-table">
      <table>
        <thead>
          <tr><th scope="col">{head[0]}</th><th scope="col">{head[1]}</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label.en}>
              <td><Rich text={r.label[lang]} /></td>
              <td><Rich text={r.text[lang]} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const b = p.bsa;
  const sections: { id: string; label: string; body: React.ReactNode }[] = b ? [
    { id: "summary", label: t.summary, body: <p><Rich text={p.summary[lang]} /></p> },
    {
      id: "problem",
      label: t.bsa.problem,
      body: (
        <>
          <p><Rich text={b.asIs[lang]} /></p>
          <h3 className="proj-sub mono">{t.bsa.rootCauses}</h3>
          <ol className="proj-ol">{b.rootCauses.map((d) => <li key={d.en}><Rich text={d[lang]} /></li>)}</ol>
        </>
      ),
    },
    { id: "stakeholders", label: t.bsa.stakeholders, body: table(b.stakeholders, [t.bsa.role, t.bsa.needs]) },
    { id: "sources", label: t.bsa.sources, body: <p><Rich text={p.data[lang]} /></p> },
    { id: "design", label: t.bsa.design, body: list(p.decisions) },
    ...(b.iterations.length ? [{ id: "iterations", label: t.bsa.iterations, body: table(b.iterations, [t.bsa.feedback, t.bsa.change]) }] : []),
    {
      id: "result",
      label: t.bsa.result,
      body: (
        <>
          {list(p.findings)}
          <h3 className="proj-sub mono">{t.bsa.modules}</h3>
          <ol className="proj-ol proj-ol--cols">{b.modules.map((d) => <li key={d.en}><Rich text={d[lang]} /></li>)}</ol>
        </>
      ),
    },
    ...(b.testing[lang] || b.acceptance.length
      ? [{
          id: "testing",
          label: t.bsa.testing,
          body: (
            <>
              {b.testing[lang] && <p><Rich text={b.testing[lang]} /></p>}
              {b.acceptance.length > 0 && table(b.acceptance, [t.bsa.aspect, t.bsa.score])}
            </>
          ),
        }]
      : []),
    {
      id: "roadmap",
      label: t.bsa.roadmap,
      body: (
        <>
          {p.recommendation[lang] && <p><Rich text={p.recommendation[lang]} /></p>}
          {table(b.roadmap.map((r, i) => ({ ...r, label: { en: `${i + 1}. ${r.label.en}`, id: `${i + 1}. ${r.label.id}` } })), [t.bsa.step, t.bsa.why])}
        </>
      ),
    },
    { id: "limits", label: t.limits, body: <p><Rich text={p.limits[lang]} /></p> },
  ] : [
    { id: "summary", label: t.summary, body: <p><Rich text={p.summary[lang]} /></p> },
    { id: "data", label: t.data, body: <p><Rich text={p.data[lang]} /></p> },
    { id: "decisions", label: t.decisions, body: list(p.decisions) },
    { id: "findings", label: t.findings, body: list(p.findings) },
    { id: "recommendation", label: t.recommendation, body: <p><Rich text={p.recommendation[lang]} /></p> },
    { id: "limits", label: t.limits, body: <p><Rich text={p.limits[lang]} /></p> },
  ];

  return (
    <main id="main">
      <article>
        <header className="proj-hero wrap">
          <p className="crumbs mono">
            <Link href={`/${lang}/projects`}>← {t.allProjects}</Link>
            <span aria-hidden="true">/</span>
            <span>{projectLabel(p, lang)}</span>
          </p>
          <h1 className="proj-title">{p.title[lang]}</h1>
          <p className="proj-info mono">
            {p.info.map((i, n) => (
              <span key={i.en}>
                {n > 0 && <span aria-hidden="true"> · </span>}
                <Rich text={i[lang]} />
              </span>
            ))}
          </p>
          {fullHref ? (
            <Link className="link-arrow proj-quick" href={fullHref}>
              {t.readFull} <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <p className="proj-quick proj-quick--soon mono">{t.fullSoon}</p>
          )}
        </header>

        <div className="wrap">
          <figure className="proj-figure">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element -- chart exported from the case files
              <img src={src} alt={meta?.alt ?? p.figure.label[lang]} width={meta?.width} height={meta?.height} data-lowres={meta && meta.width < 1000 ? "" : undefined} style={meta && meta.width < 700 ? { maxWidth: meta.width } : undefined} />
            ) : (
              <div className="viz-slot">
                <span className="placeholder">[{t.graphicSoon}]</span>
              </div>
            )}
            <figcaption>{p.figure.label[lang]}</figcaption>
          </figure>
        </div>

        <div className="wrap proj-body">
          {sections.map((s) => (
            <section className="proj-sec" id={s.id} key={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>{s.label}</h2>
              <div className="proj-sec__body">{s.body}</div>
            </section>
          ))}

          <section className="proj-sec proj-sec--full" aria-labelledby="full-h">
            <h2 id="full-h">{t.fullCase}</h2>
            <div className="proj-sec__body">
              {fullHref ? (
                <Link className="btn btn--primary" href={fullHref}>
                  {t.readFull} <ArrowRight aria-hidden="true" />
                </Link>
              ) : (
                <span className="btn btn--disabled" aria-disabled="true">{t.fullSoon}</span>
              )}
              {publicFiles(p).length > 0 && (
                <div className="files">
                  <h3 className="mono">{t.files}</h3>
                  <ul>
                    {publicFiles(p).map((f) => (
                      <li key={f.label.en}>
                        {f.href ? (
                          <a href={f.href} target="_blank" rel="noopener noreferrer">
                            {f.label[lang]} <ArrowUpRight aria-hidden="true" />
                          </a>
                        ) : (
                          <span>
                            {f.label[lang]} <span className="placeholder">[{t.linkSoon}]</span>
                          </span>
                        )}
                        {f.note && <span className="files__note">{f.note[lang]}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>
      </article>

      {siblings.length > 1 && (
        <section className="next-case dark" data-header-theme="dark">
          <div className="wrap">
            <Link href={`/${lang}/projects/${next.slug}`} data-transition={projectLabel(next, lang)}>
              <span className="eyebrow">{t.next} · {projectLabel(next, lang)}</span>
              <span className="next-case__title">{next.title[lang]} →</span>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
