import type { Metadata } from "next";
import type { Project } from "@/content/projects";

export const siteUrl = "https://nikitamaksimov.dev";

export function projectMetadata(project: Project): Metadata {
  const title = `${project.title} — Engineering case study`;
  const description = `${project.positioning}. ${project.summary}`;
  const url = `/work/${project.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: "/opengraph-image" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
