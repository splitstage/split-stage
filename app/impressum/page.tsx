import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung von ${site.name}.`,
  robots: { index: false, follow: true },
};

export default function Impressum() {
  return (
    <div className="wrap legal">
      <h1>Impressum</h1>

      <p className="notice">
        <strong>Zwei Sachen fehlen hier noch – und die kann euch niemand
        abnehmen:</strong> die <strong>ladungsfähige Anschrift</strong> (Straße
        und PLZ) und, falls einer von euch noch nicht 18 ist, der{" "}
        <strong>gesetzliche Vertreter</strong>. Beides ist Pflicht, sobald ihr
        mit der Seite Geld verdient, und ein unvollständiges Impressum kann
        abgemahnt werden. Erfinden ist keine Option – eine falsche Adresse ist
        schlimmer als gar keine Seite. Tragt es ein, löscht diesen Kasten und
        stellt <code>live</code> in <code>lib/site.ts</code> auf{" "}
        <code>true</code>. Das hier ist keine Rechtsberatung.
      </p>

      <h2>Angaben gemäß § 5 DDG</h2>
      <address>
        Lennard Schumacher
        <br />
        Jonah Böckem
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ] {site.city}
        <br />
        Deutschland
      </address>

      <h2>Vertreten durch</h2>
      <p>
        [Falls einer von euch minderjährig ist: gesetzlicher Vertreter, Vorname
        Nachname, gleiche Anschrift. Sonst diesen Abschnitt löschen.]
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={`tel:${site.phoneLink}`}>{site.phoneHuman}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Gemäß § 19 UStG erheben wir keine Umsatzsteuer und weisen diese folglich
        auch nicht aus (Kleinunternehmerregelung).
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <address>
        Lennard Schumacher
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ] {site.city}
      </address>

      <h2>Streitschlichtung</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir
        derartige Links umgehend entfernen.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch uns erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Beiträge Dritter sind als solche
        gekennzeichnet.
      </p>
    </div>
  );
}
