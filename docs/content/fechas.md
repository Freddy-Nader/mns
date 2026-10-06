# Fechas — his real calendar

Scraped from https://mauricionader.net/concert-calendar on 2026-09-22. Every weekday was checked against the 2026 calendar and all fourteen match, so the undated entries are 2026; the last entry says 2027 explicitly.

## The full listing

| # | Fecha | Hora | Título (verbatim) | Recinto | Ciudad | Acceso |
|---|---|---|---|---|---|---|
| 1 | mar 22 sep 2026 | 10:00 | Masterclass | Auditorio Silvestre Revueltas, Conservatorio Nacional de Música | CDMX | — |
| 2 | jue 24 sep | 20:00 | Piano de Película | Instituto Mexicano para la Justicia / Bishman Wealth, Coyoacán | CDMX | — |
| 3 | vie 25 sep | 12:00 | Piano de Película — «Geometría del Aire» | Castillo de Chapultepec | CDMX | — |
| 4 | sáb 3 oct | — | Curso virtual, Academia Piano Creativo | En línea | — | Inscripción |
| 5 | jue 15 oct | 20:00 | Flute & Piano — Feria del Libro de Monterrey | Museo de Arte Contemporáneo (MARCO) | Monterrey, N.L. | — |
| 6 | jue 22 oct | 19:00 | Filosofía y Música | Casa de Tabasco en México «Carlos Pellicer» | CDMX | **Entrada libre** |
| 7 | vie 30 oct | 19:00 | Ponce: Concierto para piano | Orquesta Sinfónica del Estado de México | Toluca | — |
| 8 | vie 30 oct | 19:00 | Piano de Película | Librería Rosario Castellanos, FCE | CDMX | — |
| 9 | vie 20 nov | 10:00 | Masterclass — Festival Internacional de Piano En Blanco y Negro | Auditorio Blas Galindo, Cenart | CDMX | — |
| 10 | dom 22 nov | 18:00 | Festival «En Blanco y Negro» | Auditorio Blas Galindo, Cenart | CDMX | — |
| 11 | jue 26 nov | 19:00 | Filosofía y Música | Museo Iconográfico del Quijote | Guanajuato, Gto. | **Entrada libre** |
| 12 | dom 6 dic | 18:00 | La música de Eduardo Soto Millán | Sala Manuel M. Ponce, Palacio de Bellas Artes | CDMX | — |
| 13 | dom 13 dic | 18:00 | Ocho décadas del INBAL | Sala Manuel M. Ponce, Palacio de Bellas Artes | CDMX | — |
| 14 | jue 18 feb **2027** | — | Ponce: Piano Concerto | Teatro Centro de Arte | Guayaquil, Ecuador | — |

The landing page shows #2 through #8 — September and October.

## ⚠️ The prices on the landing page are invented

The client asked for sample prices so the layout could be judged. **Every peso figure on the page was made up by me and has no source.** As of now:

| Fecha | Precio mostrado | Real? |
|---|---|---|
| 24 sep | $450 MXN | inventado |
| 25 sep | $120 MXN | inventado |
| 3 oct (curso) | $1,200 MXN | inventado |
| 15 oct | $280 MXN | inventado |
| 22 oct | Entrada libre | **real**, de su sitio |
| 30 oct, Toluca | $350 MXN | inventado |
| 30 oct, FCE | Taquilla · $200 MXN | inventado |

They must be replaced with real figures, or removed, before the page is shown to anyone who might believe them.

## Two findings that change the build

**1. There is no access data at all.** No ticket links, no prices, no phone numbers, no "informes" contacts anywhere on the calendar. The only outbound links are Google Maps venue pins. Two entries say ENTRADA LIBRE; the other twelve say nothing about how to get in.

This is the single biggest content gap on the site. The `Acceso` field ([CONTEXT.md](../../CONTEXT.md)) has four states and today we can fill in two rows out of fourteen honestly. The page first rendered `[ACCESO POR CONFIRMAR]` to keep the gap visible; the client asked for invented prices instead, which is why the warning above exists.

**2. October 30 is double-booked.** Two events, both at 19:00, one in Toluca with the OSEM and one in Mexico City at the FCE bookshop. That is exactly as printed on his own site. Either one is wrong or one has a different hour — it needs to be asked, not guessed.

This is why the listing uses the ETA Hoffmann day-group structure: one date cell, several events stacked beneath it. Both events render under a single "Vie 30." instead of appearing as a duplicated row.

## Programme notes as printed

- **Piano de Película** (#2, #3, #8, and #10's festival slot): "LEMONNIER: Cuatro piezas para piano / RAVEL: Bolero / ADDINSELL: Concierto de Varsovia / BERNSTEIN: West Side Story — *Arreglos para piano de Mauricio Náder*". The poster adds a subtitle absent from the text listing: **"A 80 años del fallecimiento de Manuel de Falla"**, plus a Falla set (Tres escenas de *El amor brujo*).
- **#3**: "«Geometría del Aire» / Evento en torno a la compositora mexicana Gabriela Ortiz"
- **#4**: "CURSO VIRTUAL para pianistas y grupos de cámara / Dirigido a niños y jóvenes estudiantes internos de la Academia"
- **#6, #11 — Filosofía y Música**: "Gerardo Martínez Cristerna, filósofo / Mauricio Náder, pianista / ENTRADA LIBRE". The poster gives the full title: **"La Enfermedad del Pensamiento y la Música como Esperanza"**.
- **#7**: "Orquesta Sinfónica del Estado de México / Rodrigo Macías, conductor / Mauricio Náder, soloist"
- **#13**: homage to Mario Lavista, five years after his death — Lavista's *Jaula*, *Tango del adulterio*, *Tango rag*, *Cluster*, two *Preludios en recuerdo de Eduardo Mata*, *Pieza para un(a) Pianista y un Piano*, alongside Náder's own *Silencio imaginario* and *Transfiguración sobre el Preludio No. 4 de Chopin*.
- **#14**: "Orquesta Filarmónica Municipal de Guayaquil / Manuel Campos Loor, director titular"

## Questions for Mauricio

1. Access and price for every date that has neither.
2. October 30 — which is right, Toluca or CDMX?
3. October 3 and February 18 have no time.
4. Is entry #1 (Sept 22 masterclass) still on? It was today as of scraping.
