import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contacto } from "@/components/Contacto";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-meta";

export async function generateMetadata({ params }: PageProps<"/[lang]/contacto">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "/contacto") : {};
}

export default async function Page({ params }: PageProps<"/[lang]/contacto">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Header lang={lang} path="/contacto" />
      <main>
        <Contacto lang={lang} as="h1" />
      </main>
      <Footer lang={lang} path="/contacto" />
    </>
  );
}
