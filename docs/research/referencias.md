# Referencias — UI research per business area

Done 2026-10-06 for the move to Next.js. Two sources:

1. **Mobbin** (via its MCP), searching real production sites section by section — one search per business area. Mobbin's library is apps and company sites, so it carries the music platforms (TIDAL, DICE, Spotify, Deezer, Eventbrite, MasterClass) but **no individual pianist sites**.
2. **Real pianist sites**, checked directly to fill that gap, on top of the ones the first research already covered (Gabriela Montero, Anderson & Roe, Nahre Sol — see `nader-portfolio-research.html`).

Every reference below links to its Mobbin page. What we took from each is in **→** lines; the visual grammar stays *Peso y lista* ([ADR-0003](../adr/0003-visual-direction-peso-y-lista.md)), so a reference contributes structure, never colour.

---

## How the areas mix on one page

The research's rule holds: navigation by task, entry points by audience *inside* the home ([CONTEXT.md](../../CONTEXT.md)). The page reads as one argument:

| # | Section | Job | Why here |
|---|---|---|---|
| 1 | Hero | — | The name is the logo. Approved, unchanged. |
| 2 | Prensa | proof | Belongs to the hero; proof before any ask. |
| 3 | **Puertas** (new) | all three | One door per job, each with its most concrete next step. |
| 4 | Próximas fechas | Asistir | The hero's primary CTA lands here. |
| 5 | **Escucha y ve** (new) | Asistir | The "40-second video that tells you if you'll like it". |
| 6 | **Programas** + programmer band (new) | Contratar | What a presenter buys, then the numbers that close it. |
| 7 | Bio | proof | A breather between selling to presenters and to students. |
| 8 | **Clases** (new) | Aprender | Lessons, masterclasses, course — one first step each. |
| 9 | **Partituras** (new) | Aprender / comprar | Real store, real prices, his recording as the sample. |
| 10 | **Encargos** (new) | Contratar | The brief; the craft is proven by the scores just above. |
| 11 | **Contacto** (new) | all three | One route per intent, and a person's name. |
| 12 | Footer | — | Columns by segment; the name again, full width. |

Grounds alternate so the length reads as rhythm, not a wall: white → white (one black panel) → white → **black** → white → grey → **black** → white → grey → white → grey → **black**.

Cross-links do the mixing: the next date appears in its door; Piano de Película's poster lists its own dates; each video links to its score; the Huapango arrangement in the store is the proof in the commissions intro; every section ends in a named channel.

---

## 1 · Hero — identity

