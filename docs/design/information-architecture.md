# Information architecture — Mauricio Nader

The site's structure: who arrives, what each of them came to do, which page answers them, and how many clicks it takes. It replaces the one-page structure in [landing-page.md](./landing-page.md) with **a summary landing and one page per task** ([ADR-0006](../adr/0006-landing-summary-and-task-pages.md)).

**The test every decision here is held to:**

1. **At a glance**, the landing page tells a stranger what Mauricio does, how, and why he is worth it.
2. **In at most three clicks** from the landing page, anyone gets what they came for: one click to the right page, one to choose, and one to buy, book, write or enrol. Several jobs take fewer.
3. **Every page is in the header**, so nobody has to open the menu. The menu repeats everything, grouped by job.

---

## Who arrives

There are no named personas in the repo. The research (`nader-portfolio-research.html`, "Públicos — Cinco audiencias, tres trabajos") defines **audience segments by job**, and those are what this document uses. The table splits the segments where their next step differs. Nothing is invented beyond the research.

| # | Who | Job ([CONTEXT.md](../../CONTEXT.md)) | Their real question | What answers it | Likely device |
|---|---|---|---|---|---|
| 1 | **Asistente**: the general public, from 22 to 80, often arriving from a shared post or a WhatsApp forward | Asistir | When, where, how much, is it free? | Date, time, venue, access, map. A video that tells them whether they'll like it | Phone |
| 2 | **Programador**: festivals, venues, orchestras, universities, cultural institutions | Contratar | Can I trust him, and can I afford him? | Named programmes, numbers, press, video, a booking contact | Desktop |
| 3 | **Alumno**: a student or parent, a professional preparing a competition, an amateur coming back to the piano | Aprender | How do I start, and with what? | One low-risk first step: a WhatsApp message | Phone |
| 4 | **Escuela**: a school, conservatory or festival hosting a masterclass | Aprender / Contratar | What does a masterclass with him involve? | What he teaches, in which languages, the next one, a contact | Desktop |
| 5 | **Músico**: a pianist who heard one of his arrangements on YouTube | Aprender (buy) | Can I get that score, and what does it cost? | Work, price, his recording, a buy button | Either |
| 6 | **Quien encarga**: a singer, an event, a production that needs an arrangement | Contratar | Will he write it for me, and how do I ask? | Proof of craft and a short brief | Either |
| 7 | **Prensa**: a journalist or presenter writing a programme note | Contratar | Who is he, in citable form? | Full biography, facts, quotes, a kit contact | Desktop |

Rule carried over from the research (NN/g): **navigation is by task, never by audience.** People belong to several segments at once, and labels like "For students" make them choose who they are before they can act. The segments only name the menu and footer columns.

---

## Site map

Spanish at the root and English under `/en`, with the same slugs. URLs are proper nouns of the site, not translated copy (see *URL strategy*).

```
/                    Inicio — the summary
├── /fechas          Fechas — every upcoming date
├── /programas       Programas — what a presenter books
├── /clases          Clases — lessons, masterclasses, course
├── /partituras      Partituras — scores for sale
├── /encargos        Encargos — commission an arrangement
├── /bio             Biografía — the long form, with press
└── /contacto        Contacto — one route per intent
```

Seven task pages, each one level below home. Nothing sits deeper, so no route can take more than one click to reach a page.

**Not pages, on purpose:**

- **Escucha y ve** (video). It is the quickest "how does he play" answer on the site, so it lives on the landing page. Each score's recording is also linked from its row on `/partituras`.
- **Prensa** is a section of `/bio` (`/bio#prensa`). Three quotes also stay on the landing page as proof.
- **A page per Fecha and per Programa, the press kit, past dates, a newsletter.** Still out of scope, as in landing-page.md. The URL strategy below leaves room for them.

---

## Navigation model

### Primary: the header, every page, from 1100 px

`Fechas · Programas · Clases · Partituras · Encargos · Bio · Contacto`

