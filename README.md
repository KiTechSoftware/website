# KiTech Software Website

The public KiTech Software website is a static Astro site deployed to GitHub Pages.

## Requirements

- Node.js 22 or newer
- npm 11 or newer

## Local development

```sh
npm install
npm run dev
```

Astro starts the local development server at `http://localhost:4321` by default.

## Production build

```sh
npm run build
npm run preview
```

The static production site is generated in `dist/`.

## Content

Company policies are stored as Markdown under:

```text
src/content/legal/
```

Product-specific documentation will be stored under:

```text
src/content/products/<product>/
```

Legal documents use frontmatter validated by `src/content.config.ts` and are rendered automatically under `/legal/`.

## Deployment

- Pushes to `mvp` run the Astro validation workflow.
- Production deployment remains restricted to `main`.
- GitHub Pages publishes the generated `dist/` directory.

## Company

KiTech Software is a trading name of KI TECH LIMITED, registered in England and Wales under company number 10528257.
