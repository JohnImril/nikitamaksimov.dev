import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_ORIGIN, changeFrequency: "monthly", priority: 1 },
    ...projects.map(({ slug }) => ({
      url: absoluteUrl(`/work/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
