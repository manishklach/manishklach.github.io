# manishklach.github.io

Static GitHub Pages portfolio for [manishklach.github.io](https://manishklach.github.io/).

## Homepage structure

The homepage is intentionally short and curated. It keeps only:

- hero
- flagship work
- selected writing
- patent record
- footer

## Updating homepage content

Homepage content lives in [`script.js`](./script.js) inside `homepageData`.

Update these arrays:

- `homepageData.work`
- `homepageData.writing`
- `homepageData.patentStats`
- `homepageData.patents`

### Add or edit flagship work

Each work item includes:

- `title`
- `meta`
- `text`
- `detail`
- `primaryLabel`
- `primaryHref`
- `secondaryLabel`
- `secondaryHref`

### Add or edit writing

Each writing item includes:

- `title`
- `text`
- `href`

### Add or edit patent highlights

Headline numbers live in `homepageData.patentStats`.

Curated patent entries live in `homepageData.patents` with:

- `id`
- `title`
- `href`

## Styling

The visual system is in [`styles.css`](./styles.css).

Key areas:

- root tokens at the top
- hero layout and frame
- shared card system
- patent layout
- sticky header and mobile nav

## Local preview

Any static file server works. Example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Manual Setup Steps

### Buttondown

1. Create a free account at `https://buttondown.email`.
2. Set the publication username to `manishklach`.
3. Confirm the embedded subscribe form is accepting new signups.

### Webmention.io

1. Sign in at `https://webmention.io` with your GitHub account.
2. Claim `manishklach.github.io` as the site domain.
3. Once claimed, replies and reactions will appear automatically in the essay footer blocks.

### dev.to API key

1. Open `https://dev.to/settings/extensions`.
2. Generate an API key.
3. Add it to the GitHub repository secrets as `DEVTO_API_KEY`.
