export const contributions = [
  {
    title: "A complete inventory history",
    requirement:
      "Volunteer profiles showed transfers but omitted warehouse issues and returns.",
    implementation:
      "I combined all three event types in one chronological history and added warehouse names to the Django API serializers and TypeScript interfaces.",
    detail:
      "Transfers are deduplicated; event-type-prefixed row keys avoid collisions between records from different endpoints.",
    url: "https://github.com/Insomnia-IT/feed/pull/1183",
    number: 1183,
  },
  {
    title: "Kitchen validation for group badges",
    requirement:
      "The feeding workflow needed to check a group badge’s assigned kitchen.",
    implementation:
      "I added an explicit wrong-kitchen state before the existing validation flow, with separate messages for missing and mismatched kitchen assignments.",
    detail:
      "The badge contract now includes a nullable kitchen ID, and the derived view updates when that assignment changes.",
    url: "https://github.com/Insomnia-IT/feed/pull/1127",
    number: 1127,
  },
  {
    title: "Role-aware volunteer blocking controls",
    requirement:
      "Location heads needed access to volunteer blocking controls in the existing admin interface.",
    implementation:
      "I removed the badge-edit permission gate from the blocking button and adjusted the unblocking permission rule.",
    detail:
      "Blocking visibility and permission to unblock remain distinct: the button still checks unblocking permission for blocked volunteers.",
    url: "https://github.com/Insomnia-IT/feed/pull/363",
    number: 363,
  },
] as const;
