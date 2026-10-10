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

/**
 * The full set for /bio#prensa, newest first where a year is known. Spanish
 * quotes are the originals, from his 2026 CV; English ones are English-language
 * papers, except the Braunschweiger Zeitung (see prensa.md). Typos in the
 * sources are fixed silently, as prensa.md asks.
 */
export const citasBio: Cita[] = [
  {
    texto:
      "Cuando Mauricio Náder toca el piano, despierta una parte insólita del público: el mundo de las pasiones, la sensualidad, la exaltación, la energía y la voluptuosidad.",
    idioma: "es",
    medio: "Life & Style",
    anio: 2006,
    pais: { es: "México", en: "Mexico" },
  },
  citas[1],
  {
    texto:
      "Impresionante ejecución y bravura de Náder. Su precisión técnica fue notable. Su concierto fue un éxito pianístico.",
    idioma: "es",
    medio: "El Nuevo Día",
    anio: 2009,
    pais: { es: "Puerto Rico", en: "Puerto Rico" },
  },
  {
    texto: "The concert was a profound and magical experience. Nader displayed exquisite artistry and technical wizardry.",
    idioma: "en",
    medio: "Dawn",
    anio: 2009,
    pais: { es: "Pakistán", en: "Pakistan" },
  },
  {
    texto: "With a spirit of passion for music, Mauricio Nader brings a universal message of peace.",
    idioma: "en",
    medio: "The News",
    anio: 2009,
    pais: { es: "Pakistán", en: "Pakistan" },
  },
  {
    texto:
      "Mauricio Nader halló el toque preciso para Rachmaninoff: sonido amplio y redondo, profundidad interpretativa e inmejorable desenvoltura.",
    idioma: "es",
    medio: "El Informador",
    pais: { es: "México", en: "Mexico" },
  },
  {
    texto:
      "El pianista reveló las escondidas gracias de Grieg más allá de lo habitual. El público se volcó en palmas… nos dejó con el deseo de escucharlo alguna vez en otro concierto romántico.",
    idioma: "es",
    medio: "Diario de Yucatán",
    pais: { es: "México", en: "Mexico" },
  },
  {
    texto: "Su programa fue cuidadosamente elegido… la gente se sorprendió por su calidad.",
    idioma: "es",
    medio: "Vanguardia Liberal",
    anio: 2001,
    pais: { es: "Colombia", en: "Colombia" },
  },
  {
    texto:
      "De gran personalidad en el escenario… dueño de una rica paleta sonora… en él hay fantasía, disciplina, talento y entrega.",
    idioma: "es",
    medio: "Semanal",
    anio: 2000,
    pais: { es: "México", en: "Mexico" },
  },
  citas[2],
  {
    texto:
      "Nos encontramos ante un pianista excepcional… uno de los artistas más sobresalientes del actual panorama musical de nuestro país.",
    idioma: "es",
    medio: "Siglo 21",
    anio: 1997,
    pais: { es: "México", en: "Mexico" },
  },
  {
    texto:
      "Mauricio nos cautivó con una enérgica ejecución, plena ésta de innumerables recursos. Mostró el virtuosismo, oficio y habilidad de quien se atreve a encarar pasajes de endemoniada dificultad.",
    idioma: "es",
    medio: "Revista Siempre",
    anio: 1993,
    pais: { es: "México", en: "Mexico" },
  },
  {
    texto:
      "Mauricio alcanza como pianista una calidad interpretativa excepcional, que se sustenta en un conocimiento pleno de su instrumento y en una impecable y depurada técnica que le permiten por igual emitir un refinado canto, un lamento, un suspiro o un grito estremecedor.",
    idioma: "es",
    medio: "Ramón Montes de Oca, compositor, Festival Internacional Cervantino",
    anio: 2004,
    pais: { es: "México", en: "Mexico" },
  },
];
