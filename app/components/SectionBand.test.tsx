import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { SectionBand } from "./SectionBand";

describe("SectionBand", () => {
  it("renders a landmark section identified by id and labelled by its heading", () => {
    render(
      <SectionBand id="example" headingId="example-heading">
        <h2 id="example-heading">Example</h2>
      </SectionBand>,
    );
    const section = screen.getByRole("region", { name: "Example" });
    expect(section).toHaveAttribute("id", "example");
  });

  it("defaults to the default tone and switches to muted", () => {
    const { container: defaultContainer } = render(
      <SectionBand id="a" headingId="a-heading">
        <h2 id="a-heading">A</h2>
      </SectionBand>,
    );
    expect(defaultContainer.querySelector("section")).toHaveClass("bg-surface");

    const { container: mutedContainer } = render(
      <SectionBand id="b" headingId="b-heading" tone="muted">
        <h2 id="b-heading">B</h2>
      </SectionBand>,
    );
    expect(mutedContainer.querySelector("section")).toHaveClass("bg-surface-container-low");
  });

  it("lets a caller widen the inner column", () => {
    const { container } = render(
      <SectionBand id="c" headingId="c-heading" innerClassName="max-w-4xl">
        <h2 id="c-heading">C</h2>
      </SectionBand>,
    );
    const inner = container.querySelector("section > div");
    expect(inner).toHaveClass("max-w-4xl", "mx-auto");
    expect(inner).not.toHaveClass("max-w-3xl");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SectionBand id="d" headingId="d-heading" tone="muted">
        <h2 id="d-heading">D</h2>
        <p>Body text.</p>
      </SectionBand>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
