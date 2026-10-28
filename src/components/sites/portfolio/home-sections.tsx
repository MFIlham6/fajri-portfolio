import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getUI, type Lang } from "@/content/i18n";
import { certifications, organizations, otherCertificates, profile } from "@/content/profile";
import { figureSrc, getProject, projectLabel, projects } from "@/content/projects";
import { publicImageMeta } from "@/lib/studi-kasus";
import { Experience } from "./experience";
import { PhotoCarousel } from "./photo-carousel";
import type { ImageSizes } from "./project-grid";
import { ProjectList } from "./project-list";

export function AboutSection({ lang }: { lang: Lang }) {
  const ui = getUI(lang);
  const pol = ui.about.polaroids;
  return (
    <section className="section about handoff" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="grid12 about__intro">
          <div className="about__text">
            <p className="kicker mono">{ui.about.title}</p>
            <h2 className="about__title" id="about-title">{profile.name}</h2>
            <p className="about__tagline">{profile.tagline[lang]}</p>
            {profile.paragraphs.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
          <div className="polaroids">
            <figure className="polaroid polaroid--a">
              <div className="polaroid__img">
                <span className="polaroid__big">
                  {pol.gpaValue}
                  <small>{pol.gpa}</small>
                </span>
              </div>
              <figcaption className="mono">{pol.gpaCaption}</figcaption>
            </figure>
            <figure className="polaroid polaroid--b">
              <div className="polaroid__img">
                <span className="polaroid__big">
                  MRP
                  <small>{pol.mrpSub}</small>
                </span>
              </div>
              <figcaption className="mono">{pol.mrpCaption}</figcaption>
            </figure>
            <figure className="polaroid polaroid--c beam">
              <div className="polaroid__img">
                {/* eslint-disable-next-line @next/next/no-img-element -- static portrait, already sized for the frame */}
                <img src={profile.photo.src} alt={profile.name} width={profile.photo.width} height={profile.photo.height} />
              </div>
              <figcaption className="mono">{pol.photoCaption}</figcaption>
            </figure>
          </div>
        </div>

        <div className="grid12 about__facts">
          <div className="about__col">
            <h3 className="h3">{ui.about.lookingFor}</h3>
            <ul className="roles">
              {profile.roles.map((r) => (
                <li key={r.en}>{r[lang]}</li>
              ))}
            </ul>
          </div>
          <div className="about__col">
            <h3 className="h3">{ui.about.education}</h3>
            <div className="edu">
              <p className="edu__degree">{profile.education.degree[lang]}</p>
              <p className="edu__school">{profile.education.school}</p>
              <p className="mono edu__meta">{profile.education.meta[lang]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection({ lang }: { lang: Lang }) {
  const ui = getUI(lang);
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <div className="grid12 sec-head">
          <h2 className="h2" id="experience-title">{ui.experience.title}</h2>
          <div className="sec-head__side">
            <p>{ui.experience.lead}</p>
          </div>
        </div>
        <Experience lang={lang} />
      </div>
    </section>
  );
}

/** Home list: projects that have a dashboard or chart to preview. The rest are on the projects page. */
const listed = projects.filter((p) => p.featured || p.figure.src);

export async function ProjectsSection({ lang }: { lang: Lang }) {
  const ui = getUI(lang);
  const sizes: ImageSizes = {};
  for (const p of listed) {
    const src = figureSrc(p, lang);
    if (src) {
      const m = await publicImageMeta(src);
      sizes[src] = { width: m.width, height: m.height };
    }
  }
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="grid12 sec-head">
          <h2 className="h2" id="projects-title">{ui.projects.title}</h2>
          <div className="sec-head__side">
            <p>{ui.projects.lead}</p>
            <div className="cat-links">
              <Link className="btn btn--sm btn--primary" href={`/${lang}/projects#data-analyst`}>
                {ui.projectsMenu.data} <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="btn btn--sm" href={`/${lang}/projects#business-system-analyst`}>
                {ui.projectsMenu.bsa} <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <ProjectList projects={listed} lang={lang} sizes={sizes} />
        <div className="center-cta">
          <Link className="link-arrow" href={`/${lang}/projects`}>
            {ui.projects.seeAllCount(projects.length)} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CertificationsSection({ lang }: { lang: Lang }) {
  const ui = getUI(lang);
  return (
    <section className="section certifications" id="certifications" aria-labelledby="certs-title">
      <div className="wrap">
        <div className="grid12 sec-head">
          <h2 className="h2" id="certs-title">{ui.certs.title}</h2>
          <div className="sec-head__side">
            <p>{ui.certs.lead}</p>
          </div>
        </div>
        <ol className="certs" role="list">
          {certifications.map((c) => (
            <li className="cert" key={c.id}>
              <div className="cert__head">
                <span className="cert__issuer">{c.issuer}</span>
                <h3 className="cert__title">{c.title}</h3>
                <p className="cert__meta">{c.meta[lang]}</p>
                {c.links && (
                  <p className="cert__cred">
                    {c.links.map((l) => (
                      <a key={l.href} className="link-arrow" href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label[lang]} <ArrowUpRight aria-hidden="true" />
                      </a>
                    ))}
                  </p>
                )}
              </div>
              <p className="cert__desc">{c.description[lang]}</p>
              {c.modules && (
                <details className="cert__modules">
                  <summary>
                    <span className="when-closed">{ui.certs.show}</span>
                    <span className="when-open">{ui.certs.hide}</span>
                  </summary>
                  <ul>
                    {c.modules.map((m) => (
                      <li key={m.en}>{m[lang]}</li>
                    ))}
                  </ul>
                </details>
              )}
              {c.afterModules && <p className="cert__note">{c.afterModules[lang]}</p>}
              <p className="cert__skills">
                <span className="mono">{ui.certs.skills}</span> {c.skills[lang]}
              </p>
              {(c.related || c.relatedSlugs) && (
                <div className="cert__related">
                  {c.related && <p>{c.related[lang]}</p>}
                  {c.relatedSlugs && (
                    <div className="cert__links">
                      {c.relatedSlugs.map((slug) => {
                        const p = getProject(slug);
                        return p ? (
                          <Link key={slug} className="chip chip--link" href={`/${lang}/projects/${slug}`} data-transition={projectLabel(p, lang)}>
                            {projectLabel(p, lang)}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  )}
                  {c.id === "windata" && (
                    <Link className="link-arrow" href={`/${lang}/projects#data-analyst`}>
                      {ui.certs.windataLink} <ArrowRight aria-hidden="true" />
                    </Link>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
        <div className="other-certs">
          <h3 className="h3">{ui.certs.other}</h3>
          <ul>
            {otherCertificates.map((o) => (
              <li key={o.text.en}>
                {o.text[lang]}
                {o.href && (
                  <>
                    {" "}
                    <a className="link-arrow" href={o.href} target="_blank" rel="noopener noreferrer">
                      {ui.certs.view} <ArrowUpRight aria-hidden="true" />
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Organizations, laid out like the old "How I work" band: three numbered columns whose lines fill as you scroll. */
export function OrganizationsSection({ lang }: { lang: Lang }) {
  const ui = getUI(lang);
  return (
    <section className="how dark" id="organizations" aria-labelledby="orgs-title" data-header-theme="dark">
      <div className="how__pin wrap">
        <div className="grid12 how__head">
          <h2 className="h2" id="orgs-title">{ui.orgs.title}</h2>
          <p className="lead">{ui.orgs.lead}</p>
        </div>
        <ol className="steps-row" role="list">
          {organizations.map((o, i) => (
            <li className="step" data-step key={o.role.en}>
              <span className="mono step__no">
                {String(i + 1).padStart(2, "0")} · {o.date[lang]}
              </span>
              <h3>{o.role[lang]}</h3>
              <div className="step__media">
              {o.photos && o.photos.length > 1 && (
                <PhotoCarousel
                  photos={o.photos.map((ph) => ({ ...ph, alt: ph.alt[lang] }))}
                  label={lang === "id" ? `Foto ${o.role.id}` : `Photos: ${o.role.en}`}
                  prevLabel={lang === "id" ? "Foto sebelumnya" : "Previous photo"}
                  nextLabel={lang === "id" ? "Foto berikutnya" : "Next photo"}
                />
              )}
              {o.photos && o.photos.length === 1 && (
                <figure className="step__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static photo from the activity */}
                  <img src={o.photos[0].src} alt={o.photos[0].alt[lang]} width={o.photos[0].width} height={o.photos[0].height} loading="lazy" />
                </figure>
              )}
              </div>
              <ul className="step__list">
                {o.bullets.map((b) => (
                  <li key={b.en}>{b[lang]}</li>
                ))}
              </ul>
              <div className="step__proof">
                {o.chips.map((c) => (
                  <span className="chip" key={c.en}>{c[lang]}</span>
                ))}
                {o.document && (
                  <a className="chip chip--link" href={o.document.href} target="_blank" rel="noopener noreferrer">
                    {o.document.label[lang]} ↗
                  </a>
                )}
              </div>
              <div className="rule" aria-hidden="true">
                <i />
                <i />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
