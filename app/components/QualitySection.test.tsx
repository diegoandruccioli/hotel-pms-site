import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { QualitySection } from "./QualitySection";

function renderSection(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <QualitySection />
    </I18nextProvider>,
  );
}

describe("QualitySection", () => {
  it("states the enforced gates and the dated coverage numbers in English", () => {
    renderSection("en");
    expect(screen.getByRole("heading", { level: 2, name: "Quality and process" })).toBeInTheDocument();
    expect(screen.getByText(/zero-warning lint policy/)).toBeInTheDocument();
    expect(screen.getByText(/Measured 2026-08-04/)).toBeInTheDocument();
  });

  it("is translated on the Italian page", () => {
    renderSection("it");
    expect(screen.getByRole("heading", { level: 2, name: "Qualità e processo" })).toBeInTheDocument();
    expect(screen.getByText(/Misurato il 2026-08-04/)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSection("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
