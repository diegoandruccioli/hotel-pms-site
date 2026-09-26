import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { setContrast, setTheme, useContrast, useTheme } from "../theme";

const BUTTON =
  "inline-flex min-h-10 items-center justify-center rounded-shape-sm border border-outline px-3 text-sm font-semibold aria-pressed:bg-primary aria-pressed:text-on-primary text-primary";

/** Dark theme and high contrast switches; they set attributes on <html>, never inline styles. */
export function AppearanceControls() {
  const { t } = useTranslation("site");
  const theme = useTheme();
  const contrast = useContrast();
  const toggleTheme = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme]);
  const toggleContrast = useCallback(() => setContrast(contrast === "high" ? "normal" : "high"), [contrast]);

  return (
    <div role="group" aria-label={t("label_appearance")} className="flex gap-2">
      <button
        type="button"
        aria-pressed={theme === "dark"}
        onClick={toggleTheme}
        className={BUTTON}
      >
        {t("action_dark_theme")}
      </button>
      <button
        type="button"
        aria-pressed={contrast === "high"}
        onClick={toggleContrast}
        className={BUTTON}
      >
        {t("action_high_contrast")}
      </button>
    </div>
  );
}
