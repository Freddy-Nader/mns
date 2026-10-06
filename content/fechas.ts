import type { Txt } from "@/lib/i18n";
import type { ProgramaSlug } from "./programas";

/**
 * How a person gets in (CONTEXT.md → Acceso). The four real states, plus
 * `por-confirmar`, which is not a fifth state but an honest marker for data
 * we do not have yet: his calendar publishes access for two dates out of
 * fourteen (docs/content/fechas.md). Never fill a gap with an invented price.
 */
export type Acceso =
  | { tipo: "entrada-libre" }
  | { tipo: "boletos"; url: string; precioMXN?: number }
  | { tipo: "taquilla"; precioMXN?: number }
  | { tipo: "inscripcion"; url?: string; precioMXN?: number }
  | { tipo: "por-confirmar" };

export type TipoFecha = "recital" | "orquesta" | "camara" | "masterclass" | "curso";

export type Fecha = {
  id: string;
  /** YYYY-MM-DD, local date at the venue. */
  dia: string;
  /** HH:MM, 24-hour, local time at the venue. Omitted when unpublished. */
  hora?: string;
  /** UTC offset at the venue on that date. Mexico has had no DST since 2022. */
  utc?: string;
  tipo: TipoFecha;
  /** A proper noun (language-neutral) or a translated title. */
  titulo: string | Txt;
  detalle?: string | Txt;
  programa?: ProgramaSlug;
  recinto: {
    nombre?: string;
    ciudad?: string;
    /** ISO 3166 code, for structured data. Mexico when omitted. */
    pais?: string;
    enLinea?: boolean;
  };
  acceso: Acceso;
};

