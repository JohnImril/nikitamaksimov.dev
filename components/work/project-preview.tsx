import Image from "next/image";
import type { Project } from "@/content/projects";

export function ProjectPreview({
  project,
  detail = false,
}: {
  project: Project;
  detail?: boolean;
}) {
  return (
    <figure
      className={detail ? "project-preview case-preview" : "project-preview"}
    >
      <a
        className="project-image"
        href={project.imageFull ?? project.image}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size screenshot: ${project.title} (new tab)`}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={
            detail
              ? "(max-width: 1500px) 100vw, 1444px"
              : "(max-width: 1000px) 100vw, 50vw"
          }
        />
      </a>
      {project.comparison ? (
        <figcaption className="preview-evidence">
          <p className="eyebrow">Recorded local experiment · React → Svelte</p>
          <dl>
            {project.comparison.slice(0, 4).map((row) => (
              <div key={row.metric}>
                <dt>{row.metric}</dt>
                <dd>
                  {row.before} → <strong>{row.after}</strong>
                </dd>
              </div>
            ))}
          </dl>
          <p>
            2026-07-08 · production builds · local Vite preview · Lighthouse
            13.4.0. Results for this app and run, not a universal Svelte
            speedup. Image assets unchanged.
          </p>
        </figcaption>
      ) : (
        <figcaption className="preview-caption">
          {project.imageCaption}
          <a
            href={project.imageFull ?? project.image}
            target="_blank"
            rel="noreferrer"
          >
            Open full size ↗
          </a>
        </figcaption>
      )}
    </figure>
  );
}
