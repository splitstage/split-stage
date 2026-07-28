"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Die feste Leiste am unteren Rand – nur auf Handys, per CSS ausgeblendet,
 * sobald der Bildschirm breit genug für die normale Navigation ist.
 *
 * Grund: die Startseite ist auf einem Handy rund siebzehn Bildschirme lang.
 * Wer unten in den Preisen oder im FAQ steht, müsste sonst erst wieder ganz
 * nach oben oder ins Burger-Menü, um uns zu erreichen. Genau da springen die
 * Leute ab.
 *
 * Zwei Regeln halten sie höflich:
 *  - Über dem Hero bleibt sie weg. Dort steht der große Knopf ja schon.
 *  - Sobald Anfrageformular oder Fußzeile im Bild sind, zieht sie sich zurück
 *    und gibt den Platz frei, statt den Absende-Knopf zu verdecken.
 */
export default function MobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const ziele = [
      document.querySelector("#anfrage"),
      document.querySelector(".footer"),
    ].filter(Boolean) as HTMLElement[];

    const update = () => {
      /* Bewusst bei jedem Aufruf frisch aus den Elementen gelesen statt in
         einer Variablen gemerkt: so ist der Wert unabhängig davon richtig, in
         welcher Reihenfolge Scroll- und Sichtbarkeitsmeldungen eintreffen. */
      const amZiel = ziele.some((el) => el.dataset.inview === "true");
      const hinterHero = window.scrollY > (hero?.clientHeight ?? 600) * 0.75;
      setVisible(hinterHero && !amZiel);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          (e.target as HTMLElement).dataset.inview = String(e.isIntersecting);
        }
        update();
      },
      /* Erst als „im Bild“ zählen, wenn das Element wirklich da ist – nicht
         schon, wenn der oberste Pixel am unteren Rand auftaucht. */
      { rootMargin: "0px 0px -25% 0px" }
    );
    ziele.forEach((el) => io.observe(el));

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ziele.forEach((el) => delete el.dataset.inview);
    };
  }, []);

  return (
    <div className="mobileBar" data-visible={visible} aria-hidden={!visible}>
      <a
        className="mobileBar__call"
        href={`tel:${site.phoneLink}`}
        tabIndex={visible ? 0 : -1}
        aria-label={`Anrufen: ${site.phoneHuman}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"
            fill="currentColor"
          />
        </svg>
      </a>

      <a
        className="mobileBar__wa"
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-label="Per WhatsApp schreiben"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5 0-.6.4-3.6-.9s-4.4-4.4-4.5-4.6c-.1-.2-.9-1.3-.9-2.4s.6-1.7.8-1.9c.2-.2.4-.3.6-.3h.5c.2 0 .4-.1.6.5l.8 2c.1.2.1.4 0 .5l-.4.5-.3.3c-.1.1-.2.3-.1.5.1.2.6 1.1 1.4 1.8 1 .9 1.8 1.2 2 1.3.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l2 .9c.2.1.4.2.4.3.1.2.1.6 0 1.3Z"
            fill="currentColor"
          />
        </svg>
      </a>

      <Link
        className="mobileBar__cta"
        href="/#anfrage"
        tabIndex={visible ? 0 : -1}
      >
        Termin anfragen
      </Link>
    </div>
  );
}
