import type { Fecha } from "@/content/fechas";
import { site } from "@/content/site";
import { tx } from "@/lib/dictionaries";
import { startDate } from "@/lib/fechas";
import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";

// schema.org markup so search engines can show him as a performer and list
// his dates as events. Validate with https://search.google.com/test/rich-results.

export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Pianista",
    nationality: "MX",
    url: siteUrl,
    image: `${siteUrl}/img/hero.jpg`,
    sameAs: Object.values(site.social),
  };
}

export function websiteLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    inLanguage: lang === "es" ? "es-MX" : "en",
    publisher: { "@type": "Person", name: site.name },
  };
}

export function eventsLd(fechas: Fecha[], lang: Locale) {
  return fechas
    .filter((f) => f.tipo !== "curso" && f.recinto.nombre)
    .map((f) => ({
      "@context": "https://schema.org",
      "@type": f.tipo === "masterclass" ? "EducationEvent" : "MusicEvent",
      name: tx(f.titulo, lang),
      ...(f.detalle ? { description: tx(f.detalle, lang) } : {}),
      startDate: startDate(f),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: f.recinto.nombre,
        address: {
          "@type": "PostalAddress",
          addressLocality: f.recinto.ciudad,
          addressCountry: f.recinto.pais ?? "MX",
        },
      },
      performer: { "@type": "Person", name: site.name },
      image: `${siteUrl}/img/hero.jpg`,
      ...(f.acceso.tipo === "entrada-libre"
        ? {
            isAccessibleForFree: true,
            offers: {
              "@type": "Offer",
              price: 0,
              priceCurrency: "MXN",
              availability: "https://schema.org/InStock",
            },
          }
        : {}),
    }));
}

/** Serialises for a <script type="application/ld+json">, escaping "<". */
export function ldJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
