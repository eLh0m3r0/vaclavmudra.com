# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — the prospective client, deciding whether to write.** An SME owner or
manager, or a contact inside a Czech IT integrator working on state
administration systems. They arrived on a referral, from a LinkedIn profile, or
from an e-mail signature, and they are checking whether Václav is the right
person before sending the first message. A successful visit ends in an inbound
inquiry to `hello@vaclavmudra.com`.

**Close second — the verifier.** A recruiter, contracting partner, or
counterparty who already has the name and is confirming the person is credible
and real. They may never write from the site itself; success is that they leave
confident and continue on LinkedIn, by CV, or in a meeting already underway.

These two are served jointly: the page must persuade the prospect without ever
reading as a sales page to the verifier.

**Tertiary — peers and the curious.** Colleagues, Geodaily readers, people who
met Václav somewhere. Success is that they understand what he builds and open a
project link.

## Product Purpose

A personal site with two simultaneous jobs: a **business card** (who he is, what
he does professionally, how to reach him) and a **hub** (`rozcestník`) pointing
to the publicly available projects on their own domains.

It is explicitly **not** a designer's portfolio and **not** a SaaS landing page.
It is a well-made personal page belonging to someone who builds things.

## Positioning

**Shipped products as proof.** Assoluto, Dochazka.net, DissConnect, Geodaily and
Genesis Factory are running things anyone can open — not claims on a slide. A
neighboring Czech IT consultant can describe the same competencies; almost none
can hand over live URLs to products they built and operate themselves.

Two supporting facts that make the claim credible, and that future work should
keep visible without turning either into the headline:

- Analysis and architecture *and* implementation — ArchiMate models and
  specifications down through the SQL and the UI, where the market usually
  splits those into two people.
- Three worlds at once — private-sector SME, state administration, and his own
  products, simultaneously, each informing the others.

## Operating Context

- Fully bilingual from the first iteration. Czech is primary at `/`, English is
  a parallel mutation at `/en/`. The EN version is a natural-sounding sibling,
  not a literal translation; both ship together, never "EN later".
- Single page with anchored sections; navigation lives in a sticky header.
- Visitors typically arrive with the name already in hand, mid-evaluation, often
  between other tasks — after a referral, from LinkedIn, or from a signature.
- Static hosting on GitHub Pages from the root of `main`; `git push` deploys.
  `CNAME` handles the apex domain `vaclavmudra.com`.
- The archived v4 design lives at `/old/` under `noindex` and outside
  `sitemap.xml`.

## Capabilities and Constraints

**Technical**

- Plain static HTML + CSS + vanilla JS. No framework, no build step, no
  package manager, no Tailwind.
- Zero external requests. No trackers, no analytics, no Google Fonts CDN — the
  "no trackers" line in the footer is meant literally. Fonts are self-hosted
  `woff2` (latin + latin-ext).
- Shared `styles.css` and `main.js` across both language mutations. JS budget
  ≤ 12 kB, no libraries.
- Performance budget: Lighthouse ≥ 95 on mobile in both mutations,
  LCP < 1.5 s, CLS ≈ 0, TBT < 200 ms.
- SEO surface that must survive any redesign: per-language `<title>` and
  description, canonical, CS/EN `hreflang` alternates, JSON-LD `Person`,
  OpenGraph/Twitter image, `sitemap.xml`, `robots.txt`.

**Content rules**

- **Never name end clients** — no ministries, no institutions, no SME firms he
  delivered to. Use general formulations ("information system of a central
  state administration authority", "ERP for a manufacturing group",
  "manufacturing company in northern Bohemia"). Names of *contracting* firms
  and IT integrators — Aricoma, European Code Factory, Deloitte CE — are
  allowed in the work history; they are not end clients.
- Phone number is deliberately absent from the site. It belongs on the CV and
  LinkedIn only.
- No contact form. Readable links only.
- Excluded by decision, not by omission: testimonials, "Hire me" CTA, stock
  photography, blog, Calendly embed, "now playing" widgets, skill bars,
  counters, typewriter effects, AI chatbot, any line about an own company /
  s.r.o.
