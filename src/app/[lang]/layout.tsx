import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Familjen_Grotesk, Hanken_Grotesk, Martian_Mono } from "next/font/google";
import { Footer } from "@/components/sites/portfolio/footer";
import { Header } from "@/components/sites/portfolio/header";
import { InlineScript } from "@/components/sites/portfolio/inline-script";
import { Motion } from "@/components/sites/portfolio/motion";
import { getUI, isLang, locales } from "@/content/i18n";
import { profile } from "@/content/profile";
import "../globals.css";
import "../portfolio.css";

const display = Familjen_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500"] });
const text = Hanken_Grotesk({ variable: "--font-text", subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = Martian_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400"] });

const SITE_URL = "https://mfajriilham-portofolio.vercel.app";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { children?: React.ReactNode; params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const title = `${profile.name} | Data Analyst, Supply Chain, PPIC`;
  const description = profile.tagline[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: `/${lang}`, languages: { en: "/en", id: "/id" } },
    openGraph: { type: "profile", siteName: profile.name, title, description, url: `/${lang}`, locale: lang === "id" ? "id_ID" : "en_US", images: ["/og-image.png"] },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/favicon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F7FC" },
    { media: "(prefers-color-scheme: dark)", color: "#08111F" },
  ],
};

// Runs before paint: stored theme, else OS preference; and the motion flag.
const boot = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){d.dataset.theme='light'}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion-ok')})();`;

export default async function RootLayout({ children, params }: { children?: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const ui = getUI(lang);
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    description: profile.tagline.en,
    address: { "@type": "PostalAddress", addressLocality: "Bandung", addressCountry: "ID" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Telkom University" },
    sameAs: profile.linkedin ? [profile.linkedin] : undefined,
    knowsAbout: ["Data analysis", "SQL", "Python", "Tableau", "Supply chain", "PPIC", "Inventory control", "Demand planning"],
  };

  return (
    <html lang={lang} className={`${display.variable} ${text.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={boot} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">{ui.skip}</a>
        <Header lang={lang} />
        {children}
        <Footer lang={lang} />
        <Motion label={lang === "id" ? "Proyek" : "Project"} />
      </body>
    </html>
  );
}
