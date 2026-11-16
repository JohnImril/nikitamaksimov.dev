// Anonymized account based on the existing commercial experience narrative.
// Performance figures belong to separate examples in experience.ts.
export const sharedLibraryModernization = {
  slug: "shared-library-modernization",
  title: "Incremental Modernization of Shared Libraries",
  positioning: "Commercial engineering / shared JavaScript libraries",
  summary:
    "I modernized shared legacy libraries while their consuming applications remained in active development.",
  sections: [
    {
      id: "context",
      title: "Modernize a shared dependency without blocking its consumers",
      body: "The libraries needed to evolve, but existing applications relied on their behavior. A single replacement would couple the migration to changes across consumers. Compatibility and continued application maintenance were the central constraints.",
    },
    {
      id: "responsibility",
      title: "My responsibility: implementation and migration safety",
      body: "I worked on the library changes and chose staged adoption. My scope included regression checks against existing behavior and rollback planning, so adoption did not depend on completing the entire replacement first.",
    },
    {
      id: "tradeoffs",
      title: "Bound each change; accept the cost of transition",
      body: "Incremental migration made adoption manageable alongside feature development. The trade-off was carrying compatibility concerns throughout the transition instead of moving all consumers to a clean target state at once.",
    },
    {
      id: "outcome",
      title: "Shared libraries evolved alongside application development",
      body: "The libraries were modernized in stages while application development and maintenance continued. This is a qualitative delivery outcome; the build-time, JavaScript-size and TTI results linked below come from separate commercial examples. Client implementation details and internal reports remain confidential.",
    },
  ],
} as const;
