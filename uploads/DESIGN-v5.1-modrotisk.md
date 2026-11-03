---
name: vaclavmudra.com
description: Bright technical blueprint — cool white, ink, cobalt, acid; drafting grid, orthogonal joins, scroll choreography.
colors:
  cool-white: "#f5f7f6"
  cool-white-shade: "#eceeec"
  cool-ink: "#101413"
  ink-secondary: "#4c5551"
  ink-muted: "#68726e"
  hairline: "rgba(16, 20, 19, 0.13)"
  hairline-strong: "rgba(16, 20, 19, 0.38)"
  electric-cobalt: "#2547f0"
  cobalt-deep: "#1c36bd"
  acid-green: "#d7f94b"
typography:
  display:
    fontFamily: "Archivo, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(38px, 6.8vw, 96px)"
    fontWeight: 640
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 115"
  display-contact:
    fontFamily: "Archivo, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(44px, 8vw, 112px)"
    fontWeight: 680
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(36px, 6.2vw, 84px)"
    fontWeight: 680
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 110"
  address:
    fontFamily: "Archivo, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(22px, 4vw, 50px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 100"
  title:
    fontFamily: "Archivo, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(24px, 3.2vw, 40px)"
    fontWeight: 620
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 108"
  subtitle:
    fontFamily: "Archivo, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(19px, 2.1vw, 25px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 105"
  subtitle-wide:
    fontFamily: "Archivo, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(20px, 2.2vw, 26px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 105"
  body:
    fontFamily: "Instrument Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
    fontFeature: "'kern', 'liga'"
  body-lede:
    fontFamily: "Instrument Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(17px, 1.9vw, 20px)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-card:
    fontFamily: "Instrument Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(16px, 1.8vw, 19px)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  body-small:
    fontFamily: "Instrument Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  body-meta:
    fontFamily: "Instrument Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  role:
    fontFamily: "Archivo, -apple-system, Segoe UI, sans-serif"
    fontSize: "19px"
    fontWeight: 620
    lineHeight: 1.3
    letterSpacing: "normal"
    fontVariation: "'wdth' 105"
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  label-lg:
    fontFamily: "Spline Sans Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
  label-nav:
    fontFamily: "Spline Sans Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11.5px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.09em"
  label-sm:
    fontFamily: "Spline Sans Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  label-stamp:
    fontFamily: "Spline Sans Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "13.5px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.2em"
  glyph:
    fontFamily: "Instrument Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  glyph-lg:
    fontFamily: "Instrument Sans, -apple-system, Segoe UI, sans-serif"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  sharp: "0"
  circle: "50%"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  header: "56px"
  section-y: "clamp(80px, 11vh, 128px)"
  rule-gap: "18px"
  grid-unit: "64px"
  container: "1360px"
components:
  chip-acid:
    backgroundColor: "{colors.acid-green}"
    textColor: "{colors.cool-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "3px 9px"
  chip-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "2px 8px"
  chip-dashed:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "2px 8px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0 0 3px"
  nav-link-hover:
    textColor: "{colors.cool-ink}"
  lang-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "3px 8px"
  lang-toggle-active:
    backgroundColor: "{colors.cool-ink}"
    textColor: "{colors.acid-green}"
    rounded: "{rounded.sharp}"
    padding: "3px 8px"
  card-project:
    backgroundColor: "{colors.cool-white}"
    textColor: "{colors.cool-ink}"
    rounded: "{rounded.sharp}"
    padding: "28px 0 40px"
  card-project-alt:
    backgroundColor: "{colors.cool-white-shade}"
    textColor: "{colors.cool-ink}"
    rounded: "{rounded.sharp}"
    padding: "28px 0 40px"
  card-project-ink:
    backgroundColor: "{colors.cool-ink}"
    textColor: "{colors.cool-white}"
    rounded: "{rounded.sharp}"
    padding: "28px 0 40px"
  topstar:
    backgroundColor: "{colors.cool-white}"
    textColor: "{colors.electric-cobalt}"
    rounded: "{rounded.circle}"
    size: "48px"
  topstar-hover:
    backgroundColor: "{colors.acid-green}"
    textColor: "{colors.cool-ink}"
  skip-link:
    backgroundColor: "{colors.cool-ink}"
    textColor: "{colors.cool-white}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "10px 16px"
