import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";
import { expect, vi } from "vitest";
import * as matchers from "vitest-axe/matchers";

expect.extend(matchers);

// jsdom has no IntersectionObserver (used by SectionNav's scroll-spy). Component tests only
// need the constructor to exist and not throw; behaviour is covered by the e2e suite, which
// runs in a real browser.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

interface CustomMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare module "vitest" {
  // Declaration merging must repeat Vitest's own `T = any` type parameter exactly.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends CustomMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
