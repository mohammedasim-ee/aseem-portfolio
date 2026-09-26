export interface Skill {
  name: string;
  label: string; // Neutral by default - "Used in projects" rather than a proficiency claim.
  seenIn: string[]; // project ids where this technology was actually observed
}

// Derived strictly from languages/technologies observed in the verified
// repositories in projects.ts. A language appearing in one small repo does
// not imply expertise - hence the neutral "Used in projects" label for all
// of these. Add proficiency levels here yourself if you want to claim them;
// the Twin will not infer them from repo contents.
export const skills: Skill[] = [
  { name: "HTML", label: "Used in projects", seenIn: ["pair-coding-challenge", "cafe-cosmo", "cafe-assignment", "aseem-exercises"] },
  { name: "CSS", label: "Used in projects", seenIn: ["pair-coding-challenge", "cafe-cosmo", "cafe-assignment"] },
  { name: "JavaScript", label: "Used in projects", seenIn: ["pair-coding-challenge", "cafe-assignment"] },
  { name: "Python", label: "Used in projects", seenIn: ["oop-python"] },
];
