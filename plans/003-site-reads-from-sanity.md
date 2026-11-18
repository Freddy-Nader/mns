# Plan 003: The site reads its changing content from Sanity through `lib/cms/`, and a publish shows up within a minute

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report. Do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 4576c4b..HEAD -- content/ components/ lib/ app/ next.config.ts package.json .github/workflows/ci.yml tsconfig.json`
> Only the plan 001 change to `tsconfig.json` (`"studio"` in `exclude`) is
> expected. Anything else changed means the excerpts below may be stale.
> Compare them and STOP on a mismatch.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED (touches every component that shows data. Mitigated by a before/after text diff of every route)
- **Depends on**: plans/001-sanity-studio-and-adr.md, plans/002-migrate-content-to-sanity.md
- **Category**: migration
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issues**: https://github.com/Freddy-Nader/mns/issues/4, https://github.com/Freddy-Nader/mns/issues/6

## Why this matters

After plans 001 and 002, the content is in Sanity but the site still reads `content/*.ts`. This plan switches the reads, so that when Mauricio publishes a date, a score, a video, a quote or a programme in the Studio, the live site changes within a minute without a deploy. It also makes the score to video link a single reference (issue #6). The old duplicate field `Video.partitura` becomes derived.

The site keeps its own types in `content/*.ts` as the contract. All Sanity knowledge lives in `lib/cms/`, so the CMS can be swapped later by rewriting one folder (ADR-0007).

## Current state

### Next.js version and docs

Next `16.3.8`, App Router, **no** `cacheComponents` in `next.config.ts`. Before writing any caching code, read the bundled docs, which are the source of truth for this version:
- `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md` (fetch `next.tags` and `next.revalidate`)
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/revalidateTag.md`

Key fact from those docs: `revalidateTag(tag)` with one argument is **deprecated**. Use `revalidateTag(tag, profile)`. This plan uses `{ expire: 0 }` so the next visit after a publish waits for fresh data, which is what lets Mauricio see his change on the first reload.

### Where content is read today (every call site)

```
app/[lang]/page.tsx:45            eventsLd(upcoming(), lang)
app/[lang]/fechas/page.tsx:39     const fechas = upcoming();
components/Fechas.tsx:13          const all = upcoming();
components/Servicios.tsx:2,17,20  partiturasEnTienda, precioMinimoTienda, upcoming(), programas
components/Clases.tsx:17          upcoming().filter(...)
components/Biografia.tsx:5,72     citasBio
components/Partituras.tsx:1,22,61 partituras, partiturasEnTienda
components/Prensa.tsx:13          citas
components/Escucha.tsx:3,15-16,36 videos, partituras, canalVideos
components/Programas.tsx:1,17-20,38,67  programaDestacado, programas, upcoming(), datesInYear(), x.tono
lib/fechas.ts:1,14,69-70          import { fechas as todas }; upcoming(from, list = todas); datesInYear uses todas
```

`lib/fechas.ts` today:

```ts
import { fechas as todas, type Fecha } from "@/content/fechas";
export function upcoming(from = today(), list: Fecha[] = todas): Fecha[] {
  return list.filter((f) => f.dia >= from).sort(byDate);
}
export function datesInYear(programa: string, year: string): number {
  return todas.filter((f) => f.programa === programa && f.dia.startsWith(year)).length;
}
```

`components/Escucha.tsx:15` today:

```ts
const items: ShowcaseVideo[] = videos.map((v) => {
  const score = partituras.find((p) => p.slug === v.partitura);
  ...
```

All of these components are **server components** (only `BriefForm`, `Menu`, `WordReveal` and `VideoShowcase` have `"use client"`, and `VideoShowcase` receives its data as props). Server components may be `async`.

Pages that set `export const revalidate = 3600`: `app/[lang]/page.tsx`, `fechas`, `programas`, `clases`. Keep these. The hourly re-render is what drops past dates off "próximas" (ADR-0005).

### Programme poster colour (design, stays in code)

Today `tono` is set by hand per programme, in list order: `ink, paper, ink, grey, paper, paper, grey, ink, grey`. The comment says it is set so no two ink posters touch in the four-column wall. The Studio has no `tono` field (plan 001). This plan assigns it in code from the list position using exactly that sequence, cycling for programmes beyond the ninth.

### Sanity document shapes

See `studio/schemaTypes/*.ts` (plan 001). Read them before writing the query. Project ID and dataset are in `studio/env.ts`.

### Conventions

- Path alias `@/` for imports in the site (see any component).
- JSDoc comments on exported helpers explain *why*, in English, short (see `lib/fechas.ts`).
- Free text is `Txt = { es, en }`. A field that may be language-neutral is `string | Txt` (see `Fecha.titulo`).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Lint | `npm run lint` | exit 0 |
| Typecheck | `npx next typegen && npx tsc --noEmit` | exit 0 |
| Tests | `npm test` (created in step 4) | all pass |
| Build | `npm run build` | exit 0 |
| Serve | `npm start` after build | http://localhost:3000 |

## Scope

**In scope**:
- `lib/cms/config.ts`, `lib/cms/map.ts`, `lib/cms/index.ts` (create)
- `app/api/revalidate/route.ts` (create)
- `tests/cms-map.test.ts` (create)
- `lib/fechas.ts`
- `components/Fechas.tsx`, `Servicios.tsx`, `Clases.tsx`, `Biografia.tsx`, `Partituras.tsx`, `Prensa.tsx`, `Escucha.tsx`, `Programas.tsx`
- `app/[lang]/page.tsx`, `app/[lang]/fechas/page.tsx`
- `content/fechas.ts`, `programas.ts`, `partituras.ts`, `videos.ts`, `prensa.ts` (remove data, keep types)
- `package.json` (add `test` script only), `tsconfig.json` (add `"tests"` to `exclude`), `.github/workflows/ci.yml` (add test step)
- `README.md` ("Where things are" table row for `content/` and the "Adding a date" section)
- `plans/README.md` (status row)

**Out of scope**:
- `content/bio.ts`, `content/site.ts`, `lib/dictionaries/*`. These are fixed copy and stay in code.
- Any CSS, markup or copy change. The pages must render the same text before and after.
- `studio/`. If the schema needs a change, STOP.
- Adding `@sanity/client`, `next-sanity`, `zod` or any other dependency. Plain `fetch` is enough.

## Git workflow

- Branch `claude/cms-003-read-from-sanity`. Commit per step. Messages like `feat(cms): read fechas from Sanity`. No `Co-Authored-By` trailer. Do not push unless told.

## Steps

### Step 1: Capture a baseline of every route

Before changing code: `npm run build && npm start` (background), then save the visible text of each route to `/tmp/cms-before/`:

```bash
mkdir -p /tmp/cms-before
for p in / /fechas /programas /clases /partituras /encargos /bio /contacto /en /en/fechas /en/programas /en/clases /en/partituras /en/encargos /en/bio /en/contacto; do
  f=$(echo "$p" | tr '/' '_'); curl -s "http://localhost:3000$p" | perl -0pe 's/<script.*?<\/script>//gs; s/<style.*?<\/style>//gs; s/<[^>]+>/\n/g' | grep -v '^[[:space:]]*$' > "/tmp/cms-before/$f.txt"
done
```

Stop the server. Keep the folder for step 8.

**Verify**: `ls /tmp/cms-before | wc -l` → `16`, and every file is non-empty (`find /tmp/cms-before -empty` prints nothing).

### Step 2: `lib/cms/config.ts` and `lib/cms/map.ts`

`config.ts` exports `projectId`, `dataset` (same values as `studio/env.ts`, they are public) and `apiVersion = "2025-02-19"`.

`map.ts` holds **pure functions only**. Its imports must all be `import type`, so the Node test runner can load it without the `@/` alias. It exports:

- `type CmsData` (the raw query result shape) and `type Content`:
  ```ts
  export type Content = {
    fechas: Fecha[]; programas: Programa[]; partituras: Partitura[];
    videos: Video[]; citas: Cita[]; citasBio: Cita[];
    programaDestacado: string; videosEnCanal: number;
    partiturasEnTienda: number; precioMinimoTienda: number;
  };
  ```
- `txtOrString(es: string, en?: string): string | Txt` returns `es` when `en` is empty, else `{ es, en }`.
- `txt(es: string, en?: string): Txt` returns `{ es, en: en || es }` (English falls back to Spanish).
- `youtubeId(s: string): string | undefined` uses the regex `/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/`, or returns `s` when it already matches `/^[\w-]{11}$/`.
- `TONOS = ["ink","paper","ink","grey","paper","paper","grey","ink","grey"] as const`, and programmes get `tono: TONOS[i % TONOS.length]`.
- `showcase(videos, recientes)`: fijados in list order, then `estado === "auto"` sorted by `publicado` descending, taking `recientes` of them. `oculto` never appears. Return `Video[]`.
- `toContent(raw: CmsData): Content` does all the mapping. Rules:
  - Fecha: `id = _id`. `acceso` is rebuilt per `tipo` so the result matches the `Acceso` union exactly (drop `url` and `precioMXN` where that variant has none). `recinto.pais` is dropped when `"MX"` (today it is omitted for Mexico). A fecha with no `dia` or an unknown `tipo` **throws**, naming the `_id`.
  - Partitura: `video = youtubeId(video?.youtube)`.
  - Video: `id = youtubeId(youtube)`. `obra` falls back to `tituloYoutube`, `autor` to `""`, `nota` to `{ es: "", en: "" }`. `partitura` is **derived**: the slug of the first partitura whose `video` equals this id.
  - Citas: `citasBio` is all citas in order. `citas` is the first three with `portada`, using `textoCorto` when set.
  - Throw if `ajustes` is missing. A thrown error during an ISR re-render makes Next keep serving the last good page, which is the behaviour we want. Check this claim against `node_modules/next/dist/docs/01-app/02-guides/incremental-static-regeneration.md` and quote the line in a code comment.

**Verify**: `npx tsc --noEmit` → exit 0.

### Step 3: `lib/cms/index.ts`

```ts
import "server-only"; // only if the package is already resolvable; otherwise omit this line
import { cache } from "react";
import { apiVersion, dataset, projectId } from "./config";
import { toContent, type Content } from "./map";

const QUERY = `{ ... }`; // one GROQ query returning fechas, programas, partituras, videos, citas, ajustes

export const getContent = cache(async (): Promise<Content> => {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(QUERY)}&perspective=published`;
  const res = await fetch(url, { next: { tags: ["cms"], revalidate: 3600 } });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  return toContent((await res.json()).result);
});
```

The GROQ query must dereference what the mapping needs: `"programa": programa->slug.current` on fechas, `"slug": slug.current` on programas and partituras, `video->{youtube}` on partituras, order programas, partituras, videos and citas by `orderRank`, and `"ajustes": *[_id == "ajustes"][0]{..., "programaDestacado": programaDestacado->slug.current}`.

**Verify**: a quick script prints real counts:
`node -e "fetch('https://<projectId>.api.sanity.io/v2025-02-19/data/query/production?query='+encodeURIComponent('count(*[_type==\"fecha\"])')).then(r=>r.json()).then(j=>console.log(j.result))"` → `14`.

### Step 4: Tests for the mapping

Create `tests/cms-map.test.ts` using `node:test` and `node:assert/strict`, importing `../lib/cms/map.ts`. Add `"tests"` to root `tsconfig.json` `exclude`. Add to `package.json` scripts: `"test": "node --experimental-strip-types --test tests/*.test.ts"`. Add `- run: npm test` to `.github/workflows/ci.yml` right after `npm run lint`.

Cases (minimum 10):
1. `txtOrString("Masterclass")` → `"Masterclass"`. With `en` → `{ es, en }`.
2. `txt("Hola")` → `{ es: "Hola", en: "Hola" }`.
3. `youtubeId` for `https://www.youtube.com/watch?v=xpMmE591y80`, `https://youtu.be/xpMmE591y80`, `https://www.youtube.com/shorts/xpMmE591y80`, bare `xpMmE591y80` → all `xpMmE591y80`. `"hola"` → `undefined`.
4. `acceso` `{ tipo: "entrada-libre", url: "x", precioMXN: 5 }` maps to exactly `{ tipo: "entrada-libre" }`.
5. `acceso` `boletos` keeps `url` and `precioMXN`.
6. A fecha without `dia` throws, and the message contains its `_id`.
7. `showcase`: given 2 fijados, 3 autos with different `publicado`, 1 oculto, and `recientes = 2` → the 2 fijados in order, then the 2 newest autos. With `recientes = 0` → only fijados.
8. Video `partitura` is derived from the partitura that references it. A video with no partitura → `undefined`.
9. `citas` takes the first three `portada` and uses `textoCorto`. `citasBio` keeps full `texto`.
10. Programme `tono` for 10 programmes → the 9-item sequence, then `ink` for the 10th.

**Verify**: `npm test` → all pass, ≥ 10 tests.

### Step 5: Switch the readers

- `lib/fechas.ts`: remove the `content/fechas` data import (keep `import type { Fecha }`). Change signatures to `upcoming(list: Fecha[], from = today())` and `datesInYear(list: Fecha[], programa: string, year: string)`. Update every caller from the list in "Current state".
- Each component in scope becomes `async` and starts with `const c = await getContent();` (from `@/lib/cms`), then uses `c.fechas`, `c.partituras`, `c.videos`, `c.programas`, `c.citas`, `c.citasBio`, `c.programaDestacado`, `c.videosEnCanal`, `c.partiturasEnTienda`, `c.precioMinimoTienda` where it used the module constants.
- `components/Escucha.tsx`: keep the `partituras.find((p) => p.slug === v.partitura)` logic. `v.partitura` is now derived in `map.ts`, so the component code barely changes.
- `app/[lang]/page.tsx` and `app/[lang]/fechas/page.tsx`: `const { fechas } = await getContent();` then `upcoming(fechas)`.

**Verify**: `npx next typegen && npx tsc --noEmit && npm run lint` → exit 0.

### Step 6: Remove the data from `content/*.ts`, keep the types

In `content/fechas.ts`, `programas.ts`, `partituras.ts`, `videos.ts`, `prensa.ts`: delete the exported arrays and constants (`fechas`, `programas`, `programaDestacado`, `partituras`, `partiturasEnTienda`, `precioMinimoTienda`, `buy`, `videos`, `canalVideos`, `citas`, `citasBio`). Keep every exported **type**. Change `ProgramaSlug` to `export type ProgramaSlug = string;` because programmes are now data. Add one line at the top of each file: `// Types only. The data lives in Sanity (docs/adr/0007-sanity-cms.md) and is mapped in lib/cms/map.ts.`

The migration script from plan 002 imports these arrays and will stop working. That is expected. Add one line at the top of `studio/scripts/migrate.ts` saying it ran once on <today's date> and no longer runs because the data left `content/` in plan 003. That is the only allowed edit under `studio/`.

**Verify**: `grep -nE "export const" content/fechas.ts content/programas.ts content/partituras.ts content/videos.ts content/prensa.ts` → no output. `npx tsc --noEmit && npm run build` → exit 0.

### Step 7: Revalidation webhook

`app/api/revalidate/route.ts`:

```ts
import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const got = req.headers.get("x-revalidate-secret") ?? "";
  const ok = !!secret && got.length === secret.length && timingSafeEqual(Buffer.from(got), Buffer.from(secret));
  if (!ok) return Response.json({ ok: false }, { status: 401 });
  revalidateTag("cms", { expire: 0 });
  return Response.json({ ok: true });
}
```

Check the exact `revalidateTag` signature in the bundled doc listed in "Current state" before writing it.

**Verify**: with `SANITY_REVALIDATE_SECRET=test npm start` running after a build:
`curl -s -o /dev/null -w "%{http_code}" -X POST localhost:3000/api/revalidate` → `401`.
`curl -s -X POST -H "x-revalidate-secret: test" localhost:3000/api/revalidate` → `{"ok":true}`.

### Step 8: Prove nothing visible changed

Rebuild, start, and capture the same 16 routes into `/tmp/cms-after/` with the step 1 loop. Then:

**Verify**: `diff -r /tmp/cms-before /tmp/cms-after` → no output.

If the only differences are dates that moved from "próximas" to past because the day changed between captures, rerun step 1 on the base commit and step 8 on the same day. Any other difference is a STOP. Report the diff.

### Step 9: README

In `README.md`, change the `content/` row of "Where things are" to say `content/` holds the **types**, the data is edited in Sanity Studio, and `lib/cms/` maps it. Replace "Adding a date" with a short "Editing content" section. It should say dates, scores, videos, programmes and press are edited in the Studio (link left as `<studio URL>` for the operator to fill), name where `SANITY_REVALIDATE_SECRET` lives (Vercel project env and the Sanity webhook header, never its value), and say what stays in code. Add `npm test` to the CI line.

**Verify**: `grep -n "content/fechas.ts" README.md` → no output.

## Test plan

- `tests/cms-map.test.ts` with ≥ 10 cases (step 4), run in CI.
- The before/after text diff of 16 routes (steps 1 and 8) is the regression test for "las páginas se ven igual".
- The two `curl` checks for the webhook (step 7).

## Done criteria

- [ ] `npm run lint && npm test && npx next typegen && npx tsc --noEmit && npm run build` exits 0
- [ ] `diff -r /tmp/cms-before /tmp/cms-after` prints nothing
- [ ] `grep -rn "from \"@/content/\(fechas\|programas\|partituras\|videos\|prensa\)\"" components app lib | grep -v "import type"` prints nothing
- [ ] `grep -rn "partitura" content/videos.ts` still shows the optional `partitura?: string` type field and no data
- [ ] `package.json` dependencies unchanged except the `test` script
- [ ] webhook returns 401 without the secret and `{"ok":true}` with it
- [ ] `plans/README.md` row for 003 updated

## STOP conditions

- The Sanity counts in step 3 are not 14 fechas (plan 002 has not run, or ran differently).
- `revalidateTag` in the bundled docs does not accept `{ expire: 0 }`. Report what it accepts and do not guess.
- The before/after diff shows a real content difference.
- A component turns out to be a client component that imports content directly.
- Making a component `async` breaks a parent that renders it inside a client component.

## Maintenance notes

- `lib/cms/map.ts` is the only place that knows Sanity's shapes. A new Studio field needs three edits: the schema, the GROQ query, and the mapper plus a test.
- The site now needs network access to Sanity at build time. CI builds fetch the live dataset. If Sanity is down, a build fails but the live site keeps serving the last good version.
- `revalidate = 3600` on four pages is still needed for past dates to drop off. Do not remove it because of the webhook.
- Reviewer focus: the `acceso` rebuild (a wrong variant could show a fake price), and that `en` falls back to `es` rather than rendering empty strings.
