import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Listing } from "@/components/Listing";
import { getDictionary } from "@/lib/dictionaries";
import { groupByMonth, upcoming } from "@/lib/fechas";
import { hasLocale, href } from "@/lib/i18n";
import { eventsLd, ldJson } from "@/lib/structured-data";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[lang]/fechas">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return {
    title: d.meta.fechasTitle,
    description: d.meta.fechasDescription,
    alternates: {
      canonical: href(lang, "/fechas"),
      languages: { es: "/fechas", en: "/en/fechas", "x-default": "/fechas" },
    },
  };
}

export default async function FechasPage({ params }: PageProps<"/[lang]/fechas">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang).fechas;
  const fechas = upcoming();

  return (
    <>
      <Header lang={lang} path="/fechas" />
      <main className="section wrap">
        <div className="section-head">
          <h1 className="display">{d.pageTitle}</h1>
          <p>{d.pageIntro}</p>
        </div>
        <Listing months={groupByMonth(fechas)} lang={lang} level={2} />
      </main>
      <Footer lang={lang} path="/fechas" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(eventsLd(fechas, lang)) }}
      />
    </>
  );
}
