# Plan 001: A Sanity Studio in Spanish exists in `studio/`, with every content model the site needs, and ADR-0007 records the choice

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report. Do not improvise. When done, update the status row for this plan
> in `plans/README.md`, unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 4576c4b..HEAD -- content/ docs/adr/ tsconfig.json eslint.config.mjs .gitignore`
> If any of these files changed since this plan was written, compare the
> "Current state" excerpts against the live code before you go on. On a
> mismatch, treat it as a STOP condition.
>
> **Before anything else**: the local `master` checkout may be behind
> `origin/master`. Run `git fetch && git status -sb`. If it says `behind`,
> STOP and ask the operator to pull. This plan was written against
> `origin/master` at `4576c4b`.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW (new folder, the site does not read it yet)
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issues**: https://github.com/Freddy-Nader/mns/issues/4 and https://github.com/Freddy-Nader/mns/issues/6 (the model half)

## Why this matters

Every piece of content on the site lives in TypeScript files in `content/`, so publishing a concert date needs a developer and a push. Mauricio Nader (the client, a concert pianist who is not technical) has to be able to add and edit the things that change over time (dates, masterclasses, scores, videos, press quotes, programmes) from his phone, without help. The operator chose **Sanity** as the CMS. The design and the fixed copy of the site stay in code, and the operator keeps changing those himself. This plan creates the editing side only. Plan 002 moves the data in, and plan 003 makes the site read it.

## Current state

- `content/fechas.ts` defines `Acceso`, `TipoFecha` and `Fecha` (excerpt below). There are 14 dates.
- `content/programas.ts` defines `ProgramaSlug` (a union of 9 slugs), `Programa`, and `programaDestacado = "piano-de-pelicula"`.
- `content/partituras.ts` defines `TipoPartitura`, `Partitura`, `partiturasEnTienda = 28`, `precioMinimoTienda = 150`.
- `content/videos.ts` defines `Video` and `canalVideos = 191`.
- `content/prensa.ts` defines `Cita`, `citas` (3 for the landing page) and `citasBio` (all of them, for `/bio`).
- `content/bio.ts` and `content/site.ts` stay in code. They are out of scope for the CMS.
- `lib/i18n.ts:14` has `export type Txt = Record<Locale, string>;` with `Locale = "es" | "en"`.
- Root `tsconfig.json` has `"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ...]` and `"exclude": ["node_modules"]`. A new `studio/` folder would be type-checked by the site unless it is excluded.
- `eslint.config.mjs` uses `globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])`.
- ADRs live in `docs/adr/NNNN-slug.md`. The last one is `0006-landing-summary-and-task-pages.md`. ADR-0005 says this about the CMS: *"Options, cheapest first: a git-based editor over the same files (Keystatic, TinaCMS), a Google Sheet read at build time, or a hosted CMS (Sanity)."*

Excerpt of `content/fechas.ts` (the model the Studio must reproduce):

```ts
export type Acceso =
  | { tipo: "entrada-libre" }
  | { tipo: "boletos"; url: string; precioMXN?: number }
  | { tipo: "taquilla"; precioMXN?: number }
  | { tipo: "inscripcion"; url?: string; precioMXN?: number }
  | { tipo: "por-confirmar" };

export type TipoFecha = "recital" | "orquesta" | "camara" | "masterclass" | "curso";

export type Fecha = {
  id: string;
  dia: string;        // YYYY-MM-DD, local date at the venue
  hora?: string;      // HH:MM, 24-hour
  utc?: string;       // UTC offset, e.g. "-05:00". Mexico (-06:00) when omitted
  tipo: TipoFecha;
  titulo: string | Txt;
  detalle?: string | Txt;
  programa?: ProgramaSlug;
  recinto: { nombre?: string; ciudad?: string; pais?: string; enLinea?: boolean };
  acceso: Acceso;
};
```

Excerpt of `content/partituras.ts`:

