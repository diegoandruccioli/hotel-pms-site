import { describe, expect, it } from "vitest";
import { buildMeta } from "./meta";
import { SITE_ORIGIN } from "./site";

describe("buildMeta", () => {
  it("builds English metadata for /", () => {
    const meta = buildMeta("en");
    expect(meta).toContainEqual({ title: "Hotel PMS — property management system built as microservices" });
    expect(meta).toContainEqual({ tagName: "link", rel: "canonical", href: `${SITE_ORIGIN}/` });
    expect(meta).toContainEqual({ property: "og:locale", content: "en_US" });
    expect(meta).toContainEqual({ property: "og:locale:alternate", content: "it_IT" });
    expect(meta).toContainEqual({ property: "og:image", content: `${SITE_ORIGIN}/og-image.png` });
    expect(meta).toContainEqual({ name: "twitter:card", content: "summary_large_image" });
  });

  it("builds Italian metadata for /it/", () => {
    const meta = buildMeta("it");
    expect(meta).toContainEqual({ title: "Hotel PMS — gestionale alberghiero a microservizi" });
    expect(meta).toContainEqual({ tagName: "link", rel: "canonical", href: `${SITE_ORIGIN}/it/` });
    expect(meta).toContainEqual({ property: "og:locale", content: "it_IT" });
  });

  it("declares hreflang alternates for both languages and x-default on every page", () => {
    for (const lang of ["en", "it"] as const) {
      const meta = buildMeta(lang);
      expect(meta).toContainEqual({ tagName: "link", rel: "alternate", hrefLang: "en", href: `${SITE_ORIGIN}/` });
      expect(meta).toContainEqual({ tagName: "link", rel: "alternate", hrefLang: "it", href: `${SITE_ORIGIN}/it/` });
      expect(meta).toContainEqual({
        tagName: "link",
        rel: "alternate",
        hrefLang: "x-default",
        href: `${SITE_ORIGIN}/`,
      });
    }
  });
});
