# Zadání: Redesign `vaclavmudra.com` (v5.1) — „Modrotisk"

> **Changelog:** v5 „Papír a stroj" (teplý papír, Fraunces, rumělka) zamítnuta —
> sépiové tóny a přetypografovanost. v5.1 = jasná studená paleta, technická
> estetika, méně typografického divadla, jméno v hero na jednom bloku.

## 0. Proč redesign

Verze v4 (Raycast-inspired dark mode) je řemeslně čistá, ale zapadá do žánru,
který dnes generuje každý LLM: tmavé pozadí, glow blobs, grid karet s hairline
bordery, pět duhových akcentů, mono eyebrow labely. Cíl: **web, který na první
pohled vypadá jako práce člověka s názorem**, ne jako výstup promptu.

Anti-cíl beze změny: není to portfolio designera ani SaaS landing page.
Je to kvalitně udělaná osobní stránka člověka, který staví věci.

---

## 1. Koncept: „Modrotisk"

Osobní web jako **technický výkres / blueprint**. Jasná studená běloba,
inkoustová čerň, elektrický kobalt jako linky výkresu, kyselinová zelená jako
zvýrazňovač. Rýsovací grid, pasovací křížky, ortogonální spoje jako v ArchiMate.
Estetika rýsovacího prkna člověka, který kreslí architektury systémů.

Proč to funguje proti „AI look":

1. **Světlé pozadí.** Většina AI dev webů je dark mode. Bright je okamžitá diference.
2. **Diagram místo dekorace.** Hero nese animované schéma systému (canvas) —
   vizuální kotva, která říká „solution architect" beze slov.
3. **Dvě akcentové barvy s jasnou rolí.** Kobalt = linky, odkazy, struktura.
   Kyselina = zvýrazňovač (chips, status LIVE, podtržení e-mailu). Žádná duha.
4. **Grafika nese význam:** grid, křížky, razítko, schéma — technické artefakty,
   ne ornamenty. Typografie výrazná, ale ne jediný nástroj.
5. **Český detail.** Rotující kulaté „razítko" jako status dostupnosti,
   souřadnice Prahy, správné uvozovky „" a nedělitelné mezery.

### Tón obsahu

Věcný, suchý humor OK, žádné hyperboly. Copy z v4 se přebírá.

---

## 2. Art direction

### 2.1 Barvy

| Token | Hodnota | Role |
|---|---|---|
| `--bg` | `#F5F7F6` | Základní plocha — studená běloba, ne čistá bílá |
| `--bg-2` | `#ECEEEC` | Alternativní plocha (střídání karet) |
| `--ink` | `#101413` | Text, linky, inverzní plochy — studená čerň |
| `--ink-2` | `#4C5551` | Sekundární text |
| `--ink-3` | `#7F8985` | Potlačený text |
| `--line` | `rgba(16,20,19,.13)` | Hairline linky, rýsovací grid |
| `--line-strong` | `rgba(16,20,19,.38)` | Silnější linky (sekce) |
| `--blue` | `#2547F0` | Kobalt — linky výkresu, odkazy, indexy, razítko, spoje |
| `--blue-deep` | `#1C36BD` | Kobalt hover |
| `--acid` | `#D7F94B` | Zvýrazňovač — chips, status LIVE, selection, e-mail underline, druhý marquee pás |

Pravidla:
- Kobalt = **struktura** (co drží stránku pohromadě). Kyselina = **puls**
  (co má zaujmout). Kyselina nikdy na text, vždy jako podklad/podtržení.
- Inverzní ink blok max 2× (poslední karta projektů + kontakt).
- Hloubka ofsetem (soutisk rámečku fotky), ne blur stíny. Žádné zrno.
- Rýsovací grid (64px) jen v hero, směrem dolů se vytrácí maskou.

### 2.2 Typografie

| Role | Font | Nastavení | Užití |
|---|---|---|---|
| Display | **Archivo** (variable, wdth 62–125) | wght 600–680, wdth 105–115, uppercase na hero + kontakt | Jméno, nadpisy, názvy projektů |
| Text | **Instrument Sans** (variable) | wght 400–600 | Body copy |
| Meta | **Spline Sans Mono** | 400–600, uppercase, tracking +0.08em | Labely, indexy, URL, tagy, navigace, wordmark |

- Self-hosted woff2 (latin + latin-ext), žádný Google CDN. Preload 2 kritických.
- Hero jméno: dva řádky v JEDNOM bloku vlevo (žádné protisměrné zarovnání),
  uppercase, `clamp(38px, 6.8vw, 96px)`, wdth 115, kobaltový ✳ za jménem.
- Míra: méně typografického divadla než v5 — display velikosti o třetinu menší,
  vizuální zátěž přebírá schéma, chips a barva.
- Čeština: uvozovky „", pomlčka —, nedělitelné mezery po jednopísmenných
  předložkách, žádné sirotky v nadpisech.

### 2.3 Layout & grid

