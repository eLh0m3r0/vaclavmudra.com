# Prompt: Design & implementace osobního webu `vaclavmudra.com` (v4)

## 1. Cíl a kontext

Vytvoř **osobní web a rozcestník** na doméně `vaclavmudra.com`. Web má dva souběžné účely:

1. **Vizitka** — kdo jsem, čemu se profesně věnuju, jak mě kontaktovat.
2. **Rozcestník** — přehled veřejně dostupných projektů s odkazy na jejich vlastní domény.

Cílová skupina: profesionální kontakty (klienti ze SME a veřejné správy, kolegové, recruiteři), čtenáři Geodaily, lidé, kteří mě potkali jinde a chtějí si ověřit, kdo jsem. **Není to portfolio designera, není to SaaS landing page** — je to kvalitně udělaná osobní stránka člověka, který staví věci.

**Jazyk webu: plně bilingvální od první iterace.** Čeština primární (`/`), angličtina paralelní (`/en/`). Toggle CS/EN v headeru. Obě verze ship-ready ve výstupu — žádné "EN doděláme později".

---

## 2. Design guidelines — VELMI DŮLEŽITÉ

**Drž se striktně souboru `DESIGN-raycast.md`** (přiložím ho v této konverzaci). Soubor obsahuje vizuální systém inspirovaný Raycastem — typografii, barevnou paletu, spacing, komponentové vzory, pohyb. Neimprovizuj ani nepřidávej vizuální prvky, které tam nejsou popsané.

Pokud `DESIGN-raycast.md` neřeší konkrétní situaci, drž se Raycastovy estetiky:

- Dark mode first (ideálně dark-only).
- Vysoký kontrast typografie nad ozdobami.
- Geometrická přesnost. **Žádný gradient blob, žádný glassmorphism, žádný neumorphism.**
- Subtle motion (60fps). **Žádný parallax, žádný scroll-jacking, žádné lazy fade-in efekty.**
- Monospace pro technické detaily a metadata (lokalita, URL, tagy), sans-serif pro běžný text.

---

## 3. Informační architektura

**Single-page web s plynulým scrollem**, dvě jazykové mutace (`/index.html` a `/en/index.html`). Sekce kotvené přes `id`, navigace v sticky headeru.

### Sekce v tomto pořadí:

1. **Hero** — jméno, role, jednověté shrnutí, fotka (viz sekce 7).
2. **Co dělám / What I do** — profesní zaměření, kompetenční okruhy.
3. **Sektor & klienti / Sector & clients** — krátký panel ukazující práci pro soukromý sektor (hlavně SME) **i** veřejnou správu.
4. **Projekty / Projects** — rozcestník s kartami (sekce 5).
5. **O mně / About** — krátký profil, vzdělání, certifikace, jazyky, pracovní historie.
6. **Kontakt / Contact** — email, LinkedIn, GitHub.

**Co NE:** žádné "Testimonials", žádné "Hire me" CTA, žádné stock fotky, žádný blog, žádný Calendly embed, žádná "now playing" widget hipsterie, **žádný řádek "vlastní firmy / moje s.r.o.ka"**.

---

## 4. Obsah — informace o mně

> **Pozn.:** Texty níže ber jako **podklad**, ne jako finální copy. Ulaď a přelož do CS i EN. EN verze není literální překlad — má znít přirozeně rodilému mluvčímu.

### 4.1 Hero

Fakta:

- **Jméno:** Ing. Václav Mudra (titul "Ing." může být v hero, nebo až v sekci O mně — podle toho, co designově sedne)
- **Lokalita:** Česko / Praha · Czech Republic / Prague
- **Pozice:** *Software Engineer & Solution Architect* (zachovej anglicky v obou verzích — je to mezinárodně srozumitelné a v ČR se v tech komunitě běžně používá)
- **CS shrnutí (raw, ulaď):** *Pracuju na pomezí soukromého sektoru, veřejné správy a vlastních produktů. Specializuju se na databáze, systémovou integraci a stavbu malých, dobře navržených SaaS aplikací.*
- **EN shrnutí (raw, ulaď):** *I work at the intersection of private sector, public administration, and my own products. I specialize in databases, systems integration, and building small, well-designed SaaS applications.*

