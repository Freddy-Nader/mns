// The task pages, one level below home (docs/design/information-architecture.md).
// next.config.ts, the sitemap and the header all read this list, so a new
// page is added here once. No imports: next.config.ts loads this file too.

export const paginas = [
  "/fechas",
  "/programas",
  "/clases",
  "/partituras",
  "/encargos",
  "/bio",
  "/contacto",
] as const;

export type Pagina = (typeof paginas)[number];
