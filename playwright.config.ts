import { defineConfig, devices } from "@playwright/test";

// Tests run against the prerendered output (build/client) served by `vite preview`,
// so they see the same static HTML that ships to production. Run `npm run build` first.
//
// In CI (GitHub Actions sets CI=true) the pre-installed system Chrome is used instead of
// downloading Playwright's bundled binary, with retries and a single worker for stability.

const isCI = !!process.env.CI;
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(isCI ? { channel: "chrome" } : {}),
      },
    },
  ],
  webServer: {
    command: "npm run preview",
    url: baseURL,
    reuseExistingServer: !isCI,
  },
});
