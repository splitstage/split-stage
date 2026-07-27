"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  /**
   * Parallax: das Hintergrundbild wandert beim Scrollen langsamer nach oben
   * als die Schrift davor. Dadurch wirkt der Hero räumlich statt flach.
   *
   * Wir schreiben nur zwei CSS-Variablen, das eigentliche Verschieben macht
   * die CSS-Datei (`--sy` in Pixeln, `--p` als Fortschritt von 0 bis 1).
   * So bleibt alles auf dem Compositor und ruckelt nicht.
   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Wer Bewegung reduziert haben will, bekommt hier gar nichts.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const h = el.offsetHeight || 1;
      // Über die Höhe des Heros hinaus ändert sich nichts mehr.
      const y = Math.min(window.scrollY, h);
      el.style.setProperty("--sy", `${y}px`);
      el.style.setProperty("--p", (y / h).toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={ref} data-parallax="true">
      {/* Farbverlauf als Notfall-Hintergrund, falls das Bild noch lädt */}
      <div className="hero__bg" aria-hidden="true" />

      {/* Das Hero-Bild besteht aus zwei Hälften, die beim Laden zusammenfahren */}
      <div className="hero__half hero__half--l" aria-hidden="true">
        <div className="hero__img" />
      </div>
      <div className="hero__half hero__half--r" aria-hidden="true">
        <div className="hero__img" />
      </div>
      <div className="hero__seam" aria-hidden="true" />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="wrap hero__body">
        <p className="hero__kicker">
          <span className="hero__dot" aria-hidden="true" />
          Live-Duo aus {site.city}
        </p>

        <h1 className="hero__title display">
          <span className="a">Split</span>
          <span className="b">Stage</span>
        </h1>

        <p className="hero__sub">
          Zwei Musiker, vier Instrumente, ein Wohnzimmer voller Sound. Von der
          leisen Trauerfeier bis zur Tanzfläche um zwei Uhr nachts.
        </p>

        <div className="hero__actions">
          <Link href="#anfrage" className="btn btn--primary">
            Termin anfragen
          </Link>
          <Link href="#videos" className="btn btn--ghost">
            Hört rein
          </Link>
        </div>

        <div className="hero__meta">
          <div className="hero__side hero__side--l">
            <b>Lennard</b>
            <span>Klavier · Keyboard · Geige</span>
          </div>
          <div className="hero__vs" aria-hidden="true" />
          <div className="hero__side hero__side--r">
            <b>Jonah</b>
            <span>Gitarre · Bass</span>
          </div>
        </div>
      </div>
    </section>
  );
}
