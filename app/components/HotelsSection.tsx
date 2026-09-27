import { useTranslation } from "react-i18next";
import { CONTACT_EMAIL } from "./AboutSection";
import { M3Card } from "./m3/M3Card";
import { M3ButtonLink } from "./m3/M3ButtonLink";

// One i18n key per line of README/compliance-audit fact; each has its own claims.ts entry.
const COMPLIANCE_KEYS = [
  "hotels_compliance_alloggiati",
  "hotels_compliance_invoicing",
  "hotels_compliance_citytax",
  "hotels_compliance_receipts",
  "hotels_compliance_gdpr",
] as const;

export function HotelsSection() {
  const { t } = useTranslation("site");
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t("hotels_cta_subject"))}`;

  return (
    <M3Card className="mt-12 max-w-prose" aria-labelledby="hotels-heading">
      <h2 id="hotels-heading" className="font-display text-2xl font-semibold">
        {t("hotels_heading")}
      </h2>
      <p className="mt-3">{t("hotels_intro")}</p>
      <h3 className="mt-6 font-display text-lg font-semibold">{t("hotels_compliance_heading")}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {COMPLIANCE_KEYS.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
      <div className="mt-6">
        <M3ButtonLink href={mailto}>{t("hotels_cta")}</M3ButtonLink>
      </div>
    </M3Card>
  );
}
