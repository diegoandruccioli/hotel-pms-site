import { useTranslation } from "react-i18next";
import { AboutSection, CONTACT_EMAIL } from "./AboutSection";
import { ArchitectureSection } from "./ArchitectureSection";
import { AppearanceControls } from "./AppearanceControls";
import { DecisionsSection } from "./DecisionsSection";
import { HotelsSection } from "./HotelsSection";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { M3ButtonLink } from "./m3/M3ButtonLink";
import { M3Card } from "./m3/M3Card";
import { M3StatusChip } from "./m3/M3StatusChip";
import { MAIN_CONTENT_ID } from "./SkipLink";
import { QualitySection } from "./QualitySection";
import { ScreenshotsSection } from "./ScreenshotsSection";
import { SecuritySection } from "./SecuritySection";
import { StatusSection } from "./StatusSection";

export function HomePage() {
  const { t } = useTranslation("site");
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4">
        <span className="font-display text-lg font-semibold">{t("hero_title")}</span>
        <div className="flex flex-wrap items-center gap-4">
          <AppearanceControls />
          <LanguageSwitcher />
        </div>
      </header>
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        {/* Hero: the only section not on the SectionBand grid, since it has no heading id to link to.
            Wider than the max-w-3xl text sections below — it has a second column to hold. */}
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-semibold">{t("hero_title")}</h1>
              <p className="mt-4 max-w-prose text-lg">{t("hero_tagline")}</p>
              <div className="mt-6">
                <M3ButtonLink href={`mailto:${CONTACT_EMAIL}`}>{t("hero_cta")}</M3ButtonLink>
              </div>
              <M3Card className="mt-8">
                <M3StatusChip tone="partial">{t("status_in_progress")}</M3StatusChip>
                <p className="mt-3">{t("status_under_construction")}</p>
              </M3Card>
            </div>
            {/* The dashboard screenshot doubles as the LCP element: eager, high priority, no lazy
                loading. Same file also appears (lazy) in ScreenshotsSection — one network fetch,
                the browser cache serves the second <img>. */}
            <img
              src="/screenshots/dashboard.webp"
              alt={t("hero_screenshot_alt")}
              width={922}
              height={441}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-shape-md border border-outline-variant shadow-elevation-2"
            />
          </div>
        </div>
        {/* Full-width bands below, alternating tone for visual rhythm (SectionBand). */}
        <AboutSection tone="default" />
        <ScreenshotsSection tone="muted" />
        <ArchitectureSection tone="default" />
        <DecisionsSection tone="muted" />
        <SecuritySection tone="default" />
        <QualitySection tone="muted" />
        <HotelsSection tone="default" />
        <StatusSection tone="muted" />
      </main>
    </>
  );
}
