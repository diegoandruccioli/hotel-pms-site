import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { getI18n } from "../i18n";
import type { Lang } from "../site";
import { MAIN_CONTENT_ID, SkipLink } from "./SkipLink";

function renderSkipLink(lang: Lang) {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <SkipLink />
    </I18nextProvider>,
  );
}

describe("SkipLink", () => {
  it("points at the main content landmark, in English", () => {
    renderSkipLink("en");
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", `#${MAIN_CONTENT_ID}`);
  });

  it("is translated on the Italian page", () => {
    renderSkipLink("it");
    expect(screen.getByRole("link", { name: "Vai al contenuto principale" })).toHaveAttribute(
      "href",
      `#${MAIN_CONTENT_ID}`,
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSkipLink("en");
    expect(await axe(container)).toHaveNoViolations();
  });
});