```ts
export type TipoPartitura = "arreglo" | "transcripcion" | "original";
export type Partitura = {
  slug: string; obra: string; nota?: Txt; autor: string; tipo: TipoPartitura;
  precioMXN: number;
  url: string;     // Lemon Squeezy checkout, https://nadermusic.lemonsqueezy.com/checkout/buy/<uuid>
  video?: string;  // YouTube id of his recording
};
```

Excerpt of `content/programas.ts`:

```ts
export type Programa = {
  slug: ProgramaSlug;
  nombre: string | Txt;
  subtitulo?: string | Txt;
  descripcion: Txt;
  obras: string[];                         // composers, surname only, in programme order
  formato: "recital" | "orquesta" | "charla";
  tono: "ink" | "paper" | "grey";          // design choice, NOT content (see rule below)
};
```

Excerpt of `content/prensa.ts`:

```ts
export type Cita = {
  texto: string;
  idioma: "es" | "en";
  medio: string;
  anio?: number;
  pais: { es: string; en: string };
};
```

### Domain rules to honor (from CONTEXT.md and ADR-0002)

- **Fecha** is one dated appearance of any kind. **Acceso** has exactly four real states plus `por-confirmar`, which is the honest marker for unknown data. Never let the form invent a price.
- **Recinto** is the venue. Do not use the words *sede*, *lugar* or *evento* in labels.
- ADR-0002: a field is either language-neutral (dates, prices, proper nouns), a pre-translated enum, or free text. Only free text needs English, and English is optional in the form, falling back to Spanish.
- `tono` is a design decision (which poster colour a programme gets). Design stays in code, so **the Studio has no `tono` field**. Plan 003 assigns it in code.
- Everything Mauricio sees is in Spanish: labels, descriptions, validation messages, list titles. Code, file names and field names are in English or the existing Spanish domain terms (`fecha`, `recinto`, `acceso`, `partitura`, `programa`, `cita`), matching `content/`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install studio deps | `cd studio && npm install` | exit 0 |
| Typecheck studio | `cd studio && npx tsc --noEmit` | exit 0 |
| Build studio | `cd studio && npx sanity build --yes` | exit 0, writes `studio/dist/` |
| Run studio locally | `cd studio && npx sanity dev` | serves http://localhost:3333 |
| Site lint | `npm run lint` | exit 0 |
| Site typecheck | `npx next typegen && npx tsc --noEmit` | exit 0 |
| Site build | `npm run build` | exit 0 |

## Suggested executor toolkit

- Read the Sanity schema docs before writing fields: https://www.sanity.io/docs/studio/schema-types and https://www.sanity.io/docs/studio/validation
- Orderable lists: https://github.com/sanity-io/orderable-document-list (README for the current `orderRankField` and `orderableDocumentListDeskItem` API).
- Spanish Studio UI: https://github.com/sanity-io/locales (package `@sanity/locale-es-es`).

## Scope

**In scope** (the only files you should create or modify):
- `studio/` (create): `package.json`, `tsconfig.json`, `sanity.config.ts`, `sanity.cli.ts`, `schemaTypes/*.ts(x)`, `structure.ts`, `.gitignore`
- `tsconfig.json` (root): add `"studio"` to `exclude`
- `eslint.config.mjs`: add `"studio/**"` to `globalIgnores`
- `docs/adr/0007-sanity-cms.md` (create)
- `plans/README.md` (status row only)

**Out of scope** (do NOT touch):
- Anything under `content/`, `components/`, `app/`, `lib/`. The site keeps reading the TS files until plan 003.
- Any data migration. That is plan 002.
- Creating the Sanity project or tokens. The operator does that (prerequisites below).

## Operator prerequisites (the executor cannot do these)

1. Create a free Sanity project at https://www.sanity.io/manage with a dataset named `production` (public).
2. Give the executor the **project ID**. It is not a secret and goes into code.
If the project ID is not available, do steps 1 to 4 with the placeholder `"REPLACE_PROJECT_ID"` and STOP before step 5.

## Git workflow

