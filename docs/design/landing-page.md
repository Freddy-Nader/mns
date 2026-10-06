# Landing page — structure spec

v1 of the site is a single landing page. Sections below are in page order. Tokens come from [tokens.md](./tokens.md); the visual direction is [ADR-0003](../adr/0003-visual-direction-peso-y-lista.md).

The page is built as hand-written HTML/CSS/JS in `site/index.html` — see [ADR-0001](../adr/0001-hand-built-no-framework.md).

---

## 1. Header — built

Sticky to the top, `--paper` ground, hairline underneath once scrolled.

| Zone | Content |
|---|---|
| Left | `MAURICIO NADER` wordmark, Archivo 700, uppercase, tight tracking |
| Centre | `Fechas · Programa · Bio · Clases · Contacto` |
| Right | Hamburger (always visible, not only on mobile) |

The hamburger is present at every width. On desktop it opens the full menu — everything the centre nav omits (Partituras, Encargos, Masterclasses, Prensa, Trayectoria, language switch). This is how both reference sites handle a nav that cannot hold every destination, and it keeps the centre nav to five items.

Nav labels are short by rule: **Fechas**, not "Próximas fechas". The long form belongs to the hero CTA and the section heading.

## 2. Hero — built

Order: eyebrow → name → line → CTAs → photograph.

- Eyebrow: one line, `--t-label`, centred.
- Name: `MAURICIO NADER` at `--t-hero`, Anton, centred, near-full-bleed. This is the single loudest element on the site.
- Line, then two CTAs: **Próximas fechas** (primary, solid) and **Contactar** (secondary, outline). Both pills share a 210px minimum width from 560px up, so the pair is symmetric rather than content-sized. Not yet wired — `Contactar` has no destination in v1.
- Photograph last, full width, hard top edge. Substantially larger than the Senra reference, which was the client's first correction.

> **Tried and rejected: the photo behind the title.** A version pulled the image up so it passed under the wordmark, masking its top 120px to transparent for legibility. The client's verdict on the fade was "se ve muy barato" and it was reverted. If it is revisited, the route without a fade is a shorter, wider crop with the whole block raised, so the image never touches the title. Reverting also restored the CTAs to their place under the name.

## 3. Menciones de prensa — built

**On the page ground, not a dark band** — it is proof belonging to the hero above it, not a section of its own. Reduced top padding keeps it reading as a continuation.

Three quotes across a row (stacked on mobile), each with publication and country beneath. No logos, no avatars: the proof here is critical reception, so the publication name *is* the mark. The three are chosen for geographic spread — Mexico, United States, Germany — because reach is part of what they prove.

## 4. Próximas fechas — built

Adapted from the ETA Hoffmann listing, with the client's five corrections applied:

1. No coloured shape in the row.
2. Time sits **above**, at the top of the row's left column — not inline with the title.
3. Time has **no border/chip** around it.
4. The Tickets button is **larger** — bigger font and more padding than ETA's.
5. **Price is visible**, directly beneath the time.

Row anatomy, left to right: `[day + date numeral] [time / price stack] [title + venue] [action button]`. Month headings in Newsreader, above their group. Rows separated by `1px` hairlines.

Shows the next two months only. Beneath: **Ver todas las fechas**. (A placeholder for an embedded calendar was here and was removed at the client's request.)

Rows are grouped by day — one date cell, every event of that day stacked beneath it. This is the ETA structure and it earns its keep immediately: October 30 carries two concerts at 19:00 in different cities, and the grouping renders that honestly instead of as a duplicated row.

**Top alignment is a rule, not an accident.** The day label, the time and the event title all share a top edge and everything descends from there. No vertical centring, no padding on the first row of a day.

Each row's action button is driven by its `Acceso` state, with solid meaning "there is a transaction here" and outline meaning "just turn up":

| Acceso | Botón | Estilo |
|---|---|---|
| Boletos | Comprar boletos | solid |
| Inscripción | Inscribirse | solid |
| Taquilla | Cómo llegar | outline |
| Entrada libre | Cómo llegar | outline |

> ⚠️ **Every price on the page is invented.** The client asked for sample prices so the layout could be judged; his real calendar carries none. The only genuine access datum is `Entrada libre` on 22 October. See [fechas.md](../content/fechas.md) — these must be replaced before anyone outside the project sees the page.

## 5. Bio — built

Dark band. One or two short paragraphs at `--t-lead`, centred, with the word-by-word scroll reveal from the Senra reference: words are `--on-dark-dim` and turn `--on-dark` as they pass through the viewport.

Photographs flank the text on both sides, shown from 1000px up and hidden below it.

Ends with a **Ver trayectoria** outline pill. The long-form career page behind it is not built in v1.

The reveal is scroll-scrubbed opacity on per-word spans, rebuilt in vanilla JS from the reference's own timing — the exact parameters are in [tokens.md](./tokens.md). It never initialises under `prefers-reduced-motion`.

## 6-7. Clases y Contacto — removed

Shell headings existed briefly and were removed at the client's request. Their nav and footer links remain in place as dead anchors until the sections are built.

The contact routing decision (WhatsApp for lessons, structured brief for commissions, named email for booking) is researched but not yet approved.

## 8. Footer — built

Anthropic-style multi-column link grid on `--ground-dark`. Columns are named for the audience segments the research identified, not for site structure:

| Asistir | Aprender | Contratar | Mauricio Nader |
|---|---|---|---|
| Próximas fechas | Clases particulares | Contratación | Bio |
| Programas | Masterclasses | Kit de prensa | Trayectoria |
| Conciertos pasados | Curso de música | Programas disponibles | Prensa |
| Escucha y ve | Partituras | Encargos y arreglos | Contacto |

Wordmark and social at the left, copyright and the ES/EN switch at the bottom. Fewer links than Anthropic's — four columns, four to five links each.

The bottom bar uses the same three-zone grid as the header — equal `1fr` side columns — so the social links centre on the page rather than on whatever space is left over.

---

## Not in v1

Deliberately out of scope, so nobody "fixes" their absence: ticket purchasing on-site, an embedded calendar, the Programas section (his named concert programmes deserve the full ETA poster-grid treatment and that is its own piece of work), the score catalogue (the existing Lemon Squeezy store stays an outbound link), and the Clases and Contacto content.
