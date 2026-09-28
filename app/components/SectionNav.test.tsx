import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { SectionNav } from "./SectionNav";

function renderNav(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <SectionNav />
    </I18nextProvider>,
  );
}

describe("SectionNav", () => {
  it("links to all 8 sections by anchor, in English", () => {
    renderNav("en");
    const nav = screen.getByRole("navigation", { name: "Page sections" });
    const links = nav.querySelectorAll("a");
    expect(links).toHaveLength(8);
    expect(screen.getByRole("link", { name: "About this project" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Status and roadmap" })).toHaveAttribute("href", "#status");
  });

  it("marks no section current until the observer runs client-side", () => {
    renderNav("en");
    for (const link of screen.getAllByRole("link")) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });

  it("is translated on the Italian page", () => {
    renderNav("it");
    expect(screen.getByRole("navigation", { name: "Sezioni della pagina" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Il progetto" })).toHaveAttribute("href", "#about");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderNav("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
