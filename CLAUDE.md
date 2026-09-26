# CLAUDE.md — Hotel PMS showcase site

Static, bilingual (EN default on `/`, IT on `/it/`) showcase for the
[hotel-pms](https://github.com/diegoandruccioli/hotel-pms) property management system.
Primary audience: recruiters (portfolio). Secondary: hotels (demo request via `mailto:`).
Same philosophy and quality gates as hotel-pms — where a rule there makes sense for a static
site, it applies here unchanged.

## Behavioral Rules

- Do what has been asked; nothing more, nothing less
- ALWAYS read a file before editing it
- NEVER commit secrets, credentials, or `.env` files
- NEVER add `Co-Authored-By:` to commit messages — Claude must not appear as a GitHub Contributor
- NEVER push or open a PR without explicit confirmation
- Before touching git history or any destructive command, ask first

## Progress tracking

- At the start of every session, read `docs/PROGRESS.md` before doing anything else
- After every completed step (commit, merge, decision, gap found or closed) update
  `docs/PROGRESS.md`: current state, phase table, known gaps, next steps, session log
- A Stop hook (`.claude/hooks/check-progress.sh`) blocks the end of a turn while work is
  not recorded there

## Commits and branches

- Conventional Commits, English, imperative, ≤ 72 characters: `<type>(<scope>): <description>`
- Scopes: `site`, `ci`, `content`, `i18n`
- Branch from `main` as `feature/*`; merge only with every gate green; `main` is protected once a remote exists

## Commands

```bash
npm run dev            # dev server
npm run build          # typecheck + prerendered static build → build/client
npm run preview        # serve the built output
npm run lint           # ESLint, zero warnings
npm run lint:cycles    # madge, no circular imports
npm run knip           # no dead code
npm run test           # Vitest
npm run test:coverage  # Vitest with enforced thresholds
npm run test:e2e       # Playwright + axe against the built output
```

## Stack

React 19, TypeScript `strict`, Vite, React Router 7 (framework mode, `prerender`, `ssr: false`),
TailwindCSS 4, i18next + react-i18next. Fonts and icons via npm (`@fontsource/*`,
`material-symbols`) — zero CDN, zero third-party requests.

## Mandatory rules

**Code quality**
- ESLint zero warnings; `jsx-a11y`, `react-hooks`, `react-perf` enabled
- No `any` — use `unknown` + type guards
- One component per file; PascalCase filename = component name
- NEVER use `dangerouslySetInnerHTML`

**i18n**
- ALL user-facing strings via i18n keys, zero hardcoded text — including `<title>`, meta
  description, `alt`, Open Graph
- Keys `snake_case`, namespace `site`; every EN key must have an IT translation (test-enforced)
- Language comes from the route (`/` = EN, `/it/` = IT). NEVER auto-switch on browser language

**Accessibility & design**
- WCAG AAA baseline, four themes (light, dark, light-HC, dark-HC), skip link, visible focus,
  `prefers-reduced-motion`
- Design tokens and component conventions follow hotel-pms `frontend/DESIGN.md` (M3 `--md-*`
  tokens, no raw hex)
- Every component test includes a `vitest-axe` check

**Content honesty**
- No claim without proof: every claim in `src/content/claims.ts` carries a `source` pointing to a
  file or section of hotel-pms; a test fails if one is missing
- Volatile numbers (test counts, coverage) live only in `claims.ts` with the measurement date
- Known gaps are stated openly, never sold as complete
- Screenshots only from seed data, never real guest data; no government logos, text mentions only

**Security and privacy**
- Zero cookies, zero third-party analytics, no forms collecting personal data (contact = `mailto:`)
- Strict CSP (no `'unsafe-inline'`, no `blob:`); theme applied via attributes, not inline styles
- GitHub Actions pinned to a full commit SHA with a version comment; minimal `permissions` per job
- Dependabot weekly with `cooldown: 7` for `npm` and `github-actions`

## Not applicable from hotel-pms

PMD, Checkstyle, JaCoCo, Trivy image scans (no containers), HMAC, RBAC.

## Plan

Full plan and decisions: Claude Doc "Piano — Pagina vetrina hotel-pms"
(https://claude.ai/artifact/53S6BHSvFVg31jjGrtVwgf). Phases: 0 foundations, 1 scaffold, 2 CI,
3 design system, 4 content, 5 publishing (Cloudflare Pages via GitHub Actions,
`hotel-pms-site.pages.dev`).
