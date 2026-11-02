export const experience = [
  {
    company: "Media Service",
    role: "Frontend Engineer",
    period: "February 2025 — Present",
    description:
      "Working on large-scale cultural and educational digital platforms, including public-facing and internal administrative products.",
    contribution:
      "I modernize React and Next.js applications, migrate JavaScript to TypeScript and clarify module boundaries. My work also covers SSR, routing, reusable components and frontend performance, alongside code review, mentoring, CI and testing improvements.",
  },
  {
    company: "Logrocon",
    role: "Frontend Engineer",
    period: "February 2022 — February 2025",
    description:
      "Built and modernized enterprise products for banking, logistics, retail, monitoring and operational workflows.",
    contribution:
      "I built real-time WebSocket interfaces, Leaflet transport monitoring and JointJS diagram editors. I also modernized React and TypeScript code, migrated build tooling from Webpack to Vite and worked on monorepos, legacy refactoring and performance.",
  },
] as const;

// These are separate examples. The available material does not attribute every
// metric to an employer or establish that they came from the same application.
// The monitoring result is observed section loading, with no documented TTI
// measurement method. Keep the public label neutral.
export const commercialPerformance = [
  {
    value: "≈32%",
    label: "shorter build time",
    title: "Application modernization",
    description:
      "I modernized an existing application's code and build tooling. The reported result was an approximately 32% reduction in build time.",
  },
  {
    value: "≈25%",
    label: "less client JavaScript",
    title: "Client-side delivery",
    description:
      "I used code splitting and dependency optimization to reduce the JavaScript sent to the client by approximately 25%.",
  },
  {
    value: "≈5s → ≈2s",
    label: "section load time",
    title: "Transport monitoring",
    description:
      "I worked on frontend loading performance in transport monitoring. Loading time for the affected sections fell from about five seconds to two.",
  },
] as const;
