import { useTranslation } from "react-i18next";
import { AboutSection, CONTACT_EMAIL } from "./AboutSection";
import { ArchitectureSection } from "./ArchitectureSection";
import { AppearanceControls } from "./AppearanceControls";
import { DecisionsSection } from "./DecisionsSection";
import { Footer } from "./Footer";
import { HotelsSection } from "./HotelsSection";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { M3ButtonLink } from "./m3/M3ButtonLink";
import { M3Card } from "./m3/M3Card";
import { M3StatusChip } from "./m3/M3StatusChip";
import { MAIN_CONTENT_ID } from "./SkipLink";
import { QualitySection } from "./QualitySection";
import { ScreenshotsSection } from "./ScreenshotsSection";
import { SectionNav } from "./SectionNav";
import { SecuritySection } from "./SecuritySection";
import { StatusSection } from "./StatusSection";

export function HomePage() {
  const { t } = useTranslation("site");
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4">
        <span className="flex items-center gap-2 font-display text-lg font-semibold">
          <Logo />
          {t("hero_title")}
        </span>
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
                loading. It renders at roughly 460-470px in this layout at every breakpoint (one
                grid column inside max-w-5xl), so the default src is a purpose-sized 460w variant
                (scripts/resize-hero.mjs) and the full-size 922w one only loads for 2x/retina
                screens — a quarter the bytes on an ordinary 1x mobile screen. The 922w file also
                appears (lazy) in ScreenshotsSection, from the same URL, so its own fetch there is
                unaffected by this. */}
            <img
              src="/screenshots/dashboard-460.webp"
              srcSet="/screenshots/dashboard-460.webp 1x, /screenshots/dashboard.webp 2x"
              alt={t("hero_screenshot_alt")}
              width={460}
              height={220}
              loading="eager"
              fetchPriority="high"
              className="w-full rounded-shape-md border border-outline-variant shadow-elevation-2"
            />
          </div>
        </div>
        <SectionNav />
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
      <Footer />
    </>
  );
}