- Branch: `claude/cms-001-studio` (the repo uses `claude/<slug>` branches, see `git branch -a`).
- Commit style from `git log`: short imperative or conventional, e.g. `feat(seo): sitemap with hreflang, ...`. Use `feat(cms): ...`.
- Do NOT add a `Co-Authored-By` trailer. Do NOT push or open a PR unless told.

## Steps

### Step 1: Scaffold `studio/` as its own package

Create `studio/package.json` with `"private": true`, `"type": "module"`, scripts `dev: sanity dev`, `build: sanity build`, `deploy: sanity deploy`, and dependencies `sanity`, `react`, `react-dom`, `styled-components`, `@sanity/orderable-document-list`, `@sanity/locale-es-es`, plus devDependencies `typescript`, `@types/react`. Use the current versions (`npm view <pkg> version`). Do not add `@sanity/vision` or any other plugin.

Create `studio/sanity.cli.ts` and `studio/sanity.config.ts` that read `projectId` and `dataset` from one constant object in `studio/env.ts`:

```ts
export const projectId = "REPLACE_PROJECT_ID"; // public, not a secret
export const dataset = "production";
```

Create `studio/.gitignore` with `node_modules`, `dist`, `.sanity`.

Exclude the folder from the site: add `"studio"` to `exclude` in the root `tsconfig.json`, and `"studio/**"` to `globalIgnores` in `eslint.config.mjs`.

**Verify**: `cd studio && npm install && npx tsc --noEmit` → exit 0. Then at the root, `npm run lint && npx next typegen && npx tsc --noEmit` → exit 0.

### Step 2: Write the schema types

One file per type in `studio/schemaTypes/`, exported through `studio/schemaTypes/index.ts`. Every `title` and `description` is in Spanish and written for a non-technical user. Use `defineType` and `defineField`.

**`fecha`** (title "Fecha", list sorted by `dia` descending):
- `dia`: `date`, required. Title "Día".
- `hora`: `string`, optional, validation regex `/^([01]\d|2[0-3]):[0-5]\d$/` with message "Usa el formato 24 horas, por ejemplo 19:00". Title "Hora".
- `tipo`: `string` with `options.list` of the five `TipoFecha` values, Spanish titles (Recital, Con orquesta, Música de cámara, Masterclass, Curso), `layout: "radio"`, required.
- `titulo`: `string`, required. Title "Título". Description "El nombre como debe aparecer. Si es un nombre propio, no hace falta traducirlo."
- `tituloEn`: `string`, optional. Title "Título en inglés (opcional)". Description "Solo si cambia en inglés."
- `detalle`, `detalleEn`: same pattern, both optional.
- `programa`: `reference` to `programa`, optional. Title "Programa".
- `recinto`: `object` with `nombre` (string), `ciudad` (string), `pais` (string, `initialValue: "MX"`, regex `/^[A-Z]{2}$/`, description "Código de dos letras. MX para México."), `enLinea` (boolean, title "En línea").
- `acceso`: `object` with `tipo` (string, radio list `entrada-libre` "Entrada libre", `boletos` "Boletos (enlace)", `taquilla` "Taquilla", `inscripcion` "Inscripción", `por-confirmar` "Por confirmar"; required; `initialValue: "por-confirmar"`), `url` (url, `hidden` unless tipo is `boletos` or `inscripcion`), `precioMXN` (number, integer, min 1, `hidden` when tipo is `entrada-libre` or `por-confirmar`). Custom validation on the object: when `tipo === "boletos"`, `url` is required, with message "Para boletos hace falta el enlace de compra."
- `utc`: `string`, optional, regex `/^[+-]\d\d:\d\d$/`, inside a collapsed fieldset "Avanzado", description "Solo para fechas fuera de México. Ejemplo: -05:00 para Ecuador."
- `preview`: title = `titulo`, subtitle = `dia` plus `recinto.ciudad`.

