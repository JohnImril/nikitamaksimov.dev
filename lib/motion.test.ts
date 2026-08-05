import { describe, expect, it } from "vitest";
import { animationShouldRun, prefersReducedMotion } from "./motion";

describe("motion policy", () => {
  it("uses the system reduced-motion preference", () => {
    expect(prefersReducedMotion({ matches: true })).toBe(true);
    expect(prefersReducedMotion({ matches: false })).toBe(false);
  });

  it("only animates while motion is allowed and visible", () => {
    expect(
      animationShouldRun({
        reducedMotion: false,
        documentVisible: true,
        inViewport: true,
      }),
    ).toBe(true);
    expect(
      animationShouldRun({
        reducedMotion: true,
        documentVisible: true,
        inViewport: true,
      }),
    ).toBe(false);
    expect(
      animationShouldRun({
        reducedMotion: false,
        documentVisible: false,
        inViewport: true,
      }),
    ).toBe(false);
    expect(
      animationShouldRun({
        reducedMotion: false,
        documentVisible: true,
        inViewport: false,
      }),
    ).toBe(false);
  });
});
