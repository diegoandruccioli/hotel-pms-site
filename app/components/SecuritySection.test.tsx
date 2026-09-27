import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { SecuritySection } from "./SecuritySection";

function renderSection(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <SecuritySection />
    </I18nextProvider>,
  );
}

describe("SecuritySection", () => {
  it("states the httpOnly cookie and HMAC controls in English", () => {
    renderSection("en");
    expect(screen.getByRole("heading", { level: 2, name: "Security" })).toBeInTheDocument();
    expect(screen.getByText(/httpOnly cookie/)).toBeInTheDocument();
    expect(screen.getByText(/HMAC-SHA256/)).toBeInTheDocument();
  });

  it("is translated on the Italian page", () => {
    renderSection("it");
    expect(screen.getByRole("heading", { level: 2, name: "Sicurezza" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSection("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
