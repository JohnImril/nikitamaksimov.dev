// Anonymized account based on the existing commercial experience narrative.
// Performance figures belong to separate examples in experience.ts.
export const sharedLibraryModernization = {
  slug: "shared-library-modernization",
  title: "Incremental Modernization of Shared Libraries",
  positioning: "Commercial engineering / shared JavaScript libraries",
  summary:
    "I modernized shared legacy libraries through staged adoption, regression checks and rollback planning while application development continued.",
  sections: [
    {
      id: "context",
      title: "A change with more than one consumer",
      body: "Shared libraries sit between applications and the behavior those applications rely on. Modernizing one library therefore affects more than its own implementation: existing consumers still need to work while the migration progresses.",
    },
    {
      id: "problem",
      title: "Modernize without forcing a coordinated replacement",
      body: "The legacy libraries needed modernization, but replacing them in one step would tie application maintenance to a wider migration. The central constraint was preserving existing behavior while making changes adoptable in stages.",
    },
    {
      id: "responsibility",
      title: "My responsibility",
      body: "I worked on the library modernization and chose an incremental migration approach. My work included regression checks and rollback planning to support adoption without stopping ongoing development and maintenance.",
    },
    {
      id: "approach",
      title: "Treat compatibility as a migration constraint",
      body: "I evolved the libraries in steps, keeping existing consumers in view rather than treating the new implementation in isolation. Regression checks supported the transition; rollback planning addressed the risk of a change needing to be reversed. Compatibility between existing behavior and migrated code shaped the pace of adoption.",
    },
    {
      id: "tradeoffs",
      title: "Smaller adoption steps, a longer transition",
      body: "A staged migration keeps change bounded and allows development to continue. The trade-off is that compatibility remains an ongoing concern throughout the transition. A complete replacement would simplify the target state, but require a larger coordinated change across consumers.",
    },
    {
      id: "outcome",
      title: "Library evolution alongside application development",
      body: "The libraries were modernized incrementally while development and maintenance continued. Staged adoption, regression checks and rollback planning reduced the risk of making every consumer depend on a single replacement step.",
    },
  ],
} as const;
