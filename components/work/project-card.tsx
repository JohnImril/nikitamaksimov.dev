"use client";

import Image from "next/image";
import type { Project } from "@/content/projects";
import { ProjectLinks } from "./project-links";
import { useSignalMap } from "@/components/hero/signal-map-context";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { setActive } = useSignalMap();
  const activate = () => setActive(project.clusters);
  const reset = () => setActive([]);
  return (
    <article
      className="project-card"
      data-reverse={index % 2 === 1}
      data-project={project.slug}
      onMouseEnter={activate}
      onMouseLeave={reset}
      onFocusCapture={activate}
      onBlurCapture={reset}
    >
      <div className="project-image">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 800px) 100vw, 55vw"
          priority={index === 0}
        />
      </div>
      <div className="project-content">
        <p className="eyebrow">
          0{index + 1} / {project.positioning}
        </p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <dl>
          <dt>Contribution</dt>
          <dd>{project.contribution}</dd>
          <dt>Engineering result</dt>
          <dd>{project.result}</dd>
        </dl>
        <ul className="tags" aria-label="Technologies">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
