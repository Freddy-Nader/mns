# Plan 002: All current content from `content/*.ts` is in the Sanity dataset, created by a repeatable script

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report. Do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 4576c4b..HEAD -- content/ studio/schemaTypes/`
> `content/` must be unchanged since `4576c4b`. `studio/schemaTypes/` must match
> plan 001. On any surprise, STOP.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: MED (writes to the live dataset. The script is idempotent, so a rerun is safe)
- **Depends on**: plans/001-sanity-studio-and-adr.md
- **Category**: migration
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issue**: https://github.com/Freddy-Nader/mns/issues/4

## Why this matters

The site must look identical after it switches to Sanity (issue #4: "Contenido actual migrado sin pérdidas; las páginas se ven igual"). A script with fixed document IDs makes the migration repeatable, reviewable, and safe to rerun, unlike typing 14 dates and 30 records by hand.

## Current state

- `content/fechas.ts` exports `fechas: Fecha[]` (14 entries, each with a unique `id` like `"2026-10-30-ponce-osem"`).
- `content/programas.ts` exports `programas: Programa[]` (9 entries, in display order) and `programaDestacado = "piano-de-pelicula"`.
- `content/partituras.ts` exports `partituras: Partitura[]` (7 entries, in display order), `partiturasEnTienda = 28`, `precioMinimoTienda = 150`.
- `content/videos.ts` exports `videos: Video[]` (5 entries, best first) and `canalVideos = 191`. `Video.partitura` holds a score slug.
- `content/prensa.ts` exports `citas` (3, landing) and `citasBio` (13, `/bio`). `citasBio[1]` is `citas[1]` and the 10th item (index 9) is `citas[2]`, the same objects. `citas[0]` is a **shortened** version of `citasBio[0]` (same outlet, Life & Style 2006).
- Two scores have a recording that is **not** in the showcase: `air` (video `dDE5nHYEMPw`) and `tres-parodias` (video `gKyqc7PDQoQ`).
- Every runtime import in `content/*.ts` is `import type`, so Node can load these files with `--experimental-strip-types` and no bundler.
- The studio schema (plan 001) field names: see `studio/schemaTypes/*.ts`. Read them before writing the mapping.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Dry run | `node --experimental-strip-types studio/scripts/migrate.ts --dry` | prints a document count per type, exit 0 |
| Real run | `SANITY_WRITE_TOKEN=... node --experimental-strip-types studio/scripts/migrate.ts` | prints `ok` per batch, exit 0 |
| Count check | see Step 4 | the counts in Step 4 |

Node must be ≥ 22.6 (`node -v`). CI uses Node 22.

## Scope

**In scope**:
- `studio/scripts/migrate.ts` (create)
- `studio/tsconfig.json` (add `"allowImportingTsExtensions": true` and `"noEmit": true` if not already there)
- `plans/README.md` (status row)

**Out of scope**:
- `content/*.ts`. Read only. They stay as they are until plan 003.
- Any site code.
- Creating the token. The operator does that.

## Operator prerequisites

- A Sanity API token with **Editor** permissions, created at https://www.sanity.io/manage under the project's API settings. It is passed only as the env var `SANITY_WRITE_TOKEN` in the shell. Never write its value into a file, a commit, a log line or a plan.

## Steps

### Step 1: Write the script with fixed IDs

`studio/scripts/migrate.ts` imports the arrays with explicit extensions, e.g. `import { fechas } from "../../content/fechas.ts";`, and builds Sanity documents. Use these `_id`s so a rerun replaces instead of duplicating:

| Source | `_id` |
|---|---|
| fecha | `fecha-<Fecha.id>` |
| programa | `programa-<slug>` |
| partitura | `partitura-<slug>` |
| video | `video-<youtubeId>` |
| cita (bio order) | `cita-<index 0..12>` |
| ajustes | `ajustes` |

Mapping rules:

- `string | Txt` fields: a plain string goes to the Spanish field (`titulo`) and the English field stays empty. A `Txt` goes to `titulo` (es) and `tituloEn` (en). Same for `detalle`, `nombre`, `subtitulo`.
- `fecha.programa` → `{ _type: "reference", _ref: "programa-<slug>" }`.
- `fecha.recinto.pais` → keep when present, otherwise `"MX"`.
- `fecha.acceso` → copy as is into the object.
- `programa.tono` → **drop** (design stays in code).
- `orderRank`: the orderable plugin uses LexoRank strings. Generate ascending ranks in source order, e.g. `"0|" + String(i).padStart(6, "0") + ":"`. Check the plugin README for the exact format it accepts. If the plugin rejects that format, STOP.
- Videos: create one doc per entry of `videos` with `estado: "fijado"`, `youtube: "https://www.youtube.com/watch?v=<id>"`, `obra`, `autor`, `nota`, `posterHD`, ranks in source order. Then create `video-dDE5nHYEMPw` (Air, J. S. Bach) and `video-gKyqc7PDQoQ` (Tres parodias, Mauricio Nader) with `estado: "oculto"`, after the fijados.
- Partituras: `video` → reference to `video-<Partitura.video>` when present. Do **not** carry `Video.partitura`. Plan 003 derives it from this single reference (issue #6).
- Citas: iterate `citasBio` in order. Set `portada: true` on indexes 0, 1 and 9 (the three that appear in `citas`). On index 0 set `textoCorto` to `citas[0].texto`. Assert in the script that `citasBio[1] === citas[1]` and `citasBio[9] === citas[2]`, and exit 1 if not.
- Ajustes: `programaDestacado` → reference to `programa-piano-de-pelicula`, `videosRecientes: 0` (keeps the showcase identical to today), `videosEnCanal: 191`, `partiturasEnTienda: 28`, `precioMinimoTienda: 150`. Read the numbers from the imports, not literals.

Send mutations with plain `fetch` (no Sanity client dependency):

```ts
const res = await fetch(
  `https://${projectId}.api.sanity.io/v2025-02-19/data/mutate/${dataset}`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: docs.map((d) => ({ createOrReplace: d })) }),
  },
);
```

Import `projectId` and `dataset` from `studio/env.ts`. Order the batches so referenced docs exist first: programas, videos, partituras, fechas, citas, ajustes. With `--dry`, print the documents as JSON to stdout and send nothing. Exit 1 with a clear message if `SANITY_WRITE_TOKEN` is missing on a real run.

**Verify**: `node --experimental-strip-types studio/scripts/migrate.ts --dry | grep -c '"_id"'` → `51` (14 fechas + 9 programas + 7 videos + 7 partituras + 13 citas + 1 ajustes). Print one `_id` per line so the count is exact. Any other number is a STOP.

### Step 2: Typecheck the script

**Verify**: `cd studio && npx tsc --noEmit` → exit 0.

### Step 3: Real run (only with the operator's token in the env)

**Verify**: `SANITY_WRITE_TOKEN=<from operator> node --experimental-strip-types studio/scripts/migrate.ts` → exit 0. Run it a second time → exit 0 again (idempotent).

### Step 4: Count what landed

Query the public API (no token needed for a public dataset):

```bash
curl -s "https://<projectId>.api.sanity.io/v2025-02-19/data/query/production?query=%7B%22f%22%3Acount(*%5B_type%3D%3D%22fecha%22%5D)%2C%22p%22%3Acount(*%5B_type%3D%3D%22programa%22%5D)%2C%22s%22%3Acount(*%5B_type%3D%3D%22partitura%22%5D)%2C%22v%22%3Acount(*%5B_type%3D%3D%22video%22%5D)%2C%22c%22%3Acount(*%5B_type%3D%3D%22cita%22%5D)%7D"
```

**Verify**: the JSON `result` is `{"f":14,"p":9,"s":7,"v":7,"c":13}`.

## Test plan

The dry-run count and the live count in Step 4 are the tests. Plan 003 then proves the rendered pages are identical.

## Done criteria

- [ ] `--dry` prints 51 documents
- [ ] two real runs both exit 0
- [ ] Step 4 query returns `{"f":14,"p":9,"s":7,"v":7,"c":13}`
- [ ] `git grep -n "SANITY_WRITE_TOKEN=" -- ':!plans'` returns nothing (no token value committed)
- [ ] only in-scope files changed

## STOP conditions

- The dry-run count is not 51.
- The `citasBio`/`citas` identity assertions fail.
- The mutate API returns 401 or 403 (wrong token permissions). Report it and do not retry with other settings.
- A schema field in `studio/schemaTypes` does not exist under the name this plan uses.

## Maintenance notes

- Keep the script after migration. It documents how the old files map to the new model, and it can rebuild a fresh dataset. Once plan 003 removes the data arrays from `content/*.ts`, the script will no longer run. Note that in a comment at the top and leave it as a record.
- Fixed IDs mean a rerun **overwrites** edits Mauricio made in the Studio. Never rerun it after he starts editing.
