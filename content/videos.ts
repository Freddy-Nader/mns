import type { Txt } from "@/lib/i18n";

// From his two YouTube channels (@mnadersch has 191 videos), titles checked
// against YouTube's oEmbed on 2026-10-06. Best first: a presenter rarely gets
// past the second clip, so the first one has to carry the case on its own.

export type Video = {
  id: string;
  obra: string;
  autor: string;
  nota: Txt;
  /** Slug in content/partituras.ts when the score is for sale. */
  partitura?: string;
  /** YouTube serves a 1280px poster only for some uploads. */
  posterHD?: boolean;
};

export const videos: Video[] = [
  {
    id: "xpMmE591y80",
    obra: "Huapango",
    autor: "José Pablo Moncayo",
    nota: { es: "Su arreglo para piano solo", en: "His arrangement for solo piano" },
    partitura: "huapango",
  },
  {
    id: "EeR99mf3vI4",
    obra: "Concierto para piano",
    autor: "María Granillo",
    nota: { es: "Con orquesta", en: "With orchestra" },
    posterHD: true,
  },
  {
    id: "YFxZariLyUw",
    obra: "El amor brujo",
    autor: "Manuel de Falla",
    nota: { es: "Su transcripción para piano", en: "His transcription for piano" },
    partitura: "el-amor-brujo",
  },
  {
    id: "1KLosexjU80",
    obra: "Rhapsody in Blue",
    autor: "George Gershwin",
    nota: { es: "Su arreglo para piano solo", en: "His arrangement for solo piano" },
    partitura: "rhapsody-in-blue",
  },
  {
    id: "vFnGKTN3Bdc",
    obra: "Vocalise",
    autor: "Sergei Rachmaninoff",
    nota: { es: "En vivo · su transcripción", en: "Live · his transcription" },
    partitura: "vocalise",
    posterHD: true,
  },
];

export const canalVideos = 191;
