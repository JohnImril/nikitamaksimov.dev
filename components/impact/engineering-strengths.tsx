import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";

const strengths = [
  {
    title: "Modernize a product in use",
    description:
      "Evolve legacy code and shared libraries across applications with incremental migrations, regression checks and a plan for rollback.",
    proof: "Commercial example: shared library migrations",
    href: "/#commercial-modernization",
  },
  {
    title: "Organize complex interface state",
    description:
      "Make states, transitions and data flow understandable in WebSocket interfaces, Leaflet monitoring tools and JointJS diagram editors.",
    proof: "Personal example: Fleet Route Monitor",
    href: "/work/fleet-route-monitor",
  },
  {
    title: "Improve loading and delivery",
    description:
      "Work on the code, dependencies and build tooling behind a slow product. Commercial results include approximately 32% shorter builds.",
    proof: "See three separate performance results",
    href: "/#commercial-performance",
  },
  {
    title: "Connect the UI to the whole workflow",
    description:
      "Use commercial Node.js experience with APIs, business logic, databases and authorization to reason across frontend and backend boundaries.",
    proof: "Commercial scope and personal explorations",
    href: "/#beyond-frontend",
  },
] as const;

export function EngineeringStrengths() {
  return (
    <section
      className="section strengths-section"
      id="strengths"
      aria-labelledby="strengths-title"
    >
      <SectionHeading
        id="strengths-title"
        eyebrow="Engineering strengths"
        title="What you can trust me with."
      />
      <div className="strengths-grid">
        {strengths.map((strength, index) => (
          <article key={strength.title}>
            <span className="item-number" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{strength.title}</h3>
            <p>{strength.description}</p>
            <Link className="text-link" href={strength.href}>
              {strength.proof} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
