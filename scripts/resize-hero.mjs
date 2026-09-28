// One-off: derive a smaller hero variant from the existing dashboard.webp for narrow viewports.
import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";

const bytes = await readFile("public/screenshots/dashboard.webp");
const dataUrl = "data:image/webp;base64," + bytes.toString("base64");

const browser = await chromium.launch();
const page = await browser.newPage();
const out = await page.evaluate(
  async ({ dataUrl, width }) => {
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
      img.src = dataUrl;
    });
    const scale = width / img.naturalWidth;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.82).split(",")[1];
  },
  { dataUrl, width: 460 },
);
await browser.close();
await writeFile("public/screenshots/dashboard-460.webp", Buffer.from(out, "base64"));
console.log("Wrote public/screenshots/dashboard-460.webp");
