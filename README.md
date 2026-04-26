# vaclavmudra.com

Static personal site. Plain HTML + CSS + a sprinkle of vanilla JS. No build step.

## Structure

```
/
├── index.html          # CS (root, primary)
├── en/index.html       # EN
├── styles.css          # Shared CSS (Raycast-inspired dark mode)
├── main.js             # Smooth scroll + email click-to-copy
├── robots.txt
├── sitemap.xml
└── assets/
    ├── photo-dog.jpeg  # Hero photo (dog)
    ├── prod-meme.png   # "Real men test in production" easter egg
    ├── favicon.svg
    └── fonts/          # (optional) drop Inter-Variable.woff2 + GeistMono here
```

## Fonts

The CSS is wired to use **Inter** (sans) and **GeistMono** (mono). To self-host,
drop `Inter-Variable.woff2` and `GeistMono-Variable.woff2` into `assets/fonts/`
and uncomment the `@font-face` block at the top of `styles.css`. Until you do,
the page falls back gracefully to the system sans/mono stack.

No Google Fonts CDN — per the brief.

## Deployment

Pick one — all three deploy from a `git push`:

- **Cloudflare Pages** — connect the repo, build command empty, output directory `/`.
- **Netlify** — drop the folder in, or connect the repo with `publish = "."` and no build.
- **GitHub Pages** — push to a repo, enable Pages from the root of `main`.

Set up the apex `vaclavmudra.com` (and `www` redirect) in the host's DNS panel.

## Adding a CV / phone

Phone is intentionally not on the site (per the brief). Keep it on the CV and on LinkedIn.

## License

Personal site content — all rights reserved. Code patterns are free to lift.
