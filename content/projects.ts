import { z } from "zod";

export const clusterNames = [
  "architecture",
  "performance",
  "realtime",
  "ai",
] as const;
export type SignalCluster = (typeof clusterNames)[number];

const projectSchema = z.object({
  order: z.number().int(),
  slug: z.string().min(1),
  title: z.string().min(1),
  positioning: z.string().min(1),
  summary: z.string().min(1),
  contribution: z.string().min(1),
  kind: z.string().min(1),
  stage: z.string().min(1),
  scope: z.string().min(1),
  inspection: z.object({
    demo: z.string().min(1),
    source: z.string().min(1),
    sourceUrl: z.string().url(),
  }),
  headings: z.object({
    challenge: z.string(),
    architecture: z.string(),
    decisions: z.string(),
    results: z.string(),
  }),
  comparison: z
    .array(
      z.object({
        metric: z.string(),
        before: z.string(),
        after: z.string(),
      }),
    )
    .optional(),
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
    order: 3,
    slug: "reviewpilot-ai",
    title: "ReviewPilot AI",
    positioning: "AI-assisted pull request review workflow",
    summary:
      "A Next.js application and GitHub App that turn a diff into line-aware review findings through one validated API and a replaceable analysis provider.",
    contribution:
      "I designed the review UI, shared review pipeline, GitHub integration and evaluation workflow.",
    kind: "Personal AI project",
    stage: "Working prototype",
    scope:
      "The public demo uses a deterministic mock provider. Real LLM analysis is optional and requires the OpenAI-compatible integration.",
    inspection: {
      demo: "Load an example diff and inspect findings, source lines and risk factors.",
      source:
        "Trace the shared review service, provider boundary, schema validation and golden-case evaluations.",
      sourceUrl:
        "https://github.com/JohnImril/reviewpilot-ai/blob/master/docs/architecture.md",
    },
    headings: {
      challenge: "A review contract the UI can rely on",
      architecture: "One pipeline for manual and GitHub reviews",
      decisions: "Validate at the boundary; keep the provider replaceable",
      results: "What the working prototype demonstrates",
    },
    stack: ["Next.js", "TypeScript", "Zod", "GitHub App", "Vitest", "CI"],
    result:
      "One review contract for the UI, API and GitHub webhook, with provider output validated before rendering.",
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
        detail: "Parsed files, hunks and source line locations",
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
      "Working prototype and public demo. Durable webhook processing, persistent deduplication and multi-tenant controls remain further work before production use.",
  },
  {
    order: 1,
    slug: "diablo-web",
    title: "Diablo Web",
    positioning: "Modernizing a browser-based WebAssembly game runtime",
    summary:
      "A React and TypeScript shell around an existing WebAssembly game engine, with explicit runtime, worker and storage boundaries.",
    contribution:
      "I modernized the web client: runtime APIs, worker integration, storage coordination, tests and build tooling.",
    kind: "Personal modernization project",
    stage: "Working browser client",
    scope:
      "Built on devilution and earlier DiabloWeb ports. The original engine and WebAssembly port are upstream work; my contribution is the browser client modernization and integration.",
    inspection: {
      demo: "Inspect asset loading, runtime startup and the browser UI. Full-game play requires your own game data.",
      source:
        "Inspect core, adapter, runtime and UI boundaries, import checks, and exclusive save-storage ownership.",
      sourceUrl:
        "https://github.com/JohnImril/diablo_web/blob/main/ARCHITECTURE.md",
    },
    headings: {
      challenge: "Modernize the client around an existing engine",
      architecture: "Keep engine details behind the runtime boundary",
      decisions: "Separate pure logic, side effects and UI state",
      results: "A modern browser client with explicit boundaries",
    },
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "WebAssembly",
      "Web Workers",
      "Canvas",
    ],
    result:
      "Typed runtime APIs, enforced import boundaries and explicit save-storage ownership.",
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
      "Pure domain logic, side-effect adapters, runtime orchestration and React UI have separate responsibilities. Import-boundary lint checks help enforce those rules.",
      "The UI calls runtime APIs and subscribes to events instead of importing engine, storage or network adapters directly.",
      "Vite replaces older delivery tooling while retaining required WebAssembly behavior.",
      "An origin-wide Web Lock gives one participating tab ownership of save storage. Per-write locking alone would not protect independent engine snapshots.",
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
      "Save storage requires HTTPS or localhost and Web Locks support. The ownership lock does not guarantee disk durability or crash recovery.",
      "Mobile controls need refinement, multiplayer remains experimental, and upstream and bundled-artifact licensing still needs clarification.",
    ],
    alternatives: [
      "A full engine rewrite was out of scope and would erase the value of the upstream work.",
      "Main-thread execution was avoided because runtime work could compromise interface responsiveness.",
    ],
    status:
      "Working browser client and public demo. Game assets and the original engine belong to their respective owners and contributors.",
  },
  {
    order: 2,
    slug: "fleet-route-monitor",
    title: "Fleet Route Monitor",
    positioning: "Real-time logistics monitoring interface",
    summary:
      "A responsive operational dashboard that turns deterministic vehicle simulation into route progress, ETA, delay risk and actionable alerts.",
    contribution:
      "I built the simulation model, derived operational state, Leaflet integration and responsive dashboard.",
    kind: "Personal interface project",
    stage: "Working simulated demo",
    scope:
      "All vehicle movement, ETA and risk values are simulated. This demo has no live telemetry, routing API or fleet backend.",
    inspection: {
      demo: "Switch between normal traffic, rush hour, bad weather and road closure; pause or reset the simulation.",
      source:
        "Inspect the simulation domain separately from map rendering and dashboard components.",
      sourceUrl:
        "https://github.com/JohnImril/leaflet-route/tree/master/src/domain/fleet-simulation",
    },
    headings: {
      challenge: "Make changing route state understandable",
      architecture: "One simulation state, two synchronized views",
      decisions: "Keep operational rules outside the map",
      results: "Repeatable scenarios you can inspect",
    },
    stack: [
      "React",
      "TypeScript",
      "Leaflet",
      "Simulation",
      "Responsive UI",
      "Vitest",
    ],
    result:
      "A shared simulation state keeps route progress, ETA, risk and alerts synchronized across map and dashboard.",
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
      "The simulation domain owns route assignment, timing, ETA and risk calculations; map and dashboard layers render that derived state.",
      "Seeded route assignment and scenario controls make behavior reproducible without live backend services.",
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
    order: 4,
    slug: "forest",
    title: "Forest",
    positioning: "Measured React-to-Svelte performance migration",
    summary:
      "An experiment isolating React-to-Svelte application overhead in a small seasonal scene, with equivalent behavior and unchanged image assets.",
    contribution:
      "I built the Svelte port, measured production builds and Lighthouse, and documented improvements and regressions.",
    kind: "Performance experiment",
    stage: "Completed comparison",
    scope:
      "These results describe this small app and its recorded local run. The public demo is the React baseline; the Svelte implementation is on the svelte-port branch.",
    inspection: {
      demo: "Explore the seasonal scene and image-loading behavior in the React baseline.",
      source:
        "Compare main (React) and svelte-port (Svelte), with raw measurements and the full-build regression.",
      sourceUrl:
        "https://github.com/JohnImril/forest/blob/main/docs/metrics/comparison.md",
    },
    headings: {
      challenge: "Isolate application overhead in an image-heavy scene",
      architecture: "Compare equivalent behavior and production builds",
      decisions: "Keep the images constant, report the regressions",
      results: "The recorded comparison, including what got slower",
    },
    comparison: [
      {
        metric: "JavaScript bundle",
        before: "200,911 B",
        after: "52,025 B (−74%)",
      },
      { metric: "Lighthouse Performance", before: "75", after: "92" },
      { metric: "Largest Contentful Paint", before: "8.9 s", after: "3.4 s" },
      {
        metric: "Full build command",
        before: "1.967 s",
        after: "2.496 s (+0.529 s)",
      },
      {
        metric: "Image assets",
        before: "5,917,848 B",
        after: "5,917,848 B (unchanged)",
      },
    ],
    stack: ["Svelte", "TypeScript", "Vite", "Lighthouse", "Bundle analysis"],
    result:
      "JavaScript −74%; Lighthouse Performance 75 → 92 in the recorded run. Full build time increased by 0.529 s.",
    image: "/projects/forest/gallery.webp",
    imageAlt:
      "Forest seasonal scene used for the measured React-to-Svelte migration experiment",
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
      "A small seasonal scene cannot represent every production workload.",
    ],
    architecture: [
      {
        title: "Comparable UI",
        detail: "Same seasonal scene and image assets",
      },
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
      "Measurements were collected on 2026-07-08 from production builds served through the same local Vite preview setup.",
      "Lighthouse 13.4.0 reports and raw byte counts are documented in the repository. Scores remain run-sensitive.",
      "Both implementations have unit tests; the comparison records seven passing tests for React and ten for Svelte.",
    ],
    results: [
      "JavaScript: 200,911 bytes → 52,025 bytes (74% reduction)",
      "Lighthouse Performance: 75 → 92",
      "Largest Contentful Paint: 8.9 s → 3.4 s",
    ],
    tradeoffs: [
      "The unchanged 5,917,848 B of image assets continued to dominate the payload.",
      "The full quality-gated build increased from 1.967 s to 2.496 s; a faster Vite phase did not make the full command faster.",
      "CSS grew by 199 B, and the Svelte port introduced compiler and store-initialization trade-offs.",
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

export const projects = projectSchema
  .array()
  .parse(projectData)
  .sort((a, b) => a.order - b.order);
export type Project = (typeof projects)[number];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
