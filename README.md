# manishklach.github.io

Static GitHub Pages portfolio for [manishklach.github.io](https://manishklach.github.io/).

## Homepage redesign notes

This homepage was refactored to feel more like a flagship technical portfolio than a directory of links.

### Design decisions

- Reduced the homepage to a smaller set of stronger sections: hero, flagship work, writings, patent record, repositories, technical lens, and contact.
- Shifted the visual language toward a darker editorial system with tighter spacing, sharper hierarchy, calmer motion, and fewer decorative effects.
- Made flagship work the center of gravity instead of distributing equal visual weight across too many sections.
- Treated essays and patents as first-class intellectual assets, not supporting material.
- Kept the page static and dependency-light: plain HTML, CSS, and JavaScript only.

### Content architecture

The page shell lives in [`index.html`](./index.html).

Repeated homepage content is rendered from data objects in [`script.js`](./script.js):

- `portfolioData.flagship`
- `portfolioData.writings`
- `portfolioData.patents.stats`
- `portfolioData.patents.india`
- `portfolioData.patents.us`
- `portfolioData.repositories`
- `portfolioData.lens`

This keeps the markup smaller and makes future edits less error-prone.

### How to add or update homepage content

#### Add a new flagship project

Edit `portfolioData.flagship` in `script.js` and add an object with:

- `title`
- `category`
- `description`
- `insight`
- `primaryLabel`
- `primaryHref`
- `secondaryLabel`
- `secondaryHref`

#### Add a new featured essay

Edit `portfolioData.writings` in `script.js` and add:

- `title`
- `type`
- `summary`
- `href`

#### Update patent highlights

Edit `portfolioData.patents` in `script.js`:

- `stats` controls the headline counts
- `india` controls the India filing sample
- `us` controls the selected U.S. patent sample

#### Update selected repositories

Edit `portfolioData.repositories` in `script.js` and add:

- `title`
- `meta`
- `summary`
- `why`
- `href`

### Styling

The visual system is in [`styles.css`](./styles.css).

Key areas:

- root tokens at the top of the file
- section layout and typography
- premium card treatments for flagship, essay, repo, and patent items
- sticky header, mobile nav, and reduced-motion support

### Local preview

Any static file server works. Example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```
