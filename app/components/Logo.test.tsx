import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("is decorative: hidden from the accessibility tree", () => {
    const { container } = render(<Logo />);
    const el = container.firstElementChild;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveTextContent("H");
  });

  it("has no accessibility violations next to a visible name", async () => {
    const { container } = render(
      <span>
        <Logo /> Hotel PMS
      </span>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
