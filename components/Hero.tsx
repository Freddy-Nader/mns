import Image from "next/image";
import heroImg from "@/public/img/hero.jpg";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import styles from "./Hero.module.css";

// Eyebrow → name → line → CTAs → photograph (docs/design/landing-page.md §2).
// The CTAs sit directly under the name, and the photograph is large and
// hard-edged: both are the client's corrections to the Senra reference.
export function Hero({ lang }: { lang: Locale }) {
  const d = getDictionary(lang).hero;
  return (
    <section className={`${styles.hero} wrap`}>
      <p className="label">{d.eyebrow}</p>
      <h1 className={styles.name}>
        <span>MAURICIO</span> <span>NADER</span>
      </h1>
      <p className={styles.line}>{d.line}</p>
      <div className={styles.cta}>
        <a className="btn" href="#fechas">
          {d.fechas}
        </a>
        <a className="btn btn--ghost" href={href(lang, "/programas")}>
          {d.contratar}
        </a>
      </div>
      <div className={styles.shot}>
        {/* ⚠️ Third-party press photo, not cleared for launch — docs/content/imagenes.md */}
        <Image src={heroImg} alt={d.photoAlt} sizes="100vw" placeholder="blur" preload />
      </div>
    </section>
  );
}
