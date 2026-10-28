import { notFound } from "next/navigation";
import { Hero } from "@/components/sites/portfolio/hero";
import { AboutSection, CertificationsSection, ExperienceSection, OrganizationsSection, ProjectsSection } from "@/components/sites/portfolio/home-sections";
import { RouteLine } from "@/components/sites/portfolio/route-line";
import { isLang } from "@/content/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <main id="main" className="home">
      <RouteLine />
      {/* Hero + About share a wrapper so the sticky hero releases once About has covered it */}
      <div className="intro">
        <Hero lang={lang} />
        <AboutSection lang={lang} />
      </div>
      <ExperienceSection lang={lang} />
      <ProjectsSection lang={lang} />
      <OrganizationsSection lang={lang} />
      <CertificationsSection lang={lang} />
    </main>
  );
}
