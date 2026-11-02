import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { profile } from "@/content/profile";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ProjectLinks } from "@/components/work/project-links";
import { ExternalLink } from "@/components/shared/external-link";

function Items({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function CaseStudyLayout({ project }: { project: Project }) {
  const nextProject =
    projects[
      (projects.findIndex(({ slug }) => slug === project.slug) + 1) %
        projects.length
    ];
  return (
    <main id="main-content" className="case-study" tabIndex={-1}>
      <header className="case-hero">
        <Link className="back-link" href="/#work">
          ← Selected work
        </Link>
        <p className="eyebrow">
          {project.kind} / {project.stage}
        </p>
        <h1>{project.title}</h1>
        <p className="case-positioning">{project.positioning}</p>
        <p className="case-intro">{project.summary}</p>
        <dl className="case-summary">
          <dt>My contribution</dt>
          <dd>{project.contribution}</dd>
          <dt>Result</dt>
          <dd>{project.result}</dd>
        </dl>
        <p className="case-scope">{project.scope}</p>
        <ProjectLinks project={project} caseStudy={false} />
        <ul className="tags" aria-label="Technologies">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>
      <div className="case-image" data-project={project.slug}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 1500px) 100vw, 1444px"
        />
      </div>
      <section
        className="case-section case-context"
        aria-labelledby="challenge-title"
      >
        <div>
          <p className="eyebrow">The challenge</p>
          <h2 id="challenge-title">{project.headings.challenge}</h2>
          <p>{project.context}</p>
          <p>{project.problem}</p>
        </div>
        <aside className="case-note">
          <h3>Constraints that shaped the work</h3>
          <Items items={project.constraints} />
        </aside>
      </section>
      <section className="case-section" aria-labelledby="architecture-title">
        <p className="eyebrow">System boundaries</p>
        <h2 id="architecture-title">{project.headings.architecture}</h2>
        <ArchitectureDiagram items={project.architecture} />
      </section>
      <section className="case-section" aria-labelledby="decisions-title">
        <p className="eyebrow">Decisions and trade-offs</p>
        <h2 id="decisions-title">{project.headings.decisions}</h2>
        <div className="case-columns">
          <div>
            <Items items={project.decisions} />
          </div>
          <aside className="case-note">
            <h3>What this choice costs</h3>
            <Items items={project.tradeoffs} />
            <details>
              <summary>Alternatives considered</summary>
              <Items items={project.alternatives} />
            </details>
          </aside>
        </div>
      </section>
      <section className="case-section" aria-labelledby="results-title">
        <p className="eyebrow">Evidence and verification</p>
        <h2 id="results-title">{project.headings.results}</h2>
        {project.comparison ? (
          <div
            className="comparison-scroll"
            role="region"
            aria-label="React and Svelte measurement comparison"
          >
            <table className="comparison-table">
              <caption>
                Recorded on 2026-07-08 · production builds · local Vite preview
                · Lighthouse 13.4.0
              </caption>
              <thead>
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">React baseline</th>
                  <th scope="col">Svelte port</th>
                </tr>
              </thead>
              <tbody>
                {project.comparison.map((row) => (
                  <tr key={row.metric}>
                    <th scope="row">{row.metric}</th>
                    <td>{row.before}</td>
                    <td>{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Items items={project.results} />
        )}
        <div className="case-columns case-verification">
          <div>
            <h3>How I checked it</h3>
            <Items items={project.quality} />
          </div>
          <div className="case-note">
            <h3>Current state</h3>
            <p>{project.status}</p>
          </div>
        </div>
      </section>
      <aside className="case-cta" aria-labelledby="inspect-title">
        <p className="eyebrow">Inspect the work</p>
        <h2 id="inspect-title">See the behavior. Trace the decisions.</h2>
        <div className="case-columns">
          <div>
            <h3>In the demo</h3>
            <p>{project.inspection.demo}</p>
            <ExternalLink className="text-link" href={project.demo}>
              Open {project.title}
            </ExternalLink>
          </div>
          <div>
            <h3>In the source</h3>
            <p>{project.inspection.source}</p>
            <ExternalLink
              className="text-link"
              href={project.inspection.sourceUrl}
            >
              Read the implementation evidence
            </ExternalLink>
          </div>
        </div>
      </aside>
      <nav className="case-navigation" aria-label="Continue exploring">
        <Link href={`/work/${nextProject.slug}`}>
          Next case: {nextProject.title} →
        </Link>
        <a href={`mailto:${profile.email}`}>Discuss a similar problem ↗</a>
      </nav>
    </main>
  );
}
