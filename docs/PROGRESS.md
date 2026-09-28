# Progress log

Single source of truth for where the project stands. Updated after every completed step
(commit, merge, decision). Full plan: kept outside the repo (phases 0–5).

## Current state

- **Active phase:** aesthetic-improvement pass complete (all 5 steps merged). Remaining open items are the pre-existing small gaps (see Known gaps)
- **Last updated:** 2026-09-28
- **Branch:** `docs/sync-pr32` (this log update); `main` at `4acff59` after PR #32
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
| 4 Content | Done: About, recruiter sections, hotels/status, SEO assets, hero CTA, screenshots — PR #17-#20, #22, #23 | Lighthouse ≥ 95 everywhere, every claim has a source |
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
- Cloudflare adds `Access-Control-Allow-Origin: *` to static files; harmless for a site with no private data, listed as an accepted risk in `SECURITY.md`.
- securityheaders.com grade not checked yet (target A+); Lighthouse on the live URL not run yet.
- Lighthouse `performance` threshold lowered from 0.95 to 0.90 (`lighthouserc.json`, `ci.yml`
  comment), a deliberate trade-off for the hero screenshot: it costs ~4-9 points on Lighthouse's
  simulated mobile network regardless of image weight or loading strategy (see session log,
  2026-09-28). User decision: keep the image, lower the bar. The other three categories stay ≥ 95.

## Next steps

