import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { M3Button } from "./M3Button";

describe("M3Button", () => {
  it("is a real button that defaults to type=button and forwards native props", () => {
    const onClick = vi.fn();
    render(<M3Button onClick={onClick}>Save</M3Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire when disabled", () => {
    const onClick = vi.fn();
    render(
      <M3Button disabled onClick={onClick}>
        Save
      </M3Button>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("styles each variant differently and lets a caller class win", () => {
    render(
      <>
        <M3Button variant="filled">Filled</M3Button>
        <M3Button variant="outlined" className="px-2">
          Outlined
        </M3Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "Filled" })).toHaveClass("bg-primary");
    const outlined = screen.getByRole("button", { name: "Outlined" });
    expect(outlined).toHaveClass("border-outline", "px-2");
    expect(outlined).not.toHaveClass("px-6");
  });

  it("has no accessibility violations in any variant", async () => {
    const { container } = render(
      <>
        <M3Button variant="filled">Filled</M3Button>
        <M3Button variant="tonal">Tonal</M3Button>
        <M3Button variant="outlined">Outlined</M3Button>
        <M3Button variant="text">Text</M3Button>
        <M3Button disabled>Disabled</M3Button>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
