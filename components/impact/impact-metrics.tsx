import { SectionHeading } from "@/components/shared/section-heading";

const commercialMetrics = [
  {
    value: "≈32%",
    label: "faster build time",
    detail: "after application modernization",
  },
  {
    value: "≈25%",
    label: "smaller JavaScript payload",
    detail: "through splitting and dependency optimization",
  },
  {
    value: "≈5s → ≈2s",
    label: "application loading",
    detail: "in a transport monitoring platform",
  },
] as const;

const studyMetrics = [
  {
    value: "75 → 92",
    label: "Lighthouse Performance",
    detail: "in a measured React-to-Svelte migration",
  },
  {
    value: "−74%",
    label: "JavaScript bundle",
    detail: "in the same migration experiment",
  },
] as const;

export function ImpactMetrics() {
  return (
    <section className="section impact-section" aria-labelledby="impact-title">
      <SectionHeading
        eyebrow="Engineering impact"
        title="Measured improvements, with context."
        copy="Performance work is most useful when the baseline, intervention and limitation are all visible."
      />
      <div className="metric-groups">
        <div className="metric-group">
          <p className="metric-group-label">Commercial work</p>
          <div className="metrics-grid metrics-commercial">
            {commercialMetrics.map((metric) => (
              <article key={metric.label}>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="metric-group metric-group-study">
          <p className="metric-group-label">Independent performance study</p>
          <div className="metrics-grid metrics-study">
            {studyMetrics.map((metric) => (
              <article key={metric.label}>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <p className="metrics-note">
        Commercial metrics are based on internal project measurements and are
        described without exposing confidential implementation details.
      </p>
    </section>
  );
}
