import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { LANG_PATH, LANGUAGES, isLang, type Lang } from "../site";

/**
 * EN/IT selector. Each link carries `lang`/`hreflang` and keeps the current section anchor,
 * so `/#security` switches to `/it/#security`. It is a plain link: no automatic redirect by
 * browser language anywhere on the site.
 */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation("site");
  const { hash } = useLocation();
  const current: Lang = isLang(i18n.language) ? i18n.language : "en";

  return (
    <nav aria-label={t("label_language")}>
      <ul className="flex gap-2">
        {LANGUAGES.map((lang) => {
          const isCurrent = lang === current;
          return (
            <li key={lang}>
              <Link
                to={`${LANG_PATH[lang]}${hash}`}
                lang={lang}
                hrefLang={lang}
                aria-current={isCurrent ? "true" : undefined}
                aria-label={t(`action_switch_to_${lang}`)}
                className={
                  isCurrent
                    ? "rounded-md bg-black px-3 py-2 font-semibold text-white"
                    : "rounded-md px-3 py-2 underline underline-offset-4"
                }
              >
                {lang.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
