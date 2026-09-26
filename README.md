# Hotel PMS — showcase site

Static, bilingual (EN / IT) showcase for [hotel-pms](https://github.com/diegoandruccioli/hotel-pms),
a microservices property management system for Italian hotels.

- English on `/`, Italian on `/it/`, both prerendered to plain HTML
- Built for recruiters first (architecture, decisions, security, CI) with a dedicated section for
  hotels (features, Italian compliance, honest project status, demo request by email)
- Published on Cloudflare Pages by GitHub Actions only, after the quality gate is green

> Status: under construction — phases 0–2 (foundations, scaffold, CI). See `CHANGELOG.md`.

## Stack

React 19 · TypeScript `strict` · Vite · React Router 7 (framework mode, static prerender) ·
TailwindCSS 4 · i18next. Fonts and icons are self-hosted; the site makes no third-party requests.

## Development

Requires Node.js 24 and npm 11.

```bash
npm ci
npm run dev          # dev server
npm run build        # typecheck + prerendered static build → build/client
npm run preview      # serve the built output
```

Quality gates (all must pass before merging to `main`):

```bash
npm run lint         # ESLint, zero warnings
npm run lint:cycles  # madge, no circular imports
npm run knip         # no dead code
npm run test:coverage
npm run test:e2e     # Playwright + axe on the built output
```

## Principles

Same as hotel-pms: WCAG AAA baseline with four themes, zero hardcoded text (EN + IT), no claim
without a source, known gaps stated openly, least-privilege CI. Details in
[`CONTRIBUTING.md`](CONTRIBUTING.md) and [`SECURITY.md`](SECURITY.md).

## License

[MIT](LICENSE)
