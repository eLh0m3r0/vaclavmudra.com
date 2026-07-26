# vaclavmudra.com

Static personal site. Plain HTML + CSS + vanilla JS. No build step, no external
requests, no trackers.

Design: **v5.1 „Modrotisk"** — bright technical look (cool white, ink, cobalt,
acid). Scroll choreography (marquee bands, sticky project deck, self-drawing
timeline) plus an animated canvas system schematic in the hero. Full
`prefers-reduced-motion` fallback.

## Structure

```
/
├── index.html            # CS (root, primary)
├── en/index.html         # EN
├── styles.css            # Shared CSS
├── main.js               # Scroll choreography + canvas schematic (~12 kB, no libs)
├── fonts/                # Self-hosted woff2 (Archivo, Instrument Sans, Spline Sans Mono)
├── old/                  # Archived v4 (Raycast-inspired dark), noindex
│   ├── index.html        #   CS
│   ├── en/index.html     #   EN
│   ├── styles.css
│   └── main.js
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── photo-dog-720.jpeg  # About photo (compressed)
│   ├── photo-dog.jpeg      # Original (used by /old)
│   ├── og-image.png        # 1200×630 social preview (CS)
│   ├── og-image-en.png     # 1200×630 social preview (EN)
│   └── favicon.svg
└── uploads/              # Design briefs & source material
```

## Fonts

Self-hosted variable woff2, latin + latin-ext subsets:

- **Archivo** (display; wdth axis) — headings, project names
- **Instrument Sans** — body copy
- **Spline Sans Mono** — labels, nav, metadata

No Google Fonts CDN — the "no trackers" line in the footer is meant literally.

## Deployment

GitHub Pages from the root of `main`. Push to deploy. `CNAME` handles the apex
domain.

## Adding a CV / phone

Phone is intentionally not on the site. Keep it on the CV and on LinkedIn.

## License

Personal site content — all rights reserved. Code patterns are free to lift.
