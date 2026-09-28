import { useTranslation } from "react-i18next";
import { SectionBand, type SectionTone } from "./SectionBand";

// The i18n keys, in display order. Each is one row of README.md's "Key Technical Decisions
// & Trade-offs" table and has its own claims.ts entry citing that row.
const DECISION_KEYS = [
  "decision_auth_token",
  "decision_internal_auth",
  "decision_multitenancy",
  "decision_resilience",
  "decision_microservices",
] as const;

export function DecisionsSection({ tone }: { tone?: SectionTone }) {
  const { t } = useTranslation("site");
  return (
    <SectionBand id="decisions" headingId="decisions-heading" tone={tone}>
      <h2 id="decisions-heading" className="font-display text-2xl font-semibold">
        {t("decisions_heading")}
      </h2>
      <p className="mt-3">{t("decisions_intro")}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {DECISION_KEYS.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
    </SectionBand>
  );
}
