import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("project content", () => {
  it("has unique route slugs and local images", () => {
    const slugs = projects.map(({ slug }) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(projects.every(({ image }) => image.startsWith("/projects/"))).toBe(
      true,
    );
  });

  it("keeps external links secure and deployable", () => {
    for (const project of projects) {
      expect(new URL(project.repository).protocol).toBe("https:");
      expect(new URL(project.demo).protocol).toBe("https:");
      expect(project.clusters.length).toBeGreaterThan(0);
    }
  });
});
