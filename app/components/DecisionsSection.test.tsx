import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { DecisionsSection } from "./DecisionsSection";

function renderSection(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <DecisionsSection />
    </I18nextProvider>,
  );
}

describe("DecisionsSection", () => {
  it("lists five decisions, each with its rejected alternative, in English", () => {
    renderSection("en");
    expect(screen.getByRole("heading", { level: 2, name: "Decisions and trade-offs" })).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent("httpOnly cookies");
  });

  it("is translated on the Italian page", () => {
    renderSection("it");
    expect(screen.getByRole("heading", { level: 2, name: "Decisioni e compromessi" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSection("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
