import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { ArchitectureSection } from "./ArchitectureSection";

function renderSection(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <ArchitectureSection />
    </I18nextProvider>,
  );
}

describe("ArchitectureSection", () => {
  it("describes the microservices architecture in English", () => {
    renderSection("en");
    expect(screen.getByRole("heading", { level: 2, name: "Architecture" })).toBeInTheDocument();
    expect(screen.getByText(/8 microservices behind a single API Gateway/)).toBeInTheDocument();
  });

  it("is translated on the Italian page", () => {
    renderSection("it");
    expect(screen.getByRole("heading", { level: 2, name: "Architettura" })).toBeInTheDocument();
    expect(screen.getByText(/8 microservizi dietro un unico API Gateway/)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSection("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
