import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";

const strengths = [
  {
    title: "Product evolution",
    description:
      "Modernize live products through staged migrations, regression checks and a clear path back.",
    proof: "Commercial migrations",
    href: "/#commercial-modernization",
  },
  {
    title: "Complex interfaces",
    description:
      "Make real-time data, state and transitions understandable in monitoring tools and visual editors.",
    proof: "Fleet Route Monitor",
    href: "/work/fleet-route-monitor",
  },
  {
    title: "Performance",
    description:
      "Improve loading, client delivery and build tooling. Commercial results include ≈32% shorter builds.",
    proof: "Commercial results",
    href: "/#commercial-performance",
  },
  {
    title: "System thinking",
    description:
      "Connect UI decisions to APIs, data and authorization, informed by commercial Node.js experience.",
    proof: "Beyond the frontend",
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
        eyebrow="Strengths"
        title="What you can trust me with."
      />
      <div className="strengths-grid">
        {strengths.map((strength) => (
          <article key={strength.title}>
            <h3>{strength.title}</h3>
            <p>{strength.description}</p>
            <Link className="strength-proof" href={strength.href}>
              {strength.proof} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
