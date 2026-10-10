import { mailtoLink, site, whatsappLink } from "@/content/site";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import styles from "./Contacto.module.css";

/**
 * One route per intent instead of one form for five intentions (the audit's
 * finding): booking by his form or email, lessons by WhatsApp, commissions
 * by the brief, press by email. A named person and a direct line close it,
 * because that is what reassures an older audience most.
 */
export function Contacto({ lang, as: H = "h2" }: { lang: Locale; as?: "h1" | "h2" }) {
  const d = getDictionary(lang);
  const c = d.contacto;
  const external = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <section id="contacto" className="alt section wrap">
      <div className={styles.head}>
        <H className="display">{c.title}</H>
        <figure className={styles.quote}>
          <blockquote>“{c.quote}”</blockquote>
          <figcaption>— {site.name}</figcaption>
        </figure>
      </div>

      <div className={styles.routes}>
        <div className={`${styles.route} ${styles.solid} on-dark`}>
          <h3 className="label">{c.contratacion.label}</h3>
          <p className={styles.text}>{c.contratacion.text}</p>
          <a className={styles.mail} href={mailtoLink(site.email, c.subjects.contratacion)}>
            {site.email}
          </a>
          <div className={styles.go}>
            <a className="btn" href={site.formularioContratacion[lang]} {...external}>
              {c.contratacion.cta}
            </a>
          </div>
        </div>

        <div className={styles.route}>
          <h3 className="label">{c.clases.label}</h3>
          <p className={styles.text}>{c.clases.text}</p>
          <a className={styles.mail} href={`mailto:${site.emailCurso}`}>
            {site.emailCurso}
          </a>
          <div className={styles.go}>
            <a className="btn" href={whatsappLink(d.clases.particulares.message)} {...external}>
              {c.clases.cta}
            </a>
          </div>
        </div>

        <div className={styles.route}>
          <h3 className="label">{c.encargos.label}</h3>
          <p className={styles.text}>{c.encargos.text}</p>
          <div className={styles.go}>
            <a className="btn btn--ghost" href={href(lang, "/encargos")}>
              {c.encargos.cta}
            </a>
          </div>
        </div>

        <div className={styles.route}>
          <h3 className="label">{c.prensa.label}</h3>
          <p className={styles.text}>{c.prensa.text}</p>
          <div className={styles.go}>
            <a className="btn btn--ghost" href={mailtoLink(site.email, c.prensa.subject)}>
              {c.prensa.cta}
            </a>
          </div>
        </div>
      </div>

      <p className={styles.direct}>
        <span className="label">{c.direct}</span>
        <a href={`tel:${site.telefono.replace(/\s/g, "")}`}>{site.telefono}</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span>{c.city}</span>
      </p>
    </section>
  );
}
