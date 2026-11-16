import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { columns, externalProps } from "@/lib/navigation";
import { paginas } from "@/lib/routes";
import { LangSwitch } from "./LangSwitch";
import { Menu } from "./Menu";
import styles from "./Header.module.css";

export function Header({ lang, path }: { lang: Locale; path: string }) {
  const d = getDictionary(lang);
  const [asistir, aprender, contratar, about] = columns(lang);
  return (
    <header className={styles.header}>
      <Link className={styles.mark} href={href(lang)}>
        MAURICIO NADER
      </Link>
      {/* Every task page, so no flow needs the menu on desktop
          (docs/design/information-architecture.md). Labels stay one word. */}
      <nav className={styles.nav} aria-label={d.nav.label}>
        {paginas.map((p) => (
          <Link key={p} href={href(lang, p)} aria-current={p === path ? "page" : undefined}>
            {d.nav[p.slice(1) as keyof typeof d.nav]}
          </Link>
        ))}
      </nav>
      <div className={styles.end}>
        <Menu openLabel={d.nav.open} closeLabel={d.nav.close}>
          <div className={styles.menuGrid}>
            {[asistir, aprender, contratar].map((col) => (
              <div key={col.title} className={styles.menuCol}>
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
          <div className={styles.menuFoot}>
            <span className={styles.menuAbout}>
              {about.links.map((link) => (
                <a key={link.label} href={link.href} {...externalProps(link)}>
                  {link.label}
                </a>
              ))}
            </span>
            <LangSwitch lang={lang} path={path} />
          </div>
        </Menu>
      </div>
    </header>
  );
}
