import { mailtoLink, site, whatsappLink } from "@/content/site";
import { getDictionary, tx } from "@/lib/dictionaries";
import { groupByMonth, shortDate, upcoming } from "@/lib/fechas";
import type { Locale } from "@/lib/i18n";
import { Listing } from "./Listing";
import { Rows } from "./Rows";
import styles from "./Clases.module.css";

/**
 * Three ways in, each with one concrete, low-risk first step — not a
 * generic form. WhatsApp for lessons: it is how Mexico buys services, and he
 * already publishes a mobile number for "informes e inscripciones".
 */
export function Clases({ lang, as: H = "h2" }: { lang: Locale; as?: "h1" | "h2" }) {
  const d = getDictionary(lang);
  const c = d.clases;
  const teaching = upcoming().filter((f) => f.tipo === "masterclass" || f.tipo === "curso");
  const masterclass = teaching.find((f) => f.tipo === "masterclass");

  return (
    <section id="clases" className="section wrap">
      <div className="section-head">
        <H className="display">{c.title}</H>
        <p>{c.intro}</p>
      </div>

      <div className={styles.grid}>
        <article className={styles.offer}>
          <p className="label">{c.particulares.label}</p>
          <h3 className={styles.title}>{c.particulares.title}</h3>
          <Rows rows={c.particulares.rows} />
          <a
            className="btn"
            href={whatsappLink(c.particulares.message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.particulares.cta}
          </a>
        </article>

        <article id="masterclasses" className={styles.offer}>
          <p className="label">{c.masterclasses.label}</p>
          <h3 className={styles.title}>{c.masterclasses.title}</h3>
          <Rows
            rows={[
              ...c.masterclasses.rows,
              ...(masterclass
                ? [
                    [
                      c.masterclasses.next,
                      `${shortDate(masterclass.dia, lang)} · ${
                        masterclass.detalle ? tx(masterclass.detalle, lang) : masterclass.recinto.nombre
                      }`,
                    ],
                  ]
                : []),
            ]}
          />
          <a className="btn btn--ghost" href={mailtoLink(site.email, d.contacto.subjects.masterclass)}>
            {c.masterclasses.cta}
          </a>
        </article>

        <article className={styles.offer}>
          <p className="label">{c.curso.label}</p>
          <h3 className={styles.title}>{c.curso.title}</h3>
          <Rows rows={c.curso.rows} />
          <a className="btn btn--ghost" href={site.basesCurso} target="_blank" rel="noopener noreferrer">
            {c.curso.cta}
          </a>
        </article>
      </div>

      <section className={styles.metodo} aria-labelledby="metodo-title">
        <div className={styles.metodoHead}>
          <h2 id="metodo-title" className={styles.metodoTitle}>
            {c.metodo.title}
          </h2>
          <p>{c.metodo.intro}</p>
        </div>
        <ol className={styles.points}>
          {c.metodo.points.map((pt, i) => (
            <li key={pt.t}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{pt.t}</h3>
              <p>{pt.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {teaching.length > 0 && (
        <section className={styles.upcoming} aria-labelledby="clases-fechas">
          <h2 id="clases-fechas" className={styles.metodoTitle}>
            {c.upcoming}
          </h2>
          <Listing months={groupByMonth(teaching)} lang={lang} />
        </section>
      )}

      <div className={styles.proof}>
        <p>{c.proof}</p>
        <p className={styles.position}>{c.position}</p>
      </div>
    </section>
  );
}
