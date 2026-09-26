import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MAIN_CONTENT_ID } from "./SkipLink";

export function HomePage() {
  const { t } = useTranslation("site");
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4">
        <span className="font-display text-lg font-semibold">{t("hero_title")}</span>
        <LanguageSwitcher />
      </header>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="px-6 py-16">
        <h1 className="font-display text-4xl font-semibold">{t("hero_title")}</h1>
        <p className="mt-4 max-w-prose text-lg">{t("hero_tagline")}</p>
        <p className="mt-8">{t("status_under_construction")}</p>
      </main>
    </>
  );
}
