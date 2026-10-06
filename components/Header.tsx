import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { anchor, href, type Locale } from "@/lib/i18n";
import { columns, externalProps } from "@/lib/navigation";
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
      {/* Navigation by task, not by audience. Labels stay short by rule. */}
      <nav className={styles.nav} aria-label={d.nav.label}>
        <a href={anchor(lang, "fechas")}>{d.nav.fechas}</a>
        <a href={anchor(lang, "programas")}>{d.nav.programas}</a>
        <a href={anchor(lang, "clases")}>{d.nav.clases}</a>
        <a href={anchor(lang, "partituras")}>{d.nav.partituras}</a>
        <a href={anchor(lang, "contacto")}>{d.nav.contacto}</a>
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
