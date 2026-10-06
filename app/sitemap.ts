import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/fechas"].map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    alternates: {
      languages: {
        es: `${siteUrl}${path === "/" ? "" : path}`,
        en: `${siteUrl}/en${path === "/" ? "" : path}`,
      },
    },
  }));
}
