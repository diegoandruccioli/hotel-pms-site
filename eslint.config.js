import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPerf from "eslint-plugin-react-perf";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["build", "coverage", ".react-router", "playwright-report", "test-results"]),
  jsxA11y.flatConfigs.strict,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-perf": reactPerf,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      ...reactPerf.configs.recommended.rules,
      // Statically ban XSS sinks — React JSX escaping is the only safe output path
      "no-restricted-syntax": [
        "error",
        {
          selector: 'JSXAttribute[name.name="dangerouslySetInnerHTML"]',
          message: "dangerouslySetInnerHTML is forbidden — use React JSX expressions to prevent XSS.",
        },
        {
          selector: 'AssignmentExpression[left.property.name="innerHTML"]',
          message: "Direct innerHTML assignment is forbidden — use React JSX expressions to prevent XSS.",
        },
        {
          selector: 'AssignmentExpression[left.property.name="outerHTML"]',
          message: "Direct outerHTML assignment is forbidden — use React JSX expressions to prevent XSS.",
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  {
    // React Router route modules export meta/links/handle next to the component by design.
    files: ["app/root.tsx", "app/routes/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
]);
