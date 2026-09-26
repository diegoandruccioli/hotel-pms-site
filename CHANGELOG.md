# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Project policies: `CONTRIBUTING.md`, `SECURITY.md`, `README.md`
- Scaffold: React 19 + Vite 8 + React Router 7 framework mode, static prerender of `/` (EN) and
  `/it/` (IT), i18next `site` namespace, EN/IT language switcher that keeps the section anchor,
  skip link, canonical/hreflang/Open Graph metadata
- CI: `ci.yml` quality gate (ESLint, madge, knip, typecheck + build, Vitest coverage,
  `npm audit`, Playwright + axe, Lighthouse CI ≥ 95) with SHA-pinned actions and minimal
  permissions; `dependabot.yml` for `npm` and `github-actions` (weekly, 7-day cooldown)
- Publishing: `scripts/generate-headers.ts` writes Cloudflare Pages `_headers` at build time (strict
  CSP with SHA-256 hashes for the inline scripts, HSTS, COOP/COEP/CORP, immutable asset caching);
  `deploy.yml` (build, deploy to Cloudflare Pages from a green CI run on `main`, header verification);
  `THREAT_MODEL.md`; `robots.txt`
- Quality gates: ESLint (zero warnings), madge, knip, Vitest with coverage thresholds and
  `vitest-axe`, Playwright + axe (WCAG A/AA/AAA tags) against the prerendered output