---

# Design System: vaclavmudra.com

## Overview

**Creative North Star: "Modrotisk"**

*Modrotisk* is the Czech word for indigo-resist block printing — a folk textile
craft where a resist paste is stamped onto cloth, the cloth is dipped in indigo,
and the pattern emerges as bright figures on a deep blue ground. Read literally,
the same word decomposes into *modrý* + *tisk*: **blue print**. Both readings
are load-bearing here. From the craft comes the discipline of a stamped mark, a
registration that either aligns or visibly does not, and ink that sits *in* the
surface rather than floating above it. From the literal reading comes the
drafting table: a 64px grid, orthogonal elbow joins as in an ArchiMate diagram,
registration crosses at the corners of every node, cobalt as the line weight of
a technical drawing.

The system is **bright, cool and orthogonal**. Cool white ground, cool-black
ink, one structural blue and one highlighter green. Depth is achieved by offset
and hairline rather than by blur: the About photograph carries a cobalt frame
displaced 12px down and right, exactly as a misregistered second pass would
print. There are no shadows anywhere in the stylesheet, no gradients other than
the grid's own fade-out mask, no grain, no glass. Nothing is rounded except two
things that are literally circles — the availability stamp and the
scroll-progress button.

The counter-position is explicit and was the reason for the redesign. This
replaced a dark, Raycast-inspired v4 whose genre — dark ground, glow blobs, a
grid of hairline-bordered cards, five rainbow accents, mono eyebrow labels — is
now the default output of any code-generating model. It also replaced an
intermediate v5 ("Papír a stroj": warm paper, Fraunces, vermilion) rejected for
sepia tones and typographic overacting. Brightness is the first differentiator;
the second is that the graphics carry meaning. The hero's animated canvas
schematic says *solution architect* without a word of copy, and it earns the
space a decorative illustration would have wasted.

**On the status of what follows:** every rule in this file describes the shipped
v5.1 system and holds until a deliberate decision replaces it. None of them is
sacred. They are named and stated forcefully because a design system that hedges
gets ignored, not because they are beyond revision — a future direction is free
to overturn any of them, as long as it does so on purpose and system-wide rather
than by drift on one section.

**Key Characteristics:**

- Bright cool-white ground; dark surfaces are the rare exception, not the mode
- Exactly two accents, each with one job: cobalt structures, acid pulses
- Zero radius everywhere except literal circles; zero shadows anywhere
- Depth by offset overprint and hairline, never by blur
- Full-bleed hairlines set the vertical rhythm; sections are separated by rules, not cards
- Three type roles on three faces: Archivo display, Instrument Sans text, Spline Sans Mono meta
- Graphics are technical artifacts (grid, registration crosses, stamp, schematic), not ornament
- Scroll produces motion in several directions and speeds at once; `prefers-reduced-motion` yields a complete static drawing

## Colors

A cold, high-contrast palette: two near-neutral grounds, a three-step ink ramp,
and two saturated accents that never trade jobs.

### Primary

- **Electric Cobalt** (`--blue`): the line weight of a technical drawing. It
  carries every structural signal — section indices (`01 — CO DĚLÁM`), the
  asterisk mark, the schematic's edges and travelling pulses, the availability
  stamp, the self-drawing timeline rail, the growing nav underline, the About
  photo's offset overprint frame, and every focus ring on a light ground. It is
  the color of things that hold the page together.
- **Cobalt Deep** (`--blue-deep`): hover state for cobalt objects only. It has
  no independent role.

### Secondary

