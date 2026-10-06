import { site, whatsappLink } from "@/content/site";
import { getDictionary, tx } from "@/lib/dictionaries";
import { shortDate, upcoming } from "@/lib/fechas";
import { anchor, type Locale } from "@/lib/i18n";
import styles from "./Clases.module.css";

/**
 * Three ways in, each with one concrete, low-risk first step — not a
 * generic form. WhatsApp for lessons: it is how Mexico buys services, and he
 * already publishes a mobile number for "informes e inscripciones".
 */
export function Clases({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const c = d.clases;
  const masterclass = upcoming().find((f) => f.tipo === "masterclass");

  return (
    <section id="clases" className="section wrap">
      <div className="section-head">
        <h2 className="display">{c.title}</h2>
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
          <a className="btn btn--ghost" href={anchor(lang, "contacto")}>
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

      <div className={styles.proof}>
        <p>{c.proof}</p>
        <p className={styles.position}>{c.position}</p>
      </div>
    </section>
  );
}

function Rows({ rows }: { rows: string[][] }) {
  return (
    <dl className={styles.rows}>
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
