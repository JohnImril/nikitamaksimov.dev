import { createElement } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DynamicSphere } from "./dynamic-sphere";

const motion = vi.hoisted(() => ({
  start: vi.fn<() => void>(),
  stop: vi.fn<() => void>(),
  reset: vi.fn<() => void>(),
  dispose: vi.fn<() => void>(),
}));
const enhance = vi.hoisted(() =>
  vi.fn<() => typeof motion | Promise<typeof motion>>(),
);
vi.mock("./displaced-sphere", () => ({ enhanceSphere: enhance }));

let intersect: (entries: { isIntersecting: boolean }[]) => void;
let media: EventTarget & { matches: boolean };
let visibility: DocumentVisibilityState;
const show = () => act(() => intersect([{ isIntersecting: true }]));
const renderSphere = () =>
  render(
    createElement(
      DynamicSphere,
      null,
      createElement("p", null, "Static displaced sphere"),
    ),
  );

beforeEach(() => {
  vi.clearAllMocks();
  enhance.mockImplementation(() => motion);
  visibility = "visible";
  media = Object.assign(new EventTarget(), { matches: false });
  vi.stubGlobal(
    "matchMedia",
    vi.fn<(query: string) => typeof media>(() => media),
  );
  vi.spyOn(document, "visibilityState", "get").mockImplementation(
    () => visibility,
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof intersect) {
        intersect = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("sphere motion lifecycle", () => {
  it("starts on visibility without requiring a pointer and cleans up on unmount", async () => {
    const view = renderSphere();
    expect(enhance).not.toHaveBeenCalled();
    show();
    await waitFor(() => expect(motion.start).toHaveBeenCalledOnce());
    expect(screen.getByText("Static displaced sphere")).toBeTruthy();
    view.unmount();
    expect(motion.dispose).toHaveBeenCalledOnce();
  });

  it("keeps the static fallback under reduced motion and responds to preference changes", async () => {
    media.matches = true;
    renderSphere();
    show();
    await act(async () => {});
    expect(enhance).not.toHaveBeenCalled();
    expect(screen.queryByRole("button")).toBeNull();
    act(() => {
      media.matches = false;
      media.dispatchEvent(new Event("change"));
    });
    await waitFor(() => expect(motion.start).toHaveBeenCalledOnce());
    act(() => {
      media.matches = true;
      media.dispatchEvent(new Event("change"));
    });
    expect(motion.stop).toHaveBeenCalled();
    expect(motion.reset).toHaveBeenCalledOnce();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("does not initialize WebGL if motion is disabled while its chunk is loading", async () => {
    renderSphere();
    show();
    act(() => {
      media.matches = true;
      media.dispatchEvent(new Event("change"));
    });
    await act(async () => {});
    expect(enhance).not.toHaveBeenCalled();
    act(() => {
      media.matches = false;
      media.dispatchEvent(new Event("change"));
    });
    await waitFor(() => expect(enhance).toHaveBeenCalledOnce());
  });

  it("stops offscreen and in hidden tabs, then resumes the existing controller", async () => {
    renderSphere();
    show();
    await waitFor(() => expect(motion.start).toHaveBeenCalledOnce());
    act(() => intersect([{ isIntersecting: false }]));
    expect(motion.stop).toHaveBeenCalledOnce();
    act(() => {
      visibility = "hidden";
      document.dispatchEvent(new Event("visibilitychange"));
    });
    show();
    expect(motion.start).toHaveBeenCalledOnce();
    act(() => {
      visibility = "visible";
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(motion.start).toHaveBeenCalledTimes(2);
    expect(enhance).toHaveBeenCalledOnce();
  });

  it("preserves the user's pause when visibility changes", async () => {
    renderSphere();
    show();
    await waitFor(() => expect(motion.start).toHaveBeenCalledOnce());
    fireEvent.click(screen.getByRole("button", { name: "Pause motion" }));
    expect(
      screen
        .getByRole("button", { name: "Resume motion" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    act(() => intersect([{ isIntersecting: false }]));
    show();
    expect(motion.start).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Resume motion" }));
    expect(motion.start).toHaveBeenCalledTimes(2);
  });

  it("retains the illustration when enhancement initialization fails", async () => {
    enhance.mockImplementationOnce(() => {
      throw new Error("Chunk unavailable");
    });
    const view = renderSphere();
    show();
    await waitFor(() => expect(enhance).toHaveBeenCalledOnce());
    expect(
      view.container
        .querySelector(".displaced-sphere")
        ?.getAttribute("data-motion"),
    ).toBe("static");
    expect(screen.getByText("Static displaced sphere")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("disposes a renderer that finishes warming up after unmount", async () => {
    let complete: (controller: typeof motion) => void = () => {};
    enhance.mockReturnValueOnce(
      new Promise((resolve) => {
        complete = resolve;
      }),
    );
    const view = renderSphere();
    show();
    await waitFor(() => expect(enhance).toHaveBeenCalledOnce());
    view.unmount();
    await act(async () => complete(motion));
    expect(motion.dispose).toHaveBeenCalledOnce();
    expect(motion.start).not.toHaveBeenCalled();
  });

  it("keeps a warmed renderer stopped if motion was disabled during initialization", async () => {
    let complete: (controller: typeof motion) => void = () => {};
    enhance.mockReturnValueOnce(
      new Promise((resolve) => {
        complete = resolve;
      }),
    );
    renderSphere();
    show();
    await waitFor(() => expect(enhance).toHaveBeenCalledOnce());
    act(() => {
      media.matches = true;
      media.dispatchEvent(new Event("change"));
    });
    await act(async () => complete(motion));
    expect(motion.start).not.toHaveBeenCalled();
    expect(motion.stop).toHaveBeenCalled();
    expect(motion.reset).toHaveBeenCalled();
  });
});
