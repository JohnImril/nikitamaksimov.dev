import { commercialPerformance, experience } from "@/content/experience";
import { SectionHeading } from "@/components/shared/section-heading";

export function ExperienceSection() {
  return (
    <section
      className="section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionHeading
        id="experience-title"
        eyebrow="Experience"
        title="Changing systems people already use."
        copy="Commercial work since 2022, from public platforms to enterprise and operational products."
      />
      <article className="modernization-story" id="commercial-modernization">
        <div>
          <p className="eyebrow">Shared libraries / multiple applications</p>
          <h3>Make change adoptable in stages.</h3>
        </div>
        <div>
          <p>
            Shared legacy libraries have consumers beyond a single application.
            I modernized them through incremental migrations, using regression
            checks and rollback strategies to support staged adoption.
          </p>
          <p>
            The decision was to evolve the existing system in steps, so that
            development and maintenance could continue during the migration.
          </p>
        </div>
      </article>
      <div className="commercial-performance" id="commercial-performance">
        <p className="eyebrow">Separate commercial performance examples</p>
        <div className="commercial-results">
          {commercialPerformance.map((example) => (
            <article key={example.title}>
              <p className="result-value">{example.value}</p>
              <p className="result-label">{example.label}</p>
              <h3>{example.title}</h3>
              <p>{example.description}</p>
            </article>
          ))}
        </div>
        <p className="confidentiality-note">
          Approximate results from separate commercial examples. Client details
          and internal measurement reports are not public.
        </p>
      </div>
      <p className="eyebrow experience-label">Where I have worked</p>
      <div className="experience-list">
        {experience.map((entry) => (
          <article key={entry.company}>
            <div>
              <p className="eyebrow">{entry.period}</p>
              <h3>{entry.company}</h3>
              <p className="role">{entry.role}</p>
            </div>
            <div>
              <p className="experience-description">{entry.description}</p>
              <p className="experience-contribution">{entry.contribution}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="confidentiality-note">
        Client names and confidential implementation details are intentionally
        omitted.
      </p>
    </section>
  );
}
