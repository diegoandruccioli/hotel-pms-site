import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { AppearanceControls } from "./AppearanceControls";

function renderControls(lang: Lang = "en") {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <AppearanceControls />
    </I18nextProvider>,
  );
}

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-contrast");
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("AppearanceControls", () => {
  it("starts from the attributes already on <html>", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-contrast", "high");
    renderControls();
    expect(screen.getByRole("button", { name: "Dark theme" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "High contrast" })).toHaveAttribute("aria-pressed", "true");
  });

  it("switches the theme with attributes and remembers the choice", () => {
    renderControls();
    const dark = screen.getByRole("button", { name: "Dark theme" });
    expect(dark).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(dark);
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(dark).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(dark);
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("switches high contrast on and off", () => {
    renderControls();
    const contrast = screen.getByRole("button", { name: "High contrast" });
    fireEvent.click(contrast);
    expect(document.documentElement).toHaveAttribute("data-contrast", "high");
    expect(localStorage.getItem("contrast")).toBe("high");
    fireEvent.click(contrast);
    expect(document.documentElement).toHaveAttribute("data-contrast", "normal");
  });

  it("still switches when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    renderControls();
    fireEvent.click(screen.getByRole("button", { name: "Dark theme" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("is translated on the Italian page", () => {
    renderControls("it");
    expect(screen.getByRole("group", { name: "Aspetto" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tema scuro" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Alto contrasto" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderControls();
    expect(await axe(container)).toHaveNoViolations();
  });
});
