# Typefaces: substitute, don't license

The reference sites are built on commercial type we are not buying. The faces were identified from their font binaries:

| Reference | Their face | Foundry | Ours |
|---|---|---|---|
| davidsenra.com wordmark | **Schmalfette Grotesk Bold Cond** — Diorama Type Partners' digitisation of Haettenschweiler's 1954 original | Diorama | **Anton** |
| davidsenra.com body | **TT Commons Pro** | TypeType, via Adobe Typekit | **Archivo** |
| ETA Hoffmann headings | **Freight Display Pro** (Book / Medium) | Joshua Darden, Phil's Fonts | **Newsreader** |
| ETA Hoffmann body | **Söhne** (Buch / Kräftig) | Klim Type Foundry | **Archivo** |

**Decision: substitute with Google Fonts. Do not license.** All four originals are paid, two are served through a Typekit subscription, and none is load-bearing enough to justify the cost or the web-font licensing admin on a one-person site.

## Consequences

- **Anton** is the closest free face to Schmalfette Grotesk — the same 1954 Haettenschweiler lineage, heaviness baked into a single weight, no bold to request. It is not as tightly drawn. Accepted.
- **Archivo** covers both sans roles. It is a neo-grotesque of the same family as Söhne, and it is drawn by Omnibus-Type alongside Anton, so the display/body pairing is a designed relationship rather than a coincidence. That is the real reason to prefer it over Inter, which is also structurally close to Söhne but is on the house list of overused faces.
- **Newsreader** replaces Freight Display. Freight has higher stroke contrast; Newsreader is warmer and less used than the obvious substitutes (Playfair, Spectral). Accepted.
- Three families, one job each. If anyone later proposes a fourth, the answer is no unless a role is genuinely unserved.

## One deviation from the ETA reference, adopted deliberately

In the ETA listing the **month heading is the serif and the day label is the sans** — `.list-play-dates-days h5` explicitly overrides the global serif to Söhne. Our first draft had both in the editorial serif. We follow the reference: **month in Newsreader, day label in Archivo Medium.** The serif marks the section, the sans carries the data, and the listing reads less like a wedding invitation.

## Rejected: matching Senra's hero size literally

His wordmark is `font-size: 280px` fixed, and at that size "DAVID SENRA" measures ~851px — about 59% of a 1440px viewport, not full-bleed. Ours runs wider relative to the page. The client's note was that the *photo* was too small, not that the name was too big, so the larger name stays.
