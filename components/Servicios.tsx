import type { ReactNode } from "react";
import { partiturasEnTienda, precioMinimoTienda } from "@/content/partituras";
import { programas } from "@/content/programas";
import { fill, formatMXN, getDictionary, tx } from "@/lib/dictionaries";
import { shortDate, upcoming } from "@/lib/fechas";
import { href, type Locale } from "@/lib/i18n";
import styles from "./Servicios.module.css";

/**
 * What he does, at a glance: one door per task page, each carrying the most
 * concrete fact its page has (the next date, a count, a price). On a phone
 * this is the visible navigation (docs/design/information-architecture.md).
 * The booking door is the solid one: solid means a transaction lives there.
 */
export function Servicios({ lang }: { lang: Locale }) {
  const s = getDictionary(lang).servicios;
  const all = upcoming();
  const next = all[0];
  const masterclass = all.find((f) => f.tipo === "masterclass");
  const named = programas.filter((x) => x.formato !== "orquesta").length;

  return (
    <section id="servicios" className={`${styles.servicios} wrap`} aria-labelledby="servicios-title">
      <h2 id="servicios-title" className="label">
        {s.title}
      </h2>
      <div className={styles.grid}>
        <Door
          href={href(lang, "/fechas")}
          label={s.conciertos.label}
          title={s.conciertos.title}
          cta={s.conciertos.cta}
          wide
        >
          {next ? (
            <>
              <span className={styles.kicker}>{s.conciertos.next}</span>
              {shortDate(next.dia, lang)} · {tx(next.titulo, lang)}
              {next.recinto.ciudad ? ` · ${next.recinto.ciudad}` : ""}
            </>
          ) : (
            s.conciertos.none
          )}
        </Door>

        <Door
          href={href(lang, "/programas")}
          label={s.programas.label}
          title={s.programas.title}
          cta={s.programas.cta}
          wide
          solid
        >
          {fill(s.programas.text, { n: named })}
        </Door>

        <Door href={href(lang, "/clases")} label={s.clases.label} title={s.clases.title} cta={s.clases.cta}>
          {s.clases.text}
          {masterclass && (
            <span className={styles.aside}>
              {s.clases.next}: {shortDate(masterclass.dia, lang)}
            </span>
          )}
        </Door>

        <Door
          href={href(lang, "/partituras")}
          label={s.partituras.label}
          title={s.partituras.title}
          cta={s.partituras.cta}
        >
          {fill(s.partituras.text, { n: partiturasEnTienda, min: formatMXN(precioMinimoTienda) })}
        </Door>

        <Door href={href(lang, "/encargos")} label={s.encargos.label} title={s.encargos.title} cta={s.encargos.cta}>
          {s.encargos.text}
        </Door>
      </div>
    </section>
  );
}

function Door({
  href,
  label,
  title,
  cta,
  wide = false,
  solid = false,
  children,
}: {
  href: string;
  label: string;
  title: string;
  cta: string;
  wide?: boolean;
  solid?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      className={`${styles.door} ${wide ? styles.wide : ""} ${solid ? `${styles.solid} on-dark` : ""}`}
      href={href}
    >
      <p className="label">{label}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{children}</p>
      <span className="arrow">{cta}</span>
    </a>
  );
}
