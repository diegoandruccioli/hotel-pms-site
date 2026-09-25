import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", lang: "en", heading: "Hotel PMS", switchTo: "Switch language to Italian", target: "/it/" },
  { path: "/it/", lang: "it", heading: "Hotel PMS", switchTo: "Passa alla lingua inglese", target: "/" },
] as const;

for (const page of PAGES) {
  test.describe(`prerendered ${page.path}`, () => {
    test("ships real HTML with the correct language, before any JavaScript runs", async ({ request }) => {
      const html = await (await request.get(page.path)).text();
      expect(html).toContain(`<html lang="${page.lang}"`);
      expect(html).toContain("<h1");
      expect(html).toContain('rel="canonical"');
      // HTML attribute names are case-insensitive; React Router emits `hrefLang`.
      expect(html).toMatch(/hreflang="en"/i);
      expect(html).toMatch(/hreflang="it"/i);
    });

    test("has no axe violations", async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      const results = await new AxeBuilder({ page: browserPage })
        .withTags(["wcag2a", "wcag2aa", "wcag2aaa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test("switches language from the keyboard and keeps the section anchor", async ({ page: browserPage }) => {
      await browserPage.goto(`${page.path}#security`);
      const link = browserPage.getByRole("link", { name: page.switchTo });
      await link.focus();
      await browserPage.keyboard.press("Enter");
      await expect(browserPage).toHaveURL(new RegExp(`${page.target}#security$`));
      await expect(browserPage.locator("html")).toHaveAttribute("lang", page.lang === "en" ? "it" : "en");
    });

    test("skip link moves focus to the main content", async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      await browserPage.keyboard.press("Tab");
      await browserPage.keyboard.press("Enter");
      await expect(browserPage.locator("#main-content")).toBeFocused();
    });
  });
}
