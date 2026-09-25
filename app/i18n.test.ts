import { describe, expect, it } from "vitest";
import { getI18n, resources } from "./i18n";

const enKeys = Object.keys(resources.en.site).sort();
const itKeys = Object.keys(resources.it.site).sort();

describe("locale files", () => {
  it("has an Italian translation for every English key", () => {
    expect(enKeys.filter((key) => !itKeys.includes(key))).toEqual([]);
  });

  it("has an English source for every Italian key", () => {
    expect(itKeys.filter((key) => !enKeys.includes(key))).toEqual([]);
  });

  it("uses snake_case keys", () => {
    for (const key of enKeys) {
      expect(key).toMatch(/^[a-z][a-z0-9]*(_[a-z0-9]+)*$/);
    }
  });

  it("has no empty translations", () => {
    for (const lang of ["en", "it"] as const) {
      for (const [key, value] of Object.entries(resources[lang].site)) {
        expect(value.trim(), `${lang}.${key}`).not.toBe("");
      }
    }
  });
});

describe("getI18n", () => {
  it("returns one instance per language, resolved synchronously", () => {
    const en = getI18n("en");
    expect(getI18n("en")).toBe(en);
    expect(en.t("hero_title", { ns: "site" })).toBe("Hotel PMS");
    expect(getI18n("it").language).toBe("it");
    expect(getI18n("it").t("skip_to_content", { ns: "site" })).toBe("Vai al contenuto principale");
  });
});
