import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "./project-card";

export function FeaturedWork() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <SectionHeading
        eyebrow="Selected work"
        title="Systems, not just screens."
        copy="Independent projects with working demos, source code and the engineering decisions behind them."
      />
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
