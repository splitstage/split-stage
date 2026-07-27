/**
 * ============================================================
 *  ZENTRALE KONFIGURATION – hier ändert ihr fast alles.
 *  Alles mit  // TODO  ist ein Platzhalter, den ihr ersetzen müsst,
 *  bevor die Seite online geht.
 * ============================================================
 */

export const site = {
  name: "Split Stage",
  tagline: "Zwei Musiker. Vier Instrumente.",
  claim: "Live-Musik für Hochzeiten, Trauerfeiern und alles dazwischen.",

  /** Wird für Canonical-URLs und Social-Vorschaubilder gebraucht. */
  url: "https://split-stage.vercel.app", // TODO: nach dem Hochladen auf die echte Adresse ändern

  /**
   * Solange das hier `false` ist, sagt die Seite Google „nicht aufnehmen".
   * Auf `true` stellen, sobald im Impressum die Anschrift steht – vorher
   * wollt ihr nicht in der Suche auftauchen.
   */
  live: false,

  /** Kontakt – dieselbe Nummer in drei Schreibweisen, siehe README. */
  email: "splitstagebjl@gmail.com",
  phoneHuman: "01573 6236038",
  phoneLink: "+4915736236038",
  whatsapp: "4915736236038",

  /** Einzugsgebiet */
  city: "Mönchengladbach",
  /** So weit fahrt ihr grundsätzlich – steht so auch in den Google-Daten. */
  radiusKm: 100,
  /** Bis hierhin ist die Anfahrt im Preis drin, danach wird sie berechnet. */
  travelFreeKm: 30,
  regionLong: "Mönchengladbach und Umgebung",

  /** Niedrigster Preis aus der Tabelle unten – wird in Texten zitiert. */
  priceFrom: 200,

  /** Wie schnell ihr realistisch antwortet. */
  responseTime: "24 Stunden",

  /**
   * ACHTUNG: geraten. Eure echten Profilnamen hier eintragen, sonst laufen
   * die Links ins Leere – und über die Videos sollen die Leute ja kommen.
   */
  socials: {
    instagram: "https://instagram.com/splitstage",
    tiktok: "https://tiktok.com/@splitstage",
    youtube: "https://youtube.com/@splitstage",
  },
} as const;

export type Member = {
  id: string;
  name: string;
  accent: "cool" | "warm";
  role: string;
  instruments: string[];
  photo: string;
  text: string;
};

export const members: Member[] = [
  {
    id: "lennard",
    name: "Lennard",
    accent: "cool",
    role: "Melodie & Harmonie",
    instruments: ["Klavier & Keyboard", "Geige"],
    photo: "/lennard.jpg",
    text: "Klassisch ausgebildet, aber viel zu neugierig, um dabei zu bleiben. Am Flügel trägt er den ganzen Abend, mit der Geige setzt er die Momente, bei denen es im Raum kurz still wird. Wenn eine Trauerfeier würdevoll klingen soll, ist das seine Baustelle.",
  },
  {
    id: "jonah",
    name: "Jonah",
    accent: "warm",
    role: "Groove & Fundament",
    instruments: ["Gitarre", "Bass"],
    photo: "/jonah.jpg",
    text: "Zuhause im Riff der 70er, aber genauso ruhig an der Akustikgitarre beim Sektempfang. Gitarre für die Energie, Bass für das Fundament – oft im selben Song. Wenn getanzt werden soll, ist das seine Baustelle.",
  },
];

export type Occasion = {
  title: string;
  lead: string;
  points: string[];
  note?: string;
  accent: "cool" | "warm" | "both";
};

export const occasions: Occasion[] = [
  {
    title: "Hochzeit",
    lead: "Vom Einzug bis zur letzten Runde auf der Tanzfläche.",
    points: [
      "Trauung: Einzug, Ringtausch, Auszug",
      "Sektempfang: leise Akustik im Hintergrund",
      "Abends: 70er bis 90er, laut genug zum Tanzen",
    ],
    note: "Euer erster Tanz? Sagt uns den Song, wir lernen ihn.",
    accent: "both",
  },
  {
    title: "Trauerfeier",
    lead: "Leise, würdevoll, ohne Kitsch. Klavier und Geige.",
    points: [
      "Klavier & Geige, keine Verstärkung nötig",
      "Kirche, Friedhofskapelle oder Trauerhalle",
      "Lieblingslied der verstorbenen Person auf Wunsch",
    ],
    note: "Trauerfeiern übernehmen wir ausschließlich samstags und sonntags.",
    accent: "cool",
  },
  {
    title: "Geburtstag & Jubiläum",
    lead: "Der Abend, an dem plötzlich alle mitsingen.",
    points: [
      "Runde Geburtstage, Silberhochzeit, Firmenjubiläum",
      "Wir lesen den Raum – erst Hintergrund, später Party",
      "Wohnzimmer oder Saal, beides geht",
    ],
    accent: "warm",
  },
  {
    title: "Firmenfeier & Vereinsfest",
    lead: "Live-Band-Gefühl ohne Sechs-Mann-Logistik.",
    points: [
      "Sommerfest, Weihnachtsfeier, Schützenfest",
      "Eigene Anlage bis ca. 100 Gäste",
      "Aufbau in 30 Minuten, eine Steckdose reicht",
    ],
    accent: "warm",
  },
];

export type Price = {
  title: string;
  from: number;
  to: number;
  what: string;
  detail: string;
  accent: "cool" | "warm" | "both";
};

/**
 * Preise offen auf die Seite zu schreiben spart euch die Hälfte der
 * Rückfragen – und die Anfragen, die trotzdem kommen, meinen es ernst.
 * Die Spanne hängt an Dauer, Aufwand und Anfahrt. Verbindlich ist immer
 * der Festpreis, den ihr nach der Anfrage schickt.
 */
