import Link from "next/link";
import { getUI, type Lang } from "@/content/i18n";
import { profile } from "@/content/profile";
import { FlowWave } from "./flow-wave";

/** The hero's 3D models (Sketchfab, CC BY 4.0): title, author, and the model page, as their licence asks. */
const modelCredits = [
  { title: "Abandoned Warehouse", author: "Arsen Ismailov", href: "https://sketchfab.com/3d-models/abandoned-warehouse-698a34300af34095ac6593f348585daa" },
  { title: "DAV Container Truck", author: "jairobman", href: "https://sketchfab.com/3d-models/dav-container-truck-realistic-model-94e20c1da2ed48a895a8dc4d8c86cfd9" },
  { title: "Gantry Crane", author: "alanUscanga", href: "https://sketchfab.com/3d-models/gantry-crane-76119b46c26f436ba78f4b53c98fc935" },
  { title: "Shipping containers", author: "Mateusz Woliński", href: "https://sketchfab.com/3d-models/shipping-containers-cc3f7136710f4905905eae1d10ac50b7" },
  { title: "Container Ship", author: "RM02", href: "https://sketchfab.com/3d-models/container-ship-aaa41cca946b4a08bc08cf692b7757be" },
  { title: "Ship To Shore Crane", author: "JakeBradley", href: "https://sketchfab.com/3d-models/ship-to-shore-crane-401069fccf814da7a4f9ce5a51487548" },
  { title: "Pallet+Boxes+Forklift .::RAWscan::.", author: "Spogna", href: "https://sketchfab.com/3d-models/palletboxesforklift-rawscan-c2cf485ab7ca42c78807e72d8952cc5a" },
];

/** Site footer and contact block, on every page (id="contact"). */
export function Footer({ lang }: { lang: Lang }) {
  const ui = getUI(lang);
  const home = `/${lang}`;
  return (
    <footer className="footer dark" id="contact" aria-labelledby="contact-title" data-header-theme="dark">
      <FlowWave />
      <div className="wrap">
        <h2 className="footer__title" id="contact-title">
          {ui.footer.title} <em>{ui.footer.titleEm}</em>
        </h2>
        <div className="footer__grid">
          <p className="lead">{ui.footer.lead}</p>
          <dl className="footer__links">
            <div>
              <dt>{ui.footer.email}</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>{ui.footer.linkedin}</dt>
              <dd>
                {profile.linkedin ? (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    in/mfajriilhamn ↗
                  </a>
                ) : (
                  <span className="placeholder">[{ui.footer.linkSoon}]</span>
                )}
              </dd>
            </div>
            <div>
              <dt>{ui.footer.location}</dt>
              <dd className="mono">{ui.footer.locationValue}</dd>
            </div>
          </dl>
        </div>
        <div className="footer__bar mono">
          <nav aria-label="Footer" className="footer__nav">
            <Link href={`${home}#about`}>{ui.nav.about}</Link>
            <Link href={`${home}#experience`}>{ui.nav.experience}</Link>
            <Link href={`${home}/projects`}>{ui.nav.projects}</Link>
            <Link href={`${home}#organizations`}>{ui.nav.organizations}</Link>
            <Link href={`${home}#certifications`}>{ui.nav.certifications}</Link>
          </nav>
          <span>© 2026 {profile.name}</span>
          <a href="#top">{ui.backToTop} ↑</a>
        </div>
        <p className="footer__credits">
          {ui.footer.credits}{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
            CC BY 4.0
          </a>
          :{" "}
          {modelCredits.map((m, i) => (
            <span key={m.href}>
              <a href={m.href} target="_blank" rel="noopener noreferrer">
                {m.title}
              </a>{" "}
              by {m.author}
              {i < modelCredits.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
