# Landing page — structure spec

The home is one page that carries all three jobs — Asistir, Aprender, Contratar. Sections below are in page order. Tokens come from [tokens.md](./tokens.md); the visual direction is [ADR-0003](../adr/0003-visual-direction-peso-y-lista.md); the references behind every new section, and why the sections sit in this order, are in [research/referencias.md](../research/referencias.md).

Built in Next.js — see [ADR-0005](../adr/0005-nextjs.md). One component per section in `components/`, content in `content/`. The hand-built v1 (`site/index.html`, [ADR-0001](../adr/0001-hand-built-no-framework.md)) stays as the record of what the client approved; sections marked **approved** below are ports of it.

---

## 1. Header — approved, nav updated

Sticky to the top, `--paper` ground, hairline underneath.

| Zone | Content |
|---|---|
| Left | `MAURICIO NADER` wordmark, Archivo 700, uppercase, tight tracking |
| Centre | `Fechas · Programas · Clases · Partituras · Contacto` |
| Right | Hamburger (always visible, not only on mobile) |

The hamburger is present at every width. It opens the full menu: three columns named Asistir / Aprender / Contratar with every destination, then Bio · Prensa · YouTube · Contacto and the language switch.

**Changed from v1:** *Bio* left the centre nav for *Partituras*. Selling scores is a revenue line, and the pianist sites that sell put the shop in the main nav (Víkingur Ólafsson, Nahre Sol); the bio is one scroll away and in the full menu. *Programa* became *Programas*, matching the footer. That is sense (a) of the open **Programa** question in [CONTEXT.md](../../CONTEXT.md) — the decision is still open, and the works played on a night are never labelled with either word.

Nav labels are short by rule: **Fechas**, not "Próximas fechas". The grid's three columns are pinned, so on mobile — where the nav is hidden — the hamburger stays at the right edge.

## 2. Hero — approved

Order: eyebrow → name → line → CTAs → photograph.

- Eyebrow: one line, `--t-label`, centred.
- Name: `MAURICIO NADER` at `--t-hero`, Anton, centred, near-full-bleed. The single loudest element on the site.
- Line, then two CTAs: **Próximas fechas** (solid) and **Contactar** (outline), both 210px minimum from 560px up. *Contactar* now lands on §12.
- Photograph last, full width, hard top edge, substantially larger than the Senra reference — the client's first correction.

> **Tried and rejected: the photo behind the title.** A version with the image under the wordmark behind a faded mask "se ve muy barato" and was reverted.

## 3. Menciones de prensa — approved

On the page ground, not a dark band — proof belonging to the hero. Three quotes (Mexico, United States, Germany), publication and country beneath, no logos. Quotes stay in their original language in both versions of the site.

## 4. Puertas — new

Three square panels, one per job, each with its most concrete next step:

| Panel | Ground | Hook | Goes to |
|---|---|---|---|
| Asistir — *Escúchalo en vivo* | `--paper-2` | The next date, read from the calendar | §5 |
| Aprender — *Aprende con él* | `--paper-2` | Lessons, masterclasses, course | §9 |
| Contratar — *Llévalo a tu escenario* | `--ground-dark` | Number of named programmes + 28 concertos | §7 |

The booking door is the solid one, by the same rule as the buttons: solid means a transaction lives there. These are entry points *inside* the home, which is what the research recommends instead of audience-based navigation. Title in Anton, uppercase; the whole panel is the link.

## 5. Próximas fechas — approved, now data-driven

The ETA Hoffmann listing with the client's five corrections, unchanged in design: day groups, month in Newsreader, day label in Archivo 500, time above access, larger action button, top alignment as a rule.

Rows now come from `content/fechas.ts`, filtered to **this month and the next** relative to today in Mexico City, and the page re-renders hourly. *Ver todas las fechas* opens `/fechas`, the full upcoming list on the same component.

The day label's width is set in `em`, so the widest label (*Mié 30.*) fits at every size and every row's events start on the same x.

| Acceso | Botón | Estilo |
|---|---|---|
| Boletos | Comprar boletos | solid, to the vendor |
| Inscripción | Inscribirse | solid, if there is a link |
| Taquilla / Entrada libre / por confirmar | Cómo llegar | outline, to Google Maps for the venue |

A row without a named venue (Toluca, OSEM) has no button rather than a map of a whole city.

> ✅ **The invented prices are gone.** v1 carried sample prices at the client's request; they were never real ([fechas.md](../content/fechas.md)). Unknown access now reads *Acceso por confirmar*. The layout still takes a price beneath the time the moment one is real.

## 6. Escucha y ve — new

