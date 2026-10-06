// Contact details and channels, all as he publishes them himself on
// mauricionader.net (/contact-booking, /curso-de-musica, /partituras-scores)
// and on his YouTube channel. Checked 2026-10-06.

export const site = {
  name: "Mauricio Nader",

  /** General enquiries and booking — his contact page. */
  email: "Nader.Musica@gmail.com",
  /** The music course has its own inbox. */
  emailCurso: "curso.musika@gmail.com",

  /** Listed as "CEL: 55 3222 1144 (Mexico City)". */
  telefono: "+52 55 3222 1144",
  /**
   * ⚠️ Same number as the mobile above. It is not confirmed that it is on
   * WhatsApp — ask before launch. Every WhatsApp button reads it from here.
   */
  whatsapp: "525532221144",

  /** His booking forms (Zoho Survey), one per language. */
  formularioContratacion: {
    es: "https://survey.zohopublic.com/zs/sYB5Zm",
    en: "https://survey.zohopublic.com/zs/gXB5sL",
  },
  /** Rules and enrolment for the next Curso de Música. */
  basesCurso: "https://bit.ly/CURSO-MauricioNader",
  /** Score store (Lemon Squeezy). */
  tienda: "https://nadermusic.lemonsqueezy.com",

  social: {
    youtube: "https://www.youtube.com/@mnadersch",
    facebook: "https://www.facebook.com/MauricioNader.piano",
    x: "https://x.com/nadermauricio",
  },
};

/** wa.me link with a pre-written first message. */
export function whatsappLink(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoLink(to: string, subject: string, body = ""): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}
