# Fully bilingual (ES/EN), with content structured so routine updates need no translation

Every page ships in Spanish and English from the start, and any new section is built in both languages at once. This is affordable only because of how content is modelled: **routine content is data, not prose.**

The rule: a field is either

1. **language-neutral** — dates, times, prices, capacity, addresses, URLs, proper nouns (venue names, composer names, work titles, program titles); or
2. **a pre-translated enum** — event type, access type, status, instrumentation. Written once in both languages when the field is built, then reused forever; or
3. **free text** — the only kind that needs a human translation.

Free-text fields are kept to a minimum, are optional wherever possible, and are explicitly marked as needing an English version. Mauricio speaks fluent English, so when free text is genuinely required we ask him for both versions rather than machine-translating.

## Consequences

- Every content type has to declare, per field, which of the three kinds it is. That constraint drives the content model and the shape of every authoring form.
- Adding a concert date — the most frequent update by far, and the one Mauricio does himself — touches zero free-text fields, so it is automatically bilingual.
- Press quotes are never translated. A quote is reproduced verbatim in its original language in both versions of the site, with the outlet named.
- Rejected: Spanish-first with English only on the hire path. Cheaper, but it makes the language of a page depend on its audience, which contradicts the task-based navigation the research argues for.
