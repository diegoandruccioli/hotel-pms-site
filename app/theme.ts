import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export type Contrast = "normal" | "high";

const THEME_KEY = "theme";
const CONTRAST_KEY = "contrast";

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function remember(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked (private mode, site data off): the choice just lasts for this visit.
  }
}

/** The document attributes are the source of truth; `public/theme-init.js` sets them before first paint. */
export function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function readContrast(): Contrast {
  return document.documentElement.getAttribute("data-contrast") === "high" ? "high" : "normal";
}

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  remember(THEME_KEY, theme);
  listeners.forEach((listener) => listener());
}

export function setContrast(contrast: Contrast): void {
  document.documentElement.setAttribute("data-contrast", contrast);
  remember(CONTRAST_KEY, contrast);
  listeners.forEach((listener) => listener());
}

// Prerendered HTML has no attributes yet, so the server snapshot is the default theme.
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}

export function useContrast(): Contrast {
  return useSyncExternalStore(subscribe, readContrast, () => "normal");
}
