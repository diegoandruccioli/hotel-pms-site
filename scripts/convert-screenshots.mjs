// One-off: convert PNG/JPG screenshots to WebP via a canvas in a real Chromium tab (Playwright
// has no native WebP encoder). Source screenshots are the app's own E2E seed data, never real
// guest data. Run with: node scripts/convert-screenshots.mjs <src.jpg> <dest.webp> [maxWidth]
import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";

const [, , src, dest, maxWidthArg] = process.argv;
if (!src || !dest) {
  console.error("Usage: node scripts/convert-screenshots.mjs <src> <dest.webp> [maxWidth]");
  process.exit(1);
}
const maxWidth = maxWidthArg ? Number(maxWidthArg) : 1280;

const bytes = await readFile(src);
const dataUrl = `data:image/jpeg;base64,${bytes.toString("base64")}`;

const browser = await chromium.launch();
const page = await browser.newPage();
const webpBase64 = await page.evaluate(
  async ({ dataUrl, maxWidth }) => {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = dataUrl;
    });
    const scale = Math.min(1, maxWidth / img.naturalWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.82).split(",")[1];
  },
  { dataUrl, maxWidth },
);
await browser.close();

await writeFile(dest, Buffer.from(webpBase64, "base64"));
console.log(`Wrote ${dest}`);
