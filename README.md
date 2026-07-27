# Split Stage – Website

Live-Musik-Duo aus Mönchengladbach. Lennard (Klavier, Keyboard, Geige) und Jonah
(Gitarre, Bass).

Gebaut mit Next.js 16 (App Router) und TypeScript. Keine Datenbank, kein
Backend, keine laufenden Kosten außer dem Hosting.

---

## Loslegen

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen.

Fertige Version bauen und lokal testen:

```bash
npm run build
npm run start
```

---

## ⚠️ Das MUSS raus, bevor die Seite online geht

Alles Wichtige steht in **einer einzigen Datei**: `lib/site.ts`.
Sucht dort nach `// TODO` – das sind alle Platzhalter:

| Was            | Wo              | Aktuell                        |
| -------------- | --------------- | ------------------------------ |
| **Anschrift**  | Impressum       | **fehlt – Pflicht!**           |
| Domain         | `site.url`      | `split-stage.vercel.app`       |
| Instagram      | `site.socials`  | `instagram.com/splitstage` (geraten) |
| TikTok         | `site.socials`  | `tiktok.com/@splitstage` (geraten)   |
| YouTube        | `site.socials`  | `youtube.com/@splitstage` (geraten)  |
| Beispiel-Songs | `setlistTeaser` | Auswahl zur Veranschaulichung  |

Kontaktdaten (`splitstagebjl@gmail.com`, `01573 6236038`), die Preistabelle und
die Namen im Impressum sind eingetragen.

**Die Social-Links sind geraten.** Über eure Videos sollen die Leute ja auf die
Seite kommen – wenn die Links ins Leere führen, funktioniert das nicht.

### Der `live`-Schalter

In `lib/site.ts` steht `live: false`. Solange das so ist, sagt die Seite
Suchmaschinen „nicht aufnehmen". Stellt es auf `true`, **sobald im Impressum
die Anschrift steht** – vorher wollt ihr nicht in der Google-Suche stehen.

Falls sich die Telefonnummer mal ändert: sie steht **dreimal** in `site.ts`,
in drei Schreibweisen derselben Nummer. Alle drei anpassen.

- `phoneHuman: "01573 6236038"` – so wird es angezeigt
- `phoneLink: "+4915736236038"` – für den Klick-zum-Anrufen-Link
- `whatsapp: "4915736236038"` – ohne Plus, sonst funktioniert wa.me nicht

### Preise ändern

Alles in `lib/site.ts` im Array `pricing`. Die Tabelle auf der Seite, die
Antwort im FAQ und die Google-Daten im `<head>` bauen sich daraus automatisch –
ihr müsst die Zahlen also nur an einer Stelle anfassen.

Dazu kommen die beiden Rechtstexte:

- `app/impressum/page.tsx` – alle `[eckigen Klammern]` ausfüllen
- `app/datenschutz/page.tsx` – Adresse und Hosting-Anbieter eintragen

Beide Seiten haben oben einen orangen Kasten mit Hinweisen. **Löscht den Kasten,
wenn ihr fertig seid** (`<p className="notice">…</p>`), sonst steht er später
öffentlich auf eurer Seite.

Ein unvollständiges Impressum kann bei einer Seite, mit der ihr Geld verdient,
abgemahnt werden. Wenn einer von euch beiden noch unter 18 ist, muss dort
zusätzlich ein Elternteil als gesetzlicher Vertreter stehen. Diese Vorlagen
sind keine Rechtsberatung – im Zweifel einmal drüberschauen lassen.

---

## Wo was steht

```
lib/site.ts                 Alle Texte, Preise, Kontaktdaten, FAQ, Anlässe
app/page.tsx                Startseite, setzt die Abschnitte zusammen
app/layout.tsx              Kopf-/Fußbereich, Meta-Daten, Google-Daten
app/globals.css             Das komplette Design (Farben ganz oben in :root)
app/impressum/              Impressum
app/datenschutz/            Datenschutzerklärung
components/Hero.tsx         Startbild: Splitscreen + Parallax beim Scrollen
components/Nav.tsx          Navigation
components/BookingForm.tsx  Anfrageformular
components/Footer.tsx       Fußzeile
components/Reveal.tsx       Einblenden beim Scrollen
public/hero.jpg             Das Wohnzimmer-Bild
public/jonah.jpg            Foto Jonah
public/lennard.jpg          Foto Lennard
```

### Der Parallax-Effekt im Hero

Beim Scrollen wandert das Hintergrundbild langsamer nach oben als die Schrift
davor – dadurch wirkt der Hero räumlich. `components/Hero.tsx` schreibt dafür
nur zwei CSS-Variablen (`--sy` = Scrollposition in Pixeln, `--p` = 0 bis 1),
verschoben wird in `app/globals.css`.

