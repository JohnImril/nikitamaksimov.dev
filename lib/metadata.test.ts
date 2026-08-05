import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import {
  absoluteUrl,
  projectMetadata,
  projectStructuredData,
  SITE_ORIGIN,
} from "./metadata";

describe("production origin", () => {
  it("uses the www domain for absolute URLs", () => {
    expect(SITE_ORIGIN).toBe("https://www.nikitamaksimov.dev");
    expect(absoluteUrl("/work/example")).toBe(
      "https://www.nikitamaksimov.dev/work/example",
    );
  });
});

describe("project metadata", () => {
  it("generates canonical project URLs and social metadata", () => {
    const project = projects[0];
    const metadata = projectMetadata(project);
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_ORIGIN}/work/${project.slug}`,
    );
    expect(metadata.openGraph?.url).toBe(`${SITE_ORIGIN}/work/${project.slug}`);
    expect(metadata.openGraph?.images).toEqual([
      { url: `${SITE_ORIGIN}/opengraph-image` },
    ]);
    expect(metadata.openGraph?.title).toContain(project.title);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(projectStructuredData(project)).toMatchObject({
      url: `${SITE_ORIGIN}/work/${project.slug}`,
    });
  });
});
