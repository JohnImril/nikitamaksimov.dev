import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { projectMetadata } from "./metadata";

describe("project metadata", () => {
  it("generates canonical project URLs and social metadata", () => {
    const project = projects[0];
    const metadata = projectMetadata(project);
    expect(metadata.alternates?.canonical).toBe(`/work/${project.slug}`);
    expect(metadata.openGraph?.title).toContain(project.title);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });
});
