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
        {/* Hero: the only section not on the SectionBand grid, since it has no heading id to link to. */}
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="font-display text-4xl font-semibold">{t("hero_title")}</h1>
          <p className="mt-4 max-w-prose text-lg">{t("hero_tagline")}</p>
          <div className="mt-6">
            <M3ButtonLink href={`mailto:${CONTACT_EMAIL}`}>{t("hero_cta")}</M3ButtonLink>
          </div>
          <M3Card className="mt-8 max-w-prose">
            <M3StatusChip tone="partial">{t("status_in_progress")}</M3StatusChip>
            <p className="mt-3">{t("status_under_construction")}</p>
          </M3Card>
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
