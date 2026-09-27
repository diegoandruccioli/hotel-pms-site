// One-off generator for public/apple-touch-icon.png and public/og-image.png. Not part of the
// build: these are static brand assets, committed like any other image, regenerated only when
// the design changes. Run with: node scripts/generate-social-images.mjs
import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const PRIMARY = "#1a3a5c";
const ON_PRIMARY = "#ffffff";
const PRIMARY_CONTAINER = "#d4e4f7";

const browser = await chromium.launch();
const page = await browser.newPage();

// Apple touch icon: same mark as favicon.svg, rasterized at 180x180 (SVG has no fixed raster).
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<!doctype html><html><body style="margin:0">
  <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="${PRIMARY}"/>
    <text x="32" y="34" text-anchor="middle" dominant-baseline="central"
          font-family="system-ui, sans-serif" font-size="34" font-weight="700"
          fill="${ON_PRIMARY}">H</text>
  </svg>
</body></html>`);
await writeFile("public/apple-touch-icon.png", await page.screenshot({ omitBackground: false }));

// Open Graph / Twitter card: 1200x630, plain system font (this is a static asset, not the
// live site, so it does not need the self-hosted Outfit/Inter files).
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><body style="margin:0">
  <div style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;
              padding:80px;box-sizing:border-box;background:${PRIMARY_CONTAINER};
              font-family:system-ui,sans-serif">
    <div style="width:72px;height:72px;border-radius:16px;background:${PRIMARY};
                display:flex;align-items:center;justify-content:center;
                color:${ON_PRIMARY};font-size:38px;font-weight:700;margin-bottom:32px">H</div>
    <div style="font-size:64px;font-weight:700;color:${PRIMARY}">Hotel PMS</div>
    <div style="font-size:28px;color:#1a1c1e;margin-top:16px;max-width:900px">
      A property management system for Italian hotels, built as microservices and
      documented honestly.
    </div>
  </div>
</body></html>`);
await writeFile("public/og-image.png", await page.screenshot());

await browser.close();
console.log("Wrote public/apple-touch-icon.png and public/og-image.png");
