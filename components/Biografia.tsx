import Image from "next/image";
import bioA from "@/public/img/bio1.jpg";
import bioB from "@/public/img/bio2.jpg";
import { datos, trayectoria } from "@/content/bio";
import { citasBio } from "@/content/prensa";
import { mailtoLink, site } from "@/content/site";
import { getDictionary, tx } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { Rows } from "./Rows";
import { Stats } from "./Stats";
import styles from "./Biografia.module.css";

/**
 * The long-form biography (/bio), for the presenter checking credentials and
 * the journalist who needs citable facts. Narrative first, then a fact sheet
 * to scan, then the press. Sources: docs/content/bio.md and prensa.md.
 */
export function Biografia({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const b = d.bioPage;
  return (
    <>
      <section className="section wrap">
        <div className={styles.intro}>
          <div>
            <h1 className="display">{b.title}</h1>
            <p className={styles.lead}>{b.lead}</p>
          </div>
          <div className={styles.shot}>
            {/* ⚠️ Third-party press photo, not cleared for launch — docs/content/imagenes.md */}
            <Image src={bioA} alt={b.photoAlt} sizes="(min-width: 1000px) 40vw, 100vw" placeholder="blur" preload />
          </div>
        </div>

        <div className={styles.stats}>
          <Stats stats={d.programas.booking.stats} />
        </div>

        <div className={styles.block}>
          <h2 className={styles.h2}>{b.trayectoria}</h2>
          <div className={styles.prose}>
            {trayectoria.map((p) => (
              <p key={p.es.slice(0, 24)}>{tx(p, lang)}</p>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <h2 className={styles.h2}>{b.datos}</h2>
          <Rows
            wide
            rows={datos.map((row) => [
              tx(row.label, lang),
              <ul key={row.label.es}>
                {row.items.map((item) => (
                  <li key={item.es}>{tx(item, lang)}</li>
                ))}
              </ul>,
            ])}
          />
        </div>
      </section>

      <section id="prensa" className="dark on-dark section wrap" aria-labelledby="prensa-title">
        <div className="section-head">
          <h2 id="prensa-title" className="display">
            {b.prensa}
          </h2>
          <p>{b.prensaIntro}</p>
        </div>
        <div className={styles.quotes}>
          {citasBio.map((c) => (
            <figure key={c.medio + c.texto.slice(0, 12)} className={styles.quote}>
              {/* Quotes are never translated (ADR-0002). */}
              <blockquote lang={c.idioma}>“{c.texto}”</blockquote>
              <figcaption>
                {c.medio}
                {c.anio ? `, ${c.anio}` : ""} · {c.pais[lang]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="alt section wrap" aria-labelledby="bio-close">
        <div className={styles.close}>
          <div className={styles.closeShot}>
            {/* ⚠️ Third-party press photo, not cleared for launch — docs/content/imagenes.md */}
            <Image src={bioB} alt={d.bio.photoB} sizes="(min-width: 1000px) 40vw, 100vw" placeholder="blur" />
          </div>
          <div className={styles.closeText}>
            <h2 id="bio-close" className="display">
              {b.close.title}
            </h2>
            <p>{b.close.text}</p>
            <div className={styles.cta}>
              <a className="btn" href={site.formularioContratacion[lang]} target="_blank" rel="noopener noreferrer">
                {b.close.cta}
              </a>
              <a className="btn btn--ghost" href={mailtoLink(site.email, d.contacto.subjects.kit)}>
                {b.close.kit}
              </a>
            </div>
            <a className="arrow" href={href(lang, "/programas")}>
              {b.close.programas}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
