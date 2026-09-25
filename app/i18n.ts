import { createInstance, type i18n as I18n } from "i18next";
import en from "./locales/en/site.json";
import it from "./locales/it/site.json";
import type { Lang } from "./site";

export const DEFAULT_NAMESPACE = "site";

export const resources = {
  en: { [DEFAULT_NAMESPACE]: en },
  it: { [DEFAULT_NAMESPACE]: it },
} as const;

const instances = new Map<Lang, I18n>();

/**
 * One synchronous i18next instance per language. The language is decided by the route
 * (`/` = EN, `/it/` = IT), never by the browser, so prerendered HTML is deterministic.
 */
export function getI18n(lang: Lang): I18n {
  const cached = instances.get(lang);
  if (cached) {
    return cached;
  }
  const instance = createInstance();
  void instance.init({
    lng: lang,
    fallbackLng: false,
    resources,
    defaultNS: DEFAULT_NAMESPACE,
    ns: [DEFAULT_NAMESPACE],
    initAsync: false,
    interpolation: { escapeValue: false },
  });
  instances.set(lang, instance);
  return instance;
}
