import { site } from "@/content/site";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { columns, externalProps } from "@/lib/navigation";
import { LangSwitch } from "./LangSwitch";
import styles from "./Footer.module.css";

// Anthropic-style link grid, columns named for the audience segments; the
// name returns at full width to close the page the way the hero opens it.
export function Footer({ lang, path }: { lang: Locale; path: string }) {
  const d = getDictionary(lang);
  return (
    <footer className={`${styles.footer} dark on-dark wrap`}>
      <div className={styles.grid}>
        <p className={styles.tagline}>{d.footer.tagline}</p>
        {columns(lang).map((col) => (
          <div key={col.title} className={styles.col}>
            <h2 className="label">{col.title}</h2>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} {...externalProps(link)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className={styles.wordmark} aria-hidden="true">
        MAURICIO NADER
      </p>

      {/* Same three-zone grid as the header, so the social links centre on the page. */}
      <div className={styles.bar}>
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className={styles.social} role="group" aria-label={d.footer.social}>
          <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href={site.social.x} target="_blank" rel="noopener noreferrer">
            X
          </a>
        </span>
        <LangSwitch lang={lang} path={path} />
      </div>
    </footer>
  );
}
