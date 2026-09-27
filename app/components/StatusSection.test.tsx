import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { StatusSection } from "./StatusSection";

function renderSection(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <StatusSection />
    </I18nextProvider>,
  );
}

describe("StatusSection", () => {
  it("states 3 ready items and 4 open gaps in English, without hiding the gaps", () => {
    renderSection("en");
    expect(screen.getByRole("heading", { level: 2, name: "Status and roadmap" })).toBeInTheDocument();
    expect(screen.getByText("Already built")).toBeInTheDocument();
    expect(screen.getByText("Not built yet")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(7);
    expect(screen.getByText(/mandatory by law since 2026-01-01/)).toBeInTheDocument();
  });

  it("is translated on the Italian page", () => {
    renderSection("it");
    expect(screen.getByRole("heading", { level: 2, name: "Stato e roadmap" })).toBeInTheDocument();
    expect(screen.getByText("Già costruito")).toBeInTheDocument();
    expect(screen.getByText("Non ancora costruito")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSection("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
