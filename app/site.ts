/** Canonical origin of the published site (Cloudflare Pages project `hotel-pms-site`). */
export const SITE_ORIGIN = "https://hotel-pms-site.pages.dev";

export type Lang = "en" | "it";

export const LANGUAGES: readonly Lang[] = ["en", "it"];

/** Path each language is served from. English is the default on `/`, Italian on `/it/`. */
export const LANG_PATH: Record<Lang, string> = {
  en: "/",
  it: "/it/",
};

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "it";
}
