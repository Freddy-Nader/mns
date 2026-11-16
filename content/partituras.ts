import type { Txt } from "@/lib/i18n";

// A selection from his store, nadermusic.lemonsqueezy.com — 28 listings,
// prices in MXN as published on 2026-10-06. The store is the source of truth:
// if a price changes there, change it here. Each one he plays on YouTube
// carries its video, so the recording is the free sample (Anderson & Roe's
// pattern, docs/research/referencias.md).

export type TipoPartitura = "arreglo" | "transcripcion" | "original";

export type Partitura = {
  slug: string;
  /** Work title, language-neutral. Every current listing is for solo piano. */
  obra: string;
  nota?: Txt;
  autor: string;
  tipo: TipoPartitura;
  precioMXN: number;
  /** Lemon Squeezy product checkout. */
  url: string;
  /** YouTube id of his recording of it. */
  video?: string;
};

const buy = (id: string) => `https://nadermusic.lemonsqueezy.com/checkout/buy/${id}`;

export const partituras: Partitura[] = [
  {
    slug: "huapango",
    obra: "Huapango",
    autor: "José Pablo Moncayo",
    tipo: "arreglo",
    precioMXN: 800,
    url: buy("718a086a-08d4-41e8-a37a-2e0feacfd38d"),
    video: "xpMmE591y80",
  },
  {
    slug: "rhapsody-in-blue",
    obra: "Rhapsody in Blue",
    autor: "George Gershwin",
    tipo: "arreglo",
    precioMXN: 750,
    url: buy("676f1ff6-fb30-4ade-8a50-04b4f3744a93"),
    video: "1KLosexjU80",
  },
  {
    slug: "el-amor-brujo",
    obra: "El amor brujo",
    nota: { es: "Cuatro piezas", en: "Four pieces" },
    autor: "Manuel de Falla",
    tipo: "transcripcion",
    precioMXN: 1200,
    url: buy("58448224-4c06-47ba-8596-be3880e0fe5f"),
    video: "YFxZariLyUw",
  },
  {
    slug: "vocalise",
    obra: "Vocalise, Op. 34 No. 14",
    autor: "Sergei Rachmaninoff",
    tipo: "transcripcion",
    precioMXN: 250,
    url: buy("3a5e8dd1-0493-498f-bb81-1f681a531a78"),
    video: "vFnGKTN3Bdc",
  },
  {
    slug: "air",
    obra: "Air",
    nota: { es: "De la Suite orquestal No. 3", en: "From Orchestral Suite No. 3" },
    autor: "J. S. Bach",
    tipo: "transcripcion",
    precioMXN: 250,
    url: buy("32143f27-6bd6-4990-8dd8-892a1fefb260"),
    video: "dDE5nHYEMPw",
  },
  {
    slug: "tres-parodias",
    obra: "Tres parodias",
    autor: "Mauricio Nader",
    tipo: "original",
    precioMXN: 595,
    url: buy("d3a1a303-a91c-4916-8efe-e388b76b55f6"),
    video: "gKyqc7PDQoQ",
  },
  {
    slug: "toccata-ostinata",
    obra: "Toccata ostinata",
    autor: "Mauricio Nader",
    tipo: "original",
    precioMXN: 350,
    url: buy("24128759-7485-42fd-97db-de68d4041ad7"),
  },
];

/** Listings in the store, counted on the same date as the prices above. */
export const partiturasEnTienda = 28;

/** Cheapest listing in the store on 2026-10-06 (docs/content/servicios.md). */
export const precioMinimoTienda = 150;
