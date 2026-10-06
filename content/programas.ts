import type { Txt } from "@/lib/i18n";

export type ProgramaSlug =
  | "piano-de-pelicula"
  | "pianoffortissimo"
  | "humor-us-piano"
  | "mexican-piano"
  | "american-piano"
  | "don-quixotes-piano"
  | "makropiano"
  | "filosofia-y-musica"
  | "piano-y-orquesta";

export type Programa = {
  slug: ProgramaSlug;
  /** Proper noun, written exactly as he styles it. Translated only for the concerto list. */
  nombre: string | Txt;
  /** His own subtitle, kept in its original language. */
  subtitulo?: string | Txt;
  descripcion: Txt;
  /** Composers, surname only, in programme order. */
  obras: string[];
  formato: "recital" | "orquesta" | "charla";
  /**
   * Poster ground in the grid — a designer's choice, not data. Set so that no
   * two ink posters touch in the four-column wall.
   */
  tono: "ink" | "paper" | "grey";
};

// Names, subtitles and repertoire verified 2026-09-22 against his programme
// pages and INBA press releases — docs/content/programas.md.
// ⚠️ English free text below is a draft for Mauricio to correct (ADR-0002),
// except Humör Us, Piano's tagline, which is his own.
export const programas: Programa[] = [
  {
    slug: "piano-de-pelicula",
    nombre: "Piano de Película",
    subtitulo: {
      es: "A 80 años del fallecimiento de Manuel de Falla",
      en: "80 years since the death of Manuel de Falla",
    },
    descripcion: {
      es: "Música escrita para el cine y obras de concierto que el cine volvió célebres, en arreglos para piano de Mauricio Nader.",
      en: "Music written for film, and concert works that film made famous, in piano arrangements by Mauricio Nader.",
    },
    obras: ["Falla", "Lemonnier", "Ravel", "Addinsell", "Bernstein"],
    formato: "recital",
    tono: "ink",
  },
  {
    slug: "pianoffortissimo",
    nombre: "pianoffortissimo",
    descripcion: {
      es: "Un recital de gran aliento: la Sonata Op. 7 de Grieg y seis preludios de Rachmaninoff, con cierre en El Salón México.",
      en: "A recital on the grand scale: Grieg's Sonata Op. 7 and six Rachmaninoff preludes, closing with El Salón México.",
    },
    obras: ["Villa-Lobos", "Grieg", "Rachmaninoff", "Copland"],
    formato: "recital",
    tono: "paper",
  },
  {
    slug: "humor-us-piano",
    nombre: "Humör Us, Piano",
    descripcion: {
      es: "Está absolutamente PERMITIDO reír durante el recital.",
      en: "It is Absolutely PERMITTED to laugh during the recital.",
    },
    obras: ["Saint-Saëns", "P.D.Q. Bach", "Dudley Moore", "Hamelin", "Nader"],
    formato: "recital",
    tono: "ink",
  },
  {
    slug: "mexican-piano",
    nombre: "Mexican Piano",
    subtitulo: "100 Years of Mexican Music",
    descripcion: {
      es: "Un siglo de piano mexicano, de Ricardo Castro y Ponce a Chávez y Zyman.",
      en: "A century of Mexican piano music, from Ricardo Castro and Ponce to Chávez and Zyman.",
    },
    obras: ["Castro", "Ponce", "Chávez", "Guraieb", "Morales", "Velázquez", "Ibarra", "Zyman"],
    formato: "recital",
    tono: "grey",
  },
  {
    slug: "american-piano",
    nombre: "American Piano",
    subtitulo: "Music from the American Continent",
    descripcion: {
      es: "El continente completo, no sólo Estados Unidos: de Nazareth y Halffter a Gershwin.",
      en: "The whole continent, not only the United States: from Nazareth and Halffter to Gershwin.",
    },
    obras: [
      "Carrasco",
      "Halffter",
      "Chávez",
      "Castro",
      "Camacho",
      "Nazareth",
      "Gershwin",
      "Muczynski",
      "del Águila",
    ],
    formato: "recital",
    tono: "paper",
  },
  {
    slug: "don-quixotes-piano",
    nombre: "Don Quixote’s Piano",
    subtitulo: "to Miguel de Cervantes Saavedra",
    descripcion: {
      es: "Homenaje a Cervantes, con El retablo de Maese Pedro de Falla y el Don Quijote de Minkus en su propia versión para piano.",
      en: "A homage to Cervantes, with Falla’s El retablo de Maese Pedro and Minkus’s Don Quixote in his own piano version.",
    },
    obras: ["Albéniz", "Falla", "Minkus", "Carbajo", "Camacho", "Lobato"],
    formato: "recital",
    tono: "paper",
  },
  {
    slug: "makropiano",
    nombre: "MAKROpiano",
    subtitulo: "Contemporary Music — Prepared Piano & Extended Techniques",
    descripcion: {
      es: "Piano preparado y técnicas extendidas, con los Makrokosmos de George Crumb, que él estrenó en México.",
      en: "Prepared piano and extended techniques, with George Crumb’s Makrokosmos, which he premiered in Mexico.",
    },
    obras: ["Crumb", "Cage", "Cowell", "Lavista", "Álvarez", "Soto Millán", "Nader"],
    formato: "recital",
    tono: "grey",
  },
  {
    slug: "filosofia-y-musica",
    nombre: "Filosofía y Música",
    subtitulo: "La Enfermedad del Pensamiento y la Música como Esperanza",
    descripcion: {
      es: "Concierto y conversación con el filósofo Gerardo Martínez Cristerna.",
      en: "A concert in conversation with the philosopher Gerardo Martínez Cristerna.",
    },
    obras: [],
    formato: "charla",
    tono: "ink",
  },
  {
    slug: "piano-y-orquesta",
    nombre: { es: "Piano y orquesta", en: "Piano & Orchestra" },
    descripcion: {
      es: "28 conciertos en repertorio, de Brahms a Ponce y Rolón, cuyos conciertos estrenó en varios países. Varios están listos para tocarse con poca anticipación, incluso como reemplazo de emergencia.",
      en: "28 concertos in repertoire, from Brahms to Ponce and Rolón, whose concertos he premiered in several countries. Several are ready to play at short notice, emergency replacements included.",
    },
    obras: ["Ponce", "Rolón", "Brahms"],
    formato: "orquesta",
    tono: "grey",
  },
];

export const programaDestacado: ProgramaSlug = "piano-de-pelicula";