- [Freshman — Danik Bartolini](https://mobbin.com/sites/sections/cc46fe95-d2fb-46a6-927a-96c9bc6d5ecc): the name as the whole hero, heavy sans over light serif, portrait small below.
- [DICE — Yves Tumor case study](https://mobbin.com/sites/sections/43937985-b049-46f0-8adc-c0894537b24f): bio beside a B&W portrait, with two big numbers as proof.
- [TIDAL Unplugged — artist page](https://mobbin.com/sites/sections/99ba39e1-7c5d-4644-bbfb-96efc6944ab6), [Spotify artist page](https://mobbin.com/screens/fe4abce0-4277-42cd-949f-10d1398baa7a): name set over the photograph.

**→** Nothing changes: the approved hero (name first, CTAs under it, large hard-edged photo) is already the strongest version of this pattern. Spotify-style name-over-photo was tried in v1 and rejected.

## 2 · Asistir — the calendar

- [HoneyBook — events](https://mobbin.com/sites/sections/a2447ad3-a586-4e7d-b404-019ad43ea35b): month headings, one row per event, the action button at the right edge. The ETA Hoffmann structure, independently.
- [Sana — events](https://mobbin.com/sites/sections/199ca363-50b6-46bd-bca0-129c0ed49114): date and time in a left column, a large title, the address under it.
- [Figma — community events](https://mobbin.com/sites/sections/ba4404f1-b7b1-4a25-b627-9f28049b1e14): list/calendar toggle and filters by city and type.
- [Spotify — concert page](https://mobbin.com/screens/d58207f8-5a00-423f-8c9b-76ca71a898d5): the ticket vendor as a card with its state ("Sold out") and an outbound button.
- [Luma — event page](https://mobbin.com/screens/a02338c1-09a9-400f-a4a3-d9f52ea37820): calendar-tile date, venue, "Add to calendar".

**→** The listing is confirmed as built. Filters are not worth it at fourteen dates a season. Worth doing next: a page per Fecha with Spotify's vendor card for `Boletos` and Luma's "Add to calendar". Built now: schema.org `MusicEvent` markup, so dates can surface in Google's event results.

## 3 · Asistir — Escucha y ve

- [Front — video episodes](https://mobbin.com/sites/sections/24781215-8df6-44d4-a739-fa4858edff84) and [ClickUp — top videos](https://mobbin.com/sites/sections/aa9cd694-6450-4a59-bc6e-058671fbbaf6): one featured player, the rest as a list beside it.
- [TIDAL Unplugged — playlist](https://mobbin.com/sites/sections/9d0438ee-6f2d-4c57-8aaa-72c078be6690): numbered parts under the player.

**→** Featured player + list of five, best first (the EPK finding: presenters rarely pass the second clip). Nothing loads from YouTube until play is pressed. Thumbnails sit in greyscale so the band stays monochrome.

## 4 · Contratar — Programas

- [Mailchimp Presents — all shows](https://mobbin.com/sites/sections/b58f9a7a-5955-4405-a0ac-7a456981339d): a poster wall where every show has its own typographic identity.
- [Tines — featured series](https://mobbin.com/sites/sections/917693fd-349f-4014-94ea-40cac5bef02d): poster, then title and two lines of description.
- [HBO Max — catalogue](https://mobbin.com/sites/sections/34fc7a4c-3764-44d5-b8d2-f8deb4763f71): density without clutter.

**→** A typographic poster wall (no images — we have none per programme): the most active programme takes a 2×2 block and lists its own next dates; the others alternate ink / white / grey so no two black posters touch. Names keep his casing (*MAKROpiano*, *pianoffortissimo* with its *ff* in the italic serif).

## 5 · Contratar — the programmer's band

- [Legora](https://mobbin.com/sites/sections/2cf16054-0dd8-4dcc-8358-a8fbb6dad125), [Amplemarket](https://mobbin.com/sites/sections/7630befa-a79e-459c-bacc-77d9ee066b5b): three or four big numbers, small labels.
- [MindMarket — brief form](https://mobbin.com/sites/sections/bc445547-9b42-470d-94c4-0fa7704b0d14): "Current availability: 3 project slots for December".

**→** 22 países · 30+ discos · 800+ presentaciones · 28 conciertos con orquesta, then the emergency-replacement offer (from his own site, and the most sellable fact he has). MindMarket's availability line is the right next step once he gives us real availability — not invented.

## 6 · Contratar — Kit de prensa

- [Current — press images & contact](https://mobbin.com/sites/sections/7daa49ad-c419-4a2f-ba61-d973e99ec2f1): monochrome rows, black "Download" pills.
- [15Five](https://mobbin.com/sites/sections/ef87dd1f-e390-4e0e-911d-412bb9548cea), [OpenPhone](https://mobbin.com/sites/sections/d4cc4db6-a969-4945-aae6-dabf76b9b472): kit and a named press contact side by side.

**→** The kit is a page, not a PDF (EPK consensus). It needs the photo shoot ([imagenes.md](../content/imagenes.md)) before it can exist; until then "Pedir kit de prensa" opens an email, which is itself a lead.

## 7 · Aprender — Clases

- [HoneyBook — class page](https://mobbin.com/sites/sections/6dfbfd40-07f4-43fb-861f-6fa0cdc072c4): "Reserve your spot" as a short list — instructor, length, level, when.
- [Sketch — course](https://mobbin.com/sites/sections/8b4af20d-ae36-49e6-8c5c-cdca70a4d64e): a details card with one CTA.
- [MasterClass — class page](https://mobbin.com/screens/954b6247-a0dc-4ac3-8d31-e9e1eeaf8681): the teacher's name huge, "Teaches …", trailer.
- [Calendly — booking](https://mobbin.com/screens/254dc09b-8dd5-4057-a1e6-261900b61f18): one event type, date, time slots.

**→** Three offers on hairline detail rows, one first step each: WhatsApp for private lessons, his institution's contact for masterclasses (with the next one pulled from the calendar), the course's own rules page. Calendly / cal.com belongs here only once a paid diagnostic lesson exists (open decision 3 and 5 of the first research).

## 8 · Aprender — Partituras

- [Klarna](https://mobbin.com/sites/sections/c39270b0-f69d-4ab5-9991-b3669ee6ded0), [Teachable](https://mobbin.com/sites/sections/fdf9f7c7-623a-4ff0-b0d2-14c125bf0574), [Cosmos](https://mobbin.com/sites/sections/57934ff2-ce19-430d-911f-d6c7fb1c8ae0): product grids.

**→** Not a grid: a listing in the calendar's own grammar — composer, work, type, price, *Escuchar*, *Comprar*. Anderson & Roe's rule from the first research decides it: the recording is the free sample, so every score he plays on YouTube sits next to its video.

## 9 · Contratar — Encargos

- [Büro — project brief](https://mobbin.com/sites/sections/02b4f59f-4535-4b13-8139-43a63c310be5): numbered rows (01–08) on hairlines, question left, options right. Pure *Peso y lista*.
- [Fiasco](https://mobbin.com/sites/sections/0eedc91f-6597-4066-a19d-bef70f75db55): pill chips for service, budget and timeframe.
- [Studio Freight](https://mobbin.com/sites/sections/4496ab63-aada-4e07-933b-c32a13e535b5): inquiry form plus an FAQ by inquiry type.

**→** Büro's numbered rows with Fiasco's chips: what, what for, which instruments, by when, details, name. No backend — it composes the brief into a WhatsApp message or an email, ready to send, and stores nothing.

## 10 · Contacto

- [V7 — contact](https://mobbin.com/sites/sections/06bea4bb-915e-4136-875e-7ab904afbf91): three square panels, the sales one solid black.
- [Grammarly](https://mobbin.com/sites/sections/a4cd89e3-9e7f-47af-99d3-f2f6e59f8aac), [Linear](https://mobbin.com/sites/sections/1be01816-199c-4c7b-ab63-8e5bb74222a8): Press / Support / Sales as separate routes.
- [Fluz](https://mobbin.com/sites/sections/0af4a382-ba43-4bdf-be0a-bec23369121e): WhatsApp as its own route, next to chat and email.

**→** Four panels — Contratación (solid), Clases y curso, Encargos, Prensa — then a direct line with his phone and email, under his own words from his contact page: *"Gracias por visitar mi página. Siempre estoy disponible."*

## 11 · Puertas and footer

- [Udemy](https://mobbin.com/sites/sections/ec6f1bc2-4ac6-4724-a1eb-812877b869e3), [Intercom](https://mobbin.com/sites/sections/5bb0a579-847f-4404-89d2-9612415bd44c): three side-by-side entry points by goal.
- [Ditto — footer](https://mobbin.com/sites/sections/5a66fc44-ead0-4f5e-a49c-4f2288565a98): the wordmark at full width under the link columns.
- [Spade](https://mobbin.com/sites/sections/6d088b40-a574-4e35-905c-bff022cfc5d5), [Fiasco](https://mobbin.com/sites/sections/af0c1930-9ed3-4ed4-9af0-dfbc96b3a625): newsletter in the footer.

**→** Puertas uses V7's panels again (the contratar door solid) so the page opens and closes on the same device. The footer keeps the approved grid and adds Ditto's closing wordmark. A newsletter (Nahre Sol's main CTA) waits for a provider decision.

---

## Real pianist sites

| Site | Navigation | What it settles |
|---|---|---|
| vikingurolafsson.com | Music · On Tour · Videos · News · Newsletter · **Shop** · Contact | Commerce in the main nav; tour rows with external "Buy tickets"; newsletter prompt. Why *Partituras* is now a top-level nav item. |
| yujawang.com | The Latest · Calendar · About · Listen · Connect | Five short items, press as "the latest". Confirms the five-item nav. |
| gabrielamontero.com | Biography · Schedule · CD · Video · Gallery · Press · Contact | Past dates as credibility; representation in the footer. |
| andersonroe.com | — | Every score next to the video of them playing it. |
| nahresol.com | Home · About · Store · Courses · Blog · Contact | Teaching and commerce in the nav; the email list as the main CTA. |

## Real content found for the new sections

Everything the new sections say comes from his own channels — sources in [servicios.md](../content/servicios.md). The headline finds:

- **The score store is real and priced**: 28 listings on Lemon Squeezy, MX$150–1,200, most with a YouTube link to him playing it.
- **His YouTube channel has 191 videos.** The most watched is his own arrangement of Moncayo's *Huapango* (≈11 k views) — which is also a score for sale.
- **His site already states an emergency-replacement offer** ("used to work under pressure… immediate programming due to the sudden cancellation by another pianist"). It was buried on a page called *Additional information*.
- **Real contact routes exist**: a booking form per language (Zoho), a general email, a course email, a mobile number.
