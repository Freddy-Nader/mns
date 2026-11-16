import Image from "next/image";
import bioA from "@/public/img/bio1.jpg";
import bioB from "@/public/img/bio2.jpg";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { WordReveal } from "./WordReveal";
import styles from "./Bio.module.css";

// Dark band, centred, with the word-by-word reveal (docs/design/landing-page.md).
// The landing page's short version; the long form is /bio.
// Both paragraphs are sourced fact by fact in docs/content/bio.md.
export function Bio({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const b = d.bio;
  return (
    <section id="bio" className="dark on-dark section wrap">
      <p className={`label ${styles.label}`}>{b.label}</p>
      <div className={styles.grid}>
        {/* ⚠️ Both photographs are third-party press images — docs/content/imagenes.md */}
        <div className={styles.shot}>
          <Image src={bioA} alt={b.photoA} sizes="250px" placeholder="blur" />
        </div>
        <div className={styles.text}>
          <WordReveal>
            {b.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>
                <Words text={p} />
              </p>
            ))}
          </WordReveal>
          <p className={styles.cta}>
            <a className="btn btn--ghost" href={href(lang, "/bio")}>
              {b.cta}
            </a>
          </p>
        </div>
        <div className={`${styles.shot} ${styles.shotB}`}>
          <Image src={bioB} alt={b.photoB} sizes="250px" placeholder="blur" />
        </div>
      </div>
    </section>
  );
}

/** One span per word, spaces kept as text, for <WordReveal>. */
function Words({ text }: { text: string }) {
  return text.split(/(\s+)/).map((chunk, i) =>
    /^\s+$/.test(chunk) ? (
      chunk
    ) : (
      <span key={i} data-w="">
        {chunk}
      </span>
    ),
  );
}
