# Progress log

Single source of truth for where the project stands. Updated after every completed step
(commit, merge, decision). Full plan: kept outside the repo (phases 0–5).

## Current state

- **Active phase:** phases 0, 1, 2 and 5 done (publishing was built ahead of 3 and 4 so that only the page itself is left); phase 3 (design system) merged and live; phase 4 (content) is next
- **Last updated:** 2026-09-26
- **Branch:** `docs/phase3-done` (this log update); `main` at `417a70c` after PR #12
- **Remote:** `origin` = https://github.com/diegoandruccioli/hotel-pms-site (public; `main` pushed 2026-09-26 at `409bdf8`)
- **Repo settings applied 2026-09-26:** wiki and projects off, rebase merge off, delete branch on merge, update-branch suggestion, topics, description, secret scanning + push protection, Dependabot alerts + security updates, workflow token read-only, no PR approval by Actions, approval for all external fork contributors, SHA pinning required
- **Ruleset `Protect main` active (2026-09-26):** PR required (0 approvals), conversation resolution, up-to-date branch, required checks `Quality — …` and `Browser — …`, no force push, no deletion, no bypass
- **Live:** https://hotel-pms-site.pages.dev (Cloudflare Pages, Direct Upload project `hotel-pms-site`). Deploys only through `deploy.yml`: green CI on `main`, then approval in the GitHub environment `production` (main only, admin bypass off, secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` stored there), then header verification

## Phases

| Phase | Status | Where | Exit criterion |
|---|---|---|---|
| 0 Foundations | Done (repo public, ruleset active) | `fed6260` | Public repo with written policies |
| 1 Scaffold | Done | `e7966fd`, merge `991a7db` | `npm run build` prerenders `/` (EN) and `/it/` |
| 2 CI | Done: PR #8 merged (`1468e51`). History: first CI run on `main` (2026-09-26): `quality` green, `browser` red (Lighthouse accessibility 0.86 and SEO 0.80 on both pages). Cause 1 (confirmed): URLs `/index.html` and `/it/index.html` match no client route, so hydration dropped `<title>` and meta description; fixed by auditing the preview server URLs. Cause 2 (confirmed from the CI artifact): `robots-txt` audit failed because `/robots.txt` fell back to HTML; fixed with `public/robots.txt`. Both in PR #8: CI green on both jobs (2026-09-26); phase 2 closed by the merge | `26dd637`, merge `4aa2d85` | An empty PR passes every job |
| 3 Design system | Done: PR #12 merged (`417a70c`), deployed; axe AAA green on both pages in all four themes | `feature/design-system` | axe green on all four themes |
| 4 Content | Not started | — | Lighthouse ≥ 95 everywhere, every claim has a source |
| 5 Publishing | Done: first deploy through Actions succeeded, `verify` job green (2026-09-26) | PR #10, merge `b9299f5` | Site live, A+ on securityheaders.com, no CSP violations |

## What exists

- **Routing and prerender:** `react-router.config.ts` (`ssr: false`, prerender `/` and `/it`),
  `app/routes.ts`, `app/routes/home.tsx`, `app/routes/home-it.tsx`, `app/root.tsx`.
- **i18n:** `app/i18n.ts`, `app/locales/{en,it}/site.json` (9 keys each), `app/meta.ts`,
  `app/site.ts`, `app/useRouteLang.ts`. Language comes from the route.
- **Components:** `HomePage`, `LanguageSwitcher`, `SkipLink` in `app/components/`.
- **Tests:** Vitest with 80% coverage thresholds, `vitest-axe` on components, Playwright + axe
  in `e2e/home.spec.ts`.
- **CI:** `.github/workflows/ci.yml` (quality job, then browser job with Playwright and
  Lighthouse CI), `.github/dependabot.yml` (weekly, `cooldown: 7`).
- **Docs:** `CONTRIBUTING.md`, `SECURITY.md`, `README.md`, `CHANGELOG.md`.

## Known gaps

Measured against the plan on 2026-09-26.

- `material-symbols` is not installed yet: its full icon font is several MB, so it is added together with the first icon (phase 4), subset or replaced by inline SVG to stay within the page weight budget.
- `CONTRIBUTING.md:57` cites `src/content/claims.ts`, but the code lives in
  `app/`. Decide the path in phase 4 and fix the docs.
- `public/` has only `robots.txt`; still missing favicon, sitemap, OG image (`_headers` is generated at build time by `scripts/generate-headers.ts`),
  no PR or issue templates.
- Cloudflare adds `Access-Control-Allow-Origin: *` to static files; harmless for a site with no private data, listed as an accepted risk in `SECURITY.md`.
- securityheaders.com grade not checked yet (target A+); Lighthouse on the live URL not run yet.

## Next steps

1. Phase 3 (design system) and phase 4 (content): only the page itself is left to build; every merge to `main` deploys after approval.
2. Author email decided: history stays as is (it mixes `diego.andruccioli@studio.unibo.it` and `andrucciolidiego@gmail.com`, both become public); every new commit uses `andrucciolidiego@gmail.com` (set in the repo-local git config).
3. Small clean-up of the remaining gaps (favicon, sitemap, OG image, PR and issue templates) can ride along with phase 4.
4. Phase 4: content sections, `claims.ts` with sources, screenshots from seed data, SEO files.

## Session log

Newest first. One line per completed step: date, what, commit.

