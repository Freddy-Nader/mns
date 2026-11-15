import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Both languages are listed as separate entries, each pointing at the other
// through hreflang alternates. Spanish lives at the root, English under /en.
const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/fechas", priority: 0.8, changeFrequency: "daily" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.flatMap(({ path, priority, changeFrequency }) => {
    const es = `${siteUrl}${path}`;
    const en = `${siteUrl}/en${path}`;
    const alternates = { languages: { es, en, "x-default": es } };
    return [es, en].map((url) => ({ url, lastModified, changeFrequency, priority, alternates }));
  });
}