- Seven items, every task page. This is what lets the deepest flow stay at three clicks without touching the menu.
- Order follows how often each job arrives (asistir → contratar → aprender → comprar → encargar), with *Bio* and *Contacto* closing the list, as in Víkingur Ólafsson's and Gabriela Montero's sites.
- The current page is marked with `aria-current="page"` and a 2 px underline, which answers "Where am I?". The audit asked for this.
- Labels are one word by rule. *Bio* is the one exception to "say what it contains". It is the convention on every pianist site we reviewed, and the page title says *Biografía*.

### Below 1100 px: the menu, and the landing page's Servicios

The seven labels don't fit beside the wordmark, so the header keeps only the hamburger. Two things keep phones within three clicks anyway:

- **The menu** holds every page, grouped by job (Asistir · Aprender · Contratar · Mauricio Nader). Opening it is one extra tap, so a phone user who never scrolls reaches any page in two clicks, not one.
- **Servicios**, the landing page's second screen, is a full-width door per page. On a phone it works as the visible navigation.

### Utility

- Language switch (`ES · EN`): in the menu and the footer, on every page, to the same page in the other language.
- Wordmark: links home from every page.

### Footer

The same four columns as the menu (Asistir · Aprender · Contratar · Mauricio Nader), now pointing at pages, then the closing wordmark and the bottom bar.

### Contextual links (the cross-links)

These links mix the jobs without going through navigation:

| From | To | Why |
|---|---|---|
| Fechas door, Programas *próximas fechas* | `/fechas` | Proof that the programme is live |
| Each video | its score on the store | The recording is the sample |
| Each score row | his recording | Same, in reverse |
| Bio closing | `/programas`, `/contacto` | Whoever reads a biography is usually a presenter |
| Clases › masterclass | the next masterclass in the calendar | Proof, and a date |
| Encargos intro | `/partituras` | The craft is proven by the scores |
| Contacto › Encargos | `/encargos` | One route per intent |

---

## Content hierarchy

### Inicio `/` — the summary

The landing page answers three questions in order: **who** (hero), **is he any good** (press), **what can I do with him** (Servicios). Everything after that is a sample of a page, never the page itself.

1. **Hero.** Eyebrow *Pianista · Concertista de Bellas Artes*, the name, the value line (*Del barroco al cine, en veintidós países y más de treinta discos*), then two CTAs: *Próximas fechas* (on-page) and *Contratar* (`/programas`). Who he is and why he matters, in five seconds.
2. **Prensa.** Three quotes from three countries. Proof comes before any ask.
3. **Servicios** (*Qué hace*). Five doors, each a full-panel link with a concrete hook:
   - **Conciertos** → `/fechas`, with the next date.
   - **Programas** → `/programas`, with the number of named programmes and the 28 concertos. Solid ink, because booking is the transaction.
   - **Clases** → `/clases`, with the next masterclass if one is scheduled.
   - **Partituras** → `/partituras`, with the count and the lowest price in the store.
   - **Encargos** → `/encargos`, naming the arrangements that prove the craft.
   
   This is the "what does he do and how" answer, and on a phone it doubles as navigation.
4. **Próximas fechas.** The next four dates in the listing grammar, each with its action button, so attending is **one click** from the landing page. Then *Ver todas las fechas*.
5. **Escucha y ve.** The featured player and four more. How he plays, before anyone reads about him.
6. **Bio, short.** The two approved paragraphs with the word reveal, then *Leer la biografía completa* → `/bio`.
7. **Contacto.** The four routes plus a direct line. Every route acts in one click: the booking form, WhatsApp, `/encargos`, the press email.

**What left the landing page:** the programme wall and the programmer band (→ `/programas`), the three lesson offers (→ `/clases`), the score listing (→ `/partituras`) and the brief form (→ `/encargos`). Each is represented on the landing page by its door.

### Fechas `/fechas`

