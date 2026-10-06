import { Fragment } from "react";
import type { Fecha } from "@/content/fechas";
import { formatMXN, getDictionary, tx, type Dictionary } from "@/lib/dictionaries";
import { dayLabel, mapsUrl, monthLabel, type MonthGroup } from "@/lib/fechas";
import type { Locale } from "@/lib/i18n";
import styles from "./Listing.module.css";

/**
 * The concert listing, adapted from the ETA Hoffmann Theater with the
 * client's five corrections (docs/design/landing-page.md §4). Month heading
 * in the serif, day label in the sans; everything in a day group shares a
 * top edge.
 */
export function Listing({
  months,
  lang,
  level = 3,
}: {
  months: MonthGroup[];
  lang: Locale;
  /** Heading level for the months; events sit one below. */
  level?: 2 | 3;
}) {
  const Month = level === 2 ? "h2" : "h3";
  if (months.length === 0) {
    return <p className={styles.empty}>{getDictionary(lang).fechas.empty}</p>;
  }
  return months.map((m) => (
    <Fragment key={m.month}>
      <Month className={styles.month}>{monthLabel(m.month, lang)}</Month>
      {m.days.map((day) => (
        <div key={day.dia} className={styles.day}>
          <time className={styles.dayLabel} dateTime={day.dia}>
            {dayLabel(day.dia, lang)}
          </time>
          <div className={styles.events}>
            {day.fechas.map((f) => (
              <Evento key={f.id} f={f} lang={lang} level={level} />
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  ));
}

function Evento({ f, lang, level }: { f: Fecha; lang: Locale; level: 2 | 3 }) {
  const d = getDictionary(lang).fechas;
  const Title = level === 2 ? "h3" : "h4";
  const precio = "precioMXN" in f.acceso && f.acceso.precioMXN ? ` · ${formatMXN(f.acceso.precioMXN)}` : "";
  const venue = f.recinto.enLinea
    ? d.online
    : [f.recinto.nombre, f.recinto.ciudad].filter(Boolean).join(" · ");
  const act = action(f, d);

  return (
    <article className={styles.ev}>
      <div className={styles.meta}>
        <span className={styles.time}>{f.hora ?? d.noTime}</span>
        <span className={styles.access}>
          {d.acceso[f.acceso.tipo]}
          {precio}
        </span>
      </div>
      <div>
        <Title className={styles.title}>{tx(f.titulo, lang)}</Title>
        {f.detalle && <p className={styles.sub}>{tx(f.detalle, lang)}</p>}
        <p className={styles.venue}>{venue}</p>
      </div>
      {act && (
        <div className={styles.act}>
          <a
            className={act.solid ? "btn" : "btn btn--ghost"}
            href={act.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {act.label}
          </a>
        </div>
      )}
    </article>
  );
}

/** Solid when there is a transaction; outline when you just turn up. */
function action(f: Fecha, d: Dictionary["fechas"]) {
  const a = f.acceso;
  if (a.tipo === "boletos") return { label: d.buy, href: a.url, solid: true };
  if (a.tipo === "inscripcion") return a.url ? { label: d.enrol, href: a.url, solid: true } : null;
  const maps = mapsUrl(f);
  return maps ? { label: d.directions, href: maps, solid: false } : null;
}
