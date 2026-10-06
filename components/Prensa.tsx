import { citas } from "@/content/prensa";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import styles from "./Prensa.module.css";

// On the page ground, not a dark band: proof that belongs to the hero above
// it. Publication names instead of logos — the proof is critical reception.
export function Prensa({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  return (
    <section id="prensa" className={`${styles.prensa} wrap`} aria-label={d.prensa.label}>
      <div className={styles.grid}>
        {citas.map((c) => (
          <figure key={c.medio} className={styles.quote}>
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
  );
}
