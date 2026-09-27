import { useTranslation } from "react-i18next";
import { M3Card } from "./m3/M3Card";

/** What hotel-pms is built from. Every sentence here is backed by a claim in app/content/claims.ts. */
export function ArchitectureSection() {
  const { t } = useTranslation("site");
  return (
    <M3Card className="mt-12 max-w-prose" aria-labelledby="architecture-heading">
      <h2 id="architecture-heading" className="font-display text-2xl font-semibold">
        {t("architecture_heading")}
      </h2>
      <p className="mt-3">{t("architecture_body")}</p>
    </M3Card>
  );
}
