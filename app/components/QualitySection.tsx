import { useTranslation } from "react-i18next";
import { M3Card } from "./m3/M3Card";

export function QualitySection() {
  const { t } = useTranslation("site");
  return (
    <M3Card className="mt-12 max-w-prose" aria-labelledby="quality-heading">
      <h2 id="quality-heading" className="font-display text-2xl font-semibold">
        {t("quality_heading")}
      </h2>
      <p className="mt-3">{t("quality_gates")}</p>
      {/* Coverage is a measured number (claims.ts: measuredAt "2026-08-04"), so it is kept
          visually distinct from the process description above rather than merged into it.
          Text colour stays on-surface (not on-surface-variant): tokens.test.ts only proves
          7:1 contrast for on-surface-variant against surface-variant, not against surface. */}
      <p className="mt-3 text-sm">{t("quality_coverage")}</p>
    </M3Card>
  );
}
