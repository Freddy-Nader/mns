# Plan 007 (future, design and spike): Publishing a new date, score or programme emails Mauricio ready-to-edit post drafts

> **Executor instructions**: This is a **design plus spike** plan. Part A is
> decisions that need the operator and Mauricio. Part B is built only after
> Part A's questions are answered in this file. Stop on any STOP condition.
>
> **Drift check (run first)**: plans 003 and 005 must be DONE.

## Status

- **Priority**: P3 (future, per issue #7: "No es prioridad hasta tener el CMS funcionando")
- **Effort**: M
- **Risk**: MED (an LLM writes text in his name, though nothing is ever posted automatically)
- **Depends on**: plans/003-site-reads-from-sanity.md
- **Category**: direction
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issue**: https://github.com/Freddy-Nader/mns/issues/7

## Why this matters

After he publishes a concert or a score, Mauricio still has to announce it by hand on each network. A draft per network that arrives seconds after he presses Publicar removes most of that work. **Nothing is ever posted automatically.** He copies, edits and posts himself.

## Design (decided here)

- **Trigger**: a second Sanity webhook, fired on **create** of a published `fecha`, `partitura` or `programa`. Filter `_type in ["fecha","partitura","programa"] && delta::operation() == "create"`, drafts off. It POSTs to `/api/social-drafts` with its own secret header `x-drafts-secret`, which lives in Vercel env as `SOCIAL_DRAFTS_SECRET` and in the webhook header.
- **Generation**: the route loads the document with `getContent()` from `lib/cms`, builds the page URL (`siteUrl` from `lib/site-url.ts` plus the route), and calls the Claude API once with model `claude-sonnet-5-5`. It asks for JSON with one draft per network. The API key is `ANTHROPIC_API_KEY` in Vercel env.
- **Delivery**: email to Mauricio, with the operator in copy, through Resend (`RESEND_API_KEY` in Vercel env). Each draft goes in its own block so it is easy to copy on a phone. **Not** stored in Sanity, because the dataset is public (ADR-0007).
- **Volume**: a few creates a month, so cost is negligible. The route answers 200 to Sanity right away and does the work in `after()` from `next/server`. Check the bundled doc `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/after.md` first.

## Part A: questions to settle first (write the answers here)

1. **Which networks does he actually use?** `content/site.ts` lists YouTube, Facebook and X, but **no Instagram and no LinkedIn**. Issue #7 names LinkedIn, X and Instagram and leaves out Facebook.
2. **Voice**: the site is impersonal (`docs/content/voz.md`), but posts on his own accounts would normally be in first person. Ask Mauricio which he wants, then write a short `docs/content/voz-redes.md` with 3 real example posts of his.
3. **Language**: Spanish only, or Spanish plus English?
4. **Email address** to receive the drafts.

If any answer is missing, STOP after Part A.

## Part B: build (only after Part A)

In scope: `app/api/social-drafts/route.ts`, `lib/social/prompt.ts` (pure, builds the prompt from a `Fecha` or `Partitura` or `Programa` plus `voz-redes.md` text), `tests/social-prompt.test.ts`, `docs/content/voz-redes.md`, `package.json` (add `@anthropic-ai/sdk` and `resend` only if the plain-`fetch` APIs are clearly worse, otherwise use `fetch`).

Steps:
1. Prompt builder plus tests. Every draft must contain the exact page URL, and the prompt must forbid inventing prices or facts not in the document (same rule as `por-confirmar`).
2. Route, with secret check identical to `app/api/revalidate/route.ts`. Bad secret → 401.
3. Spike with one real `fecha` (dry mode `?dry=1` returns the drafts as JSON instead of emailing, and still requires the secret).

Done criteria:
- [ ] `npm test` passes, including a test that every draft contains the URL
- [ ] `curl -X POST` without the secret → 401
- [ ] a real create in the Studio produces an email within 1 minute (operator checks)
- [ ] `grep -rn "publish\|post(" app/api/social-drafts` shows no call to any social network API

## STOP conditions

- Any request to post to a network directly. That is out of scope by the issue's own rule.
- Part A unanswered.

## Maintenance notes

- Issue #8 (behind the scenes) reuses this route with a new document type. See plan 008.
- Scheduling posts through official APIs is a later stage the issue mentions. It always needs his approval and is not planned.
