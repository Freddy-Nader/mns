# Mauricio Nader — sitio

The public site of Mauricio Nader, Mexican concert pianist: concerts, booking, lessons, scores and commissions on one page. Domain language and the open terminology are in [CONTEXT.md](./CONTEXT.md); decisions in [docs/adr](./docs/adr).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000 — Spanish at /, English at /en
npm run build   # production build (also type-checks)
npm run lint
```

## Where things are

| Path | What |
|---|---|
| `content/` | Everything the page says that is data: dates, programmes, press quotes, scores, videos, contact. Edit here, not in components. |
| `lib/dictionaries/` | Interface copy and enums, Spanish and English. `en.ts` must have every key of `es.ts` — the build fails otherwise. |
| `components/` | One component per section, each with its CSS Module. |
| `app/globals.css` | Tokens and shared primitives, from [docs/design/tokens.md](./docs/design/tokens.md). |
| `docs/design/landing-page.md` | The section-by-section spec. |
| `docs/research/referencias.md` | The UI research behind each section. |
| `docs/content/` | Where every claim on the page comes from. |
| `site/` | The hand-built v1, kept as the record of what was approved. |

## Adding a date

Append to `content/fechas.ts`. Dates, times, venues and prices are language-neutral, so a new date needs no translation. Use one of the four `acceso` states; if the access is unknown, use `por-confirmar` — never an invented price. Past dates can stay: the page filters by today's date and re-renders hourly.
