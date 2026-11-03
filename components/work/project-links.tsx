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
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View project: ${project.title}`}
        >
          View project <span aria-hidden="true">→</span>
        </Link>
      ) : null}
      <ExternalLink
        href={project.demo}
        aria-label={`Live demo: ${project.title}`}
      >
        Live demo
      </ExternalLink>
      <ExternalLink
        href={project.repository}
        aria-label={`Source code: ${project.title}`}
      >
        Source code
      </ExternalLink>
    </div>
  );
}