**`programa`** (title "Programa", orderable):
- `nombre` (string, required), `nombreEn` (optional)
- `slug` (`slug`, `options.source: "nombre"`, required). Description "Se genera solo. No lo cambies después de publicar, porque es parte de la dirección de la página."
- `subtitulo`, `subtituloEn` (optional strings)
- `descripcion` (`object` with `es` text required and `en` text optional). On `en`, add a **warning** (not an error) when empty: "Falta la versión en inglés. Mientras tanto se muestra el español."
- `obras`: `array` of `string`, title "Compositores", description "Solo el apellido, en el orden del programa."
- `formato`: radio `recital` / `orquesta` / `charla`, required.
- `orderRank` via `orderRankField({ type: "programa" })`.
- No `tono` field.

**`partitura`** (title "Partitura", orderable):
- `obra` (string, required), `autor` (string, required)
- `slug` (slug from `obra`, required)
- `tipo`: radio `arreglo` "Arreglo" / `transcripcion` "Transcripción" / `original` "Obra original", required
- `precioMXN`: number, integer, min 1, required. Title "Precio (MXN)".
- `url`: url, required, custom validation that it matches `/^https:\/\/nadermusic\.lemonsqueezy\.com\/checkout\/buy\/[0-9a-f-]{36}$/`, message "Pega el enlace de compra de Lemon Squeezy (empieza con https://nadermusic.lemonsqueezy.com/checkout/buy/)."
- `nota`: object `es` / `en`, both optional
- `video`: `reference` to `video`, optional. Title "Grabación". Description "La grabación sirve como muestra gratis de la partitura."
- `orderRank`

**`video`** (title "Video", orderable). Create it as `studio/schemaTypes/video.tsx` so the preview can render a thumbnail:
- `youtube`: string, required, title "Enlace de YouTube", custom validation that a YouTube id can be extracted with `/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/` or the value is itself 11 chars of `[\w-]`.
- `tituloYoutube`: string, `readOnly: true`, title "Título en YouTube" (filled by the sync in plan 004).
- `obra`, `autor`: strings, optional. Description "Si lo dejas vacío, se usa el título de YouTube."
- `nota`: object `es` / `en`, optional.
- `estado`: radio, required, `initialValue: "auto"`. Values `auto` "Automático (sale si es de los más recientes)", `fijado` "Fijado (siempre sale, en el orden de la lista)", `oculto` "Oculto (no sale en la portada)".
- `publicado`: datetime, `readOnly: true`, title "Publicado en YouTube".
- `posterHD`: boolean, `hidden: true`.
- `orderRank`
- `preview`: select `obra`, `tituloYoutube`, `youtube`, `estado`. In `prepare`, extract the id with the same regex and return `media: <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" style={{objectFit: "cover"}} />`, title = obra or tituloYoutube, subtitle = the Spanish label of `estado`.

**`cita`** (title "Cita de prensa", orderable):
- `texto`: text, required. Description "Tal cual la publicó el medio, en su idioma original. No se traduce."
- `textoCorto`: text, optional. Title "Versión corta para la portada".
- `idioma`: radio `es` "Español" / `en` "Inglés", required.
- `medio`: string, required. `anio`: number, integer, optional.
- `pais`: object `es` (required) / `en` (optional).
- `portada`: boolean, title "Mostrar en la portada", description "Se muestran las primeras tres marcadas, en el orden de la lista."
- `orderRank`

**`ajustes`** (singleton, title "Ajustes"):
- `programaDestacado`: reference to `programa`, required.
- `videosRecientes`: number, integer, min 0, max 6, `initialValue: 0`. Title "Videos recientes en la portada". Description "Cuántos de los últimos videos del canal se agregan después de los fijados."
- `videosEnCanal`: number, integer. Title "Videos en el canal".
- `partiturasEnTienda`: number, integer. Title "Partituras en la tienda".
- `precioMinimoTienda`: number, integer. Title "Precio más bajo en la tienda (MXN)".

**Verify**: `cd studio && npx tsc --noEmit` → exit 0.

### Step 3: Desk structure, Spanish UI, singleton

In `studio/structure.ts`, build the sidebar in this order: "Fechas" (plain list of `fecha`, default ordering `dia desc`), "Partituras", "Videos", "Programas", "Prensa" (these four as `orderableDocumentListDeskItem`), then "Ajustes" as a single document with `documentId("ajustes")`.

