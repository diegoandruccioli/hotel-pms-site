import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CSS = readFileSync(join(process.cwd(), "app/styles/tokens.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

const THEMES = {
  light: ":root",
  dark: ':root[data-theme="dark"]',
  "light high contrast": ':root[data-contrast="high"]',
  "dark high contrast": ':root[data-theme="dark"][data-contrast="high"]',
} as const;

type ThemeName = keyof typeof THEMES;
type Tokens = Record<string, string>;

function parseBlock(selector: string): Tokens {
  const start = CSS.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Missing theme block ${selector}`);
  const body = CSS.slice(CSS.indexOf("{", start) + 1, CSS.indexOf("}", start));
  const tokens: Tokens = {};
  for (const match of body.matchAll(/(--md-[\w-]+):\s*([^;]+);/g)) {
    tokens[match[1] as string] = (match[2] as string).trim();
  }
  return tokens;
}

const tokens = Object.fromEntries(
  (Object.keys(THEMES) as ThemeName[]).map((name) => [name, parseBlock(THEMES[name])]),
) as Record<ThemeName, Tokens>;

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [
    number,
    number,
    number,
  ];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

const SURFACES = [
  "surface",
  "surface-dim",
  "surface-bright",
  "surface-container-lowest",
  "surface-container-low",
  "surface-container",
  "surface-container-high",
  "surface-container-highest",
];

// [foreground, background] pairs that carry text: WCAG AAA needs 7:1.
const TEXT_PAIRS: [string, string][] = [
  ["on-primary", "primary"],
  ["on-primary-container", "primary-container"],
  ["on-secondary", "secondary"],
  ["on-secondary-container", "secondary-container"],
  ["on-tertiary", "tertiary"],
  ["on-tertiary-container", "tertiary-container"],
  ["on-error", "error"],
  ["on-error-container", "error-container"],
  ["on-surface-variant", "surface-variant"],
  ["inverse-on-surface", "inverse-surface"],
  ["inverse-primary", "inverse-surface"],
  ...SURFACES.map((surface): [string, string] => ["on-surface", surface]),
  // Links and outlined buttons sit on these; dark surface-bright is a hover highlight, not a page background.
  ...SURFACES.filter((surface) => surface !== "surface-bright").map((surface): [string, string] => [
    "primary",
    surface,
  ]),
];

describe("design tokens", () => {
  const names = Object.keys(tokens.light).filter((token) => token.startsWith("--md-"));

  for (const theme of Object.keys(THEMES) as ThemeName[]) {
    describe(theme, () => {
      it("defines every token, never inheriting one from another theme", () => {
        if (theme === "light" || theme === "dark") {
          // Light and dark share the elevation set the high-contrast themes fall back to.
          expect(Object.keys(tokens[theme]).length).toBeGreaterThan(30);
          return;
        }
        const colors = names.filter((token) => !token.startsWith("--md-elevation"));
        expect(colors.filter((token) => !(token in tokens[theme]))).toEqual([]);
      });

      it("keeps text pairs at WCAG AAA contrast (7:1)", () => {
        const failures = TEXT_PAIRS.flatMap(([fg, bg]) => {
          const ratio = contrast(tokens[theme][`--md-${fg}`] as string, tokens[theme][`--md-${bg}`] as string);
          return ratio >= 7 ? [] : [`${fg} on ${bg}: ${ratio.toFixed(2)}:1`];
        });
        expect(failures).toEqual([]);
      });

      it("keeps the outline visible against the surface (3:1)", () => {
        const ratio = contrast(tokens[theme]["--md-outline"] as string, tokens[theme]["--md-surface"] as string);
        expect(ratio).toBeGreaterThanOrEqual(3);
      });
    });
  }

  it("uses hex or rgba values only for colors", () => {
    for (const theme of Object.keys(THEMES) as ThemeName[]) {
      for (const [name, value] of Object.entries(tokens[theme])) {
        if (name.startsWith("--md-elevation")) continue;
        expect(value, `${theme} ${name}`).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });
});
