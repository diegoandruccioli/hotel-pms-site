# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` (latest) | ✅ Active |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report findings privately to: **diegoandruccioli@gmail.com**

Include the affected page or file, a description and impact, reproduction steps, and any
proof-of-concept. Acknowledgement within 72 hours; severity assessment within 7 days.

## Scope

This is a static site: no backend, no authentication, no cookies, no forms, no user data.

### In scope

- Missing or weakened HTTP security headers (CSP, HSTS, `frame-ancestors`, etc.)
- Script injection or unintended third-party requests from the built site
- Supply-chain issues in dependencies or GitHub Actions workflows
- Secrets committed to the repository

### Out of scope

- Vulnerabilities in the hotel-pms application itself — report those in
  [hotel-pms](https://github.com/diegoandruccioli/hotel-pms/blob/main/SECURITY.md)
- Denial-of-service against the hosting provider
- Social engineering, physical security

## Controls

- Strict CSP without `'unsafe-inline'` or `blob:` (the inline hydration scripts are allowed by
  SHA-256 hash, regenerated at every build), `frame-ancestors 'none'`, HSTS, `nosniff`
  (served through Cloudflare Pages `_headers`; verified automatically after every deploy)
- Zero cookies, zero third-party analytics or CDN requests
- Contact via `mailto:` only, so no personal data is collected
- `npm ci` with committed lockfile, `npm audit --audit-level=high` in CI
- GitHub Actions pinned to commit SHAs, minimal `permissions`, deploy secrets only in the
  `production` environment with required approval
- Dependabot weekly with a 7-day cooldown

See [`THREAT_MODEL.md`](THREAT_MODEL.md) for threats and mitigations.

## Known accepted risks

- Single maintainer: the `production` environment approval is self-approval, so it guards against
  mistakes, not against a compromised GitHub account (2FA is the mitigation).
- HSTS `preload` is not enabled; a first visit could be downgraded before HSTS is learned.
- Headers are verified after publishing, so a bad deploy is live until the check fails and it is fixed.