- **Acid Green** (`--acid`): the highlighter. It appears as a ground beneath ink
  text and never as text itself — sector tags, the `● LIVE` status chip, the
  role words in the hero, the photo's caption label, the active language chip,
  the second marquee band, `::selection`, the contact e-mail's underline, the
  current-position markers on the timeline, the LLM node in the schematic, and
  the top-star's hover fill. Where cobalt is structure, acid is pulse: it marks
  what is alive right now.

### Neutral

- **Cool White** (`--bg`): the base surface. Deliberately not pure white — a
  cold green-tinted white, so the ink and cobalt read as printed rather than
  screen-lit. Also the text color on inverted ink surfaces.
- **Cool White Shade** (`--bg-2`): the alternating surface, used only to
  separate adjacent project cards in the sticky stack.
- **Cool Ink** (`--ink`): body text, all hairline borders at full strength, and
  the two inverted block surfaces.
- **Ink Secondary** (`--ink-2`): secondary and descriptive copy — ledes, list
  descriptions, timeline detail.
- **Ink Muted** (`--ink-3`): metadata that should recede — row numbers, section
  glosses, period labels, the inactive language chip, the registration crosses in
  the schematic. Measured at **4.62:1** on cool white, so it clears AA at the
  11–12px sizes it is actually used at. It was `#7f8985` (3.35:1) until the July
  2026 pass; that value failed the standard the project sets for itself while
  carrying work-history dates and certification years, which is exactly the text
  a verifier came to read. Recession is achieved by being the lightest *legible*
  step, not by being illegible.
- **Hairline** (`--line`): the drafting grid and internal dividers inside a
  section.
- **Hairline Strong** (`--line-strong`): structural rules — between sections,
  under section heads, between the two sector columns.

### Named Rules

**The Two Jobs Rule.** Cobalt structures, acid pulses. A third accent hue would
require deciding what job it does, and there is no third job. When a new element
needs color, it is asking to be either structure or pulse; decide which, then
use that accent.

**The Acid Never Speaks Rule.** Acid is a ground or an underline, never a text
color. As text on cool white it measures **1.11:1** — invisible. As a ground
under cool ink it measures **15.5:1**. The rule is a legibility fact wearing a
doctrine's clothes.

**The Two Ink Blocks Rule.** The inverted ink surface appears twice on the page
— the final project card and the contact section — and it lands because it is
rare. A third would make the page look like it has a dark theme it does not
have.

**The Inverse Opacity Ladder.** On ink surfaces, secondary text is cool white at
0.75, metadata at 0.6, muted at 0.5, and borders at 0.25. These are written as
literal `rgba(245, 247, 246, …)` in the stylesheet rather than as tokens; treat
the ladder as the token until it is promoted into one.

## Typography

**Display Font:** Archivo (variable, `wght 100–900`, `wdth 62–125`)
**Body Font:** Instrument Sans (variable, `wght 400–700`)
**Label/Mono Font:** Spline Sans Mono (`wght 400–600`)

All three are self-hosted variable `woff2` in latin and latin-ext subsets, with
`font-display: swap`; the two Archivo subsets and two Instrument Sans subsets
are preloaded. There is no font CDN — the "no trackers" line in the footer is a
factual claim about the page.

**Character:** Archivo is set wide and heavy — width axis between 105% and 115%,
weight 600 to 680 — so headings read as *stamped* rather than merely large. The
width axis is the signature move: it is what makes the display type feel
industrially set rather than defaulted. Instrument Sans underneath is quiet,
neutral, and slightly narrow, deliberately staying out of the way. Spline Sans
Mono handles every piece of metadata in uppercase with open tracking, which is
what gives the page its instrument-panel undertone.

### Hierarchy

- **Display** (Archivo 640, `wdth 115%`, `clamp(38px, 6.8vw, 96px)`, line-height 1,
  `-0.015em`, uppercase): the name in the hero, two lines in a single
  left-aligned block. Its close relative at 680 weight and `wdth 112%`,
  `clamp(44px, 8vw, 112px)`, is the contact heading.
