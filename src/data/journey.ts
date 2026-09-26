export interface JourneyEntry {
  id: string;
  label: string;
  detail: string;
  confirmed: boolean;
}

// Only "confirmed: true" entries are things actually stated in the profile.
// Everything else is a labeled placeholder - fill these in yourself as you
// confirm dates and milestones; the Twin will not invent them.
export const journey: JourneyEntry[] = [
  {
    id: "current",
    label: "3rd Year — Digital Transformation",
    detail: "Currently studying Digital Transformation at Atria University.",
    confirmed: true,
  },
  {
    id: "placeholder-earlier",
    label: "[Add an earlier milestone]",
    detail: "[e.g. when you started the program, a course that shaped your interests, etc.]",
    confirmed: false,
  },
  {
    id: "placeholder-project-work",
    label: "[Add a project or coursework milestone]",
    detail: "[e.g. a specific assignment or challenge that mattered to you]",
    confirmed: false,
  },
];
