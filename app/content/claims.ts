/**
 * Every factual claim this site makes about hotel-pms, with the file or section in that
 * repository backing it. `claims.test.ts` fails the build if a claim has no source, or if its
 * `key` has no matching EN/IT text in `app/locales/{en,it}/site.json` — the source lives here,
 * the displayed text stays in i18n.
 *
 * `measuredAt` is set only for a claim built on a number that changes over time (coverage,
 * counts). The date is hotel-pms's own measurement date, not this site's.
 */
export interface Claim {
  /** i18n key (namespace `site`) whose EN/IT text states this claim. */
  key: string;
  /** File or section in https://github.com/diegoandruccioli/hotel-pms backing the claim. */
  source: string;
  /** ISO date (YYYY-MM-DD) hotel-pms measured the underlying number, if the claim has one. */
  measuredAt?: string;
}

export const claims: Claim[] = [
  {
    key: "architecture_body",
    source: "README.md — Architecture Overview, Tech Stack",
  },
  {
    key: "decision_auth_token",
    source: "README.md — Key Technical Decisions & Trade-offs (Auth token storage)",
  },
  {
    key: "decision_internal_auth",
    source: "README.md — Key Technical Decisions & Trade-offs (Internal service auth)",
  },
  {
    key: "decision_multitenancy",
    source: "README.md — Key Technical Decisions & Trade-offs (Multi-tenancy)",
  },
  {
    key: "decision_resilience",
    source: "README.md — Key Technical Decisions & Trade-offs (Resilience)",
  },
  {
    key: "decision_microservices",
    source: "README.md — Key Technical Decisions & Trade-offs (Why microservices at this scale)",
  },
  {
    key: "security_body",
    source:
      "README.md — Project Status & Scope (Security posture); SECURITY.md — Known accepted risks; THREAT_MODEL.md",
  },
  {
    key: "quality_gates",
    source: "README.md — Tech Stack (Code Quality row), Project Status & Scope (Complete and production-ready)",
  },
  {
    key: "quality_coverage",
    source: "README.md — Coverage (measured 2026-08-04)",
    measuredAt: "2026-08-04",
  },
  {
    key: "hotels_compliance_alloggiati",
    source: "docs/COMPLIANCE_AUDIT_2026-08.md §1 (Alloggiati Web)",
  },
  {
    key: "hotels_compliance_invoicing",
    source: "docs/COMPLIANCE_AUDIT_2026-08.md §2 (Fatturazione elettronica / SDI / FatturaPA)",
  },
  {
    key: "hotels_compliance_citytax",
    source: "docs/COMPLIANCE_AUDIT_2026-08.md §4 (Imposta di soggiorno, resolved 2026-08-19)",
  },
  {
    key: "hotels_compliance_receipts",
    source: "docs/COMPLIANCE_AUDIT_2026-08.md §5 (Corrispettivi telematici)",
  },
  {
    key: "hotels_compliance_gdpr",
    source: "docs/COMPLIANCE_AUDIT_2026-08.md §3 (GDPR, Art. 17 and Art. 20 rows)",
  },
  {
    key: "status_ready_backup",
    source: "README.md — Complete and production-ready (encrypted off-site backup)",
  },
  {
    key: "status_ready_accessibility",
    source: "docs/COMPLIANCE_AUDIT_2026-08.md §8 (Accessibilità WCAG 2.2 AA)",
  },
  {
    key: "status_ready_erasure",
    source: "docs/COMPLIANCE_AUDIT_2026-08.md §3 (GDPR, Art. 17 row)",
  },
  {
    key: "status_gap_receipts",
    source: "docs/COMPLIANCE_AUDIT_2026-08.md §5 (Corrispettivi telematici)",
  },
  {
    key: "status_gap_credit_note",
    source: "README.md — Roadmap, Main commercial gaps",
  },
  {
    key: "status_gap_channel_manager",
    source: "README.md — Roadmap, Main commercial gaps",
  },
  {
    key: "status_gap_booking",
    source: "README.md — Roadmap, Main commercial gaps",
  },
];