- **Headline** (Archivo 680, `wdth 110%`, `clamp(36px, 6.2vw, 84px)`, line-height 1,
  `-0.015em`, mixed case): project names on the deck cards. Not uppercase —
  these are proper nouns and read as marks.
- **Title** (Archivo 620, `wdth 108%`, `clamp(24px, 3.2vw, 40px)`, line-height 1.1,
  `-0.01em`): section headings, always paired with a cobalt mono index to their
  left and a hairline beneath.
- **Subtitle** (Archivo 600, `wdth 105%`, `clamp(19px, 2.1vw, 25px)`, line-height 1.2):
  competency row titles, sector column headings, timeline roles (fixed 19px,
  line-height 1.3).
- **Body** (Instrument Sans 400, 17px, line-height 1.65): running copy. The lede
  variant is `clamp(17px, 1.9vw, 20px)` at line-height 1.6; descriptive copy
  drops to 15.5px. Measure is capped per block: 52–58ch for descriptions, 56ch
  for the hero lede, 54ch for card copy, 22ch for sector headings.
- **Label** (Spline Sans Mono 500, 12px, `0.08em`, uppercase): the `.mono`
  utility — indices, tags, URLs, periods, statuses. Variants: wordmark 13px/600
  at `0.1em`; nav 11.5px/500 at `0.09em`; marquee 13px/500 at `0.12em`; stamp
  text 13.5px/600 at `0.2em`; footer 11px at `0.05em` in sentence case, the one
  place mono is not uppercased.

### Named Rules

**The Width-Axis Rule.** Display type is set on Archivo's `wdth` axis between
105% and 115%, wider as it gets larger. Reaching for more presence means going
wider and heavier, not just bigger — the axis is what distinguishes this
setting from any default sans at a big size.

**The Third Voice Rule.** Every piece of metadata is mono, uppercase, and
tracked open. Anything that is a label, an index, a URL, a status, or a date
belongs to Spline Sans Mono; anything a person reads as a sentence belongs to
Instrument Sans. There is no overlap, which is what keeps the two from
competing. The footer is the one place mono is not uppercased.

**The Czech Typography Rule.** Correct Czech typesetting is a requirement, not a
finish: „low-high quotes", em dashes, non-breaking spaces after single-letter
prepositions (`v&nbsp;rámci`) and inside broken numerals and coordinates, and no
orphans in headings. The English mutation follows English conventions with the
same rigor. Both files carry these as literal entities in the markup.

## Layout

**Container and gutter.** Content is capped at 1360px with a fluid gutter of
`clamp(20px, 4vw, 48px)`. The sticky header is a fixed 56px, and
`scroll-padding-top: calc(56px + 16px)` keeps anchor targets clear of it.

**Rhythm by rule, not by card.** Vertical rhythm comes from full-bleed
horizontal hairlines. Each section is separated by a 1px `--line-strong` top
border and padded `clamp(80px, 11vh, 128px)` vertically. Section heads are a
baseline-aligned three-part row — cobalt mono index, Archivo title, muted mono
gloss pushed right by `margin-left: auto` — with 18px of space above their own
hairline. Nothing is enclosed in a bordered box; the page is organized by lines
across it, not containers within it.

**Asymmetric grids, per section.** No single column grid governs the page; each
section states its own proportion. Hero is `1.15fr 0.85fr`. About is
`0.9fr 1.1fr`. Sectors are `1fr 1fr` divided by a vertical hairline with
matching `clamp(32px, 5vw, 80px)` padding on the inner edge. The competency
register is `72px 1.1fr 1.3fr`, aligned on the baseline so the row number, title
and description sit on one optical line. Definition lists in the About sidebar
use `max-content 1fr`.

