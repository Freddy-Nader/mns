import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import type { Pagina } from "@/lib/routes";

type Clave = keyof ReturnType<typeof getDictionary>["meta"]["paginas"];

/** Title, description and language alternates for a task page. */
export function pageMetadata(lang: Locale, path: Pagina & `/${Clave}`): Metadata {
  const m = getDictionary(lang).meta.paginas[path.slice(1) as Clave];
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: href(lang, path),
      languages: { es: path, en: `/en${path}`, "x-default": path },
    },
    openGraph: { title: m.title, description: m.description },
  };
}
