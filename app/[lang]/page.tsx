import { notFound } from "next/navigation";
import { Bio } from "@/components/Bio";
import { Contacto } from "@/components/Contacto";
import { Escucha } from "@/components/Escucha";
import { Fechas } from "@/components/Fechas";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Prensa } from "@/components/Prensa";
import { Servicios } from "@/components/Servicios";
import { upcoming } from "@/lib/fechas";
import { hasLocale } from "@/lib/i18n";
import { eventsLd, ldJson, personLd } from "@/lib/structured-data";

// The listing is filtered by today's date; re-render hourly so past dates
// drop off without a deploy.
export const revalidate = 3600;

/**
 * The summary (ADR-0006): who he is (hero), whether he is any good (press),
 * what you can do with him (Servicios, one door per task page), then a sample
 * of the most frequent job, how he plays, who he is, and how to reach him.
 * Each business has its own page. Order and rationale:
 * docs/design/information-architecture.md.
 */
export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Header lang={lang} path="/" />
      <main>
        <Hero lang={lang} />
        <Prensa lang={lang} />
        <Servicios lang={lang} />
        <Fechas lang={lang} />
        <Escucha lang={lang} />
        <Bio lang={lang} />
        <Contacto lang={lang} />
      </main>
      <Footer lang={lang} path="/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson([personLd(), ...eventsLd(upcoming(), lang)]) }}
      />
    </>
  );
}