1. Every upcoming date, grouped by month. The action button sits on each row, one click to tickets, enrolment or the map.
2. Nothing else. A page per Fecha is the next growth step.

### Programas `/programas`

1. The poster wall: the featured programme as a 2×2 block with its own next dates, then the rest. Each poster ends in *Solicitar*.
2. The programmer band: four numbers, *¿Programas una temporada?*, the emergency-replacement offer, then **Consultar disponibilidad** (his booking form) and **Pedir kit de prensa**.

### Clases `/clases`

1. Three offers side by side, each with one first step: lessons → WhatsApp, masterclasses → email, course → its rules page.
2. **How he teaches a masterclass**, from his 2026 CV: the four aims, given in Spanish or English. It answers "what does it involve" for persona 4.
3. Upcoming masterclasses and course sessions from the calendar, as a listing.
4. Proof: where his students went on to study, and his teaching post.

### Partituras `/partituras`

1. The listing: composer, work, type, price, *Escuchar*, *Comprar*.
2. A link to all 28 in the store, and a note on how payment works.

### Encargos `/encargos`

1. The intro (what he writes, the film work, how a fee is set) beside the numbered brief. Two submit buttons: WhatsApp and email.

### Biografía `/bio`

The long form that landing-page.md listed as *Trayectoria, not built*. It is for personas 2 and 7 above all: a presenter checking credentials, and a journalist who needs citable facts.

1. **Lead.** Who he is in three sentences, with a photograph.
2. **Numbers.** 22 countries · 30+ recordings · 800+ performances · 28 concertos.
3. **Trayectoria.** The narrative in five short paragraphs: beginnings, the international career, orchestras and premieres, institutions and teaching, composition and film.
4. **Datos.** Hairline rows, label left and list right: training, awards, orchestras, venues, recordings, film and TV, jury, ensembles. This part is for scanning, not reading.
5. **Prensa** (`#prensa`). Every verified quote, in its original language, with outlet, year and country.
6. **Close.** *Consultar disponibilidad* (booking form), *Pedir kit de prensa*, *Ver programas*.

### Contacto `/contacto`

1. His own line, *Siempre estoy disponible*.
2. Four route panels (Contratación solid, Clases y curso, Encargos, Prensa), then the direct line.

---

## User flows, with click counts

Counted from the landing page. One click is one link or button press. Typing in a form isn't a click.

| # | Persona | Goal | Path | Clicks |
|---|---|---|---|---|
| 1 | Asistente | Get to the next concert | Landing › Próximas fechas row › **Cómo llegar / Comprar boletos** | **1** |
| 1b | Asistente | A concert next season | Header **Fechas** › row › **Cómo llegar / Comprar boletos** | 2 |
| 2 | Programador | Ask for a specific programme | Header **Programas** › poster › **Solicitar** (email opens) › send | 3 |
| 2b | Programador | Check availability | Hero **Contratar** › **Consultar disponibilidad** (form) › submit | 3 |
| 3 | Alumno | Start lessons | Servicios **Clases** › **Escribir por WhatsApp** › send | 3 |
| 3b | Alumno | Start lessons, fastest | Contacto (landing) › **WhatsApp** › send | 2 |
| 4 | Escuela | Host a masterclass | Header **Clases** › **Organizar una masterclass** (email) › send | 3 |
| 5 | Músico | Buy the Huapango | Header **Partituras** › **Comprar** › pay (store) | 3 |
| 5b | Músico | Buy the score of the video playing | Landing video › **Partitura · $800** › pay | 2 |
| 6 | Quien encarga | Ask for an arrangement | Header **Encargos** › brief › **Enviar por WhatsApp** | 2 |
| 7 | Prensa | Read the full biography | Header **Bio** | 1 |
| 7b | Prensa | Get the press kit | Header **Bio** › **Pedir kit de prensa** (email) › send | 3 |

