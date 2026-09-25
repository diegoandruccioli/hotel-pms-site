import { useTranslation } from "react-i18next";

export const MAIN_CONTENT_ID = "main-content";

export function SkipLink() {
  const { t } = useTranslation("site");
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:outline-2 focus:outline-offset-2 focus:outline-black"
    >
      {t("skip_to_content")}
    </a>
  );
}
