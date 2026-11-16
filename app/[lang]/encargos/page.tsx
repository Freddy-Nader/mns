import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Encargos } from "@/components/Encargos";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-meta";

export async function generateMetadata({ params }: PageProps<"/[lang]/encargos">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "/encargos") : {};
}

export default async function Page({ params }: PageProps<"/[lang]/encargos">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Header lang={lang} path="/encargos" />
      <main>
        <Encargos lang={lang} as="h1" />
      </main>
      <Footer lang={lang} path="/encargos" />
    </>
  );
}
