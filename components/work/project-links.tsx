import Link from "next/link";
import { ExternalLink } from "@/components/shared/external-link";
import type { Project } from "@/content/projects";

export function ProjectLinks({
  project,
  caseStudy = true,
}: {
  project: Project;
  caseStudy?: boolean;
}) {
  return (
    <div className="project-links">
      {caseStudy ? (
        <Link href={`/work/${project.slug}`}>
          Read case study <span aria-hidden="true">→</span>
        </Link>
      ) : null}
      <ExternalLink href={project.demo}>Live demo</ExternalLink>
      <ExternalLink href={project.repository}>Source code</ExternalLink>
    </div>
  );
}
