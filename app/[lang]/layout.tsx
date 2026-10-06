import type { Metadata } from "next";
import { Anton, Archivo, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, href, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

// Three faces, one job each (docs/adr/0004). Self-hosted by next/font.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: href(lang),
      languages: { es: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "Mauricio Nader",
      locale: lang === "es" ? "es_MX" : "en_US",
      title: d.meta.title,
      description: d.meta.description,
      images: [{ url: "/img/hero.jpg", width: 1600, height: 1066, alt: d.hero.photoAlt }],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${anton.variable} ${archivo.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
