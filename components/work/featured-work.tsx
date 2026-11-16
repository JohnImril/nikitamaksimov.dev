import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "./project-card";
import { InsomniaFeature } from "./insomnia-feature";

export function FeaturedWork() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="Inspect the engineering."
        copy="Collaborative product engineering and independent projects. Each case explains my responsibility, the system constraints, and the decisions behind the implementation."
      />
      <InsomniaFeature />
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