**The drafting grid.** A 64px square grid is painted with two `--line` gradients
in the hero only, centered at top, and erased downward by a
`linear-gradient(180deg, transparent 30%, var(--bg) 96%)` overlay. It
establishes the drawing-board premise once and then gets out of the way.

**Responsive behavior.** Breakpoints are per-component rather than global, each
placed where its own layout actually breaks: 920px (hero collapses to one
column, stamp repositions), 880px (About goes single-column), 860px (register
drops to `32px 1fr` with the description reflowing under the title), 760px (nav
reduces to Projects + Contact and the language chips take 44×44 hit areas,
sectors stack and swap their dividing hairline from left border to top border),
720px (head wraps and the mono gloss moves to its own full-width line, deck cards
grow to 70vh). The mobile navigation drops items rather than collapsing into a
hamburger — at 56px tall there is nothing to hide behind — and it never falls
below Projects + Contact: the page is ~9,000px long, and those two are the only
way to reach the proof and the CTA.

### Named Rules

**The Rule-Not-Card Rule.** Structure is expressed with lines across the page.
When a new block needs separating, give it a hairline and vertical space; do not
give it a border box, a background panel, or a radius.

**The Own-Proportion Rule.** Each section declares the grid its content wants.
Consistency lives in the gutter, the container, the rules, and the type — not in
a shared column count.

## Elevation & Depth

**There are no shadows in this system.** The stylesheet contains no `box-shadow`,
no `filter: blur()`, no backdrop filter, and no grain. Depth is entirely a
function of printing metaphors:

- **Offset overprint.** The About photograph sits in a 1px ink border with a
  second 1px cobalt border displaced `translate(12px, 12px)` behind it — a
  deliberate misregistration, which is what makes it read as printed rather
  than as a shadowed card.
- **Tonal layering.** Adjacent project cards alternate between cool white and
  cool white shade; the final card inverts to ink entirely. Surface change, not
  lift.
- **Physical stacking.** The project deck's depth is real: five `position: sticky`
  cards, each offset `calc(56px + var(--i) * 15px)` from the top, each with a
  1.5px ink top border, physically overlapping as you scroll. The stack is the
  elevation.
- **Grayscale conversion.** The photograph is `grayscale(1) contrast(1.05)`, so
  it recedes to the same ink-and-white register as everything else and the
  cobalt frame stays the only chromatic event in the frame.

### Named Rules

**The Offset-Not-Blur Rule.** Depth is produced by displacing a line, changing a
tone, or stacking a real surface. A shadow would introduce a light source the
page has otherwise decided not to have.

## Shapes

**Zero radius is the default.** Every rectangle in the system is square-cornered
— chips, cards, tags, the language toggle, the skip link, the photo frame, every
schematic node. Two elements are circular, both because they are literally
round objects: the availability stamp (a rotating rubber stamp) and the
scroll-progress button (a dial). `50%` and `0` are the only two radii in the
system; there is no intermediate step, and introducing one would soften the
drafting premise.

**Line weights are a scale.** 1px is the default hairline (borders, dividers,
schematic node outlines, registration crosses). 1.5px marks structure that is
being asserted — the schematic's cobalt edges, the hub circle, the project
cards' top borders. 2px is reserved for state: focus rings, the nav's grown
underline, the timeline's drawn line, the contact e-mail's resting underline
(which thickens to 6px on hover).

**Recurring geometry.** The asterisk `✳` is the system's mark: in the wordmark,
after the hero name, in section eyebrows, as the register's hover bullet, as the
rotating hub of the schematic, and as the scroll-progress glyph. Registration
crosses — two 6px crossed strokes — mark the top-left and bottom-right of every
schematic node. Connections between nodes are orthogonal elbows (out, across,
in) with a mid-height break, never diagonals or curves, matching ArchiMate
convention.

### Named Rules

**The Two-Radii Rule.** `0` for anything rectangular, `50%` for anything that is
a physical round object. No `4px`, no `8px`, no pills.

