import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/shared/section-heading";

export function ExperienceSection() {
  return (
    <section
      className="section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionHeading
        eyebrow="Experience"
        title="Modernization under real product constraints."
      />
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
              <ul>
                {entry.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
