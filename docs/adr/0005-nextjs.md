# The site moves to Next.js

Supersedes [ADR-0001](./0001-hand-built-no-framework.md).

v1 was one hand-built page, and it did its job: it settled the visual direction ([ADR-0003](./0003-visual-direction-peso-y-lista.md)) and the client approved it. The next step is everything ADR-0001 said we would have to build ourselves — more than one page (the full calendar, and next a page per Fecha, per Programa, the press kit), bilingual routing, image optimisation, structured data for search — and the client asked to build it in Next.js. We stop hand-rolling those.

## Decision

- **Next.js, App Router, TypeScript**, at the repository root. No UI kit and no Tailwind: the design system is small, already specified as tokens, and a utility layer would only re-encode [tokens.md](../design/tokens.md).
- **Styles**: one global sheet for tokens and shared primitives (`app/globals.css`), CSS Modules next to each section. Same class grammar as v1.
- **Type**: the three faces of [ADR-0004](./0004-typeface-substitutions.md), self-hosted through `next/font`.
- **Content is typed data in `content/`**, shaped by [ADR-0002](./0002-fully-bilingual-structured-content.md): language-neutral fields, pre-translated enums in `lib/dictionaries/`, and free text as `{ es, en }`. The compiler checks that the English dictionary has every key the Spanish one has.
- **URLs**: Spanish at the root (`/`, `/fechas`), English under `/en`. Internally both live under `app/[lang]`; `next.config.ts` rewrites the Spanish paths and redirects `/es` back to `/`.
- **Rendering**: static, revalidated hourly, so dates drop off the "próximas" listing as they pass without a deploy.
- Third-party services stay where ADR-0001 put them: scheduling and payments are bought, not built. The score store remains Lemon Squeezy, linked out.

`site/` is kept as the v1 record. Nothing new goes in it.

## Consequences

- **Updating a date now means editing `content/fechas.ts`.** That is fine for us and wrong for Mauricio, who keeps his own calendar today. The first research was blunt about it: a design that needs a developer to publish a date will die. This decision does not solve that; the next one must. Options, cheapest first: a git-based editor over the same files (Keystatic, TinaCMS), a Google Sheet read at build time, or a hosted CMS (Sanity).
- A build step and a Node runtime. Vercel is the natural host; nothing here is Vercel-specific.
- The one orchestrated motion (the bio reveal) is a small client component; everything else renders on the server and ships no JavaScript beyond the menu, the video player and the commissions brief.
- English free text exists as a draft marked for Mauricio's correction (ADR-0002 asks for his own words, not translations).
