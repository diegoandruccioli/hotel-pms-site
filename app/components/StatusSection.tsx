import { useTranslation } from "react-i18next";
import { M3Card } from "./m3/M3Card";
import { M3StatusChip } from "./m3/M3StatusChip";

const READY_KEYS = ["status_ready_backup", "status_ready_accessibility", "status_ready_erasure"] as const;
const GAP_KEYS = [
  "status_gap_receipts",
  "status_gap_credit_note",
  "status_gap_channel_manager",
  "status_gap_booking",
] as const;

/** What's ready and what isn't, stated openly rather than sold as complete (CLAUDE.md, content honesty). */
export function StatusSection() {
  const { t } = useTranslation("site");
  return (
    <M3Card className="mt-12 max-w-prose" aria-labelledby="status-heading">
      <h2 id="status-heading" className="font-display text-2xl font-semibold">
        {t("status_heading")}
      </h2>

      <h3 className="mt-6 flex items-center gap-2 font-display text-lg font-semibold">
        <M3StatusChip tone="done">{t("status_ready_heading")}</M3StatusChip>
      </h3>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {READY_KEYS.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>

      <h3 className="mt-6 flex items-center gap-2 font-display text-lg font-semibold">
        <M3StatusChip tone="missing">{t("status_gaps_heading")}</M3StatusChip>
      </h3>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {GAP_KEYS.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
    </M3Card>
  );
}
