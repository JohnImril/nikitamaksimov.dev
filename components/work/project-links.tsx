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
          aria-label={`Read ${project.title} case study`}
        >
          Read case study <span aria-hidden="true">→</span>
        </Link>
      ) : null}
      <ExternalLink
        href={project.demo}
        aria-label={`${project.title} live demo`}
      >
        Live demo
      </ExternalLink>
      <ExternalLink
        href={project.repository}
        aria-label={`${project.title} source code`}
      >
        Source code
      </ExternalLink>
    </div>
  );
}