- The project deck is **not** a fixed set of five. Entries will be added,
  removed, and change status (Live / Beta / WIP); treat it as a variable-length
  list. Everything else on the page — roles, timeline, education,
  certification, languages — is current as of July 2026.
- AI-generated or AI-powered projects (Geodaily, DissConnect) stay explicitly
  labelled as such. Transparency, not masking.

**Undecided**

- Whether the site ever grows past the single page (CV download, case studies,
  writing) is open. Nothing is planned.

## Brand Commitments

- Name: **Ing. Václav Mudra**. Prague, Czechia.
- Role string: **"Software Engineer & Solution Architect"** — kept in English in
  both language mutations; it is the internationally legible term and standard
  usage in the Czech tech market.
- Voice: factual and dry. Dry humor is fine. **No hyperbole** — "passionate
  about innovation", "thought leader", "leveraging synergies" and their
  relatives are banned in both languages.
- Czech typographic correctness is a product requirement, not a style choice:
  „quotes", em dash, non-breaking spaces after single-letter prepositions, no
  orphans in headings.
- Contact identity: `hello@vaclavmudra.com`, `cz.linkedin.com/in/vmudra`,
  `github.com/eLh0m3r0`.

## Evidence on Hand

- **Live product URLs** (the core proof): `assoluto.eu`, `dochazka.net`,
  `dissconnect.lol`, `buttondown.com/geodaily`,
  `github.com/eLh0m3r0/Genesis-Factory`.
- **Photograph** — `assets/photo-dog-720.jpeg` (original `assets/photo-dog.jpeg`):
  Václav outdoors in a forest with Kvido, his Boston terrier. Personal and
  informal by intent; explicitly not a corporate headshot, never a circle crop.
- **Social preview** — `assets/og-image.png` (1200×630), `assets/favicon.svg`.
- **Verifiable credentials** — Ing. in Project Management within the Systems
  Engineering & Informatics program (2017–2019, thesis: agile project
  management methods in audit engagements); Bc. in Systems Engineering
  (2014–2017, thesis: cloud computing in the SME sector); ArchiMate 3
  Practitioner (Level 2), 2024. Languages: CS native, EN full professional,
  FR limited, DE beginner.
- **Work history** as recorded in the page timeline, with contracting firms
  named and end clients not.
- **Source briefs** — `uploads/prompt-vaclavmudra-com-v4.md`,
  `uploads/prompt-vaclavmudra-com-v5-redesign.md`,
  `uploads/DESIGN-raycast.md` (v4-era design system, superseded).

**Absent — must not be fabricated:** testimonials, client logos, named
references, engagement metrics, case studies, revenue or user numbers, pricing,
awards, press coverage.

## Product Principles

1. **Proof over claim.** Every competency statement should be cashable against
   something the visitor can open, verify, or check. When a claim has no
   backing, cut the claim rather than dress it.
2. **A person with an opinion, not an output.** The site must not read as
   generic — neither as a template nor as something a prompt produced. That
   applies to copy and structure as much as to visuals.
3. **Discretion is part of the offer.** Client confidentiality is visible
   restraint: a prospective client should be able to infer that their own name
   would be treated the same way.
4. **Both languages are first-class.** A change that lands in one mutation and
   not the other is unfinished work.
5. **Literal minimalism.** No build step, no trackers, no external requests —
   the technical claims on the page are true statements about the page, and
   they stay true.

## Accessibility & Inclusion

- Contrast: body text ≥ 7:1, secondary ≥ 4.5:1; accent colors used on running
  text ≥ 4.5:1.
- Keyboard operable end to end with a visible focus indicator; no
  `outline: none` without a replacement.
- `prefers-reduced-motion` yields a fully static and fully usable page — no
  degraded or broken state.
- Decorative elements (canvas, marquee bands, stamp) are `aria-hidden` and
  carry an `sr-only` textual alternative where they convey information.
- Semantic HTML5; meaningful `alt` text written in the language of the mutation
  it appears in; skip link; `lang`/`hreflang` on language switch links.