Tón: věcný, lehce suchý humor je OK, **žádné hyperbole** ("passionate about innovation", "thought leader", "leveraging synergies" → NE).

### 4.2 Co dělám / What I do — kompetenční okruhy

Pět okruhů. Každý = krátký nadpis + 1–2 věty popisu. **Zformuluj čistě, ne jako bullet salad.**

- **Návrh & vývoj softwaru** — Python, JavaScript, SQL. Stavba SaaS produktů od datové vrstvy po UI. Důraz na malé, srozumitelné, udržitelné systémy.
- **Databázový design & datová integrace** — PostgreSQL a MSSQL. Komplexní SQL (CTE, rekurze, deduplikace), návrh schémat, migrace, datová validace.
- **Systémová integrace & solution architecture** — propojování enterprise systémů, API návrh, JSON schema, ArchiMate modelování, BE/FE specifikace. Mosty mezi business požadavky a implementací.
- **Konzultace pro výrobní SME** — digitální transformace, IT strategie, vendor management, management consulting v rámci dlouhodobých spoluprací.
- **AI tooling & experimenty** — lokální LLM inference na Apple Silicon, autonomní agentní systémy postavené nad Claude Code.

### 4.3 Sektor & klienti / Sector & clients

Kratičká sekce:

> **CS:** *Stavím řešení pro soukromé firmy (zejména malé a střední podniky) i pro veřejnou správu. V soukromém sektoru typicky tailor-made aplikace, dlouhodobé spolupráce a digitální transformace. Ve veřejném sektoru analýza, integrace a architektura informačních systémů státní správy — typicky jako externí konzultant ve spolupráci s etablovanými IT integrátory.*
>
> **EN:** *I deliver solutions for private companies (mainly SMEs) as well as public administration. In the private sector this typically means tailor-made applications, long-term engagements, and digital transformation. In the public sector it means analysis, integration, and architecture of state administration information systems — typically as an external consultant working through established Czech IT integrators.*

**DŮLEŽITÉ:** Nikde na webu **NEPOUŽÍVEJ konkrétní názvy** koncových klientských systémů, ministerstev, institucí, ani jména SME firem, kterým jsem dodával řešení. Drž se obecných formulací — "informační systém ústředního úřadu státní správy", "ERP pro výrobní skupinu", "core banking analytics", "RPA Center of Excellence", "výrobní firma v severních Čechách". Konkrétní jména patří maximálně do CV nebo na LinkedIn, ne na osobní web. Jména **kontraktačních firem / IT integrátorů** (Aricoma, European Code Factory, Deloitte) lze uvést v sekci 4.4 (Pracovní historie) — to nejsou koncoví klienti.

### 4.4 O mně / About — krátký profil + pracovní historie

**Profil:**

- **Vzdělání:** Ing., Česká zemědělská univerzita v Praze, Provozně ekonomická fakulta — magisterský obor *Projektové řízení* v rámci programu *Systémové inženýrství a informatika* (2017–2019). Diplomová práce: aplikace agilních metod projektového řízení v auditních zakázkách. Předtím Bc. obor Systémové inženýrství (2014–2017), bakalářská práce: cloud computing v sektoru malých a středních podniků.
- **Certifikace:** ArchiMate 3 — Practitioner (Level 2).
- **Jazyky:** čeština (rodilý mluvčí), angličtina (full working proficiency), francouzština (limited working), němčina (začátečník).

**Pracovní historie** — uveď v tomto pořadí, nejnovější nahoře, **bez konkrétních koncových klientských jmen**. Jména kontraktačních firem (sloupec "přes" / "via") jsou OK. Layoutově to může být **timeline / vertikální seznam**, ne nutně tabulka — vyber, co sedne k Raycast estetice.

