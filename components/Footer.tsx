import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <Link href="/" className="logo">
              <span>Split</span>
              <span className="logo__bar" aria-hidden="true" />
              <span>Stage</span>
            </Link>
            <p
              style={{
                color: "var(--muted)",
                margin: "0.9rem 0 0",
                maxWidth: "30ch",
                fontSize: "0.95rem",
              }}
            >
              Live-Musik zu zweit in {site.regionLong}. Hochzeit, Trauerfeier,
              Geburtstag, Firmenfeier.
            </p>
          </div>

          <ul className="footer__nav">
            <li>
              <Link href="/#anlaesse">Anlässe</Link>
            </li>
            <li>
              <Link href="/#duo">Wir zwei</Link>
            </li>
            <li>
              <Link href="/#repertoire">Repertoire</Link>
            </li>
            <li>
              <Link href="/#videos">Videos</Link>
            </li>
            <li>
              <Link href="/#preise">Preise</Link>
            </li>
            <li>
              <Link href="/#faq">FAQ</Link>
            </li>
            <li>
              <Link href="/#anfrage">Anfragen</Link>
            </li>
          </ul>

          <ul className="footer__nav" style={{ flexDirection: "column" }}>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phoneLink}`}>{site.phoneHuman}</a>
            </li>
            <li>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span style={{ display: "flex", gap: "1.4rem" }}>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
