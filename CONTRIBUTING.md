# Contributing — Hotel PMS showcase site

Same conventions as [hotel-pms](https://github.com/diegoandruccioli/hotel-pms), reduced to what
applies to a static site.

## 1. Prerequisites

| Tool | Version |
|---|---|
| Node.js | 24 |
| npm | 11 |

```bash
git clone https://github.com/diegoandruccioli/hotel-pms-site.git
cd hotel-pms-site
npm ci
npm run dev
```

## 2. Commits

Conventional Commits (`feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `build`, `ci`):

```
<type>(<scope>): <imperative description>
```

- Scope: `site`, `ci`, `content`, `i18n`
- Description in English, imperative, ≤ 72 characters
- `Co-Authored-By:` is never added to commits in this project

## 3. Branches

`main` is always green and protected. Work on `feature/<name>` branched from `main`, open a PR,
merge only with CI green.

## 4. Quality gates

```bash
npm run lint          # ESLint, zero warnings
npm run lint:cycles   # madge
npm run knip          # dead code
npm run build         # typecheck + prerendered build
npm run test:coverage # Vitest, thresholds enforced
npm run test:e2e      # Playwright + axe on the built output
```

- TypeScript `strict: true`, no `any` — use `unknown` + type guards
- No `dangerouslySetInnerHTML`
- Zero hardcoded text: every visible string, `<title>`, meta, `alt` goes through i18n keys, with
  both EN and IT (`snake_case`, namespace `site`)
- Every component test includes a `vitest-axe` check
- Accessibility and design tokens follow hotel-pms `frontend/DESIGN.md` (WCAG AAA, four themes)

## 5. Content

- No claim without proof: every claim in `src/content/claims.ts` has a `source` pointing to a
  hotel-pms file or section; a test enforces it
- Volatile numbers live only in `claims.ts`, with the measurement date
- State known gaps openly
- Screenshots from seed data only; no real guest data, no government logos

## 6. CI and dependencies

- Actions pinned to a full commit SHA with a version comment; minimal `permissions` per job
- Dependabot weekly, `cooldown: 7`, ecosystems `npm` and `github-actions`
- Deploys run only from GitHub Actions after the quality gate is green