export const pricing: Price[] = [
  {
    title: "Trauerfeier",
    from: 200,
    to: 350,
    what: "Klavier & Geige",
    detail:
      "Ein bis drei Stücke oder die ganze Feier begleitet. Nur samstags und sonntags.",
    accent: "cool",
  },
  {
    title: "Nur Trauung",
    from: 250,
    to: 400,
    what: "Einzug, Ringtausch, Auszug",
    detail:
      "Standesamt oder Kirche, etwa 30 Minuten. Wunschsong inklusive, wenn ihr rechtzeitig Bescheid sagt.",
    accent: "cool",
  },
  {
    title: "Geburtstag & Firmenfeier",
    from: 300,
    to: 500,
    what: "Ein bis zwei Sets",
    detail:
      "Jubiläum, Vereinsfest, Weihnachtsfeier. Anlage, Mikros und Licht bringen wir mit.",
    accent: "warm",
  },
  {
    title: "Hochzeit komplett",
    from: 500,
    to: 900,
    what: "Vom Einzug bis zur Tanzfläche",
    detail:
      "Trauung, Sektempfang und Abend aus einer Hand – ein Ansprechpartner für den ganzen Tag.",
    accent: "both",
  },
];

export const genres = [
  "Classic Rock (70er)",
  "80er-Hits",
  "90er",
  "Pop & Charts",
  "Balladen & Akustik",
  "Filmmusik",
  "Klassik",
  "Wunschsongs",
];

/**
 * Beispiele für die Richtung. Tauscht sie gegen Songs aus, die ihr wirklich
 * spielt – sonst fragt irgendwann jemand genau danach.
 */
export const setlistTeaser: { label: string; songs: string[] }[] = [
  {
    label: "Wenn getanzt wird",
    songs: ["Sweet Child O' Mine", "Johnny B. Goode", "Livin' on a Prayer"],
  },
  {
    label: "Wenn geredet wird",
    songs: ["Wonderwall", "Your Song", "Something"],
  },
  {
    label: "Wenn es still wird",
    songs: ["Ave Maria", "Hallelujah", "Time to Say Goodbye"],
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Was kostet ein Auftritt?",
    a: `Trauerfeier ${pricing[0].from}–${pricing[0].to} €, nur Trauung ${pricing[1].from}–${pricing[1].to} €, Geburtstag und Firmenfeier ${pricing[2].from}–${pricing[2].to} €, komplette Hochzeit ${pricing[3].from}–${pricing[3].to} €. Wo ihr in der Spanne landet, hängt an Dauer, Aufwand und Anfahrt. Ihr bekommt vorher einen Festpreis – keine versteckten Kosten und keine Überraschung auf der Rechnung.`,
  },
  {
    q: "Bringt ihr Technik mit?",
    a: "Ja. Wir haben eine eigene Anlage für Räume bis etwa 100 Gäste, dazu Mikrofone und Licht. Ihr braucht nur eine normale Steckdose und ungefähr 3 × 2 Meter Platz. Bei größeren Sälen sprechen wir vorher über die Technik vor Ort.",
  },
  {
    q: "Wie lange spielt ihr?",
    a: "Üblich sind zwei bis drei Sets à 45 Minuten mit Pausen dazwischen. Für eine Trauung oder einen Sektempfang reicht oft eine halbe Stunde. Sagt uns einfach, wie euer Ablauf aussieht.",
  },
  {
    q: "Wie weit fahrt ihr?",
    a: `Im Umkreis von ${site.travelFreeKm} km um ${site.city} ist die Anfahrt im Preis drin. Alles darüber fahren wir auch – dann kommt die Anfahrt dazu, und ihr wisst vorher genau, wie viel. Bis etwa ${site.radiusKm} km sind wir regelmäßig unterwegs.`,
  },
  {
    q: "Könnt ihr einen Wunschsong lernen?",
    a: "Ja, und das machen wir gerne. Mit etwa drei Wochen Vorlauf bekommen wir fast alles hin – Hochzeitslied, Lieblingssong von Oma, Vereinshymne. Sagt uns den Titel bei der Anfrage.",
  },
  {
    q: "Spielt ihr auch draußen?",
    a: "Ja, solange es eine überdachte Fläche gibt. Instrumente und Technik vertragen keinen Regen, und bei praller Sonne verstimmt sich die Geige. Ein Pavillon oder eine Markise reicht völlig.",
  },
  {
    q: "Warum Trauerfeiern nur am Wochenende?",
    a: "Unter der Woche sind wir fest eingebunden. Damit wir eine Trauerfeier nicht halb vorbereitet und gehetzt spielen, nehmen wir sie nur samstags und sonntags an. Andere Anlässe unter der Woche gerne auf Anfrage.",
  },
  {
    q: "Wie schnell antwortet ihr?",
    a: `In der Regel innerhalb von ${site.responseTime}. Wenn es eilig ist – zum Beispiel bei einer Trauerfeier – ruft uns direkt an.`,
  },
];

export const steps = [
  {
    n: "01",
    title: "Anfrage schicken",
    text: "Datum, Ort, Anlass. Zwei Minuten über das Formular oder direkt per WhatsApp.",
  },
  {
    n: "02",
    title: "Kurz sprechen",
    text: `Wir melden uns innerhalb von ${site.responseTime}, klären den Ablauf und schicken euch einen Festpreis.`,
  },
  {
    n: "03",
    title: "Wir spielen",
    text: "Wir sind früh da, bauen leise auf und ihr müsst euch um nichts mehr kümmern.",
  },
];
