import type { MetadataRoute } from "next";
import { paginas } from "@/lib/routes";
import { siteUrl } from "@/lib/site-url";

// Both languages are listed as separate entries, each pointing at the other
// through hreflang alternates. Spanish lives at the root, English under /en.
const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/fechas", priority: 0.8, changeFrequency: "daily" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...paginas].map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    alternates: {
      languages: {
        es: `${siteUrl}${path === "/" ? "" : path}`,
        en: `${siteUrl}/en${path === "/" ? "" : path}`,
      },
    },
  }));
}