Schneller oder langsamer stellt ihr über die Faktoren dort ein:

```css
.hero__half { transform: translate3d(0, calc(var(--sy) * 0.34), 0); }  /* Bild  */
.hero__body { translate: 0 calc(var(--sy) * -0.16); }                  /* Text  */
```

Der Faktor beim Bild muss **kleiner als 1 und positiv** bleiben. Sonst schiebt
sich das Bild schneller als die Seite und oben blitzt eine Lücke auf.

Wer im Betriebssystem „Bewegung reduzieren" eingeschaltet hat, bekommt keinen
Parallax – das ist Absicht.

### Farben ändern

Ganz oben in `app/globals.css`:

```css
--cool: #5cb3ff;  /* Lennard, linke Seite, Klavier & Geige */
--warm: #ff8b3d;  /* Jonah, rechte Seite, Gitarre & Bass  */
```

Diese zwei Farben ziehen sich durch die ganze Seite.

### Startbild austauschen

Neue Datei als `public/hero.jpg` ablegen – fertig. Der Pfad steht in
`app/globals.css` bei `.hero { --hero-img: url("/hero.jpg"); }`.

Das Bild wird auf dem Desktop **senkrecht** in zwei Hälften geteilt (links
Lennard, rechts Jonah) und auf dem Handy **waagerecht** (oben Lennard, unten
Jonah). Ein neues Bild sollte also links und rechts jeweils ein eigenes Motiv
haben, sonst geht der Effekt verloren.

---

## Wie das Anfrageformular funktioniert

Es verschickt **nichts** an einen Server. Es baut aus den Eingaben eine fertige
Nachricht und öffnet damit das E-Mail-Programm oder WhatsApp. Vorteil: kein
Backend, keine Kosten, kein Datenschutz-Ärger. Nachteil: Leute mit einem nicht
eingerichteten Mail-Programm landen im Leeren – deshalb steht die E-Mail-Adresse
zusätzlich immer sichtbar daneben.

Wenn ihr später echten Formularversand wollt (Anfrage kommt direkt an, ohne dass
sich ein Mailprogramm öffnet): in `components/BookingForm.tsx` die Funktion
`openMail` durch einen `fetch()` auf Formspree, Web3Forms oder Resend ersetzen.
Dann muss aber auch Punkt 4 der Datenschutzerklärung angepasst werden.

---

## Online stellen

Das Projekt ist fertig vorbereitet: es liegt bereits in einem Git-Repository,
alles ist eingecheckt, der Produktions-Build läuft durch. Es fehlt nur noch ein
Konto, auf das hochgeladen wird – und das muss einer von euch anlegen, weil
dafür eine Anmeldung nötig ist.

Einfachster Weg ist Vercel, für so eine Seite kostenlos. Dauert etwa fünf
Minuten:

1. Konto auf [github.com](https://github.com) anlegen, dort ein neues, leeres
   Repository erstellen (Name egal, z. B. `split-stage`)
2. Im Projektordner die zwei Zeilen ausführen, die GitHub euch danach anzeigt –
   sie sehen so aus:
   ```
   git remote add origin https://github.com/EUER-NAME/split-stage.git
   git push -u origin main
   ```
3. Auf [vercel.com](https://vercel.com) mit dem GitHub-Konto anmelden,
   „Add New… → Project", das Repository auswählen
4. Vercel erkennt Next.js von allein – nur auf **Deploy** klicken
5. Danach steht die Seite unter `<name>.vercel.app`. Eigene Domain könnt ihr in
   den Projekt-Einstellungen verbinden.
6. **Zum Schluss `site.url` in `lib/site.ts` auf die echte Adresse ändern** –
   sonst zeigen Google-Vorschau und Sitemap ins Leere.

Ab dann gilt: jedes `git push` löst automatisch einen neuen Upload aus.

---

## Was noch fehlt

- **Echte Videos.** Der Videobereich verlinkt aktuell nur auf eure Profile.
  Sobald ihr feste Clips habt, lohnt es sich, dort echte Vorschaubilder zu
  hinterlegen (`app/page.tsx`, Array `videos`).
- **Echte Fotos vom Auftritt.** Die zwei Handyfotos funktionieren, aber ein Bild
  von euch beiden auf einer echten Bühne verkauft deutlich besser.
- **Bewertungen.** Nach den ersten bezahlten Auftritten nach zwei Sätzen fragen
  und als eigenen Abschnitt einbauen. Für Hochzeiten und Trauerfeiern ist das
  das stärkste Argument überhaupt.
- **Google Unternehmensprofil** anlegen. Kostenlos und für „Musiker
  Mönchengladbach" wichtiger als alles andere auf dieser Seite.
