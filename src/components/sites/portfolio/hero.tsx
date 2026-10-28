import { getUI, type Lang } from "@/content/i18n";
import { TOUR } from "./hero-3d-direction";
import { HeroTour } from "./hero-tour";
import { HeroVideo } from "./hero-video";

/* Hero: a looping film of a logistics yard (night in the dark theme, blue hour in the light one) with the
   headline in the lower left and a cue to scroll. Scrolling plays the camera tour through the yard while the
   hero stays pinned, then About slides up over it. */

/** Soft edge into the next section. */
function Edge() {
  return (
    <svg className="hero__edge" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <path d="M0 868 C 220 846 380 878 600 862 S 1000 842 1200 858 S 1380 874 1440 864 V900 H0Z" />
    </svg>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  const h = getUI(lang).hero;
  return (
    <div className="hero-track" style={{ ["--tour-scroll" as string]: TOUR.scroll }}>
      <section className="hero" id="top" aria-labelledby="hero-title" data-header-theme="dark">
        <div className="hero__card" data-hero-card>
          <HeroVideo />
          <HeroTour />
          <div className="hero__scrim" aria-hidden="true" />
          <div className="hero__content">
            <p className="hero__hi" data-intro style={{ ["--i" as string]: 0 }}>
              {h.hi}
            </p>
            <h1 className="hero__lead" id="hero-title" data-intro style={{ ["--i" as string]: 1 }}>
              {h.lead}
            </h1>
            <ul className="hero__fields" data-intro style={{ ["--i" as string]: 2 }}>
              {h.interests.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          {/* One caption per scene of the tour, in the headline's place once the tour starts (hero-tour.tsx
              shows each in its stretch of the scroll). */}
          <ol className="hero__chapters">
            {h.chapters.map((c, i) => (
              <li className="hero__chapter" key={c.label}>
                <span className="hero__chapter-label">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{c.label.replace(/ · /g, " – ")}</span>
                </span>
                <span className="hero__chapter-line">{c.line}</span>
              </li>
            ))}
          </ol>
          {/* The intro animation sits on the children: the tour fades the link itself out on scroll. */}
          <a className="hero__cue" href="#about">
            <span data-intro style={{ ["--i" as string]: 4 }}>
              {h.scroll}
            </span>
            <span className="hero__cue-line" data-intro style={{ ["--i" as string]: 4 }} aria-hidden="true" />
          </a>
          <Edge />
        </div>
      </section>
    </div>
  );
}
