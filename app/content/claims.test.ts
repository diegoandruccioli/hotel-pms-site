import { describe, expect, it } from "vitest";
import en from "../locales/en/site.json";
import itLocale from "../locales/it/site.json";
import { claims } from "./claims";

describe("claims", () => {
  it("gives every claim a non-empty source", () => {
    for (const claim of claims) {
      expect(claim.source.trim(), `claim "${claim.key}" has no source`).not.toBe("");
    }
  });

  it("has no two claims for the same key", () => {
    const keys = claims.map((claim) => claim.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it.each(claims)("has EN and IT text for $key", (claim) => {
    expect(claim.key in en, `missing EN key "${claim.key}"`).toBe(true);
    expect(claim.key in itLocale, `missing IT key "${claim.key}"`).toBe(true);
  });

  it("dates every volatile claim as YYYY-MM-DD", () => {
    for (const claim of claims) {
      if (claim.measuredAt !== undefined) {
        expect(claim.measuredAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });
});
