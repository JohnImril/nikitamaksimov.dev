import { z } from "zod";

export const clusterNames = [
  "architecture",
  "performance",
  "realtime",
  "ai",
] as const;
export type SignalCluster = (typeof clusterNames)[number];

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  positioning: z.string().min(1),
  summary: z.string().min(1),
  contribution: z.string().min(1),
  stack: z.array(z.string()).min(2),
  result: z.string().min(1),
  image: z.string().startsWith("/"),
  imageAlt: z.string().min(10),
  repository: z.string().url(),
  demo: z.string().url(),
  clusters: z.array(z.enum(clusterNames)).min(1),
  context: z.string(),
  problem: z.string(),
  constraints: z.array(z.string()).min(1),
  architecture: z
    .array(z.object({ title: z.string(), detail: z.string() }))
    .min(2),
  decisions: z.array(z.string()).min(1),
  quality: z.array(z.string()).min(1),
  results: z.array(z.string()).min(1),
  tradeoffs: z.array(z.string()).min(1),
  alternatives: z.array(z.string()).min(1),
  status: z.string(),
});

const projectData = [
  {
    slug: "reviewpilot-ai",
    title: "ReviewPilot AI",
    positioning: "AI-assisted pull request review workflow",
    summary:
      "A Next.js application and GitHub App that converts unified diffs into structured review feedback, file-level risk, line-aware findings, test suggestions, confidence scores and merge recommendations.",
    contribution:
      "Product design, frontend architecture, GitHub integration and evaluation workflow",
    stack: ["Next.js", "TypeScript", "Zod", "GitHub App", "Vitest", "CI"],
    result:
      "A complete review pipeline with validated, provider-independent structured output.",
    image: "/projects/reviewpilot-ai/dashboard.webp",
    imageAlt:
      "ReviewPilot AI dashboard showing a structured pull request risk analysis",
    repository: "https://github.com/JohnImril/reviewpilot-ai",
    demo: "https://reviewpilot-ai-lime.vercel.app",
    clusters: ["ai"],
    context:
      "Code review tools often produce unstructured commentary that is difficult to scan, verify or compare. This project explores a more explicit contract between a diff, an analysis provider and the review interface.",
    problem:
      "Turn a noisy unified diff into findings that remain tied to files and lines, while keeping provider behavior replaceable and outputs safe to render.",
    constraints: [
      "Webhook payloads and signatures must be verified before processing.",
      "AI-shaped output cannot be trusted without runtime validation.",
      "The public demo must remain useful without requiring paid model credentials.",
    ],
    architecture: [
      {
        title: "GitHub ingress",
        detail: "Verified webhook and pull request context",
      },
      {
        title: "Diff pipeline",
        detail: "Parsing, normalization and context budgeting",
      },
      {
        title: "Provider contract",
        detail: "Deterministic mock or optional OpenAI-compatible provider",
      },
      {
        title: "Review UI",
        detail: "Validated findings, risk and merge recommendation",
      },
    ],
    decisions: [
      "Zod validates provider output at the application boundary.",
      "A provider abstraction separates workflow logic from model-specific transport.",
      "Line-aware findings preserve a traceable relationship to the source diff.",
      "The deterministic provider is an explainable fixture—not a real language model—and supports repeatable demos and tests.",
    ],
    quality: [
      "Vitest covers parsing and workflow behavior.",
      "Golden cases evaluate whether structured outputs remain stable across representative diffs.",
      "CI runs automated checks on changes.",
    ],
    results: [
      "Structured findings with confidence, severity and source locations",
      "File-level risk, test suggestions and a merge recommendation",
      "A deterministic demo path plus an optional OpenAI-compatible integration",
    ],
    tradeoffs: [
      "Structured output improves consistency but constrains free-form provider responses.",
      "The deterministic provider demonstrates the workflow, not production model quality.",
      "Automated feedback remains advisory and requires human review.",
    ],
    alternatives: [
      "A model-specific implementation was rejected because it would couple product logic to one provider.",
      "Free-form Markdown was considered but offers weaker validation and UI guarantees.",
    ],
    status:
      "Working public demo; continued experimentation with evaluation cases and provider behavior.",
  },
  {
    slug: "diablo-web",
    title: "Diablo Web",
    positioning: "Modernizing a browser-based WebAssembly game runtime",
    summary:
      "A compatibility and architecture modernization of existing open-source browser and game-engine work, with typed runtime orchestration around WebAssembly, workers, canvas and browser storage.",
    contribution:
      "Frontend modernization, runtime boundaries, protocol validation, tests and delivery",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "WebAssembly",
      "Web Workers",
      "Canvas",
    ],
    result:
      "A maintainable browser runtime shell with explicit boundaries around engine, worker and UI concerns.",
    image: "/projects/diablo-web/game.webp",
    imageAlt:
      "Diablo Web browser runtime displaying the game canvas and interface",
    repository: "https://github.com/JohnImril/diablo_web",
    demo: "https://johnimril.github.io/diablo_web/",
    clusters: ["architecture", "realtime"],
    context:
      "This project builds on existing open-source browser ports and game-engine work. My work focuses on modernizing the web application layer and extending how the runtime is integrated, validated and delivered.",
    problem:
      "Coordinate a stateful WebAssembly runtime, asset loading, browser persistence, canvas rendering and worker messages without allowing engine details to leak through the whole React application.",
    constraints: [
      "The engine and original game assets are upstream work and are not owned by this project.",
      "Long-running runtime work must not block the browser UI thread.",
      "Legacy data formats and browser compatibility shape the integration boundary.",
    ],
    architecture: [
      {
        title: "React shell",
        detail: "Lifecycle, controls and user-visible state",
      },
      {
        title: "Runtime orchestrator",
        detail: "Initialization, storage and asset sequencing",
      },
      {
        title: "Worker boundary",
        detail: "Validated messages and off-main-thread execution",
      },
      {
        title: "WASM + canvas",
        detail: "Upstream engine execution and rendered output",
      },
    ],
    decisions: [
      "Worker protocol validation rejects malformed or out-of-order messages.",
      "Runtime orchestration is isolated from presentational React components.",
      "Vite replaces older delivery tooling while retaining required WebAssembly behavior.",
      "Browser storage and MPQ loading are treated as explicit runtime services.",
    ],
    quality: [
      "Automated tests cover web-layer behavior.",
      "CI checks changes and deployment readiness.",
      "Typed protocols reduce integration ambiguity.",
    ],
    results: [
      "Modern React and TypeScript application shell",
      "Explicit worker and runtime boundaries",
      "Public browser demo with documented upstream attribution",
    ],
    tradeoffs: [
      "Browser execution remains constrained by upstream engine and asset compatibility.",
      "Canvas output is not a conventional accessible DOM interface.",
      "The integration prioritizes compatibility over rewriting upstream engine internals.",
    ],
    alternatives: [
      "A full engine rewrite was out of scope and would erase the value of the upstream work.",
      "Main-thread execution was avoided because runtime work could compromise interface responsiveness.",
    ],
    status:
      "Functional public modernization project. Diablo, its assets and the original engine remain the property of their respective owners and contributors.",
  },
  {
    slug: "fleet-route-monitor",
    title: "Fleet Route Monitor",
    positioning: "Real-time logistics monitoring interface",
    summary:
      "A responsive operational dashboard that turns deterministic vehicle simulation into route progress, ETA, delay risk and actionable alerts.",
    contribution:
      "Interaction design, simulation model, map integration and testable operational state",
    stack: [
      "React",
      "TypeScript",
      "Leaflet",
      "Simulation",
      "Responsive UI",
      "Vitest",
    ],
    result:
      "A credible, repeatable monitoring experience without depending on a live fleet backend.",
    image: "/projects/fleet-route-monitor/dashboard.webp",
    imageAlt:
      "Fleet Route Monitor dashboard with a route map, vehicle progress and operational alerts",
    repository: "https://github.com/JohnImril/leaflet-route",
    demo: "https://johnimril.github.io/leaflet-route/",
    clusters: ["realtime"],
    context:
      "Transport monitoring interfaces need to condense movement, schedule health and exceptions into a view an operator can understand quickly.",
    problem:
      "Represent time-based route state clearly across a map and dashboard while keeping scenarios repeatable enough to test and demonstrate.",
    constraints: [
      "A public demo cannot depend on private telematics infrastructure.",
      "Map and dashboard information must remain usable on narrow screens.",
      "Time progression needs deterministic behavior for testing.",
    ],
    architecture: [
      {
        title: "Scenario source",
        detail: "Deterministic routes, timing and events",
      },
      {
        title: "Simulation clock",
        detail: "Repeatable progress and scenario switching",
      },
      {
        title: "Derived operations",
        detail: "ETA, delay risk, status and alerts",
      },
      {
        title: "Map + dashboard",
        detail: "Synchronized spatial and operational views",
      },
    ],
    decisions: [
      "Derived values are calculated from a deterministic simulation state.",
      "Scenario switching makes edge cases directly inspectable.",
      "Operational alerts are visible in the dashboard rather than only as map markers.",
    ],
    quality: [
      "Tests cover simulation and derived state.",
      "CI protects the build and checks.",
      "Responsive layouts preserve the operational hierarchy.",
    ],
    results: [
      "Route progress and ETA remain synchronized",
      "Delay risks and alerts are surfaced explicitly",
      "Multiple scenarios can be reproduced in the public demo",
    ],
    tradeoffs: [
      "Simulation proves interface behavior, not live backend throughput.",
      "Leaflet provides a pragmatic map layer but adds client-side weight.",
      "Real deployments would require telemetry freshness and failure-state policies.",
    ],
    alternatives: [
      "Random movement was rejected because it makes behavior difficult to reproduce.",
      "A map-only experience was rejected because operational risks need a scannable non-spatial representation.",
    ],
    status:
      "Working public demonstration with deterministic scenarios, tests and CI.",
  },
  {
    slug: "forest",
    title: "Forest",
    positioning: "Measured React-to-Svelte performance migration",
    summary:
      "An engineering experiment that measures the effect—and limits—of migrating the application layer from React to Svelte while keeping the image payload constant.",
    contribution:
      "Migration implementation, measurement design, analysis and documentation",
    stack: ["Svelte", "TypeScript", "Vite", "Lighthouse", "Bundle analysis"],
    result:
      "74% less JavaScript and a measured Lighthouse Performance increase from 75 to 92.",
    image: "/projects/forest/gallery.webp",
    imageAlt:
      "Forest image gallery used for the measured framework migration experiment",
    repository: "https://github.com/JohnImril/forest",
    demo: "https://johnimril.github.io/forest/",
    clusters: ["performance"],
    context:
      "Framework migration claims are often discussed without controlled measurements. This experiment keeps the product and image payload comparable and documents both improvements and remaining bottlenecks.",
    problem:
      "Measure what changes when a small React application is migrated to Svelte, without turning the result into a universal framework claim.",
    constraints: [
      "The image payload remains unchanged between variants.",
      "Lighthouse scores depend on the measurement environment.",
      "A small gallery cannot represent every production workload.",
    ],
    architecture: [
      { title: "Comparable UI", detail: "Same gallery behavior and content" },
      {
        title: "Svelte application",
        detail: "Migrated component and runtime layer",
      },
      {
        title: "Production build",
        detail: "Bundle sizes captured from built assets",
      },
      {
        title: "Measured run",
        detail: "Lighthouse and loading metrics documented",
      },
    ],
    decisions: [
      "Image assets were deliberately left unchanged to isolate application-layer changes.",
      "Production build output was measured rather than development behavior.",
      "Results document regressions and remaining bottlenecks alongside improvements.",
    ],
    quality: [
      "Measurements and methodology are documented in the repository.",
      "The migrated behavior remains covered by project checks.",
      "Raw byte counts accompany percentage claims.",
    ],
    results: [
      "JavaScript: 200,911 bytes → 52,025 bytes (74% reduction)",
      "Lighthouse Performance: 75 → 92",
      "Largest Contentful Paint: 8.9 s → 3.4 s",
    ],
    tradeoffs: [
      "Image payload remained unchanged and continued to dominate transfer size.",
      "Build behavior and ecosystem trade-offs were measured and documented.",
      "The result supports this case study, not a claim that Svelte is universally faster than React.",
    ],
    alternatives: [
      "Aggressive image optimization was intentionally deferred because it would confound the framework comparison.",
      "A synthetic component benchmark was avoided in favor of a complete, deployable interface.",
    ],
    status:
      "Completed and documented engineering experiment with a public demo and source code.",
  },
] as const;

export const projects = projectSchema.array().parse(projectData);
export type Project = (typeof projects)[number];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
