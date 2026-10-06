# Design tokens — Mauricio Nader

Direction: *Peso y lista* (see [ADR-0003](../adr/0003-visual-direction-peso-y-lista.md)). Monochrome, weight-driven, editorial.

These are the authoritative values. Anything built for this site — by us or by another agent — takes its colours, type and spacing from here rather than inventing new ones.

## Colour

Pure neutrals, no hue bias, no chromatic accent. Emphasis comes from weight and from black fills.

| Token | Light | Dark section | Use |
|---|---|---|---|
| `--ink` | `#0A0A0A` | — | All primary text on white; the black of fills and pills |
| `--paper` | `#FFFFFF` | — | Page ground |
| `--paper-2` | `#F4F4F2` | — | Alternate section ground, image placeholder fill |
| `--dim` | `#6B6B6B` | — | Secondary text, captions, venue lines |
| `--hairline` | `#DCDCD8` | — | Row separators, dividers, outline buttons |
| `--ground-dark` | `#0A0A0A` | ground | Press band, bio band, footer |
| `--on-dark` | `#FAFAF8` | text | Text on dark |
| `--on-dark-dim` | `#6E6E6B` | text | The "not yet revealed" state of the bio scroll effect; footer secondary |
| `--on-dark-rule` | `#262624` | rule | Dividers on dark |

Dark mode: the site is already half-dark by composition. A viewer-level dark theme inverts `--paper`/`--ink` and keeps the dark bands as they are.

## Type

Three faces, each with one job. All from Google Fonts.

| Role | Face | Fallback stack | Where |
|---|---|---|---|
| Display | **Anton** (400, the only weight) | `Anton, 'Arial Narrow', Impact, sans-serif` | Hero name, section headings. Uppercase, tight tracking |
| Workhorse | **Archivo** (400/500/600/700) | `Archivo, 'Helvetica Neue', Arial, sans-serif` | Everything: nav, body, event titles, buttons, footer |
| Editorial | **Newsreader** (400 + 400 italic) | `Newsreader, Georgia, serif` | Month headings in the concert list; press pull-quotes |

Anton and Archivo are both Omnibus-Type and are drawn to sit together — this is a designed pairing, not an arbitrary one. Newsreader supplies the one editorial voice the listing needs, and nothing else uses it. All three substitute for commercial faces on the reference sites — see [ADR-0004](../adr/0004-typeface-substitutions.md).

**The day label is sans, not serif.** Month heading in Newsreader, day label (`Jue 24.`) in Archivo 500. This follows the ETA Hoffmann listing, which explicitly overrides its own global serif for the day cell. The serif marks the section; the sans carries the data.

### Scale

| Token | Size / line-height | Use |
|---|---|---|
| `--t-hero` | `clamp(64px, 13vw, 208px)` / `0.84` | Hero name only |
| `--t-display` | `clamp(38px, 6vw, 76px)` / `0.92` | Section headings |
| `--t-event` | `clamp(24px, 2.6vw, 38px)` / `1.1` | Event title in a listing row |
| `--t-month` | `clamp(32px, 5vw, 64px)` / `1.0` | Month heading, Newsreader |
| `--t-date` | `clamp(28px, 3.2vw, 44px)` / `1.0` | Day label, Archivo 500 |
| `--t-lead` | `clamp(20px, 2.1vw, 30px)` / `1.45` | Bio paragraphs, pull-quotes |
| `--t-body` | `17px` / `1.6` | Body copy |
| `--t-ui` | `15px` / `1.3` | Nav, buttons, venue lines |
| `--t-label` | `12px` / `1.2`, tracking `0.14em`, uppercase | Eyebrows, footer column headings |

Minimum body size on mobile is 16px. Minimum touch target is 44×44px.

## Space

8px base. Steps: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.

- Page gutter: `24px` mobile, `48px` tablet, `64px` desktop.
- Section vertical padding: `96px` mobile, `160px` desktop.
- Max content width: `1440px`; text columns cap at `68ch`, pull-quotes at `22ch`.

## Shape and motion

- **Radius**: `999px` on buttons and chips (pills, per both references). Everything else is square — `0`. No rounded cards.
- **Rules**: `1px solid var(--hairline)` between listing rows; `2px solid var(--ink)` under a listing's header row.
- **Buttons**: primary = solid `--ink`, text `--paper`, pill, `15px/600`, padding `16px 30px`. Secondary = transparent with `1px` border, same metrics. On dark, invert.
- **Motion**: one orchestrated effect only — the bio's word-by-word reveal on scroll (spec below). Everything else is a `150ms` opacity/colour transition on hover and focus. All of it disabled under `prefers-reduced-motion`.
- **Focus**: visible `2px` outline in `--ink` (or `--on-dark` on dark grounds), `2px` offset. Never removed.

## The bio reveal — exact spec

Lifted from the reference implementation (davidsenra.com), which runs GSAP `SplitText` + `ScrollTrigger` through Webflow's IX3 engine. We rebuilt it in vanilla JS with the same numbers and no dependencies.

The animated property is **opacity, not colour**: white text at 40% over black *is* the dim grey. Do not reimplement it as a colour transition.

| Parameter | Value |
|---|---|
| Split unit | words |
| From → to | `opacity: 0.4` → `1` |
| Per-word duration | `0.1` of the timeline |
| Stagger | `0.05` between words |
| Easing | linear |
| Scroll start | paragraph top enters the viewport bottom |
| Scroll end | paragraph bottom reaches the viewport middle |
| Scrub | smoothed, ~0.35 s exponential approach |
| Clamp | yes, progress pinned to `[0, 1]` |

Duration is **twice** the stagger, so each word's fade overlaps the next by half. That overlap is the whole effect — it is what makes it read as a wave instead of discrete pops. Changing either number without keeping the 2:1 ratio breaks it.

Under `prefers-reduced-motion: reduce` the mechanism never initialises and every word renders at full opacity.