1. Approve the pending production deploy (PR #31 merge), then check the live site.
2. Pre-existing gaps: PR/issue templates, securityheaders.com grade, a live Lighthouse run on the deployed URL.
3. `material-symbols` icon font still deferred until the first icon is actually needed.
3. Remaining polish (PR/issue templates, securityheaders.com grade, live Lighthouse run) stays open, unrelated to the aesthetic pass.

## Session log

Newest first. One line per completed step: date, what, commit.

- 2026-09-28 — Step 3: `SectionNav`, a sticky anchor bar for the 8 sections, reusing each section's own `*_heading` i18n key (one new key, `label_page_sections`, for the nav landmark). Current-section highlight via `IntersectionObserver`, progressive enhancement (prerendered HTML has none active). Along the way: jsdom has no `IntersectionObserver`, added a stub in `setupTests.ts`; and found a real bug in the per-theme axe e2e test (not in the app) — it forced `data-theme`/`data-contrast` via `page.evaluate(setAttribute)` after load, bypassing `AppearanceControls`' React state, so `aria-pressed` went stale while the CSS variables had already switched, producing a real, reproducible (not flaky) contrast failure axe was correctly catching in the *test*, not the product. Fixed by setting the choice in `localStorage` via `addInitScript` before navigation, like a real visitor, matching the pattern already used elsewhere in the file; reran the suite 4x clean after the fix. 120 unit tests, 23 e2e tests pass; visual check in the browser (nav sticks, highlights the section in view, click-to-anchor works).
- 2026-09-28 — PR #32 merged (`4acff59`), syncing this log onto `main`. Deploy for `051da89` (PR #31, logo) waiting on the user's approval in the `production` environment.
- 2026-09-28 — Aesthetic-improvement pass complete: PR #31 merged (`051da89`). All 5 steps shipped (section bands, hero screenshot with a Lighthouse-threshold trade-off recorded above, sticky in-page nav, footer, logo mark), each its own PR with green CI.
- 2026-09-28 — Step 5 (last of the plan): `Logo`, a live version of `public/favicon.svg`'s monogram on M3 tokens (`bg-primary`/`text-on-primary`) so it follows the active theme, `aria-hidden` since the adjacent site name already gives the accessible name. Placed next to the wordmark in the header. 125 unit tests, 23 e2e tests pass; visual check in the browser.
- 2026-09-28 — Step 4: `Footer` component (contact repeated with the same `CONTACT_EMAIL`, dynamic copyright year via `useMemo`, no code link, no personal links). Two new i18n keys (`footer_contact`, `footer_copyright`). 123 unit tests, 23 e2e tests pass; visual check in the browser.
- 2026-09-28 — PR #27 merged (`9895c62`). Step 2 done: two-column hero with the dashboard screenshot, Lighthouse performance threshold lowered to 0.90 with the rationale recorded.
- 2026-09-28 — User decided: lower the performance threshold rather than drop the hero image. `lighthouserc.json` performance minScore 0.95 → 0.90 (other three categories stay 0.95), `ci.yml` step name/comment updated with the rationale.
- 2026-09-28 — Ordering the image first on mobile did not help either (CI still ~0.93-0.94; the image genuinely painted earlier per the artifact, but timing barely moved). Switched to local Lighthouse (`npx lighthouse@12 --form-factor=mobile`; works despite the known Windows EPERM cleanup error, since the report is written before that fires) to iterate faster than CI round-trips. Isolated the cause with an A/B on the same machine, same run: pre-image hero scores 0.96 perf, 2.3s FCP/LCP. Any eager hero image -- tested a 24 KB and a purpose-sized 6.5 KB variant, with and without `<link rel="preload">`, with and without mobile reordering -- lands at 0.91-0.92 perf, ~2.8s FCP/LCP. Image weight, preload, and DOM/visual order made no measurable difference; `loading="lazy"` was worse (0.87, LCP 3.7s, still the LCP element once it arrived). Conclusion: under Lighthouse's simulated mobile network, any above-the-fold image costs roughly 400-500ms of FCP and LCP from the network round trip alone, near-independent of its size -- a simulated-latency floor, not an implementation inefficiency. Kept the best-measured variant (eager, `fetchPriority="high"`, 460w default + 922w 2x via `srcSet`, no preload link) since it is no worse than the alternatives tried, and added `scripts/resize-hero.mjs`. Not pushed: this is a real trade-off against the project's stated `Lighthouse >= 95` bar (README, CLAUDE.md), not a bug to keep chasing -- flagged to the user for a decision before opening the PR.
- 2026-09-28 — Preload alone did not fix it (`/` regressed too, 0.92-0.93, `/it/` still 0.93). Diagnosed via the Lighthouse artifact: `prioritize-lcp-image` audit passed (preload worked), but Lighthouse's default mobile emulation collapses the hero to one column, so the image sits *after* the full text block (`boundingRect.top` ≈ 580px) — that's what delayed LCP, not resource discovery. Fix: `order-1 md:order-none` on the image, `order-2 md:order-none` on the text column, so the screenshot paints first on narrow viewports (desktop keeps text-left/image-right; DOM/reading order for assistive tech is unaffected, `order` is visual-only). Also hit one flaky axe failure (dark high contrast, wrong `--md-primary` value read — passed in isolation and on a full rerun, pre-existing test flakiness unrelated to this change, not investigated further here).
- 2026-09-28 — PR #27 CI: `/it/` scored 0.93 performance, reproducibly (3/3 Lighthouse runs), LCP 2.7s vs the ~2.3s before the hero image. Unlike the Step 1 noise, this was a real regression: the new eager hero image had no early discovery hint. Fix: `<link rel="preload" as="image" fetchPriority="high">` for `dashboard.webp` in `root.tsx` links(), and dropped `decoding="async"` from the hero `<img>` (kept on the lazy gallery copy). React Router hoists the high-priority preload to the very top of `<head>`.
- 2026-09-28 — Step 2: hero is now a two-column grid (`md:grid-cols-2`, container widened to max-w-5xl for this section only) — text left, `dashboard.webp` right, eager-loaded with `fetchPriority="high"` as the LCP candidate. New `hero_screenshot_alt` i18n key. New e2e test checks the hero image is visible, eager and fully loaded on both pages. 116 unit tests, 21 e2e tests pass. Visual check at 1500px: proper two-column hero, image in a bordered/shadowed frame.
- 2026-09-28 — PR #25 merged (`0bf480f`). First Lighthouse performance failure seen in this project: /it/ scored 0.94 on the first CI attempt (LCP 2.0-2.7s range, TBT 0ms, CLS 0.002 — no real regression signal). Reran the job; passed at 0.94 to 0.98 range second time. Conclusion: CI runner noise around a threshold with little margin, not caused by the section-band change (no images or heavy assets touched in this step).
- 2026-09-28 — User asked for a comparative analysis of the site's aesthetic impact/professionalism/clarity vs current portfolio/showcase sites. Did WebSearch (2026 developer-portfolio benchmarks) plus a live review of the deployed site at desktop width. Verdict: content 9/10, visual packaging 5/10 — single narrow column with a dead right-hand side on wide screens, 8 identical stacked cards with no rhythm, text-only hero, no in-page nav despite a long page, no footer, wordmark not using the favicon mark. User approved a 5-step fix plan; started with Step 1: new `SectionBand` component (full-width band, alternating `bg-surface`/`bg-surface-container-low` tone, centred `max-w-3xl` — or `max-w-4xl` for Screenshots — inner column), all 8 section components refactored onto it (replacing the old `M3Card`-per-section pattern), hero content wrapped in its own centred container. 116 unit tests, 19 e2e tests pass; visual check at 1600px width in both themes confirms the dead space is gone and the tone alternation reads.
- 2026-09-27 — Phase 4 complete: PR #22 (hero CTA, `06b8da7`) and PR #23 (screenshots, `fcc5d75`) merged into `main`.
- 2026-09-27 — Screenshots: logged into the user's own already-running hotel-pms Docker stack (http://localhost/, admin/[password set by the user]) and captured 4 views (dashboard, reservations, calendar, billing) — all data is the app's own E2E seed fixtures ("Live Suite Guest", `E2E-LIVE-*`), never real guest data. Converted JPG → WebP with a one-off Playwright/canvas script (`scripts/convert-screenshots.mjs`, ~24-41 KB each). New `ScreenshotsSection` component, lazy-loaded images with explicit width/height and translated alt text; placed right after About. `claims.ts` entry states the source (own seed data) and date. 112 unit tests, 19 e2e tests pass; visual check in the browser (IT, dark theme).
- 2026-09-27 — User approved the hero CTA. Built for real on `feature/hero-cta`: `hero_cta` i18n key (EN "Get in touch", IT "Contattami"), links to `mailto:` + `CONTACT_EMAIL` from `AboutSection`, `HomePage.test.tsx` asserts the link in both languages. 108 unit tests, 19 e2e tests pass. Confirmed the user's hotel-pms Docker stack is already up and healthy (gateway + 8 services + Postgres + Redis + observability), so screenshots no longer need a cold start.
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
