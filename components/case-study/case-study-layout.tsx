import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ProjectLinks } from "@/components/work/project-links";

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="case-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyLayout({ project }: { project: Project }) {
  return (
    <main className="case-study">
      <header className="case-hero">
        <Link className="back-link" href="/#work">
          ← Selected work
        </Link>
        <p className="eyebrow">
          Engineering case study / {project.positioning}
        </p>
        <h1>{project.title}</h1>
        <p className="case-intro">{project.summary}</p>
        <ProjectLinks project={project} caseStudy={false} />
        <ul className="tags">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>
      <div className="case-image">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="100vw"
          priority
        />
      </div>
      <div className="case-grid">
        <section className="case-section">
          <h2>Context</h2>
          <p>{project.context}</p>
        </section>
        <section className="case-section">
          <h2>Problem</h2>
          <p>{project.problem}</p>
        </section>
        <ListSection title="Constraints" items={project.constraints} />
        <section className="case-section">
          <h2>My contribution</h2>
          <p>{project.contribution}.</p>
        </section>
      </div>
      <section className="case-section case-wide">
        <p className="eyebrow">System boundaries</p>
        <h2>Architecture</h2>
        <ArchitectureDiagram items={project.architecture} />
      </section>
      <div className="case-grid">
        <ListSection
          title="Important technical decisions"
          items={project.decisions}
        />
        <ListSection title="Testing and quality" items={project.quality} />
        <ListSection title="Results" items={project.results} />
        <ListSection
          title="Trade-offs and limitations"
          items={project.tradeoffs}
        />
        <ListSection
          title="Alternatives considered"
          items={project.alternatives}
        />
        <section className="case-section">
          <h2>Current status</h2>
          <p>{project.status}</p>
        </section>
      </div>
      <aside className="case-cta">
        <p className="eyebrow">Inspect the work</p>
        <h2>Try the product or read the implementation.</h2>
        <ProjectLinks project={project} caseStudy={false} />
      </aside>
    </main>
  );
}