**The Orthogonal Rule.** Connections turn at right angles. No diagonals, no
bezier curves, no organic paths.

## Components

### Chips (tags and statuses)

- **Character:** stamped, tight, mono. A chip is a label pressed onto the page.
- **Acid chip:** acid ground, ink text, `3px 9px` padding, square corners. Used
  for sector tags, the `● LIVE` status, the photo caption, and highlighted role
  words in the hero. This is the loudest object in the system and it is small on
  purpose.
- **Outline chip:** transparent, secondary ink text, 1px `--line-strong` border,
  `2px 8px`. Used for `◐ BETA`.
- **Dashed chip:** identical to outline with a dashed border, for `○ WIP`. The
  status ladder reads at a glance: filled → outlined → dashed maps to live →
  beta → in progress, and the leading glyph (`●` / `◐` / `○`) repeats the same
  information without relying on color.
- **On ink surfaces:** the dashed chip switches to cool-white text with a
  0.5-alpha border.

### Cards (project deck)

- **Corner style:** square (`0`).
- **Background:** cool white, alternating to cool white shade; the last card
  inverts to ink with cool white text and a cool-white top border.
- **Border:** 1.5px ink top border only. No side or bottom borders — the card is
  a sheet laid on the page, not a box.
- **Shadow strategy:** none; see Elevation & Depth. Depth is the sticky stack.
- **Internal padding:** container gutter horizontally, `28px` top and `40px`
  bottom; minimum height `min(64vh, 600px)`, rising to `70vh` under 720px.
- **Structure:** mono head row (index / status) at top, oversized project name
  below it, description pushed to the bottom by `margin-top: auto`, mono foot
  row (tags / URL) above a hairline.
- **States:** the project name shifts to cobalt on hover — to acid on the ink
  card — and the `↗` glyph in the URL translates `3px, -3px`. A full-area
  `.cover` anchor makes the whole card clickable while keeping the accessible
  name on one element; `:focus-within` draws a 2px inset cobalt outline around
  the card.
- **Known trade-off:** because `.cover` spans the card, text inside it cannot be
  selected — a visitor cannot copy the domain by dragging. Accepted for now; the
  fix is to drop the overlay and make the address itself the link.
- **The card index is hand-typed** (`Projekt 01 / 05`). PRODUCT.md treats the
  deck as variable-length, so adding a sixth project means editing all five
  denominators by hand or they silently lie. A CSS counter would remove the
  hazard.

### Navigation

- **Style:** mono uppercase 11.5px at `0.09em`, secondary ink, in a 56px sticky
  header on cool white with a `--line-strong` bottom border.
- **Hover:** text darkens to full ink while a 2px cobalt underline grows from
  the left via `background-size` transition over 240ms. This growing underline
  is the system's standard link affordance; the text-link variant grows a 1px
  underline in `currentColor` over 280ms.
- **Language toggle:** two square mono chips, `3px 8px`, muted ink on a
  `--line` border. The active one inverts to ink ground with **acid** text —
  the single place acid is used as a text color, legible because it sits on ink
  at 15.5:1.
- **Mobile:** items are removed rather than collapsed — Projects and Contact
  remain at every width, with the language toggle always present and its chips
  expanded to 44×44 hit areas under 760px.

### Availability stamp

- **Character:** a rubber stamp caught mid-press.
- **Structure:** a circular SVG with `OTEVŘENÝ KE SPOLUPRÁCI ✳ VÁCLAV MUDRA ✳`
  set on a `textPath` around a 78px-radius circle with explicit `textLength` and
  `lengthAdjust="spacingAndGlyphs"`, a 96px outer ring at 2.5px, an inner 58px
  ring at 1.5px, and a centered asterisk.
- **Color and placement:** cobalt, deepening on hover; `clamp(104px, 9.5vw, 136px)`
  wide, positioned over the bottom-right corner of the hero schematic at a
  resting `-8deg`.
