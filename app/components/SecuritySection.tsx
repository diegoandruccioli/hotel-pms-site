import { useTranslation } from "react-i18next";
import { M3Card } from "./m3/M3Card";

export function SecuritySection() {
  const { t } = useTranslation("site");
  return (
    <M3Card className="mt-12 max-w-prose" aria-labelledby="security-heading">
      <h2 id="security-heading" className="font-display text-2xl font-semibold">
        {t("security_heading")}
      </h2>
      <p className="mt-3">{t("security_body")}</p>
    </M3Card>
  );
}
