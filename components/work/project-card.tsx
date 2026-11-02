import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectLinks } from "./project-links";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card" data-project={project.slug}>
      <div className="project-image">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1500px) 50vw, 720px"
        />
      </div>
      <div className="project-content">
        <p className="eyebrow">
          0{index + 1} / {project.kind}
        </p>
        <p className="project-stage">{project.stage}</p>
        <h3>
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <dl>
          <dt>My contribution</dt>
          <dd>{project.contribution}</dd>
          <dt>Demonstrates</dt>
          <dd>{project.result}</dd>
        </dl>
        <p className="project-scope">{project.scope}</p>
        <ul className="tags" aria-label="Technologies">
          {project.stack.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ProjectLinks project={project} />
        <p className="project-inspect">
          In the demo: {project.inspection.demo}
        </p>
      </div>
    </article>
  );
}