// Scraped from mauricionader.net/concert-calendar on 2026-09-22. Every row is
// in docs/content/fechas.md with its source text. Past dates stay here: they
// are the archive ("Conciertos pasados") and they count toward a programme's
// season total.
export const fechas: Fecha[] = [
  {
    id: "2026-09-22-masterclass-cnm",
    dia: "2026-09-22",
    hora: "10:00",
    tipo: "masterclass",
    titulo: "Masterclass",
    recinto: {
      nombre: "Auditorio Silvestre Revueltas, Conservatorio Nacional de Música",
      ciudad: "Ciudad de México",
    },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-09-24-piano-de-pelicula-coyoacan",
    dia: "2026-09-24",
    hora: "20:00",
    tipo: "recital",
    titulo: "Piano de Película",
    detalle: "Lemonnier · Ravel · Addinsell · Bernstein",
    programa: "piano-de-pelicula",
    recinto: {
      nombre: "Instituto Mexicano para la Justicia, Coyoacán",
      ciudad: "Ciudad de México",
    },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-09-25-geometria-del-aire",
    dia: "2026-09-25",
    hora: "12:00",
    tipo: "recital",
    titulo: "Geometría del Aire",
    detalle: {
      es: "En torno a la compositora mexicana Gabriela Ortiz",
      en: "Around the Mexican composer Gabriela Ortiz",
    },
    programa: "piano-de-pelicula",
    recinto: { nombre: "Castillo de Chapultepec", ciudad: "Ciudad de México" },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-10-03-curso-piano-creativo",
    dia: "2026-10-03",
    tipo: "curso",
    titulo: { es: "Curso virtual — Academia Piano Creativo", en: "Online course — Academia Piano Creativo" },
    detalle: {
      es: "Para pianistas y grupos de cámara de la Academia",
      en: "For the Academy's pianists and chamber groups",
    },
    recinto: { enLinea: true },
    acceso: { tipo: "inscripcion" },
  },
  {
    id: "2026-10-15-flauta-y-piano-monterrey",
    dia: "2026-10-15",
    hora: "20:00",
    tipo: "camara",
    titulo: { es: "Flauta y piano", en: "Flute & Piano" },
    detalle: "Feria Internacional del Libro de Monterrey",
    recinto: { nombre: "Museo de Arte Contemporáneo (MARCO)", ciudad: "Monterrey, N.L." },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-10-22-filosofia-y-musica-cdmx",
    dia: "2026-10-22",
    hora: "19:00",
    tipo: "recital",
    titulo: "Filosofía y Música",
    detalle: {
      es: "Con Gerardo Martínez Cristerna, filósofo",
      en: "With the philosopher Gerardo Martínez Cristerna",
    },
    programa: "filosofia-y-musica",
    recinto: {
      nombre: "Casa de Tabasco en México «Carlos Pellicer»",
      ciudad: "Ciudad de México",
    },
    acceso: { tipo: "entrada-libre" },
  },
  // ⚠️ October 30 carries two events at 19:00 in different cities, exactly as
  // printed on his site. One of them is probably wrong — ask, don't guess.
  {
    id: "2026-10-30-ponce-osem",
    dia: "2026-10-30",
    hora: "19:00",
    tipo: "orquesta",
    titulo: { es: "Ponce: Concierto para piano", en: "Ponce: Piano Concerto" },
    detalle: {
      es: "Orquesta Sinfónica del Estado de México · Rodrigo Macías, director",
      en: "State of Mexico Symphony Orchestra · Rodrigo Macías, conductor",
    },
    programa: "piano-y-orquesta",
    recinto: { ciudad: "Toluca, Estado de México" },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-10-30-piano-de-pelicula-fce",
    dia: "2026-10-30",
    hora: "19:00",
    tipo: "recital",
    titulo: "Piano de Película",
    detalle: {
      es: "A 80 años del fallecimiento de Manuel de Falla",
      en: "80 years since the death of Manuel de Falla",
    },
    programa: "piano-de-pelicula",
    recinto: { nombre: "Librería Rosario Castellanos, FCE", ciudad: "Ciudad de México" },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-11-20-masterclass-blanco-y-negro",
    dia: "2026-11-20",
    hora: "10:00",
    tipo: "masterclass",
    titulo: "Masterclass",
    detalle: "Festival Internacional de Piano En Blanco y Negro",
    recinto: { nombre: "Auditorio Blas Galindo, Cenart", ciudad: "Ciudad de México" },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-11-22-blanco-y-negro",
    dia: "2026-11-22",
    hora: "18:00",
    tipo: "recital",
    titulo: "Piano de Película",
    detalle: "Festival Internacional de Piano En Blanco y Negro",
    programa: "piano-de-pelicula",
    recinto: { nombre: "Auditorio Blas Galindo, Cenart", ciudad: "Ciudad de México" },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-11-26-filosofia-y-musica-guanajuato",
    dia: "2026-11-26",
    hora: "19:00",
    tipo: "recital",
    titulo: "Filosofía y Música",
    detalle: {
      es: "Con Gerardo Martínez Cristerna, filósofo",
      en: "With the philosopher Gerardo Martínez Cristerna",
    },
    programa: "filosofia-y-musica",
    recinto: { nombre: "Museo Iconográfico del Quijote", ciudad: "Guanajuato, Gto." },
    acceso: { tipo: "entrada-libre" },
  },
  {
    id: "2026-12-06-soto-millan",
    dia: "2026-12-06",
    hora: "18:00",
    tipo: "recital",
    titulo: "La música de Eduardo Soto Millán",
    recinto: {
      nombre: "Sala Manuel M. Ponce, Palacio de Bellas Artes",
      ciudad: "Ciudad de México",
    },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2026-12-13-ocho-decadas-inbal",
    dia: "2026-12-13",
    hora: "18:00",
    tipo: "recital",
    titulo: "Ocho décadas del INBAL",
    detalle: {
      es: "Homenaje a Mario Lavista",
      en: "A homage to Mario Lavista",
    },
    recinto: {
      nombre: "Sala Manuel M. Ponce, Palacio de Bellas Artes",
      ciudad: "Ciudad de México",
    },
    acceso: { tipo: "por-confirmar" },
  },
  {
    id: "2027-02-18-ponce-guayaquil",
    dia: "2027-02-18",
    utc: "-05:00",
    tipo: "orquesta",
    titulo: { es: "Ponce: Concierto para piano", en: "Ponce: Piano Concerto" },
    detalle: {
      es: "Orquesta Filarmónica Municipal de Guayaquil · Manuel Campos Loor, director titular",
      en: "Guayaquil Municipal Philharmonic · Manuel Campos Loor, music director",
    },
    programa: "piano-y-orquesta",
    recinto: { nombre: "Teatro Centro de Arte", ciudad: "Guayaquil, Ecuador", pais: "EC" },
    acceso: { tipo: "por-confirmar" },
  },
];
