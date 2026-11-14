import { notFound } from "next/navigation";
import { Bio } from "@/components/Bio";
import { Clases } from "@/components/Clases";
import { Contacto } from "@/components/Contacto";
import { Encargos } from "@/components/Encargos";
import { Escucha } from "@/components/Escucha";
import { Fechas } from "@/components/Fechas";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Partituras } from "@/components/Partituras";
import { Prensa } from "@/components/Prensa";
import { Programas } from "@/components/Programas";
import { Puertas } from "@/components/Puertas";
import { upcoming } from "@/lib/fechas";
import { hasLocale } from "@/lib/i18n";
import { eventsLd, ldJson, personLd, websiteLd } from "@/lib/structured-data";

// The listing is filtered by today's date; re-render hourly so past dates
// drop off without a deploy.
export const revalidate = 3600;

/**
 * One page, three jobs. Proof first (hero, press), then the three doors, then
 * each business in the order a visitor's intent usually arrives: attend,
 * book, learn, buy, commission — and every route ends in a named contact.
 * Order and rationale: docs/design/landing-page.md.
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
        <Puertas lang={lang} />
        <Fechas lang={lang} />
        <Escucha lang={lang} />
        <Programas lang={lang} />
        <Bio lang={lang} />
        <Clases lang={lang} />
        <Partituras lang={lang} />
        <Encargos lang={lang} />
        <Contacto lang={lang} />
      </main>
      <Footer lang={lang} path="/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson([personLd(), websiteLd(lang), ...eventsLd(upcoming(), lang)]) }}
      />
    </>
  );
}
