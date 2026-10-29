import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGrid, type ImageSizes } from "@/components/sites/portfolio/project-grid";
import { getUI, isLang } from "@/content/i18n";
import { profile } from "@/content/profile";
import { bsaProjects, dataProjects, figureSrc, projects, toCardData } from "@/content/projects";
import { publicImageMeta } from "@/lib/studi-kasus";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const ui = getUI(lang);
  return {
    title: `${ui.projects.pageTitle} | ${profile.name}`,
    description: ui.projects.dataLead,
    alternates: { canonical: `/${lang}/projects`, languages: { en: "/en/projects", id: "/id/projects" } },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const ui = getUI(lang);

  const sizes: ImageSizes = {};
  for (const p of projects) {
    const src = figureSrc(p, lang);
    if (src) {
      const m = await publicImageMeta(src);
      sizes[src] = { width: m.width, height: m.height };
    }
  }

  return (
    <main id="main" className="page-projects">
      <section className="page-hero wrap" aria-labelledby="projects-title">
        <p className="crumbs mono">
          <Link href={`/${lang}`}>← {lang === "id" ? "Beranda" : "Home"}</Link>
          <span aria-hidden="true">/</span>
          <span>{ui.nav.projects}</span>
        </p>
        <h1 className="page-title" id="projects-title">{ui.projects.pageTitle}</h1>
        <p className="page-lead">{ui.projects.pageLead}</p>
        <nav className="cat-links" aria-label={ui.nav.projects}>
          <a className="btn btn--sm btn--primary" href="#data-analyst">{ui.projectsMenu.data}</a>
          <a className="btn btn--sm" href="#business-system-analyst">{ui.projectsMenu.bsa}</a>
        </nav>
      </section>

      <section className="wrap cat" id="data-analyst" aria-labelledby="da-title">
        <div className="cat__head">
          <h2 className="h2" id="da-title">{ui.projectsMenu.data}</h2>
          <p>{ui.projects.dataLead}</p>
        </div>
        <ProjectGrid projects={dataProjects.map(toCardData)} lang={lang} sizes={sizes} />
      </section>

      <section className="wrap cat" id="business-system-analyst" aria-labelledby="bsa-title">
        <div className="cat__head">
          <h2 className="h2" id="bsa-title">{ui.projectsMenu.bsa}</h2>
          <p>{ui.projects.bsaLead}</p>
        </div>
        <ProjectGrid projects={bsaProjects.map(toCardData)} lang={lang} sizes={sizes} filter={false} />
      </section>
    </main>
  );
}
