import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseMarkdown, KickerMarkdown } from "@/components/sites/portfolio/markdown";
import { getUI, isLang, locales } from "@/content/i18n";
import { profile } from "@/content/profile";
import { getProject, projectLabel, projects } from "@/content/projects";
import { getStudiKasus } from "@/content/studi-kasus";
import { loadCase } from "@/lib/studi-kasus";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.filter((p) => p.fullCase).map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  const c = p?.fullCase ? getStudiKasus(p.fullCase) : undefined;
  if (!isLang(lang) || !p || !c) return {};
  return {
    title: `${lang === "en" ? c.titleEn : c.title} | ${profile.name}`,
    description: lang === "en" ? p.sentence.en : c.summary,
    alternates: { canonical: `/${lang}/projects/${slug}/full`, languages: { en: `/en/projects/${slug}/full`, id: `/id/projects/${slug}/full` } },
  };
}

/** Layer 3: the full case study, rendered verbatim from the owner's portofolio.md (Indonesian) or its English version. */
export default async function FullCasePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const p = getProject(slug);
  const c = p?.fullCase ? getStudiKasus(p.fullCase) : undefined;
  if (!isLang(lang) || !p || !c) notFound();
  const ui = getUI(lang);
  const data = await loadCase(c.slug, lang);

  return (
    <main id="main" className="page-projects">
      <article className="sk-page">
        <header className="proj-hero wrap">
          <p className="crumbs mono">
            <Link href={`/${lang}/projects/${p.slug}`}>← {ui.project.backToSummary}</Link>
            <span aria-hidden="true">/</span>
            <span>{projectLabel(p, lang)}</span>
          </p>
          {data.kicker && <KickerMarkdown text={data.kicker} />}
          <h1 className="proj-title">{lang === "en" ? c.titleEn : c.title}</h1>
        </header>
        <div className="wrap sk-body">
          <CaseMarkdown slug={c.slug} data={data} lang={lang} />
        </div>
      </article>
    </main>
  );
}
