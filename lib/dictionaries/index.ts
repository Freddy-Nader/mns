import type { Locale, Txt } from "@/lib/i18n";
import { en } from "./en";
import { es, type Dictionary } from "./es";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };

/** Resolves a field that is either language-neutral or free text. */
export function tx(value: string | Txt, lang: Locale): string {
  return typeof value === "string" ? value : value[lang];
}

/** Fills {name} placeholders. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function formatMXN(amount: number): string {
  return `$${amount.toLocaleString("en-US")} MXN`;
}
