import { useTranslation } from "react-i18next";
import { SectionBand, type SectionTone } from "./SectionBand";

/** What hotel-pms is built from. Every sentence here is backed by a claim in app/content/claims.ts. */
export function ArchitectureSection({ tone }: { tone?: SectionTone }) {
  const { t } = useTranslation("site");
  return (
    <SectionBand id="architecture" headingId="architecture-heading" tone={tone}>
      <h2 id="architecture-heading" className="font-display text-2xl font-semibold">
        {t("architecture_heading")}
      </h2>
      <p className="mt-3">{t("architecture_body")}</p>
    </SectionBand>
  );
}
