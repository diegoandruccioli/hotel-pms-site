import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { AboutSection, CONTACT_EMAIL } from "./AboutSection";

function renderSection(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <AboutSection />
    </I18nextProvider>,
  );
}

describe("AboutSection", () => {
  it("talks about the product, not the person, in English", () => {
    renderSection("en");
    expect(screen.getByRole("heading", { level: 2, name: "About this project" })).toBeInTheDocument();
    expect(screen.getByText(/Hotel PMS is a microservices property management system/)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: CONTACT_EMAIL });
    expect(link).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  it("is translated on the Italian page", () => {
    renderSection("it");
    expect(screen.getByRole("heading", { level: 2, name: "Il progetto" })).toBeInTheDocument();
    expect(screen.getByText(/Hotel PMS è un gestionale a microservizi/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: CONTACT_EMAIL })).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSection("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
