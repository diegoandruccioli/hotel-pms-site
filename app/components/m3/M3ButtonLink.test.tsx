import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { M3ButtonLink } from "./M3ButtonLink";

describe("M3ButtonLink", () => {
  it("is a link, so navigation keeps link semantics", () => {
    render(<M3ButtonLink href="https://example.com">View the code</M3ButtonLink>);
    expect(screen.getByRole("link", { name: "View the code" })).toHaveAttribute("href", "https://example.com");
  });

  it("shares the button look and forwards attributes", () => {
    render(
      <M3ButtonLink href="mailto:someone@example.com" variant="tonal" rel="noopener noreferrer">
        Request a demo
      </M3ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "Request a demo" });
    expect(link).toHaveClass("bg-secondary-container", "rounded-shape-full");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<M3ButtonLink href="/it/">Italiano</M3ButtonLink>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
