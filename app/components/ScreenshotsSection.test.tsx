import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { ScreenshotsSection } from "./ScreenshotsSection";

function renderSection(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <ScreenshotsSection />
    </I18nextProvider>,
  );
}

describe("ScreenshotsSection", () => {
  it("shows 4 seed-data screenshots with translated alt text in English", () => {
    renderSection("en");
    expect(screen.getByRole("heading", { level: 2, name: "Screenshots" })).toBeInTheDocument();
    expect(screen.getByText(/end-to-end seed data/)).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
    for (const img of images) {
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img).toHaveAttribute("width");
      expect(img).toHaveAttribute("height");
      expect(img.getAttribute("alt")?.trim()).not.toBe("");
    }
    expect(screen.getByAltText(/Dashboard showing today's arrivals/)).toHaveAttribute(
      "src",
      "/screenshots/dashboard.webp",
    );
  });

  it("is translated on the Italian page", () => {
    renderSection("it");
    expect(screen.getByRole("heading", { level: 2, name: "Schermate" })).toBeInTheDocument();
    expect(screen.getByAltText(/Bacheca con arrivi/)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSection("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
