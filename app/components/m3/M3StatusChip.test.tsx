import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { M3StatusChip } from "./M3StatusChip";

describe("M3StatusChip", () => {
  it("carries the status in its text", () => {
    render(<M3StatusChip tone="missing">Not implemented</M3StatusChip>);
    expect(screen.getByText("Not implemented")).toHaveClass("bg-error-container", "text-on-error-container");
  });

  it("maps every tone to its own container colour", () => {
    render(
      <>
        <M3StatusChip tone="done">Done</M3StatusChip>
        <M3StatusChip tone="partial">Partial</M3StatusChip>
        <M3StatusChip>Neutral</M3StatusChip>
      </>,
    );
    expect(screen.getByText("Done")).toHaveClass("bg-tertiary-container");
    expect(screen.getByText("Partial")).toHaveClass("bg-secondary-container");
    expect(screen.getByText("Neutral")).toHaveClass("bg-surface-variant");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <M3StatusChip tone="done">Done</M3StatusChip>
        <M3StatusChip tone="partial">Partial</M3StatusChip>
        <M3StatusChip tone="missing">Missing</M3StatusChip>
        <M3StatusChip>Neutral</M3StatusChip>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
