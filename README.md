# Root GitHub Pages Site

This directory contains the static root GitHub Pages site for `https://manishklach.github.io/`.

It is intended to act as the main index and portfolio hub for featured GitHub Pages microsites, selected repositories, and broader technical work across systems architecture, AI infrastructure, patents, runtime systems, and platform engineering.

This version keeps the brighter premium visual system and treats the homepage as a finished portfolio hub rather than a draft index.

It also includes an inline SVG hero mark intended to function as a reusable portfolio identity mark for systems, platforms, infrastructure, and architecture-driven work.

The top of the page is built around:

- a split hero with the portfolio identity mark
- a compact featured-systems strip beneath the hero
- three flagship featured-work cards
- four tighter secondary repository-theme cards

## Files

- `index.html` - homepage structure, copy, SEO metadata, structured data, and project links
- `styles.css` - visual system, layout, responsiveness, and component styling
- `script.js` - sticky navigation, section highlighting, mobile nav toggle, and subtle reveal-on-scroll
- `.nojekyll` - disables Jekyll processing so GitHub Pages serves the site as plain static files

## This is the root GitHub Pages site

For a root user site, the repository should be named exactly:

```text
manishklach.github.io
```

GitHub uses that repository name to serve the account root site at:

```text
https://manishklach.github.io/
```

## Deploy on GitHub Pages

1. Put these files in the root of the `manishklach.github.io` repository.
2. Push to the publishing branch, usually `main`.
3. In GitHub, open `Settings -> Pages`.
4. Set:
   - `Source: Deploy from a branch`
   - `Branch: main`
   - `Folder: / (root)`
5. Save and wait for the Pages deployment to complete.

## Edit featured project cards

The primary section is `#featured` in `index.html`.

Each featured card contains:

- project title
- category
- thesis
- supporting copy
- CTA links
- compact visual area for a project-specific badge or mini-graphic

To update them, edit the cards inside:

```html
<section class="section" id="featured">
```

Inline HTML comments mark the featured project URLs for easier editing.

### Current featured cards

The featured row currently presents:

1. `Deterministic Gather Patent`
2. `MHC Atlas OS`
3. `SRMIC`

If you replace any of them later, keep the copy concise and project-specific and preserve the same flagship-card structure.

## Replace contact content

LinkedIn was intentionally removed from the site.

The contact section is intentionally minimal and currently contains GitHub only.

Edit this block in `index.html`:

```html
<section class="section" id="contact">
```

If you want to add a public email later, place it alongside the GitHub button in the existing `.contact-links` row and keep the section minimal so it stays credible and finished.

## Hero identity mark

The hero-side visual is an inline SVG inside the existing hero panel in `index.html`.

Look for:

```html
<div class="hero-mark-block">
  <svg class="hero-mark" ...>
```

### How it is structured

The SVG is built from a small set of grouped geometry:

- `mark-base`
  outer and inner surfaces that frame the emblem
- `mark-grid`
  light guide lines that suggest layered system structure
- `mark-spine`
  the central control spine
- `mark-routes`
  left and right routed paths suggesting flow and interconnect
- `mark-clusters`
  surrounding modular shells
- `mark-nodes`
  emphasized execution or memory points

It is intended to read as a systems-oriented identity mark rather than a literal logo or product icon.

### How to tweak colors

Most of the SVG styling is controlled from `styles.css` through these classes:

- `.mark-surface-*`
- `.mark-module-*`
- `.mark-route-*`
- `.mark-node-*`
- `.hero-mark-label`

The palette is intentionally restrained: blue-gray neutrals, a muted cyan/teal accent, and soft structural outlines.

### How to resize or reposition it

The SVG sits inside `.hero-mark-block` and scales with:

- `.hero-mark`
- `.hero-panel`
- `.hero-grid`

To make it larger or smaller:

- adjust the padding on `.hero-mark-block`
- adjust the width behavior on `.hero-mark`
- adjust the hero column balance in `.hero-grid`

### How to swap it out later

If you want to replace the mark later:

1. Keep the same `<div class="hero-mark-block">` wrapper.
2. Replace only the inline `<svg>` block.
3. Reuse the same outer container and caption classes if you want the existing spacing and styling to remain intact.

The mark is intended to function as the visual identity anchor for the portfolio, especially in the hero and any future reduced-size reuse.

## Featured systems strip

Directly beneath the hero is a compact featured-systems strip.

Look for:

```html
<div class="featured-strip">
```

Each `.strip-item` is a small curated entry point for top work. These are meant to behave like a premium portfolio rail rather than generic chips.

To edit the strip:

1. Update the four `.strip-item` links in `index.html`.
2. Keep labels short and curated.
3. Avoid adding too many items or the strip will lose its selective feel.

## Add more featured work

To add another featured card:

1. Copy an existing `.featured-card` block inside the `#featured` section.
2. Update:
   - title
   - category
   - thesis
   - supporting paragraph(s)
   - site URL
   - repository URL
The grid is already set up to support more featured cards cleanly.

When adding future work, prefer real thematic or project-specific framing. Avoid vague labels such as "slot", "placeholder", or "update later", since they quickly make the homepage feel unfinished.

## Change the brighter color theme

The site now uses a brighter light-mode design system.

Theme tokens live at the top of `styles.css` in `:root`.

Key variables include:

- `--bg`
- `--bg-soft`
- `--bg-panel`
- `--text`
- `--text-muted`
- `--accent`
- `--accent-strong`
- `--shadow-lg`
- `--border`

That is the main place to adjust the overall visual direction.

## Edit SEO metadata

SEO and social metadata live in the `<head>` of `index.html`.

Edit:

- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- Open Graph tags
- Twitter tags
- `<script type="application/ld+json">`

## Assets

Future assets can be placed here:

```text
./assets/og-image.png
./assets/favicon.png
./assets/headshot.png
./assets/project-thumbs/
./assets/diagrams/
```

### Recommended usage

- `og-image.png`
  Social sharing preview image
- `favicon.png`
  Browser icon
- `headshot.png`
  Optional portrait if the hero is expanded later
- `project-thumbs/`
  Thumbnail images for featured work cards
- `diagrams/`
  Supplemental diagrams for future sections

## Why `.nojekyll` is included

GitHub Pages often processes sites through Jekyll by default. This site is a plain static HTML, CSS, and JavaScript site, so `.nojekyll` ensures GitHub serves it directly without unnecessary processing.

## Local preview

Any static file server works. Example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```
