import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clases } from "@/components/Clases";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-meta";

// Reads the calendar, so it re-renders hourly like /fechas.
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[lang]/clases">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "/clases") : {};
}

export default async function Page({ params }: PageProps<"/[lang]/clases">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Header lang={lang} path="/clases" />
      <main>
        <Clases lang={lang} as="h1" />
      </main>
      <Footer lang={lang} path="/clases" />
    </>
  );
}
