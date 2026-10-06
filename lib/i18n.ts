export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Free text — the only kind of field that needs a human translation
 * (docs/adr/0002). Everything else is either language-neutral (dates,
 * prices, proper nouns) or a pre-translated enum in the dictionaries.
 */
export type Txt = Record<Locale, string>;

/** Spanish is the primary language and lives at the root; English under /en. */
export function href(lang: Locale, path = "/"): string {
  if (lang === "es") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Anchor on the landing page, usable from any page. */
export function anchor(lang: Locale, id: string): string {
  return `${href(lang)}#${id}`;
}
