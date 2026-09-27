import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { CONTACT_EMAIL } from "./AboutSection";
import { HotelsSection } from "./HotelsSection";

function renderSection(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <HotelsSection />
    </I18nextProvider>,
  );
}

describe("HotelsSection", () => {
  it("lists Italian compliance items and a demo CTA with a precompiled subject, in English", () => {
    renderSection("en");
    expect(screen.getByRole("heading", { level: 2, name: "For hotels" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(screen.getByText(/not built yet/)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: "Request a demo for your hotel" });
    expect(cta).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}?subject=Demo%20request%20-%20Hotel%20PMS`);
  });

  it("is translated on the Italian page", () => {
    renderSection("it");
    expect(screen.getByRole("heading", { level: 2, name: "Per gli hotel" })).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: "Richiedi una demo per il tuo hotel" });
    expect(cta.getAttribute("href")).toContain("subject=Richiesta%20demo");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSection("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
