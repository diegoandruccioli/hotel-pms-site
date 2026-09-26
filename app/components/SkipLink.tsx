import { useTranslation } from "react-i18next";

export const MAIN_CONTENT_ID = "main-content";

export function SkipLink() {
  const { t } = useTranslation("site");
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-shape-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
    >
      {t("skip_to_content")}
    </a>
  );
}
