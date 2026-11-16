import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Partituras } from "@/components/Partituras";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-meta";

export async function generateMetadata({ params }: PageProps<"/[lang]/partituras">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "/partituras") : {};
}

export default async function Page({ params }: PageProps<"/[lang]/partituras">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Header lang={lang} path="/partituras" />
      <main>
        <Partituras lang={lang} as="h1" />
      </main>
      <Footer lang={lang} path="/partituras" />
    </>
  );
}
