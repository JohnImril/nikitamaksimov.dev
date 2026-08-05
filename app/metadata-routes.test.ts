import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import { SITE_ORIGIN } from "@/lib/metadata";

describe("metadata routes", () => {
  it("publishes only www sitemap URLs", () => {
    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(1);
    expect(entries.every(({ url }) => url.startsWith(SITE_ORIGIN))).toBe(true);
    expect(
      entries.every(({ url }) => !url.startsWith("https://nikitamaksimov.dev")),
    ).toBe(true);
  });

  it("points robots at the www host and sitemap", () => {
    expect(robots()).toMatchObject({
      host: SITE_ORIGIN,
      sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    });
  });
});
