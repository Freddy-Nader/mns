import Link from "next/link";
import { fill, getDictionary } from "@/lib/dictionaries";
import { groupByMonth, upcoming } from "@/lib/fechas";
import { href, type Locale } from "@/lib/i18n";
import { Listing } from "./Listing";
import styles from "./Fechas.module.css";

/** How many dates the landing page shows; /fechas has the rest. */
const RESUMEN = 4;

export function Fechas({ lang }: { lang: Locale }) {
  const d = getDictionary(lang).fechas;
  const all = upcoming();
  const fechas = all.slice(0, RESUMEN);
  return (
    <section id="fechas" className="section wrap">
      <div className="section-head">
        <h2 className="display">{d.title}</h2>
        {fechas.length > 0 && <p>{fill(d.resumen, { n: fechas.length, total: all.length })}</p>}
      </div>
      <Listing months={groupByMonth(fechas)} lang={lang} />
      <div className={styles.foot}>
        <Link className="btn btn--ghost" href={href(lang, "/fechas")}>
          {d.all}
        </Link>
      </div>
    </section>
  );
}
