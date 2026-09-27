import { useTranslation } from "react-i18next";
import { M3Card } from "./m3/M3Card";

interface Screenshot {
  file: string;
  altKey: string;
  width: number;
  height: number;
}

// Taken from the running app's own E2E seed data — see claims.ts ("screenshots_intro").
const SCREENSHOTS: readonly Screenshot[] = [
  { file: "dashboard", altKey: "screenshots_dashboard_alt", width: 922, height: 441 },
  { file: "reservations", altKey: "screenshots_reservations_alt", width: 1280, height: 613 },
  { file: "calendar", altKey: "screenshots_calendar_alt", width: 1280, height: 613 },
  { file: "billing", altKey: "screenshots_billing_alt", width: 1280, height: 613 },
];

export function ScreenshotsSection() {
  const { t } = useTranslation("site");
  return (
    <M3Card className="mt-12 max-w-3xl" aria-labelledby="screenshots-heading">
      <h2 id="screenshots-heading" className="font-display text-2xl font-semibold">
        {t("screenshots_heading")}
      </h2>
      <p className="mt-3">{t("screenshots_intro")}</p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SCREENSHOTS.map(({ file, altKey, width, height }) => (
          <img
            key={file}
            src={`/screenshots/${file}.webp`}
            alt={t(altKey)}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="w-full rounded-shape-sm border border-outline-variant"
          />
        ))}
      </div>
    </M3Card>
  );
}
