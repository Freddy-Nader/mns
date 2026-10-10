# Mauricio Nader — sitio

The public site of Mauricio Nader, Mexican concert pianist: a summary landing page and one page per task — concerts, booking, lessons, scores, commissions, biography and contact. Domain language and the open terminology are in [CONTEXT.md](./CONTEXT.md); decisions in [docs/adr](./docs/adr).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000 — Spanish at /, English at /en
               # pages: /fechas /programas /clases /partituras /encargos /bio /contacto
npm run build   # production build (also type-checks)
npm run lint
```

## Where things are

| Path | What |
|---|---|
| `content/` | Everything the page says that is data: dates, programmes, press quotes, scores, videos, contact. Edit here, not in components. |
| `lib/dictionaries/` | Interface copy and enums, Spanish and English. `en.ts` must have every key of `es.ts` — the build fails otherwise. |
| `components/` | One component per section, each with its CSS Module. Sections that are pages take `as="h1"`. |
| `app/[lang]/*/page.tsx` | One route per task page. The list of pages is `lib/routes.ts`; rewrites and the sitemap read it. |
| `docs/design/information-architecture.md` | Who arrives, the site map, navigation, and the click count of every flow. |
| `app/globals.css` | Tokens and shared primitives, from [docs/design/tokens.md](./docs/design/tokens.md). |
| `docs/design/landing-page.md` | The section-by-section spec. |
| `docs/design/audit-2026-10.md` | Apple / Emil Kowalski design audit of the built site, and the doc drift it found. |
| `docs/research/referencias.md` | The UI research behind each section. |
| `docs/content/` | Where every claim on the page comes from. |
| `site/` | The hand-built v1, kept as the record of what was approved. |

## Adding a date

Append to `content/fechas.ts`. Dates, times, venues and prices are language-neutral, so a new date needs no translation. Use one of the four `acceso` states; if the access is unknown, use `por-confirmar` — never an invented price. Past dates can stay: the page filters by today's date and re-renders hourly.

## CI

`.github/workflows/ci.yml` runs lint, types and build on every push to `master` and every PR. Same steps locally:

```sh
npm run lint && npx next typegen && npx tsc --noEmit && npm run build
```

`next typegen` must run before `tsc`: `next-env.d.ts` and the route types are generated, not committed.
