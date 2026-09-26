# Threat model

Reduced threat model for a static showcase site. The hotel-pms application has its own threat
model in its repository; nothing here covers it.

## What is protected

- **Integrity of the published pages.** Visitors must see what the repository contains. A
  tampered page could show false claims under the author's name or serve malicious script.
- **Deploy credentials.** The Cloudflare API token can replace the live site.
- **Visitor privacy.** The site collects nothing and must not cause requests to third parties.

There is no backend, no authentication, no cookies, no form and no stored user data.

## Trust boundaries

| Boundary | Who is on each side |
|---|---|
| Browser ↔ Cloudflare Pages | Visitor and the static files Cloudflare serves |
| GitHub ↔ Cloudflare | The `deploy` job (Wrangler) and the Pages project (Direct Upload) |
| npm registry ↔ build | Third-party packages that end up in the build or run in CI |

## Threats and mitigations

| # | Threat | Mitigation | Residual risk |
|---|---|---|---|
| 1 | Script injection into a page (XSS) | React escaping, ESLint bans `dangerouslySetInnerHTML`/`innerHTML`/`outerHTML`; CSP `script-src 'self'` plus SHA-256 hashes of the known inline scripts, no `'unsafe-inline'`, `object-src 'none'`, `base-uri 'self'` | The inline hydration scripts are allowed by hash; a change to them is caught because hashes are regenerated at build and checked after deploy |
| 2 | Clickjacking | `frame-ancestors 'none'`, `X-Frame-Options: DENY` | None known |
| 3 | Requests to third parties (tracking, CDN compromise) | Fonts and icons self-hosted, `default-src 'self'`, `connect-src 'self'`, no analytics | None known |
| 4 | Downgrade to HTTP, mixed content | HTTPS only on `pages.dev`, HSTS with `includeSubDomains`, `upgrade-insecure-requests` | `preload` is not set: the first visit could in theory be downgraded before HSTS is learned |
| 5 | Header silently lost in a deploy | The `verify` job fetches both pages after each deploy and fails if a header is missing or wrong | The check runs after publishing, so a bad deploy is live until fixed |
| 6 | Unreviewed code reaches production | Ruleset on `main` (pull request and green CI required), deploy only from a green CI run on `main`, `production` environment restricted to `main` with required approval | Single maintainer: the required approval is self-approval, so it guards against mistakes, not against a compromised account |
| 7 | Stolen deploy token | Token limited to Cloudflare Pages: Edit, stored only in the `production` environment, unavailable to pull requests and forks | Token compromise still allows replacing the site until it is rotated |
| 8 | Malicious or vulnerable dependency, workflow action | `npm ci` with committed lockfile, `npm audit --audit-level=high`, actions pinned to full commit SHAs, minimal `permissions`, Dependabot weekly with a 7-day cooldown, secret scanning with push protection | A brand-new malicious release could be picked up inside the cooldown window by a manual update |
| 9 | Personal data exposure | Contact by `mailto:` only, no forms, screenshots only from seed data, no government logos | The author's email is public by design |

## Out of scope

Denial of service against Cloudflare, compromise of the GitHub or Cloudflare accounts
themselves (mitigate with 2FA on both), and anything in the hotel-pms application.

## Review

Revisit when a form, analytics, third-party embed, or custom domain is added, and after any
change to the CSP or the deploy workflow.
