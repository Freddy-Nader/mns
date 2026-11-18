# Plan 005: Mauricio has a one-page Spanish guide, and the operator has a runbook, for everything he edits in the Studio

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. Stop and report on any STOP condition. When done, update the
> status row in `plans/README.md`.
>
> **Drift check (run first)**: plans 001 to 004 must be DONE in `plans/README.md`.
> Read `studio/schemaTypes/*` because the guide must use the exact Spanish
> field titles found there.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/003-site-reads-from-sanity.md, plans/004-youtube-sync.md
- **Category**: docs
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issue**: https://github.com/Freddy-Nader/mns/issues/4 ("Guía corta para Mauricio (1 página)")

## Why this matters

The whole point of the CMS is that Mauricio does not depend on the operator for things that change every week or month. A tool he cannot find his way around will not get used. One page in his language, with the five tasks he will actually do, closes issue #4.

## Current state

- Studio sidebar (plan 001): Fechas, Partituras, Videos, Programas, Prensa, Ajustes.
- Video states: Automático, Fijado, Oculto. Deleting a synced video makes it come back on the next sync (every 12 hours) (plan 004), so the guide must say to hide, not delete.
- Publishing: Sanity saves drafts automatically. Nothing changes on the site until he presses **Publicar**. After that the site updates on the next visit (plan 003 webhook).
- Repo language rules (operator's standing rule): docs for people exist in English (`README.md`) plus a Spanish copy. Everything the end user sees is in Spanish. Mauricio is the end user here.
- Writing style the operator requires in every doc: plain sentences joined with words like "porque", "así que", "es decir". Avoid colons, semicolons and dashes in running prose. No numbers in headings.

## Scope

**In scope**:
- `docs/cms/guia-mauricio.md` (create, Spanish)
- `docs/cms/runbook.md` (create, English, for the operator)
- `README.md` (one link to each)

**Out of scope**: any code or schema.

## Steps

### Step 1: The guide (`docs/cms/guia-mauricio.md`)

One page. Headings without numbers. Sections:
- **Entrar** gives the Studio URL (placeholder `<URL del Studio>` if it is not yet in `README.md`), says he logs in with Google using his Gmail, and suggests adding it to the phone's home screen.
- **Agregar una fecha** covers Fechas, then the button to create one, then Día, Hora, Tipo, Título, Recinto and Acceso, then **Publicar**. It says that without a price he leaves Acceso on "Por confirmar", which never invents one. Masterclasses and courses are dates too.
- **Agregar una partitura** covers obra, autor, precio, the Lemon Squeezy link, and the recording picked from the list of videos.
- **Videos** explains what Automático, Fijado and Oculto mean, says to drag to reorder, and says to hide a video instead of deleting it.
- **Prensa y programas** says quotes are copied exactly as published and never translated, and that a programme's slug must not be changed once published.
- **Ajustes** covers the store and channel numbers and the featured programme.
- **Qué no se edita aquí** lists the design, texts of the pages, biography and contact details, and says to ask Freddy for those.
- **Si algo sale mal** says each document has a history with an option to go back to an earlier version, and gives the operator's contact as a placeholder.

Use the exact Spanish field titles from `studio/schemaTypes`.

**Verify**: `wc -w docs/cms/guia-mauricio.md` → under 700 words. `grep -nE "^#+ [0-9]" docs/cms/guia-mauricio.md` → no output.

### Step 2: Operator runbook (`docs/cms/runbook.md`, English)

Cover these, saying **where** each credential lives and never its value:
- Studio deploy: `cd studio && npm run deploy`.
- Inviting a user at https://www.sanity.io/manage.
- `SANITY_REVALIDATE_SECRET`, which lives in Vercel project env vars (Production) and in the Sanity webhook's `x-revalidate-secret` header.
- The webhook settings. URL https://mauricionader.vercel.app/api/revalidate (or the final domain), dataset `production`, triggers create, update and delete, filter `_type in ["fecha","programa","partitura","video","cita","ajustes"]`, drafts off.
- `SANITY_WRITE_TOKEN`, which lives in GitHub repo secrets for the video sync and only in a local shell for one-off scripts.
- How to run the video sync by hand (Actions tab, then "Sync videos", then Run workflow).
- What to do if a build fails because Sanity is unreachable.

**Verify**: `grep -niE "sk[a-z0-9]{20,}" docs/cms/runbook.md` → no output (no token-like strings).

### Step 3: Link from README

Add one line under "Editing content" in `README.md` linking both files.

**Verify**: `grep -c "docs/cms/" README.md` → ≥ 2.

## Done criteria

- [ ] both files exist, the guide is under 700 words, and no heading has a number
- [ ] no credential values in either file
- [ ] README links both

## STOP conditions

- A field title the guide needs is not in `studio/schemaTypes`. The guide must match the real UI.

## Maintenance notes

- Any new Studio field Mauricio is expected to use needs a line in the guide.
- After the operator reads the guide with Mauricio once, fold his questions back into it.
- The operator's rule asks for `README-es.md` next to `README.md`. The repo has none today. Creating one is out of scope here. Track it separately if wanted.
