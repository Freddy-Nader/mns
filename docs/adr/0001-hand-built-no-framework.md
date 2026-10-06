# The site is hand-built; no web framework

The site is written by us in plain HTML, CSS and JavaScript. No React, Next, Astro, Svelte or site generator. Third-party services are allowed only where they carry real liability we don't want to own: scheduling (cal.com) and payments (Stripe / Lemon Squeezy).

## Consequences

- Anything a framework would have given us for free — routing, i18n, content collections, image optimisation — we specify and build ourselves, or do without.
- The bilingual content model (ADR-0002) has no library behind it, so it has to be simple enough to hand-write and hand-maintain.
- The current site runs on Bandzoogle, which already provides calendar, store and mailing list. Leaving it buys design control and costs us those features; we are choosing to rebuild them.
