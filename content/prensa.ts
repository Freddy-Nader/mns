// Verbatim, in the original language, on both language versions of the site
// (ADR-0002). "Náder" stays when the source prints it. Sources and the
// trimming of the first quote: docs/content/prensa.md.

export type Cita = {
  texto: string;
  /** Language the quote is in — set on the element for screen readers. */
  idioma: "es" | "en";
  medio: string;
  anio?: number;
  pais: { es: string; en: string };
};

export const citas: Cita[] = [
  {
    texto:
      "Cuando Mauricio Náder toca el piano, despierta una parte insólita del público: el mundo de las pasiones, la sensualidad, la exaltación.",
    idioma: "es",
    medio: "Life & Style",
    anio: 2006,
    pais: { es: "México", en: "Mexico" },
  },
  {
    texto:
      "Today, no other Mexican pianist matches Mauricio Nader’s busy concert schedule, precise technique and intense passion.",
    idioma: "en",
    medio: "Houston Chronicle",
    pais: { es: "Estados Unidos", en: "United States" },
  },
  {
    texto:
      "From beginning to end, Náder obtained from the piano a pearl-like sound, underlying every phrase with elegance and grace.",
    idioma: "en",
    medio: "Braunschweiger Zeitung",
    anio: 1999,
    pais: { es: "Alemania", en: "Germany" },
  },
];
