export const insomnia = {
  slug: "insomnia-feeder",
  title: "Insomnia Festival — Volunteer Operations Platform",
  positioning: "Collaborative engineering / Feeder",
  summary:
    "Modernizing a real-world volunteer management platform across administrative workflows, field scanning, and inventory operations.",
  role: "Frontend Engineer · Cross-stack Contributor · Volunteer",
  period: "October 2024 – July 2026",
  repository: "https://github.com/Insomnia-IT/feed",
} as const;

export const insomniaThemes = [
  {
    id: "inventory",
    label: "Operational features / React + Django",
    title: "Make inventory usable from a volunteer’s profile.",
    problem:
      "Coordinators need to know who holds equipment, move it between people, and understand how it got there. A balance alone cannot explain a warehouse issue, a return, or a transfer.",
    contribution:
      "I added the volunteer inventory section and transfer flow, connected inventory-item filtering to volunteer search, and extended movement history with people, item, and warehouse information. Later, I combined issues, returns, and transfers into one chronological profile history.",
    decision:
      "The transfer form fixes the recipient to the open profile. Choosing a source loads that person’s stock; changing the source clears the selected item and quantity. Submission validates the form, posts the movement, and refreshes both inventories. Loading, empty-stock, and failed-transfer states are explicit.",
    result:
      "Coordinators can follow equipment from its current holder through a transfer and back through its recorded history, without piecing together unrelated screens.",
  },
  {
    id: "mobile",
    label: "Performance / delivery + rendering",
    title: "Give the mobile list its own loading path.",
    problem:
      "A field coordinator’s compact list does not need the desktop table’s full data and controls. Yet the list used the general volunteer response, while unrelated lookups and desktop code added startup work.",
    contribution:
      "I worked on list rendering and initial loading across several iterations: memoized mobile cards, lazy editor and chart loading, and on-demand spreadsheet imports. The later mobile change introduced a dedicated Django serializer and a mobile=1 request path, alongside lazy desktop content and conditional filter lookups.",
    decision:
      "Keep names, blocking state, the coordinator’s note, and arrivals in the mobile response. Select the needed model fields and prefetch arrival records. Load filter options when a filter is visible or active; fetch desktop custom fields only on desktop.",
    result:
      "Mobile requests a narrower representation and avoids initializing the desktop table and its mass-edit workflow. These are verifiable reductions in work; I do not claim a production latency percentage.",
  },
  {
    id: "modernization",
    label: "Existing-system modernization / developer experience",
    title: "Evolve the toolchain, then remove unnecessary layers.",
    problem:
      "The monorepo had different frontend build paths and accumulated configuration. Updating it meant accounting for the admin, the scanner PWA, workspace dependencies, and container delivery together.",
    contribution:
      "I updated monorepo tooling, added shared style linting and staged-file checks, and later migrated the scanner from CRA/CRACO to Vite while updating the admin stack. A subsequent change removed Lerna and Nx in favor of explicit npm workspace build commands.",
    decision:
      "Preserve the scanner’s /scanner/ base path, PWA manifest, and environment-driven API configuration. Adjust container builds for each application’s dist output. Keep app-specific development and preview commands while making the root build run admin, then scanner.",
    result:
      "Both applications use Vite and npm workspaces. Contributors can trace the build through package scripts instead of an additional task graph; shared lint, formatting, and TypeScript checks remain part of the workflow.",
  },
  {
    id: "rules",
    label: "Business rules / admin + backend + scanner",
    title: "Carry operational rules across application boundaries.",
    problem:
      "A supervisor assignment is more than a person picker: eligible roles, shared services, self-assignment, and the acting coordinator’s authority all matter. Group meal badges also need a role and an assigned kitchen.",
    contribution:
      "I added a scoped supervisor-candidates API and backend validation, connected it to shared frontend selection logic, and constrained role editing for service heads. I also added group-badge role and kitchen controls and a wrong-kitchen state in the field scanner.",
    decision:
      "Use frontend options and disabled controls to guide the operator, with Django validating supervisor assignments and restricted role changes. In the scanner, distinguish an unassigned kitchen from a mismatched one before the normal group-feeding validation flow.",
    result:
      "The UI reflects more of the actual operating rules, and supervisor-related writes receive server-side checks. The scanner check is client behavior; it is not evidence of a platform-wide authorization guarantee.",
  },
] as const;

export const insomniaReferences = [
  { number: 782, title: "Vite migration and application delivery" },
  { number: 995, title: "Workspace build orchestration" },
  { number: 1035, title: "Mobile data and loading boundaries" },
  { number: 1090, title: "Inventory transfer implementation" },
  { number: 1183, title: "Unified inventory history" },
  { number: 1159, title: "Supervisor rules across the stack" },
] as const;
