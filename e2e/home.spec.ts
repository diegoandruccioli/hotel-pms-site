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
      expect(html).toContain('rel="icon"');
      expect(html).toContain('property="og:image"');
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

    test("shows the dashboard screenshot above the fold, eager-loaded", async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      const heroImage = browserPage.locator('main img[src="/screenshots/dashboard-460.webp"]');
      await expect(heroImage).toBeVisible();
      await expect(heroImage).toHaveJSProperty("loading", "eager");
      await expect(heroImage).toHaveJSProperty("complete", true);
    });
  });
}

// Themes are attributes on <html>; every theme must pass the same AAA axe check.
const THEMES = [
  { name: "light", theme: "light", contrast: "normal" },
  { name: "dark", theme: "dark", contrast: "normal" },
  { name: "light high contrast", theme: "light", contrast: "high" },
  { name: "dark high contrast", theme: "dark", contrast: "high" },
] as const;

for (const page of PAGES) {
  for (const theme of THEMES) {
    test(`${page.path} has no axe violations in the ${theme.name} theme`, async ({ page: browserPage }) => {
      // The global colour transition would let axe sample mid-fade colours.
      await browserPage.emulateMedia({ reducedMotion: "reduce" });
      // Set the choice in localStorage before navigating, like a real visitor, instead of poking
      // the <html> attributes after load: that bypassed AppearanceControls' React state (it only
      // learns of a theme change through setTheme/setContrast), leaving aria-pressed stale while
      // the CSS custom properties had already switched — an internally-inconsistent button axe
      // correctly flagged, not a real bug a visitor could reach.
      await browserPage.addInitScript(
        ({ theme: t, contrast }) => {
          localStorage.setItem("theme", t);
          localStorage.setItem("contrast", contrast);
        },
        theme,
      );
      await browserPage.goto(page.path);
      const results = await new AxeBuilder({ page: browserPage })
        .withTags(["wcag2a", "wcag2aa", "wcag2aaa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}

test.describe("appearance follows the browser until the visitor chooses", () => {
  test.describe("with a dark, more-contrast browser", () => {
    test.use({ colorScheme: "dark", contrast: "more" });

    test("starts dark and high contrast before first paint", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
    });

    test("a saved choice wins over the browser preference", async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("contrast", "normal");
      });
      await page.goto("/it/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      await expect(page.locator("html")).toHaveAttribute("data-contrast", "normal");
    });
  });

  test("the switches work from the keyboard and survive a reload", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    const dark = page.getByRole("button", { name: "Dark theme" });
    await dark.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(dark).toHaveAttribute("aria-pressed", "true");

    const contrast = page.getByRole("button", { name: "High contrast" });
    await contrast.focus();
    await page.keyboard.press("Space");
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
    await expect(page.getByRole("button", { name: "Dark theme" })).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("section navigation", () => {
  test("clicking an anchor jumps to the section and marks it current", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Page sections" });
    await nav.getByRole("link", { name: "Decisions and trade-offs" }).click();
    await expect(page).toHaveURL(/#decisions$/);
    await expect(page.locator("#decisions")).toBeInViewport();
    await expect(nav.getByRole("link", { name: "Decisions and trade-offs" })).toHaveAttribute("aria-current", "true");
  });

  test("highlights the current section while scrolling, without a click", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Page sections" });
    await page.locator("#status").scrollIntoViewIfNeeded();
    await expect(nav.getByRole("link", { name: "Status and roadmap" })).toHaveAttribute("aria-current", "true");
  });
});
