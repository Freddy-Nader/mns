import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Biografia } from "@/components/Biografia";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-meta";
import { ldJson, personLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/bio">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "/bio") : {};
}

export default async function Page({ params }: PageProps<"/[lang]/bio">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Header lang={lang} path="/bio" />
      <main>
        <Biografia lang={lang} />
      </main>
      <Footer lang={lang} path="/bio" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson([personLd()]) }} />
    </>
  );
}
