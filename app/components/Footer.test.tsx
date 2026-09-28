import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { CONTACT_EMAIL } from "./AboutSection";
import { Footer } from "./Footer";

function renderFooter(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <Footer />
    </I18nextProvider>,
  );
}

describe("Footer", () => {
  it("repeats the contact email and the current year, in English", () => {
    renderFooter("en");
    const link = screen.getByRole("link", { name: CONTACT_EMAIL });
    expect(link).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
  });

  it("is translated on the Italian page", () => {
    renderFooter("it");
    expect(screen.getByRole("link", { name: CONTACT_EMAIL })).toBeInTheDocument();
    expect(screen.getByText(/mantenuto attivamente/)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderFooter("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
