# Plan 006: Every route is checked in both languages at four widths, and the findings are a checklist on issue #3

> **Executor instructions**: This plan is a review, not a code change. You
> write findings only. Do not fix anything. Stop on any STOP condition. When
> done, update the status row in `plans/README.md`.
>
> **Drift check (run first)**: plan 003 must be DONE. QA before the CMS switch
> would be wasted, because every content component changes in plan 003.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW (read-only)
- **Depends on**: plans/003-site-reads-from-sanity.md
- **Category**: tests
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issue**: https://github.com/Freddy-Nader/mns/issues/3

## Why this matters

Issue #3 asks for a detailed visual and content pass before the site counts as ready. After the switch to Sanity it also has to confirm that the pages render live data correctly. The output is a list of concrete defects, each one small enough to fix on its own.

## Current state

- Routes (Spanish at root, English under `/en`): `/`, `/fechas`, `/programas`, `/clases`, `/partituras`, `/encargos`, `/bio`, `/contacto`, which makes 16 URLs.
- Widths from issue #3: 390, 768, 1100, 1440 px. The header shows every task page from 1100 px (ADR-0006).
- Animations to check: `components/WordReveal.tsx` (bio reveal) and `components/VideoShowcase.tsx`.
- Design sources: `docs/design/tokens.md`, `docs/design/landing-page.md`, `docs/design/audit-2026-10.md` (10 open decisions), `docs/content/voz.md` (copy rules), `docs/content/*.md` (source of every claim).
- Open questions for Mauricio are in `docs/content/bio.md`. They cover representation, the bio email, *Tres* vs *Cuatro parodias*, and the English bio. Also open is whether +52 55 3222 1144 is on WhatsApp (`content/site.ts`), and the two events on 30 October at 19:00 (now in Sanity).
- Acceptance from issue #3: Lighthouse ≥ 90 in Performance, Accessibility and SEO on mobile, and CI green.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Build and serve | `npm run build && npm start` | http://localhost:3000 |
| Lighthouse (mobile) | `npx --yes lighthouse http://localhost:3000/<route> --only-categories=performance,accessibility,seo --output=json --output-path=/tmp/lh-<route>.json --chrome-flags="--headless"` | JSON written |
| Link check | `curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" -L <url>` | `200` |

## Scope

**In scope**: `docs/design/qa-2026-11.md` (create), the findings file. Optionally a comment on issue #3 with the checklist, **only** if the operator says so.

**Out of scope**: every source file. Findings only.

## Steps

### Step 1: Screens

For each of the 16 URLs at each of the 4 widths, take a screenshot with whatever browser automation is available (Playwright, the built-in browser, or headless Chrome). Check spacing, type, hierarchy, hover and focus states, overflow, and the two animations with `prefers-reduced-motion` on and off.

**Verify**: 64 screenshots exist in `/tmp/qa/`.

### Step 2: Content against sources

- Every date, price and claim on the page against `docs/content/*.md` and the Studio.
- Every Lemon Squeezy checkout URL and YouTube link returns 200.
- `lib/dictionaries/en.ts` reads naturally and has no Spanish left.
- Copy follows `docs/content/voz.md` (impersonal, no pronouns pointing at him, no em dashes in headings or buttons).

### Step 3: Accessibility and Lighthouse

Run Lighthouse on the 8 Spanish routes. Check contrast, alt text and keyboard order (Tab through the header, menu and video showcase).

**Verify**: 8 JSON reports in `/tmp/`.

### Step 4: Write `docs/design/qa-2026-11.md`

One table per route with columns: defect, width, language, severity (blocker / should / nice), evidence (screenshot name or URL). Then a section for each of the 10 audit decisions saying whether it is resolved, with a proposal. Then the open questions for Mauricio, in one list. Follow the operator's style, which means headings without numbers and plain sentences.

**Verify**: the file exists and every route has a table (`grep -c "^## " docs/design/qa-2026-11.md` → ≥ 8).

## Done criteria

- [ ] 64 screenshots and 8 Lighthouse reports produced
- [ ] `docs/design/qa-2026-11.md` written with findings per route
- [ ] `git status` shows only that file

## STOP conditions

- The build fails or a route returns non-200. Report it, because that is a blocker and not a QA finding.
- You notice you are about to edit a source file.

## Maintenance notes

- Each blocker or should finding becomes its own small fix. The operator decides which to plan.
- Rerun this plan before launch on the final domain.
