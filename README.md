# Root GitHub Pages Site

This directory contains the static root GitHub Pages site for `https://manishklach.github.io/`.

It is intended to act as the main index and portfolio hub for featured GitHub Pages microsites, selected repositories, and broader technical work across systems architecture, AI infrastructure, patents, runtime systems, and platform engineering.

This version removes remaining placeholder-style copy, keeps the brighter premium visual system, and treats the homepage as a finished portfolio hub rather than a draft index.

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
- `View Site` link
- `View Repository` link

To update them, edit the cards inside:

```html
<section class="section" id="featured">
```

Inline HTML comments mark the featured project URLs for easier editing.

### Editing the third featured card later

The third featured card is now an intentional forthcoming item rather than a generic placeholder.

To replace it with another real project later:

1. Edit the third `.featured-card` inside `#featured` in `index.html`.
2. Update:
   - category line
   - title
   - thesis
   - supporting paragraphs
   - button labels and URLs
3. Keep the copy specific and publication-quality so the section never falls back into vague placeholder language.

## Replace contact content

LinkedIn was intentionally removed from the site.

The contact section is intentionally minimal and now contains:

- GitHub
- `[professional email]`

Edit this block in `index.html`:

```html
<section class="section" id="contact">
```

To replace the email placeholder, change:

```html
<span class="button button-static">[professional email]</span>
```

to either:

- a real visible email string, or
- a `mailto:` link styled like the other buttons

Keep the section minimal so it stays credible and finished.

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
3. If you want a larger card, add the `featured-card-wide` class.

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