On phones, add one tap where the path starts in the header (open the menu), or start from Servicios instead, which costs a scroll and no extra click. The worst case in the table is the three-click ceiling, and no flow passes through the hamburger on desktop.

---

## Naming conventions

One word per concept, in the interface and in the code.

| Concept | ES label | EN label | Route | Notes |
|---|---|---|---|---|
| The calendar | Fechas | Dates | `/fechas` | *Fecha* as in CONTEXT.md, never "Eventos" |
| Bookable concert concepts | Programas | Programmes | `/programas` | Sense (a) of the open **Programa** question in CONTEXT.md. The works played on a night are never labelled with either word |
| Lessons, masterclasses, course | Clases | Lessons | `/clases` | Covers all three; masterclass stays *Masterclass* in both languages |
| Scores for sale | Partituras | Scores | `/partituras` | |
| Commissioned arrangements | Encargos | Commissions | `/encargos` | The menu's long form is *Encargos y arreglos* |
| The long biography | Bio (nav) · Biografía (title) | Bio · Biography | `/bio` | |
| Contact routes | Contacto | Contact | `/contacto` | |
| The landing's door section | Qué hace | What he does | `/#servicios` | Called *Servicios* in the code and docs; replaces *Puertas* |
| The CTA to read the bio | Leer la biografía completa | Read the full biography | — | Replaces *Pedir biografía completa* (email), now that the page exists |
| The hero's second CTA | Contratar | Book him | `/programas` | Was *Contactar*. The booking job is the one that pays, and Contacto is in the header |

---

## Component reuse

| Component | Used on | Difference |
|---|---|---|
| `Header` | every page | Takes the current path. Marks `aria-current="page"` |
| `Footer` | every page | — |
| `Listing` | `/`, `/fechas`, `/clases` | Landing: the next four. `/fechas`: everything. `/clases`: masterclasses and course sessions only |
| `Programas` | `/programas` | Heading level 1 on its page |
| `Clases`, `Partituras`, `Encargos`, `Contacto` | their own page. `Contacto` also on `/` | `as="h1"` on their own page, `h2` on the landing page |
| `Rows` (label/value hairline list) | `/clases`, `/bio` | Extracted from Clases |
| `Stats` (four numbers) | `/programas`, `/bio` | Extracted from the programmer band |
| `Servicios` | `/` only | The five doors |

---

## Content growth

| Grows | How fast | How the structure takes it |
|---|---|---|
| Fechas | ~15 per season | Landing shows four, `/fechas` lists all upcoming. Next: past dates under `/fechas/archivo`, a page per Fecha at `/fechas/[id]` |
| Programas | a few per year | The wall reflows. Next: `/programas/[slug]` with repertoire and video |
| Partituras | a few per year | The page lists a selection, the store holds all 28. With more than ~15 on the page, add filters by type, which is Anderson & Roe's pattern |
| Prensa | rarely | `/bio#prensa`. Moves to its own page when the press kit is built |
| Videos | weekly on YouTube | The landing keeps five, best first. The channel holds the rest |

## URL strategy

- **Pattern:** `/{page}` for Spanish, `/en/{page}` for English, **same Spanish slug in both**, which is the existing `/en/fechas` precedent. Slugs are names of the site's sections, like proper nouns, and a shared slug keeps the language switch a pure prefix swap. (Alternative considered: translated English slugs such as `/en/dates`. That doubles the rewrites and the route map for a marginal SEO gain on a site whose English audience is mostly presenters arriving from a link.)
- **Implementation:** routes live under `app/[lang]/`. `next.config.ts` rewrites each Spanish path to `/es/...` and redirects `/es/...` back, from one list of pages.
- **Future dynamic segments:** `/fechas/[id]`, `/programas/[slug]`.
- **No query parameters** until filtering exists.
- **Anchors** are for sections *inside* a page only: `/#fechas`, `/#escucha`, `/#contacto`, `/bio#prensa`.
