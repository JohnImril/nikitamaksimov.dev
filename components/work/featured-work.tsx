import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "./project-card";

export function FeaturedWork() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="Inspect the engineering."
        copy="Personal projects with public demos and source code. Each makes a different part of my approach visible. Commercial results follow in Experience."
      />
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
