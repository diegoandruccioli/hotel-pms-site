import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./app/setupTests.ts",
    include: ["app/**/*.test.{ts,tsx}", "scripts/**/*.test.ts"],
    exclude: ["node_modules", "build", "e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["app/**/*.{ts,tsx}"],
      exclude: [
        "app/**/*.test.{ts,tsx}",
        "app/**/*.d.ts",
        "app/setupTests.ts",
        // Framework entry/config files — glue with nothing to unit test.
        "app/routes.ts",
        "app/root.tsx",
        // Route modules only wire a page component and its meta.
        "app/routes/**",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
