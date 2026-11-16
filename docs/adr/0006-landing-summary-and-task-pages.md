# The landing page summarises; each task gets its own page

Partly supersedes [landing-page.md](../design/landing-page.md)'s premise that "the home is one page that carries all three jobs".

By v2 the landing page had thirteen sections. Every business lived on it in full: the poster wall, the programmer band, three lesson offers, the score shop and the commissions brief. A visitor who came for one of those jobs had to scroll past the other four to find it. A visitor who came to find out *who he is* got the whole catalogue before an answer.

## Decision

- **The landing page is a summary.** It shows the hero, three press quotes, *Servicios* (one door per task page, each with a concrete hook), the next four dates, the video showcase, the short bio and the contact routes. Its job is to answer who he is, what he does and why he is worth it, then send the visitor to the right page.
- **One page per task:** `/fechas`, `/programas`, `/clases`, `/partituras`, `/encargos`, `/bio`, `/contacto`. Each is one level below home.
- **Every task page is in the header** from 1100 px, so no flow needs the menu on desktop. Below that, the menu and the Servicios doors carry it.
- **The three-click rule:** from the landing page, anyone reaches what they came for in at most three clicks (find the page, choose, act). The flows are counted in [information-architecture.md](../design/information-architecture.md).
- **Same Spanish slugs under `/en`**, following the existing `/en/fechas`.

## Consequences

- The long biography, which landing-page.md listed as *Trayectoria, not built*, now exists at `/bio`. The bio CTA reads *Leer la biografía completa* instead of opening an email.
- Sections became page components that take their heading level, so they work as `h1` on their own page and `h2` where they appear on the landing page.
- The landing page is shorter and has more links. Hiding content behind a click is a real cost. It is paid back by the doors: each one carries the most concrete fact of its page (the next date, a price, a count), so the summary still informs.
- Rejected: **keeping one page and adding a sticky in-page nav.** It is cheaper, but it keeps every visitor scrolling past every business, and it gives no URL to share for "his lessons" or "his scores".
- Rejected: **audience-based pages** (Para programadores / Para alumnos). Still rejected, for the research's NN/g reasons ([CONTEXT.md](../../CONTEXT.md)).
