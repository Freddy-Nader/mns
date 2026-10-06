import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { BriefForm } from "./BriefForm";
import styles from "./Encargos.module.css";

/**
 * Commissions are not a price list: they are a brief that asks the three
 * questions a quote depends on — what for, for whom, by when (New Music
 * USA's fee guidance, docs/research/referencias.md).
 */
export function Encargos({ lang }: { lang: Locale }) {
  const e = getDictionary(lang).encargos;
  return (
    <section id="encargos" className="section wrap">
      <div className={styles.grid}>
        <div className={styles.intro}>
          <h2 className="display">{e.title}</h2>
          <p className={styles.lead}>{e.intro}</p>
          <p>{e.film}</p>
          <p className={styles.price}>{e.price}</p>
        </div>
        <BriefForm t={e.form} />
      </div>
    </section>
  );
}