In `sanity.config.ts`: register `structureTool({ structure })`, `esESLocale()` from `@sanity/locale-es-es`, the schema types, and hide `ajustes` from the "create new" menu (`document.newDocumentOptions` filter) and remove `delete` and `duplicate` actions for it.

**Verify**: `cd studio && npx tsc --noEmit && npx sanity build --yes` → both exit 0.

### Step 4: ADR-0007

Write `docs/adr/0007-sanity-cms.md` in the same voice and shape as `docs/adr/0005-nextjs.md` (title line, context paragraph, `## Decision` bullets, `## Consequences` bullets). It must say:

- Decision: Sanity, free plan, dataset `production` (public). Studio lives in `studio/` as its own package and is deployed to `*.sanity.studio`, so the site build never bundles it.
- What is in the CMS: dates (fechas, including masterclasses and courses), scores, videos, programmes, press quotes, and a few store and channel numbers (Ajustes). The rule: **what changes over time goes in the CMS, and design and fixed copy stay in code** (dictionaries, bio, contact details, lesson offers, poster colours).
- Why Sanity over Keystatic: Keystatic had no release since December 2025 and an open report of a blank admin on Next 16 with Turbopack. Sanity gives Mauricio Google login with the Gmail he already uses, a phone-friendly editor, references with thumbnails (score to video, issue #6), and webhooks for publishing in minutes.
- Costs accepted: content no longer lives in Git, the site fetches it at render time, and the free plan's public dataset means **nothing private may ever be stored in Sanity** (no student data, no drafts of social posts).
- Exit path: the site reads Sanity only through `lib/cms/` (plan 003), which maps Sanity documents to the existing types in `content/`. Swapping CMS means rewriting that folder, not the components.
- Free-plan limits as of 2026-11 (20 seats, 10,000 documents, 250k API requests per month) are far above this site's needs.

**Verify**: `test -f docs/adr/0007-sanity-cms.md && grep -c "lib/cms" docs/adr/0007-sanity-cms.md` → prints a number ≥ 1.

### Step 5: Put in the real project ID and smoke-test

Replace the placeholder in `studio/env.ts` with the operator's project ID. Run `cd studio && npx sanity dev` and open http://localhost:3333. Log in is interactive, so if you cannot log in, just confirm the server starts and stop it.

**Verify**: `grep -c REPLACE_PROJECT_ID studio/env.ts` → `0`. `cd studio && npx sanity build --yes` → exit 0.

## Test plan

No unit tests here (schema only). The gates are `tsc` and `sanity build` for the studio, plus lint, typecheck and build for the site to prove the new folder does not leak into it. Plan 003 adds tests for the mapping.

## Done criteria

- [ ] `cd studio && npx tsc --noEmit` exits 0
- [ ] `cd studio && npx sanity build --yes` exits 0
- [ ] `npm run lint && npx next typegen && npx tsc --noEmit && npm run build` exits 0 at the root
- [ ] `grep -rn "tono" studio/schemaTypes` returns nothing
- [ ] `docs/adr/0007-sanity-cms.md` exists
- [ ] `git status` shows changes only in the in-scope paths
- [ ] `plans/README.md` row for 001 updated

## STOP conditions

- `git status -sb` shows the local branch behind `origin/master`.
- `@sanity/locale-es-es` or `@sanity/orderable-document-list` does not install or does not support the current `sanity` major. Report the versions. Do not pick another plugin.
- The site build (`npm run build`) starts compiling files under `studio/`.
- A field in "Current state" does not exist in `content/*.ts` any more.

## Maintenance notes

- Field names here are the contract for plan 002 (migration) and plan 003 (GROQ query and mapping). Renaming a field later means changing all three.
- Programme `slug` is part of URLs and of `Fecha.programa`. The description tells Mauricio not to change it. A reviewer should check that wording is clear.
- After merge the operator runs `cd studio && npm run deploy` once and picks a hostname. That step is listed in the operator handoff of `plans/README.md`.
