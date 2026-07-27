import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${site.name}.`,
  robots: { index: false, follow: true },
};

export default function Datenschutz() {
  return (
    <div className="wrap legal">
      <h1>Datenschutz&shy;erklärung</h1>

      <p className="notice">
        <strong>Hier fehlt noch die Anschrift</strong> (gleiche wie im
        Impressum). Alles andere passt zu der Seite, so wie sie jetzt gebaut ist
        – ohne Cookies, ohne Tracking, ohne Analyse-Tools. Sobald ihr etwas
        hinzufügt (Google Analytics, ein eingebettetes Instagram-Video, ein
        Newsletter-Tool, ein Kontaktformular mit echtem Serverversand), muss
        dieser Text erweitert werden. Danach diesen Kasten löschen. Das hier ist
        keine Rechtsberatung.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
      <address>
        Lennard Schumacher und Jonah Böckem
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ] {site.city}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </address>

      <h2>2. Was diese Website nicht macht</h2>
      <ul>
        <li>Wir setzen keine Cookies.</li>
        <li>Wir nutzen kein Analyse- oder Tracking-Tool.</li>
        <li>Es gibt keine Werbenetzwerke und kein Profiling.</li>
        <li>
          Schriftarten werden direkt von unserem Server geladen, nicht von
          Google. Beim Aufruf der Seite entsteht dadurch keine Verbindung zu
          Google.
        </li>
      </ul>

      <h2>3. Server-Logfiles</h2>
      <p>
        Unser Hoster erhebt automatisch Informationen, die euer Browser
        übermittelt: Browsertyp und -version, verwendetes Betriebssystem,
        Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der
        Serveranfrage und die IP-Adresse. Diese Daten werden nicht mit anderen
        Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO – wir haben ein berechtigtes Interesse an der technisch
        fehlerfreien Darstellung und Sicherheit dieser Website.
      </p>
      <p>
        Hosting-Anbieter: [Name und Anschrift eintragen, sobald die Seite
        online ist]. Wenn ihr bei einem Anbieter außerhalb der EU hostet – zum
        Beispiel Vercel oder Netlify, beide USA – gehört an diese Stelle
        zusätzlich ein Hinweis auf die Datenübermittlung in ein Drittland nach
        Art. 44 ff. DSGVO.
      </p>

      <h2>4. Anfrageformular</h2>
      <p>
        Das Formular auf dieser Seite überträgt eure Eingaben nicht an unseren
        Server. Es öffnet lediglich euer E-Mail-Programm beziehungsweise
        WhatsApp mit einer fertig vorbereiteten Nachricht. Ob ihr sie
        abschickt, entscheidet ihr. Erst mit dem Absenden erreichen uns eure
        Daten – dann auf demselben Weg wie jede andere E-Mail oder Nachricht.
      </p>

      <h2>5. Kontaktaufnahme per E-Mail, Telefon oder WhatsApp</h2>
      <p>
        Wenn ihr uns kontaktiert, speichern wir eure Angaben inklusive der
        Kontaktdaten, um die Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. b DSGVO, sofern die Anfrage mit einem Vertrag
        zusammenhängt, ansonsten Art. 6 Abs. 1 lit. f DSGVO. Wir löschen diese
        Daten, sobald sie nicht mehr erforderlich sind und keine gesetzlichen
        Aufbewahrungsfristen entgegenstehen.
      </p>
      <p>
        Für WhatsApp gelten zusätzlich die Datenschutzbestimmungen von WhatsApp
        Ireland Limited. Wer das nicht möchte, erreicht uns genauso gut per
        E-Mail oder Telefon.
      </p>

      <h2>6. Links zu sozialen Netzwerken</h2>
      <p>
        Auf dieser Seite sind Instagram, TikTok und YouTube ausschließlich
        verlinkt – es sind keine Inhalte eingebettet. Es werden also keine Daten
        an diese Anbieter übertragen, solange ihr die Links nicht anklickt. Erst
        danach gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
      </p>

      <h2>7. Eure Rechte</h2>
      <ul>
        <li>Auskunft über die zu eurer Person gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>
          Beschwerde bei einer Aufsichtsbehörde – für Nordrhein-Westfalen ist
          das die Landesbeauftragte für Datenschutz und Informationsfreiheit NRW
        </li>
      </ul>
      <p>
        Für all das genügt eine formlose Nachricht an{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>8. SSL-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw.
        TLS-Verschlüsselung. Ihr erkennt sie am „https://“ in der Adresszeile
        eures Browsers.
      </p>
    </div>
  );
}
