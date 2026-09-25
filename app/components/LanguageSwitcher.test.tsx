import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { LanguageSwitcher } from "./LanguageSwitcher";

function renderSwitcher(lang: Lang, initialEntry = "/") {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      {/* eslint-disable-next-line react-perf/jsx-no-new-array-as-prop -- test helper, renders once */}
      <MemoryRouter initialEntries={[initialEntry]}>
        <LanguageSwitcher />
      </MemoryRouter>
    </I18nextProvider>,
  );
}

describe("LanguageSwitcher", () => {
  it("links to both languages with lang and hreflang, marking the current one", () => {
    renderSwitcher("en");
    const en = screen.getByRole("link", { name: "Switch language to English" });
    const it = screen.getByRole("link", { name: "Switch language to Italian" });
    expect(en).toHaveAttribute("href", "/");
    expect(en).toHaveAttribute("aria-current", "true");
    expect(en).toHaveAttribute("hreflang", "en");
    expect(it).toHaveAttribute("href", "/it/");
    expect(it).toHaveAttribute("hreflang", "it");
    expect(it).toHaveAttribute("lang", "it");
    expect(it).not.toHaveAttribute("aria-current");
  });

  it("keeps the current section anchor when switching language", () => {
    renderSwitcher("en", "/#security");
    expect(screen.getByRole("link", { name: "Switch language to Italian" })).toHaveAttribute("href", "/it/#security");
    expect(screen.getByRole("link", { name: "Switch language to English" })).toHaveAttribute("href", "/#security");
  });

  it("marks Italian as current on the Italian page and switches back to /", () => {
    renderSwitcher("it", "/it/#security");
    expect(screen.getByRole("link", { name: "Passa alla lingua italiana" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "Passa alla lingua inglese" })).toHaveAttribute("href", "/#security");
    expect(screen.getByRole("navigation", { name: "Lingua" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSwitcher("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