| Období | Role | Přes / Via | Co dělám / dělal jsem |
|---|---|---|---|
| 10/2024 → dnes | IT Analyst / Solution Architect | **Aricoma** (externě) | Projekty pro veřejný sektor — analýza a architektura informačních systémů státní správy. |
| 02/2023 → 10/2024 | IT Analyst / Solution Architect | **European Code Factory** | Projekty pro veřejný i soukromý sektor — analýza, integrace. |
| 04/2021 → 01/2023 | Digital Transformation Lead, interim CEO | (in-house) | Vedení digitální transformace a IT strategie ve výrobní skupině v severních Čechách. ERP/CRM implementace, vendor management. |
| 11/2017 → 12/2020 | Consultant, Senior Analyst | **Deloitte CZ** | Bankovní a regulátorní sektor — analýza, RPA Center of Excellence, IT risk assessment. |
| 06/2014 → dnes | IT konzultant na volné noze | (vlastní) | Tailor-made řešení pro SME — vývoj, implementace, dlouhodobé spolupráce. |

### 4.5 Kontakt / Contact

- **Email:** `hello@vaclavmudra.com` (uveď bez obfuskace, nebo s minimální JS obfuskací — primární je klikatelnost)
- **LinkedIn:** [`linkedin.com/in/vmudra`](https://cz.linkedin.com/in/vmudra)
- **GitHub:** [`github.com/eLh0m3r0`](https://github.com/eLh0m3r0)
- **Telefon:** `+420 730 147 812` — **defaultně NEZOBRAZUJ na webu**, patří do CV.

**Žádný kontaktní formulář.** Jen čitelné odkazy.

---

## 5. Projekty — rozcestník

Každý projekt = karta s názvem, **jednou krátkou větou popisu**, tagem (kategorie), URL a stavem. Karty jsou **vizuálně rovnocenné** — žádné hero karty, žádná hierarchie. Hover efekt jemný (změna borderu nebo subtle elevation, **žádné scaling, žádné rotace**).

| Projekt | Doména | CS popis | EN popis | Tag | Stav |
|---|---|---|---|---|---|
| **Assoluto** | [assoluto.eu](https://assoluto.eu) | Open-source zákaznický portál pro české výrobní firmy. Zakázky, výkresy, stav výroby na jednom místě. | Open-source customer portal for Czech manufacturing SMEs. Orders, drawings, and production status in one place. | `SaaS · Open source` | Beta |
| **dochazka.net** | [dochazka.net](https://dochazka.net) | Evidence docházky pro malé a střední české firmy. | Attendance tracking for Czech SMEs. | `SaaS` | Live |
| **DissConnect** | [dissconnect.lol](https://dissconnect.lol) | AI tool, co z nudného korporátního LinkedIn profilu udělá brutální diss track. Žert pro kolegu za $1.99. | An AI tool that turns a boring corporate LinkedIn profile into a brutal AI-generated diss track. Office prank, $1.99. | `Side project · AI` | Live |
| **Geodaily** | [buttondown.com/geodaily](https://buttondown.com/geodaily) | AI-generated denní geopolitický newsletter. | AI-generated daily geopolitics newsletter. | `Newsletter · AI` | Live |
| **Genesis Factory** | [github.com/eLh0m3r0/Genesis-Factory](https://github.com/eLh0m3r0/Genesis-Factory) | Autonomní agentní systém pro vývoj softwaru postavený nad Claude Code. | Autonomous software development agent system built on top of Claude Code. | `Open source · Tooling` | WIP |

> **Pozn. pro tebe (designera/Claude):** Geodaily a DissConnect jsou explicitně označené jako **AI-generated / AI-powered** — ten tag nech viditelný (transparence, ne maskování). Drž anglické popisy v EN verzi a české v CS verzi — popis je text určený pro čtenáře dané jazykové mutace.

---

## 6. Technická specifikace

### 6.1 Stack — minimální

**Preferuju nejjednodušší možný stack. Žádný framework, pokud to není nutné.**

- **Plain static HTML + CSS** + minimální vanilla JS (jen pro toggle jazyka a případnou email obfuskaci). Žádný React, žádné Astro, žádný build step, pokud to nepotřebuje `DESIGN-raycast.md`.
- **Žádný Tailwind** (pokud to design soubor explicitně nepředepisuje). CSS custom properties dle `DESIGN-raycast.md`.
- **Fonty:** dle `DESIGN-raycast.md`. Self-hosted (`woff2`, `font-display: swap`). **Žádné Google Fonts CDN.**
- **Hosting:** Cloudflare Pages / Netlify / GitHub Pages — `git push` deploy.

### 6.2 Struktura souborů

```
/
├── index.html              # CS verze (root, primární)
├── en/
│   └── index.html          # EN verze
├── styles.css              # sdílený CSS pro obě verze
├── main.js                 # (volitelně) toggle jazyka, email obfuskace
├── assets/
│   ├── photo-dog.webp      # foto se psem (hero)
│   ├── photo-dog@2x.webp   # retina
│   ├── prod-meme.webp      # "Real men test in production"
│   ├── og-image.png        # 1200×630 OpenGraph
│   ├── favicon.svg
│   └── fonts/              # self-hosted woff2
├── robots.txt
└── sitemap.xml
```

Pokud `DESIGN-raycast.md` vyžaduje něco komplexnějšího (build pipeline, postcss, atd.), přizpůsob se tomu — ale jen tehdy.

### 6.3 Performance budget

- Lighthouse Performance ≥ 95 mobile, obě jazykové mutace.
- LCP < 1.5s, CLS < 0.05, TBT < 200ms.
- Žádné externí trackery v základní verzi.
- Total page weight pod 200 KB pro hero view (bez obrázků), pod 500 KB s obrázky (po optimalizaci viz 7.3).

### 6.4 SEO & meta

- `<title>`, `<meta description>` v každé jazykové verzi.
- OpenGraph image (1200×630), Twitter card.
- `<html lang="cs">` resp. `<html lang="en">`.
- **`hreflang` alternates** mezi CS a EN verzí — POVINNÉ.
- JSON-LD `Person` schema s jménem, rolí, sameAs odkazy (LinkedIn, GitHub, projekty).
- `sitemap.xml` (zahrň obě jazykové mutace), `robots.txt`.
- Canonical URL na každé stránce.

### 6.5 Accessibility

- Plně klávesově ovladatelný (focus styles vidět, žádné `outline: none` bez náhrady).
- Kontrast min. WCAG AA pro tělo textu, AAA pro velké nadpisy.
- `prefers-reduced-motion` respektovaný.
- Smysluplné `alt` u všech obrázků v jazyce dané mutace (viz 7.4).
- Sémantické HTML5 (`<main>`, `<nav>`, `<section>`, `<article>`).
- Toggle jazyka má `lang` atribut na linku (`<a href="/en/" lang="en" hreflang="en">English</a>`).

---

## 7. Obrázky

Web bude obsahovat **dva obrázky**, které musíš v designu počítat:

### 7.1 Foto — Václav se psem

- Použití: **hero sekce** (vedle nebo pod jmennou kartou).
- Charakter: osobní, neformální. Rozhodně **ne** korporátní headshot.
- Formát: zvol kompozici, která sedne k Raycast estetice — **zvaž monochrom / desaturaci / nízký jas**, aby foto neprasklo dark UI. Případně subtle border / inset shadow dle design souboru.
- Tvar: square nebo 4:5 portrait. **Žádný kruh** (vyhneme se LinkedIn-look).

### 7.2 "Real men test in production" obrázek

- Použití: někde **mimo hero**, ideálně jako jemný easter egg / "human touch" mezi sekcemi (např. mezi *Co dělám* a *Projekty*, nebo na konci stránky před patičkou).
- Charakter: vtip, který vyznívá jen pro lidi z oboru. Rozhodně **ne** centerpiece — má fungovat jako koření, ne jako hlavní jídlo.
- Velikost: menší / inline. **Nepouštěj ho přes celou šíři.**
- Případně dej obrázku tooltip / caption, ale stručný.

### 7.3 Optimalizace

- WebP (s JPEG fallback pro starší prohlížeče, pokud to ladí s Raycast estetikou).
- `<img loading="lazy">` pro vše pod foldem.
- Explicitní `width`/`height` atributy (proti CLS).
- 1×, 2× srcset pro retinu.

### 7.4 Alt texty

- **CS verze:** Foto se psem: popiš scénu (např. *"Václav venku v lese, po boku jeho pes"*), ne jen `"foto autora"`. Easter egg: `"'Real men test in production' — vtipný obrázek z developer kultury"`.
- **EN verze:** Foto se psem: stejný popis přeložený přirozeně do EN. Easter egg: ponech text obrázku v originálu (je v AJ), alt může být `"'Real men test in production' — developer-culture meme"`.

---

## 8. Tone of voice

- **Stručně.** Krátké věty, žádné nákupy adjektiv. Platí pro CS i EN.
- **Bez korporátní vaty.** "Solutions provider", "passionate about", "leveraging synergies", "thought leader" → NE.
- **První osoba.** "Pracuju", "stavím", "navrhuju" / "I build", "I design". **Ne** "Václav je…" / "Václav is…".
- **Technicky přesně.** Když píšeš o stacku, jmenuj konkrétně (PostgreSQL, ne "moderní databáze"). U klientů drž obecné formulace (viz 4.3).
- **Lehce suchý humor je OK**, ale ne v každé větě. Web není stand-up.
- **Žádné emoji** v textech (kromě případného mikro-easter-egg, pokud sedne k Raycast estetice).
- **EN není literální překlad CS.** Ulaď tak, aby zněla přirozeně rodilému mluvčímu.

---

## 9. Výstup — **jedna fáze, ship-ready**

**Bez wireframe mezikrokem, bez "kola 1 + kola 2".** Návrh + implementace v jednom dodávkovém balíčku. Pokud v některém místě potřebuješ moje rozhodnutí (např. mezi dvěma layoutovými variantami), **vyber sám tu, která líp odpovídá `DESIGN-raycast.md`** a stručně to komentářem v kódu zdůvodni.

Co dodáš:

1. **`index.html`** — CS verze, kompletní obsah, ship-ready.
2. **`en/index.html`** — EN verze, kompletní obsah, ship-ready.
3. **`styles.css`** — sdílený CSS, plně dle `DESIGN-raycast.md`.
4. **`main.js`** (volitelně) — toggle jazyka, email obfuskace, nic víc.
5. **`robots.txt`** + **`sitemap.xml`**.
6. **Krátký `README.md`** — struktura souborů, kam nahrát, jak nasadit doménu (Cloudflare Pages / Netlify / GitHub Pages).
7. **Placeholdery** pro obrázky — pokud nemáš skutečné soubory, použij `<picture>` strukturu se správnými `width`/`height`/`alt`, a v komentáři uveď, jak má soubor vypadat (rozměry, formát, charakter).

---

## 10. Co NEDĚLAT — checklist před odevzdáním

- [ ] Žádný cookie banner (web bez trackerů ho nepotřebuje).
- [ ] Žádné "Hire me" / "Let's work together" CTA.
- [ ] Žádný Calendly / Cal.com embed.
- [ ] Žádné AI-generated obrázky lidí, žádné stock fotky lidí u monitorů.
- [ ] Žádný "now" widget, "currently listening to", "current weather", apod.
- [ ] Žádné konkrétní názvy koncových klientských systémů, ministerstev, ani jména SME firem (viz 4.3).
- [ ] Žádný řádek "Vlastní firmy / moje s.r.o.ka" — vlastní produkty se ukazují přes sekci Projekty.
- [ ] Žádné gradient bloby, glassmorphism, neumorphism, žádné scroll-jacking.
- [ ] Žádný Google Fonts CDN (self-host).
- [ ] Žádný framework (React/Vue/Astro), pokud to nepředepisuje `DESIGN-raycast.md`.
- [ ] Nevymýšlet fakta, která ti nedám. Pokud něco chybí, použij `[TODO]` placeholder s komentářem, ne fabulaci.
- [ ] EN verze není literální překlad — má znít přirozeně.
- [ ] `hreflang` mezi CS a EN je POVINNÝ.
