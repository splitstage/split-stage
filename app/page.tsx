import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import {
  site,
  members,
  occasions,
  genres,
  pricing,
  setlistTeaser,
  faqs,
  steps,
} from "@/lib/site";

const videos = [
  {
    platform: "Instagram",
    title: "Sweet Child O' Mine – aber im Wohnzimmer",
    href: site.socials.instagram,
  },
  {
    platform: "TikTok",
    title: "Wenn Geige auf Verzerrer trifft",
    href: site.socials.tiktok,
  },
  {
    platform: "YouTube",
    title: "Ganzes Set von einer Hochzeit",
    href: site.socials.youtube,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />

      {/* ---------------- ANLÄSSE ---------------- */}
      <section className="section" id="anlaesse">
        <div className="wrap">
          <Reveal>
            <div className="sectionHead">
              <p className="eyebrow">Wofür ihr uns bucht</p>
              <h2 className="sectionTitle">
                Vier Instrumente, die sich jedem Anlass anpassen.
              </h2>
              <p className="sectionLead">
                Wir sind zu zweit – das heißt: wir passen in jede Kapelle und
                füllen trotzdem einen Saal. Kein Sechs-Mann-Aufbau, keine
                Diskussion über Bühnengröße.
              </p>
            </div>
          </Reveal>

          <div className="cards">
            {occasions.map((o, i) => (
              <Reveal key={o.title} delay={i * 90}>
                <article className="card" data-accent={o.accent}>
                  <h3 className="card__title">{o.title}</h3>
                  <p className="card__lead">{o.lead}</p>
                  <ul className="card__list">
                    {o.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {o.note && <p className="card__note">{o.note}</p>}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ---------------- WIR ZWEI ---------------- */}
      <section className="section section--tint" id="duo">
        <div className="wrap">
          <Reveal>
            <div className="sectionHead">
              <p className="eyebrow">Wir zwei</p>
              <h2 className="sectionTitle">
                Der eine hält die Melodie. Der andere den Boden.
              </h2>
              <p className="sectionLead">
                Zwei Leute, die sich seit Jahren kennen und deshalb nicht drüber
                reden müssen, wer wann wie laut spielt.
              </p>
            </div>
          </Reveal>

          <div className="duo">
            {members.map((m, i) => (
              <Reveal key={m.id} delay={i * 140}>
                <article className="member" data-accent={m.accent}>
                  <div className="member__photo">
                    <img
                      src={m.photo}
                      alt={`${m.name} – ${m.instruments.join(", ")}`}
                      width={880}
                      height={1099}
                      loading="lazy"
                    />
                    <div className="member__wash" aria-hidden="true" />
                    <div className="member__fade" aria-hidden="true" />
                  </div>
                  <div className="member__body">
                    <h3 className="member__name">{m.name}</h3>
                    <p className="member__role">{m.role}</p>
                    <p className="member__text">{m.text}</p>
                    <ul className="chips">
                      {m.instruments.map((inst) => (
                        <li key={inst} className="chip">
                          {inst}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- REPERTOIRE ---------------- */}
      <section className="section" id="repertoire">
        <div className="wrap repertoire">
          <Reveal>
            <div>
              <p className="eyebrow">Was wir spielen</p>
              <h2 className="sectionTitle">
                70er bis 90er. Und alles, was ihr euch wünscht.
              </h2>
              <p className="sectionLead">
                Zuhause sind wir im Rock der 70er und 80er. Aber ein Abend
                besteht nicht nur aus Gitarrensoli – deshalb können wir
                genauso leise, genauso klassisch und genauso poppig.
              </p>
              <ul className="chips" style={{ marginTop: "2rem" }}>
                {genres.map((g) => (
                  <li key={g} className="chip chip--lg">
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="setlist">
              {setlistTeaser.map((s) => (
                <div key={s.label} className="setlist__group">
                  <p className="setlist__label">{s.label}</p>
                  <p className="setlist__songs">{s.songs.join(" · ")}</p>
                </div>
              ))}
              <p className="form__hint">
                Nur ein Auszug. Wunschsong dabei, den wir nicht können? Sagt
                Bescheid – mit drei Wochen Vorlauf lernen wir ihn.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- VIDEOS ---------------- */}
      <section className="section section--tint" id="videos">
        <div className="wrap">
          <Reveal>
            <div className="sectionHead">
              <p className="eyebrow">Hört rein</p>
              <h2 className="sectionTitle">
                Bevor ihr uns bucht, hört ihr uns.
              </h2>
              <p className="sectionLead">
                Wir laden regelmäßig Clips hoch – von Proben, aus dem
                Wohnzimmer und von echten Auftritten. Wahrscheinlich seid ihr
                genau darüber hier gelandet.
              </p>
            </div>
          </Reveal>

          <div className="videoGrid">
            {videos.map((v, i) => (
              <Reveal key={v.platform} delay={i * 110}>
                <a
                  className="videoCard"
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="videoCard__glow" aria-hidden="true" />
                  <span className="videoCard__play" aria-hidden="true">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                      <path d="M15 9L0.75 17.2272L0.75 0.772758L15 9Z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="videoCard__platform">{v.platform}</span>
                  <p className="videoCard__title">{v.title}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="socialRow">
              <a
                className="btn btn--ghost"
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram folgen
              </a>
              <a
                className="btn btn--ghost"
                href={site.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok folgen
              </a>
              <a
                className="btn btn--ghost"
                href={site.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube abonnieren
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- PREISE ---------------- */}
      <section className="section" id="preise">
        <div className="wrap">
          <Reveal>
            <div className="sectionHead">
              <p className="eyebrow">Was es kostet</p>
              <h2 className="sectionTitle">
                Preise stehen hier. Nicht erst nach drei E-Mails.
              </h2>
              <p className="sectionLead">
                Wo ihr in der Spanne landet, hängt an Dauer, Aufwand und
                Anfahrt. Nach eurer Anfrage bekommt ihr einen Festpreis – und
                der gilt dann auch.
              </p>
            </div>
          </Reveal>

          <div className="prices">
            {pricing.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <article className="price" data-accent={p.accent}>
                  <h3 className="price__title">{p.title}</h3>
                  <p className="price__what">{p.what}</p>
                  <p className="price__range">
                    <span className="price__num">{p.from}</span>
                    <span className="price__cur">€</span>
                    <span className="price__dash" aria-hidden="true">
                      –
                    </span>
                    <span className="price__num">{p.to}</span>
                    <span className="price__cur">€</span>
                  </p>
                  <p className="price__detail">{p.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260}>
            <p className="prices__note">
              Im Umkreis von {site.travelFreeKm} km um {site.city} ist die
              Anfahrt im Preis drin. Weiter weg fahren wir genauso – dann
              rechnen wir sie dazu und sagen euch vorher, wie viel es ist.
              Einen Wunschsong zu lernen kostet nichts extra, wir brauchen
              nur etwa drei Wochen Vorlauf.
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="rule" />

      {/* ---------------- ABLAUF ---------------- */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="sectionHead">
              <p className="eyebrow">So läuft das</p>
              <h2 className="sectionTitle">Drei Schritte, dann steht der Termin.</h2>
            </div>
          </Reveal>

          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="step">
                  <span className="step__n display" aria-hidden="true">
                    {s.n}
                  </span>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section section--tint" id="faq">
        <div className="wrap">
          <Reveal>
            <div className="sectionHead">
              <p className="eyebrow">Häufige Fragen</p>
              <h2 className="sectionTitle">Das werden wir immer gefragt.</h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p className="faq__a">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ANFRAGE ---------------- */}
      <section className="section" id="anfrage">
        <div className="wrap contact">
          <Reveal>
            <div>
              <p className="eyebrow">Termin anfragen</p>
              <h2 className="sectionTitle">Sagt uns, wann und wo.</h2>
              <p className="sectionLead">
                Unverbindlich, kostenlos und ohne Newsletter. Wir melden uns
                innerhalb von {site.responseTime} mit einem Festpreis zurück.
              </p>

              <div className="contact__direct">
                <a className="directLink" href={`mailto:${site.email}`}>
                  <span>
                    <span className="directLink__label">E-Mail</span>
                    <span className="directLink__value">{site.email}</span>
                  </span>
                </a>
                <a className="directLink" href={`tel:${site.phoneLink}`}>
                  <span>
                    <span className="directLink__label">Telefon</span>
                    <span className="directLink__value">{site.phoneHuman}</span>
                  </span>
                </a>
                <a
                  className="directLink"
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <span className="directLink__label">WhatsApp</span>
                    <span className="directLink__value">
                      Schnellster Weg zu uns
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <BookingForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
