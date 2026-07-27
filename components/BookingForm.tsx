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

/**
 * Kein Backend, kein Server, keine Kosten: das Formular baut aus den Eingaben
 * eine fertige Nachricht und übergibt sie an das E-Mail-Programm oder WhatsApp.
 * Wollt ihr später echten Formularversand, ersetzt `openMail` durch einen
 * fetch() auf einen Dienst wie Formspree, Web3Forms oder Resend.
 */
export default function BookingForm() {
  const [f, setF] = useState(empty);

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

  const openMail = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const openWhatsapp = () => {
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form className="form" onSubmit={openMail}>
      <div className="form__grid">
        <div className="field">
          <label htmlFor="bf-name">Name</label>
          <input
            id="bf-name"
            required
            autoComplete="name"
            placeholder="Wie dürfen wir euch nennen?"
            value={f.name}
            onChange={set("name")}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-email">E-Mail</label>
          <input
            id="bf-email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@beispiel.de"
            value={f.email}
            onChange={set("email")}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-phone">Telefon (optional)</label>
          <input
            id="bf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Für schnelle Rückfragen"
            value={f.phone}
            onChange={set("phone")}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-occasion">Anlass</label>
          <select id="bf-occasion" value={f.occasion} onChange={set("occasion")}>
            {occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="bf-date">Datum</label>
          <input
            id="bf-date"
            type="date"
            value={f.date}
            onChange={set("date")}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-place">Ort / Location</label>
          <input
            id="bf-place"
            placeholder="z. B. Schützenhaus Rheydt"
            value={f.place}
            onChange={set("place")}
          />
        </div>

        <div className="field field--full">
          <label htmlFor="bf-duration">Wie lange sollen wir spielen?</label>
          <select id="bf-duration" value={f.duration} onChange={set("duration")}>
            {durations.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="field field--full">
          <label htmlFor="bf-message">Worum geht es?</label>
          <textarea
            id="bf-message"
            placeholder="Ablauf, Wunschsongs, wie viele Gäste, alles was uns hilft."
            value={f.message}
            onChange={set("message")}
          />
        </div>
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--primary btn--block">
          Anfrage abschicken
        </button>
        <p className="form__hint">
          Dein E-Mail-Programm öffnet sich mit der fertig ausgefüllten Nachricht
          an {site.email} – du musst nur noch auf Senden tippen.
        </p>

        <div className="form__or">oder</div>

        <button
          type="button"
          className="btn btn--ghost btn--block"
          onClick={openWhatsapp}
        >
          Per WhatsApp schicken
        </button>
      </div>
    </form>
  );
}
