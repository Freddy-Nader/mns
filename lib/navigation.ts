import { site, mailtoLink } from "@/content/site";
import { getDictionary } from "@/lib/dictionaries";
import { anchor, href, type Locale } from "@/lib/i18n";

export type NavLink = { label: string; href: string; external?: boolean };
export type NavColumn = { title: string; links: NavLink[] };

/**
 * The full menu and the footer share these columns. They are named for the
 * three jobs visitors come to do (CONTEXT.md), never used as the top-level
 * navigation, which stays task-based.
 */
export function columns(lang: Locale): NavColumn[] {
  const d = getDictionary(lang);
  const l = d.links;
  const s = d.segmentos;
  return [
    {
      title: s.asistir,
      links: [
        { label: l.proximasFechas, href: anchor(lang, "fechas") },
        { label: l.todasLasFechas, href: href(lang, "/fechas") },
        { label: l.programas, href: anchor(lang, "programas") },
        { label: l.escucha, href: anchor(lang, "escucha") },
      ],
    },
    {
      title: s.aprender,
      links: [
        { label: l.clasesParticulares, href: anchor(lang, "clases") },
        { label: l.masterclasses, href: anchor(lang, "masterclasses") },
        { label: l.curso, href: site.basesCurso, external: true },
        { label: l.partituras, href: anchor(lang, "partituras") },
      ],
    },
    {
      title: s.contratar,
      links: [
        { label: l.contratacion, href: anchor(lang, "contacto") },
        { label: l.programasDisponibles, href: anchor(lang, "programas") },
        { label: l.encargos, href: anchor(lang, "encargos") },
        { label: l.kit, href: mailtoLink(site.email, d.contacto.subjects.kit) },
      ],
    },
    {
      title: site.name,
      links: [
        { label: l.bio, href: anchor(lang, "bio") },
        { label: l.prensa, href: anchor(lang, "prensa") },
        { label: l.youtube, href: site.social.youtube, external: true },
        { label: l.contacto, href: anchor(lang, "contacto") },
      ],
    },
  ];
}

/** Opens in a new tab when it leaves the site. */
export function externalProps(link: { external?: boolean }) {
  return link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
