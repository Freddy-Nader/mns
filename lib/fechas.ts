import { fechas as todas, type Fecha } from "@/content/fechas";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const TZ = "America/Mexico_City";

/** Today in Mexico City, as YYYY-MM-DD. */
export function today(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(now);
}

const byDate = (a: Fecha, b: Fecha) => `${a.dia}${a.hora ?? ""}`.localeCompare(`${b.dia}${b.hora ?? ""}`);

export function upcoming(from = today(), list: Fecha[] = todas): Fecha[] {
  return list.filter((f) => f.dia >= from).sort(byDate);
}

export type DayGroup = { dia: string; fechas: Fecha[] };
export type MonthGroup = { month: string; days: DayGroup[] };

/**
 * Month → day → events. One date cell carries every event of that day, which
 * is what lets 30 October show two concerts at the same hour honestly.
 */
export function groupByMonth(list: Fecha[]): MonthGroup[] {
  const months: MonthGroup[] = [];
  for (const f of list) {
    const month = f.dia.slice(0, 7);
    let m = months.at(-1);
    if (!m || m.month !== month) months.push((m = { month, days: [] }));
    let d = m.days.at(-1);
    if (!d || d.dia !== f.dia) m.days.push((d = { dia: f.dia, fechas: [] }));
    d.fechas.push(f);
  }
  return months;
}

// Noon UTC keeps the calendar date stable whatever the server's time zone.
const noon = (dia: string) => new Date(`${dia.length === 7 ? `${dia}-01` : dia}T12:00:00Z`);
const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase() + s.slice(1);

function fmt(dia: string, lang: Locale, options: Intl.DateTimeFormatOptions): string {
  const { intl } = getDictionary(lang);
  return new Intl.DateTimeFormat(intl, { timeZone: "UTC", ...options }).format(noon(dia));
}

/** "Octubre", or "Febrero 2027" when the year is not the current one. */
export function monthLabel(month: string, lang: Locale, from = today()): string {
  const name = capitalize(fmt(month, lang, { month: "long" }));
  return month.slice(0, 4) === from.slice(0, 4) ? name : `${name} ${month.slice(0, 4)}`;
}

/** "Jue 15." — the day cell of the listing. */
export function dayLabel(dia: string, lang: Locale): string {
  const weekday = capitalize(fmt(dia, lang, { weekday: "short" }).replace(".", ""));
  return `${weekday} ${dia.slice(8).replace(/^0/, "")}.`;
}

/** "Jue 15 oct" — a date in running text. */
export function shortDate(dia: string, lang: Locale): string {
  const weekday = capitalize(fmt(dia, lang, { weekday: "short" }).replace(".", ""));
  const month = fmt(dia, lang, { month: "short" }).replace(".", "");
  return lang === "es"
    ? `${weekday} ${Number(dia.slice(8))} ${month}`
    : `${weekday}, ${capitalize(month)} ${Number(dia.slice(8))}`;
}

/** How many dates a programme has in the given calendar year. */
export function datesInYear(programa: string, year: string): number {
  return todas.filter((f) => f.programa === programa && f.dia.startsWith(year)).length;
}

export function mapsUrl(f: Fecha): string | undefined {
  if (!f.recinto.nombre) return undefined;
  const query = [f.recinto.nombre, f.recinto.ciudad].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** ISO 8601 start, with the venue's offset, for structured data. */
export function startDate(f: Fecha): string {
  return f.hora ? `${f.dia}T${f.hora}:00${f.utc ?? "-06:00"}` : f.dia;
}
