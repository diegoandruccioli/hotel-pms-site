import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { useRouteLang } from "./useRouteLang";

function Probe() {
  return <p data-testid="lang">{useRouteLang()}</p>;
}

function renderAt(path: string, handle: unknown) {
  const router = createMemoryRouter([{ path, element: <Probe />, handle }], { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

describe("useRouteLang", () => {
  it("reads the language from the route handle", () => {
    renderAt("/it", { lang: "it" });
    expect(screen.getByTestId("lang")).toHaveTextContent("it");
  });

  it("falls back to English when the handle has no valid language", () => {
    renderAt("/", { lang: "fr" });
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });

  it("falls back to English when the route has no handle", () => {
    renderAt("/", undefined);
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });
});
