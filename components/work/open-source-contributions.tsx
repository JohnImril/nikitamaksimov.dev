import { contributions } from "@/content/contributions";
import { SectionHeading } from "@/components/shared/section-heading";
import { ExternalLink } from "@/components/shared/external-link";

export function OpenSourceContributions() {
  return (
    <section
      className="section"
      id="open-source"
      aria-labelledby="open-source-title"
    >
      <SectionHeading
        id="open-source-title"
        eyebrow="Open source contributions"
        title="Changes inside a shared product."
        copy="Insomnia-IT/feed is a collaborative volunteer project for feeding and inventory workflows. My contributions work within its existing React, TypeScript and Django codebase."
      />
      <div className="experience-list">
        {contributions.map((item) => (
          <article key={item.number}>
            <div>
              <h3>{item.title}</h3>
              <ExternalLink className="text-link" href={item.url}>
                Read PR #{item.number}
              </ExternalLink>
            </div>
            <div>
              <p className="experience-description">{item.requirement}</p>
              <p className="experience-contribution">{item.implementation}</p>
              <details>
                <summary>Implementation detail</summary>
                <p>{item.detail}</p>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
