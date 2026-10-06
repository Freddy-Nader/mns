import { programas } from "@/content/programas";
import { fill, getDictionary, tx } from "@/lib/dictionaries";
import { shortDate, upcoming } from "@/lib/fechas";
import type { Locale } from "@/lib/i18n";
import styles from "./Puertas.module.css";

/**
 * Three entry points, one per job (Asistir · Aprender · Contratar), each with
 * the most concrete next step it has. This is the research's "segmented
 * entry points inside the home" — not navigation, which stays task-based.
 * The booking door is the solid one: solid means a transaction lives there.
 */
export function Puertas({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const p = d.puertas;
  const next = upcoming()[0];
  const named = programas.filter((x) => x.formato !== "orquesta").length;

  return (
    <section className={`${styles.puertas} wrap`} aria-label={p.label}>
      <a className={styles.door} href="#fechas">
        <p className="label">{d.segmentos.asistir}</p>
        <h2 className={styles.title}>{p.asistir.title}</h2>
        <p className={styles.text}>
          {next ? (
            <>
              <span className={styles.kicker}>{p.asistir.next}</span>
              {shortDate(next.dia, lang)} · {tx(next.titulo, lang)}
              {next.recinto.ciudad ? ` · ${next.recinto.ciudad}` : ""}
            </>
          ) : (
            p.asistir.none
          )}
        </p>
        <span className="arrow">{p.asistir.cta}</span>
      </a>

      <a className={styles.door} href="#clases">
        <p className="label">{d.segmentos.aprender}</p>
        <h2 className={styles.title}>{p.aprender.title}</h2>
        <p className={styles.text}>{p.aprender.text}</p>
        <span className="arrow">{p.aprender.cta}</span>
      </a>

      <a className={`${styles.door} ${styles.solid} on-dark`} href="#programas">
        <p className="label">{d.segmentos.contratar}</p>
        <h2 className={styles.title}>{p.contratar.title}</h2>
        <p className={styles.text}>{fill(p.contratar.text, { n: named })}</p>
        <span className="arrow">{p.contratar.cta}</span>
      </a>
    </section>
  );
}
