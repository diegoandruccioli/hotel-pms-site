import { getI18n } from "./i18n";
import { LANG_PATH, LANGUAGES, SITE_ORIGIN, type Lang } from "./site";

type MetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { tagName: "link"; rel: string; href: string; hrefLang?: string };

const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
  it: "it_IT",
};

/** Title, description, canonical, hreflang alternates and Open Graph tags for one language. */
export function buildMeta(lang: Lang): MetaDescriptor[] {
  const t = getI18n(lang).getFixedT(lang, "site");
  const url = `${SITE_ORIGIN}${LANG_PATH[lang]}`;
  const other = LANGUAGES.filter((candidate) => candidate !== lang);

  return [
    { title: t("meta_title") },
    { name: "description", content: t("meta_description") },
    { tagName: "link", rel: "canonical", href: url },
    ...LANGUAGES.map((candidate) => ({
      tagName: "link" as const,
      rel: "alternate",
      hrefLang: candidate,
      href: `${SITE_ORIGIN}${LANG_PATH[candidate]}`,
    })),
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: `${SITE_ORIGIN}${LANG_PATH.en}`,
    },
    { property: "og:type", content: "website" },
    { property: "og:title", content: t("meta_title") },
    { property: "og:description", content: t("meta_description") },
    { property: "og:url", content: url },
    { property: "og:locale", content: OG_LOCALE[lang] },
    ...other.map((candidate) => ({
      property: "og:locale:alternate",
      content: OG_LOCALE[candidate],
    })),
  ];
}
