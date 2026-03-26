# Root GitHub Pages Site

This directory contains the static root GitHub Pages site for `https://manishklach.github.io/`.

It is intended to act as the main index and portfolio hub for featured GitHub Pages microsites, selected repositories, and broader technical work across systems architecture, AI infrastructure, patents, runtime systems, and platform engineering.

## Files

- `index.html` - homepage structure, copy, SEO metadata, structured data, and project links
- `styles.css` - visual system, layout, responsiveness, and component styling
- `script.js` - sticky navigation, section highlighting, mobile nav toggle, and subtle reveal-on-scroll
- `.nojekyll` - disables Jekyll processing so GitHub Pages serves the site as plain static files

## Repository naming

For a root GitHub Pages site, the repository should be named exactly:

```text
manishklach.github.io
```

GitHub uses that repo name to serve the account root site at:

```text
https://manishklach.github.io/
```

If the repository name differs, GitHub will not publish it as the account root site.

## Deploy on GitHub Pages

1. Put these files in the root of the `manishklach.github.io` repository.
2. Push to the publishing branch, usually `main`.
3. In GitHub, open `Settings -> Pages`.
4. Set:
   - `Source: Deploy from a branch`
   - `Branch: main`
   - `Folder: / (root)`
5. Save and wait for the Pages deployment to complete.

## Featured project cards

The most important section is `#featured` in `index.html`.

Each featured card contains:

- project title
- category
- thesis
- supporting copy
- `View Site` link
- `View Repository` link

### Where to edit featured cards

Open `index.html` and look for:

```html
<section class="section" id="featured">
```

Update the URLs, copy, and categories directly there.

Inline HTML comments mark the featured site URLs so they are easy to find later.

## Adding a new featured project

To add another featured card:

1. Copy an existing `.featured-card` block inside the `#featured` section.
2. Update:
   - title
   - category
   - thesis
   - supporting paragraph(s)
   - site URL
   - repository URL
3. If you want the card to span wider on desktop, add the `featured-card-wide` class.

The CSS grid is already set up to support additional featured cards cleanly.

## SEO metadata

The site includes:

- title
- meta description
- canonical URL
- robots
- author
- theme-color
- Open Graph tags
- Twitter tags
- JSON-LD structured data

### Where to change SEO metadata

Edit the `<head>` section in `index.html`:

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
  Social sharing preview image.
- `favicon.png`
  Browser tab icon.
- `headshot.png`
  Optional personal portrait if the hero is later expanded.
- `project-thumbs/`
  Thumbnail images for featured work cards.
- `diagrams/`
  Supplemental diagrams for future sections.

## Link editing

The current homepage links to:

- Deterministic Gather patent microsite
- MHC Atlas OS
- GitHub profile

If site URLs change later, update the anchor tags in `index.html`.

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
