# Progress log

Single source of truth for where the project stands. Updated after every completed step
(commit, merge, decision). Full plan: Claude Doc "Piano — Pagina vetrina hotel-pms"
(https://claude.ai/artifact/53S6BHSvFVg31jjGrtVwgf).

## Current state

- **Active phase:** between phase 2 and phase 3 (design system not started)
- **Last updated:** 2026-09-26
- **Branch:** `feature/progress-tracking` (adds this log and the tracking rule)
- **Remote:** `origin` = https://github.com/diegoandruccioli/hotel-pms-site (public, still empty: nothing pushed, so no CI run yet)
- **Repo settings applied 2026-09-26:** wiki and projects off, rebase merge off, delete branch on merge, update-branch suggestion, topics, description, secret scanning + push protection, Dependabot alerts + security updates, workflow token read-only, no PR approval by Actions, approval for all external fork contributors, SHA pinning required
- **Pending on GitHub:** ruleset on `main` (needs a first CI run to expose check names), `production` environment (phase 5)

## Phases

| Phase | Status | Where | Exit criterion |
|---|---|---|---|
| 0 Foundations | Done, except branch protection (needs first push and CI run) | `fed6260` | Public repo with written policies |
| 1 Scaffold | Done | `e7966fd`, merge `991a7db` | `npm run build` prerenders `/` (EN) and `/it/` |
| 2 CI | Done locally; the workflow has never run on GitHub | `26dd637`, merge `4aa2d85` | An empty PR passes every job |
| 3 Design system | Not started | — | axe green on all four themes |
| 4 Content | Not started | — | Lighthouse ≥ 95 everywhere, every claim has a source |
| 5 Publishing | Not started | — | Site live, A+ on securityheaders.com, no CSP violations |

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
- **Docs:** `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `README.md`, `CHANGELOG.md`.

## Known gaps

Measured against the plan on 2026-09-26.

- `npm run lint` is `eslint .` without `--max-warnings 0` (`package.json:14`), so warnings
  do not fail the gate that `CLAUDE.md` calls "zero warnings".
- `@fontsource/*` and `material-symbols` are not installed; `CLAUDE.md` requires them (phase 3).
- `CLAUDE.md:66` and `CONTRIBUTING.md:57` cite `src/content/claims.ts`, but the code lives in
  `app/`. Decide the path in phase 4 and fix the docs.
- `app/app.css` uses raw hex, and `LanguageSwitcher.tsx:30` and `SkipLink.tsx:10` use raw
  Tailwind colors. `CLAUDE.md` forbids raw hex; phase 3 replaces them with `--md-*` tokens.
- `SkipLink` has no component test of its own (no axe check), only coverage through `HomePage`.
- No `public/` (favicon, robots, sitemap, `_headers`, OG image),
  no `.editorconfig`, no `.nvmrc`, no PR or issue templates.
- No deploy workflow, no `production` environment, no `THREAT_MODEL.md` (all phase 5).

## Next steps

1. Merge `feature/progress-tracking` into `main` once approved, then first push.
2. Author email decided: history stays as is (it mixes `diego.andruccioli@studio.unibo.it` and `andrucciolidiego@gmail.com`, both become public); every new commit uses `andrucciolidiego@gmail.com` (set in the repo-local git config).
3. Open a test PR so `ci.yml` runs, then create the ruleset requiring the two check names: `Quality — ESLint · madge · knip · TypeScript · Build · Vitest · audit` and `Browser — Playwright + axe · Lighthouse`.
4. Decide whether to fix the phase 0–2 gaps above in one small branch before phase 3.
5. Phase 3: M3 `--md-*` tokens and four themes from hotel-pms `m3-base.css`, self-hosted
   fonts, base components.

## Session log

Newest first. One line per completed step: date, what, commit.

- 2026-09-26 — License decided: MIT (`LICENSE`, README updated).
- 2026-09-26 — Decision: keep existing commit emails, use `andrucciolidiego@gmail.com` for all new commits.
- 2026-09-26 — Connected `origin` to the new GitHub repo and applied repo, security and Actions settings via `gh api` (no push yet).
- 2026-09-26 — Rebuilt project state from the plan and the repo after a lost session; added
  this log and the tracking rule (`feature/progress-tracking`).
- 2026-09-26 — Phase 2 merged: quality-gate workflow and Dependabot config (`4aa2d85`).
- 2026-09-26 — Phase 1 merged: prerendered bilingual EN/IT scaffold (`991a7db`).
- 2026-09-26 — Phase 0: project policies and contributor rules (`fed6260`).
