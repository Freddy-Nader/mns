import { programaDestacado, programas, type Programa } from "@/content/programas";
import { mailtoLink, site } from "@/content/site";
import { fill, getDictionary, tx } from "@/lib/dictionaries";
import { datesInYear, shortDate, today, upcoming } from "@/lib/fechas";
import type { Locale } from "@/lib/i18n";
import styles from "./Programas.module.css";

/**
 * His named, repeatable concert concepts — the thing a festival programmer
 * actually buys, until now buried under "Repertory". Treated as a poster
 * wall, after the ETA Hoffmann Theater's season grid.
 */
export function Programas({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const p = d.programas;
  const featured = programas.find((x) => x.slug === programaDestacado)!;
  const rest = programas.filter((x) => x !== featured);
  const year = today().slice(0, 4);
  const next = upcoming()
    .filter((f) => f.programa === featured.slug)
    .slice(0, 3);
  const request = (x: Programa) => {
    const name = tx(x.nombre, lang);
    return mailtoLink(site.email, `${d.contacto.subjects.programa}: ${name}`);
  };

  return (
    <>
      <section id="programas" className="section wrap">
        <div className="section-head">
          <h2 className="display">{p.title}</h2>
          <p>{p.intro}</p>
        </div>

        <div className={styles.wall}>
          <article className={`${styles.poster} ${styles.featured} ${styles.ink} on-dark`}>
            <p className="label">{fill(p.featured, { n: datesInYear(featured.slug, year), year })}</p>
            <h3 className={styles.featuredName}>{tx(featured.nombre, lang)}</h3>
            {featured.subtitulo && <p className={styles.sub}>{tx(featured.subtitulo, lang)}</p>}
            <p className={styles.desc}>{featured.descripcion[lang]}</p>
            {next.length > 0 && (
              <div className={styles.next}>
                <p className="label">{p.upcoming}</p>
                <ul>
                  {next.map((f) => (
                    <li key={f.id}>
                      <a href="#fechas">
                        <b>{shortDate(f.dia, lang)}</b> {f.recinto.nombre ?? f.recinto.ciudad}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.foot}>
              <p className={styles.works}>{featured.obras.join(" · ")}</p>
              <a className="btn" href={request(featured)}>
                {p.request}
              </a>
            </div>
          </article>

          {rest.map((x) => (
            <article
              key={x.slug}
              className={`${styles.poster} ${styles[x.tono]} ${x.tono === "ink" ? "on-dark" : ""}`}
            >
              <p className="label">{p.formato[x.formato]}</p>
              <h3 className={styles.name}>
                <Nombre programa={x} lang={lang} />
              </h3>
              <p className={styles.sub}>{x.subtitulo ? tx(x.subtitulo, lang) : x.descripcion[lang]}</p>
              <div className={styles.foot}>
                {x.obras.length > 0 && <p className={styles.works}>{x.obras.join(" · ")}</p>}
                <a className="arrow" href={request(x)}>
                  {p.requestShort}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Booking lang={lang} />
    </>
  );
}

/** Names are set exactly as he styles them; pianoffortissimo keeps its "ff". */
function Nombre({ programa, lang }: { programa: Programa; lang: Locale }) {
  const name = tx(programa.nombre, lang);
  if (programa.slug !== "pianoffortissimo") return name;
  return (
    <>
      piano
      <wbr />
      <i className={styles.ff}>ff</i>ortissimo
    </>
  );
}

/** What a programmer needs to say yes: reach, scale, and a named next step. */
function Booking({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const b = d.programas.booking;
  return (
    <section className={`${styles.booking} alt wrap`} aria-labelledby="booking-title">
      <ul className={styles.stats}>
        {b.stats.map((s) => (
          <li key={s.l}>
            <span className={styles.statN}>{s.n}</span>
            <span className={styles.statL}>{s.l}</span>
          </li>
        ))}
      </ul>
      <div className={styles.bookingBody}>
        <h2 id="booking-title" className="display">
          {b.title}
        </h2>
        <div className={styles.bookingText}>
          <p>{b.text}</p>
          <p className={styles.emergency}>{b.emergency}</p>
          <div className={styles.bookingCta}>
            <a
              className="btn"
              href={site.formularioContratacion[lang]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {b.cta}
            </a>
            <a className="btn btn--ghost" href={mailtoLink(site.email, d.contacto.subjects.kit)}>
              {b.kit}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
