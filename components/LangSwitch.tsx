import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import styles from "./LangSwitch.module.css";

/** "ES · EN" — the current language set bold, the other one a link to the same page. */
export function LangSwitch({ lang, path }: { lang: Locale; path: string }) {
  const label = getDictionary(lang).nav.lang;
  const item = (code: Locale) =>
    code === lang ? (
      <b aria-current="true">{code.toUpperCase()}</b>
    ) : (
      <a href={href(code, path)} hrefLang={code} lang={code}>
        {code.toUpperCase()}
      </a>
    );
  return (
    <span className={styles.lang} role="group" aria-label={label}>
      {item("es")} · {item("en")}
    </span>
  );
}
