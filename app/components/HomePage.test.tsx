import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { HomePage } from "./HomePage";
import { SkipLink } from "./SkipLink";

function renderPage(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <MemoryRouter>
        <SkipLink />
        <HomePage />
      </MemoryRouter>
    </I18nextProvider>,
  );
}

describe("HomePage", () => {
  it("renders the English page with a single h1 and a working skip link", () => {
    renderPage("en");
    expect(screen.getByRole("heading", { level: 1, name: "Hotel PMS" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("renders the Italian page", () => {
    renderPage("it");
    expect(screen.getByText("Questa vetrina è in costruzione.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Vai al contenuto principale" })).toBeInTheDocument();
  });

  it.each<Lang>(["en", "it"])("has no accessibility violations (%s)", async (lang) => {
    const { container } = renderPage(lang);
    expect(await axe(container)).toHaveNoViolations();
  });
});
