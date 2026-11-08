# vaclavmudra.com

Static personal site. Plain HTML + CSS + vanilla JS. No build step, no external
requests, no trackers.

Design: **v6b** — dark, cinematic. A hand-written WebGL shader field of
topographic contour lines behind the page (calmed under text), one variable typeface (Archivo, light weights, `wdth`
axis), restrained kinetic typography on headings, cursor-lit sections, marquee
bands and a pinned horizontal carousel of real product screenshots framed as
browser windows. Full `prefers-reduced-motion` and no-JS fallbacks. Details in
`DESIGN.md`.

## Versions

Every generation stays online, linked from the version switcher in each footer:

| Version | Path    | Notes                                              |
|---------|---------|----------------------------------------------------|
| v6b     | `/`     | Current, the only indexed one                      |
| v6a     | `/v6a/` | Same system, filament shader background            |
| v5.1    | `/v5/`  | „Modrotisk" — bright technical blueprint            |
| v4      | `/old/` | Raycast-inspired dark                              |

Archives are `noindex` and outside `sitemap.xml`; all versions show the same
project set.

## Structure

```
/
├── index.html            # CS (root, primary) — v6b
├── en/index.html         # EN
├── styles.css            # Shared CSS
├── main.js               # Shader field, reveals, bands, carousel, spotlights (no libs)
├── kinetic-lite.js       # Kinetic headings ([data-kin])
├── v6a/                  # v6a (CS, en/, own styles.css, main.js, kinetic-lite.js)
├── v6b/                  # Redirect stubs to / (v6b was here before it became primary)
├── v5/                   # v5.1 archive
├── old/                  # v4 archive
├── preview/              # Working previews of redesign variants (not published)
├── fonts/                # Self-hosted woff2 (Archivo; v4/v5 also Instrument Sans, Spline Sans Mono)
├── assets/
│   ├── previews/         # Product homepages, 1440×900 captures (1440w + 800w webp)
│   ├── photo-dog-720.jpeg
│   ├── og-image.jpg      # 1200×630 social preview (CS), og-image-en.jpg (EN)
│   └── favicon.svg
├── robots.txt
├── sitemap.xml
└── uploads/              # Design briefs & archived design systems (not published)
```

## Fonts

Self-hosted variable woff2, latin + latin-ext subsets. No Google Fonts CDN —
the "no trackers" line in the footer is meant literally.

## Deployment

GitHub Pages from the root of `main`. Push to deploy. `CNAME` handles the apex
domain. `_config.yml` keeps docs, `uploads/` and `preview/` off the domain.

## Adding a CV / phone

Phone is intentionally not on the site. Keep it on the CV and on LinkedIn.

## License

Personal site content — all rights reserved. Code patterns are free to lift.
