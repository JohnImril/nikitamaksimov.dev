import type { Metadata } from "next";
import type { Project } from "@/content/projects";

export const SITE_ORIGIN = "https://www.nikitamaksimov.dev";

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, SITE_ORIGIN).toString();
}

export function projectMetadata(project: Project): Metadata {
  const title = `${project.title} — Engineering case study`;
  const description = `${project.positioning}. ${project.summary}`;
  const url = absoluteUrl(`/work/${project.slug}`);
  const imageUrl = absoluteUrl("/opengraph-image");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function projectStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
  };
}
