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
| Instagram      | `site.socials`  | `instagram.com/splitstage` (geraten) |
| TikTok         | `site.socials`  | `tiktok.com/@splitstage` (geraten)   |
| YouTube        | `site.socials`  | `youtube.com/@splitstage` (geraten)  |
| Beispiel-Songs | `setlistTeaser` | Auswahl zur Veranschaulichung  |

Kontaktdaten (`splitstagebjl@gmail.com`, `01573 6236038`), die Preistabelle,
die Adresse der Seite (`site.url`) und die Namen im Impressum sind eingetragen.

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
components/MobileBar.tsx    Leiste unten am Bildschirmrand (nur Handy/Tablet)
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

### Handy-Ansicht

Alles, was nur auf Handys und Tablets gilt, steht gesammelt am Ende von
`app/globals.css` unter „MOBILGERÄTE" – nicht verteilt über die einzelnen
Bausteine. So sieht man auf einen Blick, was dort anders ist, ohne die
Desktop-Regeln anzufassen.

Drei Sachen sind dort wichtig:

- **Eingabefelder haben auf Touchgeräten 16px Schrift.** Nicht kleiner machen.
  Safari zoomt beim Antippen automatisch hinein, sobald ein Feld kleiner als
  16px ist, und zoomt nicht von allein wieder heraus. Die Regel hängt bewusst an
  `@media (hover: none)` statt an einer Bildschirmbreite – ein iPad im
  Hochformat ist 768px breit und zoomt genauso.
- **Die Leiste unten** (`components/MobileBar.tsx`) erscheint ab einer
  Bildschirmbreite von 880px abwärts – also überall dort, wo die Navigation zum
  Burger-Menü zusammenklappt und der Buchen-Knopf sonst nicht sichtbar wäre. Sie
  taucht erst hinter dem Startbild auf und zieht sich zurück, sobald das
  Anfrageformular oder die Fußzeile im Bild ist.
- **`env(safe-area-inset-bottom)`** hält Leiste und Fußzeile über dem
  Home-Balken neuerer iPhones. Beim Ändern der Abstände dort stehen lassen.

Wenn euch die Leiste auf dem iPad zu viel ist: in `globals.css` beim
`@media (max-width: 880px)` über `.mobileBar { display: flex; }` die Zahl auf
`720px` setzen, dann erscheint sie nur noch auf Handys.

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

Der Versand läuft über **Netlify Forms** – das ist in eurem Netlify-Konto
eingebaut, kostet nichts (bis 100 Anfragen im Monat) und braucht keinen weiteren
Dienst. Netlify durchsucht beim Hochladen das fertige HTML nach
`<form data-netlify="true">`, nimmt die Einträge entgegen und schickt sie euch
per E-Mail.

### Einmalig in Netlify einschalten

Ohne diese zwei Schritte kommt nichts an:

1. **Project configuration → Forms → Form detection aktivieren**, danach einmal
   neu deployen (in „Deploys" auf *Trigger deploy*). Erst dann findet Netlify
   das Formular.
2. **Forms → Settings → Form notifications → Add notification → Email
   notification** und dort `splitstagebjl@gmail.com` eintragen. Sonst landen die
   Anfragen zwar im Netlify-Dashboard, aber ihr bekommt keine Nachricht davon.

Eingegangene Anfragen stehen dauerhaft unter **Forms → anfrage**.

### Wenn der Versand fehlschlägt

Dann verschwindet nichts: die Eingaben bleiben stehen und darunter erscheinen
zwei Knöpfe, die schon fertig ausgefüllt sind – WhatsApp und „Im Mailprogramm
öffnen". Beide funktionieren auch ohne Netlify.

Diese zwei Wege stehen ohnehin immer da. Vorher war der mailto-Link der
*einzige* Weg, und das war der Fehler: er funktioniert nur mit eingerichtetem
Mailprogramm auf dem Gerät. Wer Gmail im Browser benutzt, hat auf „Anfrage
abschicken" geklickt und es passierte nichts – ohne jede Fehlermeldung.

### Spam

Im Formular steckt ein unsichtbares Feld (`bot-field`). Menschen sehen es nicht,
automatische Skripte füllen es aus – und Netlify wirft solche Einträge weg.
Reicht das irgendwann nicht mehr, lässt sich in Netlify zusätzlich ein Captcha
zuschalten.

---

## Online stellen

Die Seite läuft bereits: **https://splitstage.netlify.app**

- Code liegt auf GitHub unter `splitstage/split-stage`
- Netlify hängt an diesem Repository und baut bei jeder Änderung neu

Der ganze Ablauf für eine Änderung ist deshalb:

```bash
git add -A
git commit -m "Kurz was geändert wurde"
git push
```

Zwei Minuten später ist es live. Mehr ist es nicht – kein Hochladen per FTP,
kein Klicken im Netlify-Dashboard.

### Warum die Seite statisch gebaut wird

In `next.config.ts` steht `output: "export"`. Damit entsteht beim Bauen ein
Ordner `out/` mit fertigem HTML, und der Hoster muss nur noch Dateien
ausliefern – er muss Next.js nicht verstehen.

Das war kein Schönheitsentscheid: Netlify hat die Seite zuerst auf *allen*
Adressen mit „404" beantwortet, weil seine Next.js-Unterstützung Version 16
noch nicht kannte. Statisch gebaut ist das Problem strukturell weg, und die
Seite läuft genauso auf GitHub Pages, Cloudflare oder billigem Webspace.

Preis dafür: es kann nichts serverseitig laufen. Falls ihr später echten
Formularversand über eine API-Route wollt oder `next/image` einsetzt, muss die
Zeile wieder raus – dann braucht ihr aber auch einen Hoster, der Next.js in der
eingesetzten Version wirklich beherrscht.

Wichtig, falls ihr an `app/robots.ts` oder `app/sitemap.ts` etwas ändert: dort
muss `export const dynamic = "force-static"` stehen bleiben, sonst bricht der
Build ab.

### Eigene Domain

`splitstage.netlify.app` funktioniert, aber für Visitenkarten und Google ist
eine eigene Adresse (z. B. `split-stage.de`) deutlich besser. In Netlify unter
**Domain management** eintragen, das Zertifikat kommt automatisch. Danach
**`site.url` in `lib/site.ts` auf die neue Adresse ändern** und einmal pushen,
sonst zeigen Sitemap und WhatsApp-Vorschau weiter auf die alte.

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
