import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { M3Card } from "./M3Card";

describe("M3Card", () => {
  it("renders its children in an outlined card by default", () => {
    render(<M3Card data-testid="card">Content</M3Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveTextContent("Content");
    expect(card).toHaveClass("rounded-shape-md", "border-outline-variant");
  });

  it("supports the other variants and a caller class", () => {
    render(
      <>
        <M3Card variant="elevated" data-testid="elevated" />
        <M3Card variant="filled" className="p-2" data-testid="filled" />
      </>,
    );
    expect(screen.getByTestId("elevated")).toHaveClass("shadow-elevation-1");
    expect(screen.getByTestId("filled")).toHaveClass("bg-surface-container-highest", "p-2");
    expect(screen.getByTestId("filled")).not.toHaveClass("p-6");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <M3Card>
          <h2>Title</h2>
          <p>Body</p>
        </M3Card>
        <M3Card variant="elevated">Elevated</M3Card>
        <M3Card variant="filled">Filled</M3Card>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
