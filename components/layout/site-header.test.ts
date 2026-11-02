import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { SiteHeader } from "./site-header";

afterEach(cleanup);

describe("site navigation", () => {
  it("closes the menu on Escape and returns focus to its trigger", () => {
    render(createElement(SiteHeader));
    const trigger = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(trigger);
    screen.getByRole("link", { name: "Work" }).focus();
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    fireEvent.keyDown(document, { key: "Escape" });

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  it("closes the menu when a destination is selected", () => {
    render(createElement(SiteHeader));
    const trigger = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("link", { name: "Work" }));
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
});