Dark band. A featured player (16:9) with the rest of the five videos listed beside it from 1000px up, below it on narrow screens. Best first: *Huapango*, his own arrangement and his most watched video.

- Nothing loads from YouTube until someone presses play; the poster is a plain image and the embed uses `youtube-nocookie.com`.
- List thumbnails are greyscale; the one playing and the one under the pointer return to colour (150ms filter transition).
- When the score of the video is for sale, an outline pill under the player says so with its price and links to the store.

## 7. Programas — new

The poster wall that ADR-0003 deferred. Four columns from 1100px, two from 640px, one below.

- **Piano de Película** takes a 2×2 block on ink: its count of dates this year, name at display size, the 2026 subtitle, a description, its own next dates from the calendar, composers, and **Solicitar este programa** (solid).
- The other eight are typographic posters: format label, name in Anton in his own casing, his subtitle (or the description when there is none) in the italic serif, composers, *Solicitar →*. *pianoffortissimo* sets its *ff* in the italic serif, with a break opportunity before it.
- Grounds alternate ink / white with a 1px ink rule / `--paper-2`, assigned in `content/programas.ts` so no two ink posters touch in the four-column wall.
- *Solicitar* opens an email with the programme in the subject.

**Programmer band** (grey ground, right after): four numbers in Anton — 22 países · 30+ discos · 800+ presentaciones · 28 conciertos con orquesta — then *¿Programas una temporada?*, the emergency-replacement offer as a ruled pull-out, **Consultar disponibilidad** (his booking form) and **Pedir kit de prensa** (email).

## 8. Bio — approved

Dark band, two paragraphs centred, the word-by-word scroll reveal at the exact timing in [tokens.md](./tokens.md). Photographs flank the text from 1000px up, cropped to keep him in frame.

Two changes: the reveal sleeps when it has caught up with the scroll position instead of running every frame, and without JavaScript every word renders at full opacity (the dim state is only applied once the effect is running). The closing pill is now **Pedir biografía completa** (email): the long-form *Trayectoria* page is not built, and a presenter asking for the full CV is a lead.

## 9. Clases — new

Three offers side by side, each opening on a 2px ink rule with its details on hairline rows, label left and value right:

- **Clases particulares** — piano and chamber music, for students, professionals and amateurs. **Escribir por WhatsApp** (solid), with a first message pre-written.
- **Masterclasses** — for schools, festivals and conservatories; the next one is read from the calendar. **Organizar una masterclass** → §12.
- **Curso de música** — piano, chamber music, voice and piano. **Ver bases e inscripción** → his rules page.

Closed by a line of proof in the editorial serif (where his students went on to study) and his post at the Centro Mexicano de Posgrados en Música.

## 10. Partituras — new

Grey ground. Seven scores from his store as a listing in the calendar's grammar, not a card grid: composer, work, type, price, **Escuchar** (outline, to his recording) and **Comprar** (solid, to the store). Under it, a link to all 28 in the store.

## 11. Encargos — new

Intro on the left (sticky from 1100px): what he writes, the proof (his own arrangements, film work), and how a fee is set. On the right, a numbered brief after Büro: 01 what, 02 what for, 03 which instruments, 04 by when — as pill chips — then 05 details and 06 name. Two submit buttons: **Enviar por WhatsApp** (solid) and **Enviar por correo** (outline). There is no backend: the brief is composed into the message, opened ready to send, and nothing is stored — the form says so.

## 12. Contacto — new (the routing proposal, built)

Grey ground. Heading, and his own line from his contact page in the italic serif. Then one panel per intent:

| Panel | Ground | Primary | Secondary |
|---|---|---|---|
| Contratación | ink | His booking form | General email |
| Clases y curso | white | WhatsApp | Course email |
| Encargos | white | → §11 | — |
| Prensa | white | Email | — |

A direct line closes it: phone, email, Ciudad de México. The routing was researched in v1 and not yet approved; it is built as proposed so it can be judged on the page.

## 13. Footer — approved, wordmark added

The Anthropic-style grid on `--ground-dark`, columns named for the segments (Asistir · Aprender · Contratar · Mauricio Nader), and every link now goes somewhere real. Under the grid, the name again at full width in Anton — the page closes on the same weight it opens with (Ditto's footer). The bottom bar keeps the header's three-zone grid: © · YouTube, Facebook, X · ES/EN.

---

## Not built yet

Deliberately out of scope, so nobody "fixes" their absence: a page per Fecha and per Programa, the press kit page (needs the photo shoot), the *Trayectoria* page, past dates, a newsletter, on-site ticketing, booking with a calendar, and — most important — a way for Mauricio to edit dates without a developer ([ADR-0005](../adr/0005-nextjs.md)).