- Kontejner max 1360px, gutter 24/48px.
- Rytmus dělají full-bleed horizontální linky mezi sekcemi.
- Hlavička sekce: mono index kobaltově („01 — CO DĚLÁM") + Archivo titul +
  mono glosa vpravo. Pod tím linka.
- Hero: grid 1.15fr/0.85fr — vlevo jméno/role/lede, vpravo canvas schéma
  s razítkem přes roh. Na mobilu pod sebou.

---

## 3. Scroll choreografie & interakce

Zásada: scroll zůstává nativní, stránka na něj reaguje pohybem v různých
směrech. Jen `transform`/`opacity` + canvas, jediný rAF loop (s try/catch,
ať jeden špatný frame nezabije smyčku), lerp smoothing, `prefers-reduced-motion`
vše vypíná.

| # | Efekt | Chování | Reduced motion |
|---|---|---|---|
| 1 | **Schéma systému** (canvas v hero) | Uzly (API, UI, ERP, DB, SaaS, LLM) naskakují, ortogonální spoje se kreslí od středového ✳ hubu; pak po spojích putují kobaltové pulzy — rychlost roste s rychlostí scrollu; hub se otáčí | Statický kompletní výkres |
| 2 | **Razítko** | Kulaté SVG s textem po kružnici, pomalá rotace + přírůstek od scroll velocity; kobaltové, přes roh schématu | Statické |
| 3 | **Protiběžné pásy** | Horní (neutrální) běží doleva, spodní (kyselinový) doprava; drift + zrychlení podle scrollu. Obsah je seřazený postupně: pás A = stack od datové vrstvy k modelování (PostgreSQL → MSSQL → SQL · CTE · rekurze → Python → JavaScript → REST API → JSON Schema → ArchiMate), pás B = disciplíny od analýzy k realizaci a pro koho (IT analýza → business analýza → solution architecture → systémová integrace → digitální transformace → SaaS produkty → AI tooling → veřejná správa → výrobní SME) | Statické |
| 4 | **Sticky balíček projektů** | Karty se skládají na sebe (offset 15px/kartu); poslední inkoustová | Funguje, je to layout |
| 5 | **Kreslící se timeline** | Kobaltová linka roste se scrollem, značky = čtverečky, aktuální kyselinové | Linka plná |
| 6 | **Reveal choreografie** | IO threshold 0.15, stagger 70ms přes `--i`, jen fade+translate | Vše viditelné |
| 7 | **Rotující asterisk** | Fixní ✳ = scroll progress, klik = nahoru; hover kyselinový | Statický, funkce zůstává |

Mikrointerakce: podtržení rostoucí zleva (kobalt), externí odkazy ↗ s posunem,
řádky rejstříku — posun titulu + kobaltový ✳, e-mail klik = mailto + copy,
`::selection` kyselinová, focus 2px kobaltový outline.

---

## 4. Informační architektura

Single-page, kotvy: 1. Hero (jméno + schéma + razítko) → pás → 2. Co dělám
(rejstřík 5 řádků) → 3. Pro koho (2 sloupce s dělící linkou, kyselinové tagy)
→ 4. Projekty (sticky balíček 5 karet, statusy ● LIVE kyselinový chip /
◐ BETA / ○ WIP) → 5. O mně (černobílá fotka s kobaltovým soutiskem, popisek
jako kyselinový štítek uvnitř fotky — žádné „Fig. 1", + timeline +
vzdělání/certifikace/jazyky) → 6. Kontakt (ink blok: OZVĚTE SE., e-mail
s kyselinovým podtržením, LinkedIn/GitHub, footer).

Co NE: testimonials, „Hire me" CTA, blog, ikonky u kompetencí, skill-bary,
počítadla, typewriter efekt, AI chatbot. Fotka ne v hero (šablona) — v O mně.

---

## 5. UX, přístupnost, výkon

### UX
- Sticky header 56px, mono wordmark „✳ VÁCLAV MUDRA"; mobil: jen Projekty +
  Kontakt (≤480px jen Kontakt) + jazyk. `scroll-padding-top`, skip-link.

### Přístupnost
- Kontrast: body ≥ 7:1, sekundární ≥ 4.5:1; kobalt na běhovém textu ≥ 4.5:1;
  kyselina jen jako podklad pod inkoustovým textem (≈13:1).
- Klávesnice end-to-end, viditelný focus, dekorace (canvas, pásy, razítko)
  `aria-hidden` + sr-only alternativa pásu.
- Reduced motion = plně statická, plně použitelná stránka.

### Výkon
- 0 externích requestů; fonty self-hosted (≈275 kB), preload 2.
- JS ≤ 12 kB bez knihoven; canvas kreslí jen v rAF, DPR cap 2.
- Fotka: AVIF/WebP + JPEG fallback ≤ 150 kB, `loading="lazy"`, rozměry v HTML.
- LCP < 1.5s na Fast 3G, CLS = 0, Lighthouse ≥ 95 všude.

### SEO / meta
- Zachovat hreflang CS/EN, canonical, JSON-LD Person, sitemap.
- Opravit z v4: vyrobit skutečný `og:image` (1200×630, běloba + jméno + kobalt
  + kyselinový detail). `/navrh/` má noindex a není v sitemap.

---

## 6. Proces & akceptační kritéria

1. Návrh na `/navrh/` (CS only), ostrá `/` se nemění.
2. Po odsouhlasení: migrace na `/` + `/en/` (přirozená EN mutace), OG obrázek,
   smazání mrtvého CSS z v4, komprese fotky.
3. Akceptace:
   - [ ] 5s test: nepůsobí jako generický AI web (ani dark-glow, ani sépie).
   - [ ] Scroll: ≥ 4 prvky v pohybu různými směry/rychlostmi, 60 fps.
   - [ ] Schéma se nakreslí do 2 s, pulzy reagují na scroll.
   - [ ] Reduced motion = statická použitelná stránka.
   - [ ] Klávesnice end-to-end s viditelným focusem.
   - [ ] 0 externích requestů, Lighthouse ≥ 95, validní HTML, správná čeština.
