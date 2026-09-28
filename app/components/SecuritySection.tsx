import { useTranslation } from "react-i18next";
import { SectionBand, type SectionTone } from "./SectionBand";

export function SecuritySection({ tone }: { tone?: SectionTone }) {
  const { t } = useTranslation("site");
  return (
    <SectionBand id="security" headingId="security-heading" tone={tone}>
      <h2 id="security-heading" className="font-display text-2xl font-semibold">
        {t("security_heading")}
      </h2>
      <p className="mt-3">{t("security_body")}</p>
    </SectionBand>
  );
}
