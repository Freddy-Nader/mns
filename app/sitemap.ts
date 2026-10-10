import type { MetadataRoute } from "next";
import { paginas } from "@/lib/routes";
import { siteUrl } from "@/lib/site-url";

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
