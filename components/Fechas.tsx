import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { groupByMonth, rangeLabel, upcomingWindow } from "@/lib/fechas";
import { href, type Locale } from "@/lib/i18n";
import { Listing } from "./Listing";
import styles from "./Fechas.module.css";

export function Fechas({ lang }: { lang: Locale }) {
  const d = getDictionary(lang).fechas;
  const { months, fechas } = upcomingWindow();
  return (
    <section id="fechas" className="section wrap">
      <div className="section-head">
        <h2 className="display">{d.title}</h2>
        <p>{rangeLabel(months, lang)}</p>
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
