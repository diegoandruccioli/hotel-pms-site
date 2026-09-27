# Progress log

Single source of truth for where the project stands. Updated after every completed step
(commit, merge, decision). Full plan: kept outside the repo (phases 0–5).

## Current state

- **Active phase:** phase 4 nearly done, PR #21 merged; visual experiment on `experiment/hero-cta-preview` (an mailto "Get in touch" hero button, not i18n-wired) awaiting the user's yes/no before it is built for real or dropped; screenshots from hotel-pms seed data still paused pending confirmation
- **Last updated:** 2026-09-27
- **Branch:** `experiment/hero-cta-preview` (throwaway; will be deleted or turned into a real feature branch depending on the user's call); `main` at `460e1bd` after PR #21
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
| 4 Content | In progress: text sections merged (PR #17, #18, #19); SEO assets built locally, screenshots still open | Lighthouse ≥ 95 everywhere, every claim has a source |
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
- No PR or issue templates.
- Screenshots still needed: require running hotel-pms's Docker Compose stack with seed data.
- Home page has no CTA left in the hero; a candidate replacement is being previewed on `experiment/hero-cta-preview`.
- Cloudflare adds `Access-Control-Allow-Origin: *` to static files; harmless for a site with no private data, listed as an accepted risk in `SECURITY.md`.
- securityheaders.com grade not checked yet (target A+); Lighthouse on the live URL not run yet.

## Next steps

1. Wait for the user's verdict on the hero CTA preview (screenshots shown in chat, light and dark). If yes: add EN/IT i18n keys, a test, and a proper PR. If no: drop the branch, hero stays without a CTA.
2. Screenshots from hotel-pms seed data: needs Docker Compose running the full stack (gateway, 8 services, Postgres, Redis, observability) on a different repo, `docs/seed-data.sql` loaded, default admin login, then Playwright screenshots. Paused, waiting for the user to confirm before starting Docker, or to supply screenshots directly.

## Session log

Newest first. One line per completed step: date, what, commit.

- 2026-09-27 — Visual-only experiment (`experiment/hero-cta-preview`, not pushed): added an "Get in touch" mailto button under the hero tagline, hardcoded text (no i18n yet, on purpose — throwaway until approved), to show the user light/dark screenshots and ask if they want it built for real.
- 2026-09-27 — PR #21 merged (`460e1bd`).
- 2026-09-27 — Removed the "View the code" link to https://github.com/diegoandruccioli/hotel-pms from the home page (user decision: the site must not lead to the project's code). Dropped the `action_view_code` i18n key and the now-unused `M3ButtonLink` import from `HomePage.tsx`; noted in `claims.ts`'s doc comment that the source repo is never linked from the site. 108 unit tests, 19 e2e tests pass.
- 2026-09-27 — PR #20 merged (`24c09bb`).
- 2026-09-27 — SEO assets: `public/favicon.svg` (self-authored, no third-party icon), `public/apple-touch-icon.png` and `public/og-image.png` rendered by `scripts/generate-social-images.mjs` (Playwright, run once, output committed like any static asset), `public/sitemap.xml` with hreflang alternates, `Sitemap:` line added to `robots.txt`. `og:image`/`twitter:*` tags in `meta.ts`, `<link rel="icon">`/`apple-touch-icon` via a `links()` export in `root.tsx`. 108 unit tests (2 new meta assertions), 19 e2e tests pass.
- 2026-09-27 — Hotels and Status/roadmap sections: `HotelsSection` (5 Italian compliance facts, mailto CTA with a precompiled, localized subject) and `StatusSection` (3 ready items, 4 open gaps, stated without hiding them). Content sourced from hotel-pms `docs/COMPLIANCE_AUDIT_2026-08.md` (Alloggiati Web, FatturaPA, imposta di soggiorno resolved 2026-08-19, corrispettivi telematici absent since 2026-01-01, GDPR Art. 17/20, WCAG 2.2 AA) and `README.md` Roadmap. 11 new claims in `claims.ts`. 108 unit tests, 19 e2e tests pass; visual check in the browser (IT).
- 2026-09-27 — `app/content/claims.ts` added: every claim about hotel-pms carries a `source` (file/section in that repo), enforced by `claims.test.ts` (non-empty source, no duplicate key, EN+IT text exists, `measuredAt` is YYYY-MM-DD when a claim has one). Content sourced from hotel-pms README.md (Architecture Overview, Key Technical Decisions table, Coverage measured 2026-08-04) and SECURITY.md/THREAT_MODEL.md. Four new sections and components: ArchitectureSection, DecisionsSection (5 items from the decisions table), SecuritySection, QualitySection. `CONTRIBUTING.md:57` path reference fixed to `app/content/claims.ts`. 90 unit tests, 19 e2e tests pass; visual check in the browser.
- 2026-09-27 — PR #13 merged (`707c9bf`). Phase 4 started: `AboutSection` component, product-first copy (no personal bio — a separate personal site is planned later), `about_heading`/`about_body`/`about_contact` i18n keys in EN/IT, mailto contact to `diegoandruccioli@gmail.com` (no form). 66 unit tests, 19 e2e tests pass; visual check in the browser (IT, light theme).
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