- **Behavior:** rotates once per 48s linearly, plus a scroll-velocity boost
  accumulated into a `--boost` custom property. It is a real link to the contact
  section, with an `aria-label` carrying the meaning the rotating text cannot.

### Photo frame

- **Character:** a print with a visible second pass.
- Grayscale image (`grayscale(1) contrast(1.05)`) in a 1px ink border, capped at
  360px wide, with a 1px cobalt border offset `12px, 12px` behind it via
  `::before` at `z-index: -1`.
- The caption is an acid chip positioned *inside* the image at `12px` from the
  bottom-left — a label stuck on the print, not a `Fig. 1` line beneath it.

### Competency register

- **Character:** an index in a technical document, not a grid of feature cards.
- Three-column baseline-aligned rows (`72px 1.1fr 1.3fr`) separated by 1px
  `--line`: muted mono number, Archivo subtitle, secondary-ink description.
- **Hover:** the title translates `14px` right over 320ms while a cobalt `✳`
  fades in at `left: -1em`, and the row number turns cobalt. Nothing about the
  row's box changes — the response is typographic.

### Timeline

- A 1px `--line` rail with a 2px cobalt line drawn over it, scaling from
  `transform-origin: top` in proportion to scroll position through the block.
  Entries are marked by 9px squares — cool white with an ink border, filled acid
  when the position is current. Two entries are current at once (the Aricoma
  engagement and the freelance practice), which is a fact about the timeline
  rather than a sorting error; the `→ dnes` label carries that, the marker only
  signals it by fill colour. Without JS the cobalt line renders complete
  (`html:not(.js)` sets `scaleY(1)`).

### Marquee bands

- Two counter-running rows between hairlines: the upper on cool white with
  secondary-ink text and cobalt asterisk separators running left, the lower on
  **acid** with ink text and ink separators running right, divided by a 1px ink
  border. Mono 13px at `0.12em`. Content is ordered, not random — the first band
  runs the stack from data layer to modeling, the second runs disciplines from
  analysis through architecture to delivery. The pair is `aria-hidden` with an
  `sr-only` paragraph carrying the same content in reading order.
- The counter-running pair is a pinned element of the v5.1 brief, not filler.
  Its content overlaps sections 01 and 02, but a marquee is read as texture
  rather than as information, so the overlap is not a cost. Removing one of the
  two was tried and reverted in July 2026: it destroyed the counter-running idea
  without resolving anything, since either both bands earn their place or
  neither does.

### Scroll-progress button

- 48px circle, cool white ground, 1px ink border, cobalt asterisk glyph at 24px,
  fixed 22px from the bottom-right. Fades in past 400px of scroll. The glyph
  rotates in direct proportion to document progress, so it reads as a dial.
  Hover fills it acid with ink glyph. Clicking scrolls to top.

### Contact e-mail

- Archivo at 500 weight and `wdth 100%` — lighter and narrower than any other
  display use, because it is an address rather than a headline —
  `clamp(22px, 4vw, 50px)`, cool white on ink, over a resting 2px acid
  underline that thickens to 6px while the text itself turns acid on hover.
  Clicking both follows the `mailto:` and copies the address to the clipboard.
  **The confirmation fires only when the write actually resolves** — the label is
  left alone on rejection, because a swallowed failure that still reports
  "zkopírováno" is worse than no feedback.
- The `mailto:` carries a `?subject=` so the compose window is never blank.
- **Open gap:** the block offers an address and nothing else — no response
  expectation, no engagement shape, no prompt for what to write. Availability is
  stated only 8,000px earlier, on a rotating textPath where it cannot be read.
  Closing this needs a commitment only Václav can make, so it stays open rather
  than being filled with invented copy.

### Focus treatment

- 2px solid cobalt outline at `3px` offset on light grounds, switching to acid
  inside ink sections. The deck card uses a 2px inset cobalt outline via
  `:focus-within` because its clickable area is a full-bleed overlay. The skip
  link is an ink-on-cool-white mono chip that slides down from `-48px` to `12px`
  on focus.

