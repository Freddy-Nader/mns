# Mauricio Nader — sitio

The public website of Mauricio Nader, Mexican concert pianist. It serves three jobs at once: getting people to a concert, getting him hired by presenters, and taking on students and commissioned arrangements.

Docs are written in English; domain terms stay in Spanish, because Spanish is the site's primary language and the terms are what the client and the content model actually use.

## Language

**Mauricio Nader**:
The artist and the wordmark, written without the accent, in every context: wordmark, body copy, URLs, metadata, both language versions of the site.
_Avoid_: Mauricio Náder, Náder, Mauricio Nader Schekaibán, M. Nader

**Náder**:
Not used on the site. Appears only when quoting a third party verbatim — INBA press releases and Mexican press print it this way and quotes are never altered.

### The calendar

**Fecha**:
One dated appearance in the calendar, whatever kind: a recital, a concert with orchestra, a masterclass, a course session, a talk. The calendar holds all of them; the `tipo` field distinguishes them.
_Avoid_: Evento, concierto (as the generic), show, presentación

**Acceso**:
How a person gets into a Fecha. Exactly four states: `Entrada libre` · `Boletos` (external link) · `Taquilla` (pay at the venue) · `Inscripción` (masterclasses and courses). Every Fecha carries exactly one.
_Avoid_: Precio, tickets, admisión

**Recinto**:
The venue a Fecha happens in — a named place with an address and a city.
_Avoid_: Sede, lugar, locación, espacio

### Audience segments

**Asistir · Aprender · Contratar**:
The three jobs visitors come to do, from the research. They name the footer and the full-menu columns. They are never used as top-level navigation — navigation is by task, not by audience.
_Avoid_: Público / Alumnos / Programadores as navigation labels

## Open terminology

**Programa** — unresolved collision, needs a decision.
It currently means two different things: (a) one of his named, bookable concert concepts — *Piano de Película*, *MAKROpiano*, *Mexican Piano* — and (b) the list of works played on a given night. The header nav uses the singular "Programa" for sense (a). Proposal, not yet agreed: **Programa** = the named bookable concept, **Repertorio** = the works played. Until this is settled, do not introduce either word into new content.