- 2026-09-26 — PR #12 merged (`417a70c`), deploy approved; `verify` job green. Live check in the browser: `/it/` follows the dark preference of the system, the theme switch works after hydration (so the CSP lets the app scripts run), no CSP or other errors in the console.
- 2026-09-26 — PR #11 merged (`465df8b`); phase 3 pushed as PR #12 after merging `main` into the branch; CI green on both jobs.
- 2026-09-26 — Phase 3 step 5 (local, not pushed): base components in `app/components/m3/` (`M3Button`, `M3ButtonLink`, `M3Card`, `M3StatusChip`) with variant lookup tables, `cn()` (`clsx` and `tailwind-merge`), a test with axe each. Colour pairs are limited to the ones `tokens.test.ts` proves at 7:1. The home page now uses them (View the code link, in-progress chip inside a card), so e2e axe covers them in all four themes. 63 unit and 19 e2e tests pass. Visual check in the browser in dark and light.
- 2026-09-26 — Phase 3 step 4 (local, not pushed): dark theme and high contrast switches (`AppearanceControls`, `app/theme.ts`, `public/theme-init.js`). The blocking same-origin init script sets `data-theme` and `data-contrast` before first paint from the saved choice, else from `prefers-color-scheme` and `prefers-contrast`; choices are kept in `localStorage` (no cookies) and the switches still work when storage is blocked. The language is still never taken from the browser. 50 unit tests, 19 e2e tests (init from browser preferences, saved choice wins, keyboard use, reload). Axe theme tests now disable motion because the global colour transition made axe sample mid-fade colours.
- 2026-09-26 — Phase 3 step 3 (local, not pushed): self-hosted `@fontsource/inter` (400, 600) and `@fontsource/outfit` (600), latin subset only (about 62 kB of woff2), wired into `app/app.css`; headings use `font-display`. Knip told to ignore the two font packages (imported from CSS). Icons deferred, see Known gaps.
- 2026-09-26 — Phase 3 step 2 (local, not pushed): `app/styles/tokens.css` with the four themes (light, dark, light HC, dark HC; `data-theme` and `data-contrast` on `<html>`), Tailwind `@theme` mapping in `app/app.css`, `SkipLink` and `LanguageSwitcher` on tokens. `tokens.test.ts` enforces full token sets, 7:1 text contrast and 3:1 outline in every theme; it caught three dark tokens below 7:1 in the hotel-pms originals (secondary-container, tertiary-container, on-surface-variant), now adjusted. E2E runs axe (WCAG A to AAA) in all four themes on both pages. 44 unit tests and 16 e2e tests pass.
- 2026-09-26 — Phase 3 step 1 (local, not pushed): `npm run lint` now `--max-warnings 0`, `SkipLink` test with axe, `.editorconfig`, `.nvmrc` (24). 31 tests pass.
- 2026-09-26 — Phase 5 done. PR #10 merged (`b9299f5`); CI green on `main`; deploy approved in `production`; `deploy` and `verify` jobs green; https://hotel-pms-site.pages.dev serves `/` and `/it/` with no console errors. A first manual Direct Upload of `build/client` had created the Pages project.
- 2026-09-26 — PR #9 merged (`28e1999`); PR #10 opened for phase 5. Cloudflare account exists, no Pages project yet.
- 2026-09-26 — Phase 5 code on `feature/publishing`: `scripts/headers.ts` (CSP with SHA-256 hashes for the 8 inline hydration scripts, security headers, asset caching), `generate-headers.ts` (runs in `npm run build`), `verify-headers.ts`, `deploy.yml` (build, deploy, verify; wrangler-action pinned to `953926a`), `THREAT_MODEL.md`, SECURITY and CHANGELOG updated. Lint, knip, 28 tests and build pass. Built site served with the generated headers showed no CSP errors in the browser console.
- 2026-09-26 — Assistant-specific files (`CLAUDE.md`, `.claude/`) untracked and gitignored; they stay on disk only. Earlier commits still contain them.
- 2026-09-26 — PR #8 merged (`1468e51`), phase 2 closed. Manual browser check of the built site: `/` (EN) and `/it/` render the placeholder page, language switch works.
- 2026-09-26 — PR #8 CI green after adding `public/robots.txt`; created ruleset `Protect main`.
- 2026-09-26 — Merged `feature/progress-tracking` (`409bdf8`) and pushed `main` to origin. First CI run: `quality` green, `browser` red on Lighthouse (see phase 2). Lighthouse config switched to the preview server URLs in `fix/lighthouse-urls` (PR #8); the rerun showed accessibility fixed but SEO 0.92 from an invalid `robots.txt`, so `public/robots.txt` was added.
- 2026-09-26 — License decided: MIT (`LICENSE`, README updated).
- 2026-09-26 — Decision: keep existing commit emails, use `andrucciolidiego@gmail.com` for all new commits.
- 2026-09-26 — Connected `origin` to the new GitHub repo and applied repo, security and Actions settings via `gh api` (no push yet).
- 2026-09-26 — Rebuilt project state from the plan and the repo after a lost session; added
  this log and the tracking rule (`feature/progress-tracking`).
- 2026-09-26 — Phase 2 merged: quality-gate workflow and Dependabot config (`4aa2d85`).
- 2026-09-26 — Phase 1 merged: prerendered bilingual EN/IT scaffold (`991a7db`).
- 2026-09-26 — Phase 0: project policies and contributor rules (`fed6260`).