## Do's and Don'ts

These are the conventions of the shipped v5.1 system. They are worth following
by default and worth overturning deliberately — as a system-wide decision, not
as an exception on one section.

### Do:

- **Do** give each accent its one job: cobalt for structure (links, indices,
  rails, connections, focus), acid for pulse (chips, live status, underlines,
  selection).
- **Do** put acid behind ink text rather than in it — as a ground or an
  underline. The one exception in the system, acid text on an ink ground in the
  active language chip, works because the contrast is 15.5:1.
- **Do** separate blocks with a full-bleed hairline and vertical space.
  `--line-strong` for structure, `--line` for internal dividers.
- **Do** set display type on Archivo's width axis (105–115%) as well as its
  weight when it needs more presence.
- **Do** keep every label, index, URL, status and date in Spline Sans Mono,
  uppercase, tracked at `0.08em` or wider.
- **Do** cap measure per block — 52–58ch for descriptions, ~56ch for ledes,
  ~22ch for display-set headings.
- **Do** create depth by offsetting a line, changing a tone, or stacking a real
  surface.
- **Do** give every new section the staggered reveal (`data-reveal` plus a
  `--i` index, 70ms apart over 700ms). A dedicated scroll behavior — a sticky
  stack, a self-drawing line — is earned by content that genuinely justifies
  one, not granted by default.
- **Do** hide decorative motion from assistive technology (`aria-hidden`) and
  provide an `sr-only` equivalent whenever it carries real content.
- **Do** encode status redundantly — glyph *and* border treatment *and* color,
  as in `● LIVE` / `◐ BETA` / `○ WIP`.
- **Do** run new motion through the single `requestAnimationFrame` loop in
  `main.js`, animate only `transform` and `opacity`, cache measurements outside
  the loop, and keep the `try/catch` so one bad frame cannot kill the sequence.
- **Do** verify that `prefers-reduced-motion` leaves a complete, usable static
  page — the schematic fully drawn, the timeline line at full height, bands and
  glyphs untransformed.
- **Do** keep the non-JS path intact: `.js` gates the reveal and rise
  animations, so content is visible when the class never lands.

### Don't:

- **Don't** add a third accent hue. If a new element needs color, decide whether
  it is structure or pulse and use that accent.
- **Don't** introduce `box-shadow`, `blur`, backdrop filters, or grain. The page
  has decided not to have a light source.
- **Don't** use a radius between `0` and `50%`. No `4px`, no `8px`, no pills.
- **Don't** enclose content in bordered boxes or background panels to group it —
  that was the v4 card-grid pattern this design replaced.
- **Don't** add a third inverted ink surface. Two is what keeps them rare enough
  to register.
- **Don't** tile the 64px drafting grid beyond the hero, where it fades out by
  design.
- **Don't** draw a diagonal or curved connection. Elbows turn at right angles.
- **Don't** put the photograph in the hero or crop it to a circle — it belongs
  in About, rectangular, grayscale, in its offset frame.
- **Don't** let a decorative element overlap a meaning-carrying one. The stamp
  and the schematic are both cobalt; where they overlapped, a visitor read it as
  a rendering bug, not as intentional misregistration.
- **Don't** place load-bearing text in `--ink-3` at display sizes below 11px, and
  don't reintroduce a muted token that fails 4.5:1. Recession is the lightest
  legible step, not an illegible one.
- **Don't** load a font, script, or image from a third-party origin. Zero
  external requests is a claim the footer makes literally.
- **Don't** let a change land in one language mutation only. `index.html` and
  `en/index.html` share `styles.css` and `main.js`; a structural edit to one is
  unfinished until the other matches.
- **Don't** reintroduce the v4 dark-glow vocabulary or the rejected v5 warm-paper
  vocabulary. Both are anti-references on record.
