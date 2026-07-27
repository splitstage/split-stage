"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/#anlaesse", label: "Anlässe" },
  { href: "/#duo", label: "Wir zwei" },
  { href: "/#repertoire", label: "Repertoire" },
  { href: "/#videos", label: "Videos" },
  { href: "/#preise", label: "Preise" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü schließen, wenn es breit genug für die Desktop-Navigation wird
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 881px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="nav" data-stuck={stuck || open}>
      <div className="wrap nav__inner">
        <Link href="/" className="logo" aria-label={`${site.name} – Startseite`}>
          <span>Split</span>
          <span className="logo__bar" aria-hidden="true" />
          <span>Stage</span>
        </Link>

        <nav aria-label="Hauptnavigation">
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/#anfrage" className="btn btn--primary nav__cta">
          Termin anfragen
        </Link>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>

      <div className="nav__mobile" data-open={open}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link
          href="/#anfrage"
          className="btn btn--primary btn--block"
          onClick={() => setOpen(false)}
        >
          Termin anfragen
        </Link>
      </div>
    </header>
  );
}
