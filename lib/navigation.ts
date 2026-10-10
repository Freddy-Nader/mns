import { site, mailtoLink } from "@/content/site";
import { getDictionary } from "@/lib/dictionaries";
import { anchor, href, type Locale } from "@/lib/i18n";

export type NavLink = { label: string; href: string; external?: boolean };
export type NavColumn = { title: string; links: NavLink[] };

/**
 * The full menu and the footer share these columns. They are named for the
 * three jobs visitors come to do (CONTEXT.md), never used as the top-level
 * navigation, which stays task-based. Between them they reach every page
 * (docs/design/information-architecture.md).
 */
export function columns(lang: Locale): NavColumn[] {
  const d = getDictionary(lang);
  const l = d.links;
  const s = d.segmentos;
  return [
    {
      title: s.asistir,
      links: [
        { label: l.proximasFechas, href: href(lang, "/fechas") },
        { label: l.escucha, href: anchor(lang, "escucha") },
        { label: l.programas, href: href(lang, "/programas") },
      ],
    },
    {
      title: s.aprender,
      links: [
        { label: l.clasesParticulares, href: href(lang, "/clases") },
        { label: l.masterclasses, href: `${href(lang, "/clases")}#masterclasses` },
        { label: l.curso, href: site.basesCurso, external: true },
        { label: l.partituras, href: href(lang, "/partituras") },
      ],
    },
    {
      title: s.contratar,
      links: [
        { label: l.contratacion, href: site.formularioContratacion[lang], external: true },
        { label: l.programasDisponibles, href: href(lang, "/programas") },
        { label: l.encargos, href: href(lang, "/encargos") },
        { label: l.kit, href: mailtoLink(site.email, d.contacto.subjects.kit) },
      ],
    },
    {
      title: site.name,
      links: [
        { label: l.bio, href: href(lang, "/bio") },
        { label: l.prensa, href: `${href(lang, "/bio")}#prensa` },
        { label: l.youtube, href: site.social.youtube, external: true },
        { label: l.contacto, href: href(lang, "/contacto") },
      ],
    },
  ];
}

/** Opens in a new tab when it leaves the site. */
export function externalProps(link: { external?: boolean }) {
  return link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
