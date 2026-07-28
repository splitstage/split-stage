"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/* Gleiche Einteilung wie in der Preistabelle – so weiß man beim Lesen der
   Anfrage sofort, welche Spanne gemeint ist. */
const occasions = [
  "Hochzeit (kompletter Tag)",
  "Nur Trauung",
  "Trauerfeier",
  "Geburtstag / Jubiläum",
  "Firmenfeier / Vereinsfest",
  "Private Feier",
  "Etwas anderes",
];

const durations = [
  "Ca. 30 Minuten (z. B. Trauung)",
  "Ca. 1 Stunde",
  "Zwei bis drei Sets (kompletter Abend)",
  "Weiß ich noch nicht",
];

/** Muss mit dem `name` am <form> übereinstimmen, sonst nimmt Netlify nichts an. */
const FORM_NAME = "anfrage";

const empty = {
  name: "",
  email: "",
  phone: "",
  occasion: occasions[0],
  date: "",
  place: "",
  duration: durations[3],
  message: "",
};

type Status = "idle" | "sending" | "sent" | "failed";

/**
 * Der Versand läuft über Netlify Forms: Netlify durchsucht beim Hochladen das
 * fertige HTML nach <form data-netlify="true">, nimmt die Einträge entgegen und
 * schickt sie als E-Mail weiter. Kein eigener Server, kein fremder Dienst,
 * keine Kosten.
 *
 * Vorher lief das über einen mailto-Link. Das Problem daran: er funktioniert
 * nur, wenn auf dem Gerät ein Mailprogramm eingerichtet ist. Wer Gmail im
 * Browser benutzt – also die Mehrheit – hat auf „Anfrage abschicken" geklickt
 * und es passierte schlicht nichts. Für den einen Knopf, an dem euer Geld
 * hängt, ist das die schlimmste Sorte Fehler: er sieht aus wie Erfolg.
 *
 * mailto ist deshalb nicht weg, sondern nach unten gerutscht – als sichtbare
 * Alternative und als Notausgang, falls der Versand mal fehlschlägt.
 */
export default function BookingForm() {
  const [f, setF] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setF((prev) => ({ ...prev, [key]: e.target.value }));

  const subject = `Buchungsanfrage: ${f.occasion}${f.date ? ` am ${f.date}` : ""}`;

  const body = [
    `Hallo ${site.name},`,
    "",
    "wir würden euch gerne buchen.",
    "",
    `Anlass: ${f.occasion}`,
    `Datum: ${f.date || "noch offen"}`,
    `Ort: ${f.place || "noch offen"}`,
    `Dauer: ${f.duration}`,
    "",
    `Name: ${f.name}`,
    `E-Mail: ${f.email}`,
    `Telefon: ${f.phone || "-"}`,
    "",
    "Nachricht:",
    f.message || "-",
    "",
    "Viele Grüße",
    f.name,
  ].join("\n");

  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    body
  )}`;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      /* Netlify erwartet die Felder so, wie ein Browser ein Formular ohne
         JavaScript abschicken würde – inklusive `form-name`. */
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": FORM_NAME, ...f }).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      /* Kein „hat leider nicht geklappt, versuch's nochmal" – daran ist dem
         Besucher nicht geholfen. Stattdessen die zwei Wege, die immer gehen. */
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="form form--done" role="status">
        <p className="formDone__mark" aria-hidden="true">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
            <path
              d="M2 10.5L9.5 18L24 2"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
        <h3 className="formDone__title">Angekommen.</h3>
        <p className="formDone__text">
          Danke, {f.name.split(" ")[0] || "euch"}! Eure Anfrage liegt bei uns im
          Postfach. Wir melden uns innerhalb von {site.responseTime} mit einem
          Festpreis – und falls es schneller gehen muss, ruft einfach an.
        </p>
        <div className="formDone__actions">
          <a className="btn btn--ghost" href={`tel:${site.phoneLink}`}>
            {site.phoneHuman}
          </a>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setF(empty);
              setStatus("idle");
            }}
          >
            Noch eine Anfrage
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="form"
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
    >
      {/* Ohne dieses Feld ordnet Netlify die Anfrage keinem Formular zu. */}
      <input type="hidden" name="form-name" value={FORM_NAME} />

      {/* Spam-Falle: für Menschen unsichtbar. Automaten füllen gerne alles aus –
          kommt hier etwas an, wirft Netlify die Anfrage weg. */}
      <p className="form__trap" aria-hidden="true">
        <label>
          Dieses Feld bitte leer lassen
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form__grid">
        <div className="field">
          <label htmlFor="bf-name">Name</label>
          <input
            id="bf-name"
            name="name"
            required
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            placeholder="Wie dürfen wir euch nennen?"
            value={f.name}
            onChange={set("name")}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-email">E-Mail</label>
          <input
            id="bf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            inputMode="email"
            enterKeyHint="next"
            placeholder="name@beispiel.de"
            value={f.email}
            onChange={set("email")}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-phone">Telefon (optional)</label>
          <input
            id="bf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            enterKeyHint="next"
            placeholder="Für schnelle Rückfragen"
            value={f.phone}
            onChange={set("phone")}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-occasion">Anlass</label>
          <select
            id="bf-occasion"
            name="occasion"
            value={f.occasion}
            onChange={set("occasion")}
          >
            {occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="bf-date">Datum</label>
          <input
            id="bf-date"
            name="date"
            type="date"
            value={f.date}
            onChange={set("date")}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-place">Ort / Location</label>
          <input
            id="bf-place"
            name="place"
            autoCapitalize="words"
            enterKeyHint="next"
            placeholder="z. B. Schützenhaus Rheydt"
            value={f.place}
            onChange={set("place")}
          />
        </div>

        <div className="field field--full">
          <label htmlFor="bf-duration">Wie lange sollen wir spielen?</label>
          <select
            id="bf-duration"
            name="duration"
            value={f.duration}
            onChange={set("duration")}
          >
            {durations.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="field field--full">
          <label htmlFor="bf-message">Worum geht es?</label>
          <textarea
            id="bf-message"
            name="message"
            enterKeyHint="done"
            placeholder="Ablauf, Wunschsongs, wie viele Gäste, alles was uns hilft."
            value={f.message}
            onChange={set("message")}
          />
        </div>
      </div>

      <div className="form__foot">
        <button
          type="submit"
          className="btn btn--primary btn--block"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Wird geschickt …" : "Anfrage abschicken"}
        </button>

        {status === "failed" ? (
          <p className="form__error" role="alert">
            Der Versand hat gerade nicht geklappt – vermutlich die Verbindung.
            Eure Eingaben sind noch da: nehmt einen der beiden Wege hier
            drunter, dann ist alles schon fertig ausgefüllt.
          </p>
        ) : (
          <p className="form__hint">
            Geht direkt an {site.email}. Wir antworten innerhalb von{" "}
            {site.responseTime}.
          </p>
        )}

        <div className="form__or">oder</div>

        <div className="form__alt">
          <a
            className="btn btn--ghost btn--block"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Per WhatsApp schicken
          </a>
          <a className="btn btn--ghost btn--block" href={mailHref}>
            Im Mailprogramm öffnen
          </a>
        </div>
      </div>
    </form>
  );
}
