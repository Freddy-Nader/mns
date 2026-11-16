import { partituras, partiturasEnTienda } from "@/content/partituras";
import { site } from "@/content/site";
import { fill, formatMXN, getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import styles from "./Partituras.module.css";

/**
 * The score shop as a listing, not a card grid: same row grammar as the
 * concert calendar. The recording is the free sample — Anderson & Roe sell
 * every score next to the video of them playing it.
 */
export function Partituras({ lang, as: H = "h2" }: { lang: Locale; as?: "h1" | "h2" }) {
  const d = getDictionary(lang).partituras;
  return (
    <section id="partituras" className="alt section wrap">
      <div className="section-head">
        <H className="display">{d.title}</H>
        <p>{d.intro}</p>
      </div>

      <ul className={styles.list}>
        {partituras.map((s) => (
          <li key={s.slug} className={styles.row}>
            <div className={styles.work}>
              <p className={styles.autor}>{s.autor}</p>
              <h3 className={styles.obra}>{s.obra}</h3>
              <p className={styles.tipo}>
                {d.tipo[s.tipo]}
                {s.nota ? ` · ${s.nota[lang]}` : ""}
              </p>
            </div>
            <p className={styles.price}>{formatMXN(s.precioMXN)}</p>
            <div className={styles.actions}>
              {s.video && (
                <a
                  className="btn btn--ghost btn--small"
                  href={`https://www.youtube.com/watch?v=${s.video}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${d.listen}: ${s.autor}, ${s.obra}`}
                >
                  {d.listen}
                </a>
              )}
              <a
                className="btn btn--small"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${d.buy}: ${s.autor}, ${s.obra}`}
              >
                {d.buy}
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.foot}>
        <a className="arrow" href={site.tienda} target="_blank" rel="noopener noreferrer">
          {fill(d.store, { n: partiturasEnTienda })}
        </a>
        <p className={styles.note}>{d.note}</p>
      </div>
    </section>
  );
}
