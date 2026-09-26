export type ProjectStatus = "practice" | "coursework" | "experiment" | "empty" | "wip" | "complete";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  liveDemo: string | null;
  status: ProjectStatus;
  statusLabel: string;
  notes: string;
}

// Verified by inspecting https://github.com/mohammedasim-ee on 26 Sep 2026.
// GitHub blocks automated tools from loading the full repository list, and
// the public API was rate-limited from this environment, so only 6 of the
// profile's 12 repositories could be inspected. The other 6 are NOT listed
// here — nothing about them is verified, so nothing is claimed about them.
// If you want them included, tell the Twin's data (this file) about them
// directly rather than letting anything be guessed.
export const projects: Project[] = [
  {
    id: "pair-coding-challenge",
    title: "Pair Coding Challenge — Advice Generator",
    description:
      "A front-end pair-programming exercise: a small app that displays a random piece of advice, built from a design brief with a dice icon and a divider asset.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mohammedasim-ee/pair-coding-chALLANGE",
    liveDemo: null,
    status: "practice",
    statusLabel: "Coursework / practice",
    notes: "Single commit; matches a well-known front-end pair-programming challenge brief.",
  },
  {
    id: "cafe-cosmo",
    title: "Cafe Cosmo",
    description:
      "A small static café-themed web page built with plain HTML and CSS.",
    technologies: ["HTML", "CSS"],
    github: "https://github.com/mohammedasim-ee/cafe-cosmo",
    liveDemo: null,
    status: "practice",
    statusLabel: "Coursework / practice",
    notes: "5 commits, 1 open issue on the repo.",
  },
  {
    id: "cafe-assignment",
    title: "Cafe Assignment",
    description:
      "An earlier version of a café-themed static page, with HTML, CSS and a small JavaScript file.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mohammedasim-ee/cafe_assignment",
    liveDemo: null,
    status: "coursework",
    statusLabel: "Coursework assignment",
    notes: "Single commit; closely related to Cafe Cosmo, likely an earlier draft of the same assignment.",
  },
  {
    id: "aseem-exercises",
    title: "HTML Practice Bundle",
    description:
      "A bundle of small HTML exercises, including a form (book club sign-up) and a debugging exercise.",
    technologies: ["HTML"],
    github: "https://github.com/mohammedasim-ee/ASEEM",
    liveDemo: null,
    status: "practice",
    statusLabel: "Coursework / practice",
    notes: "2 commits; contains multiple standalone exercise files rather than one single app.",
  },
  {
    id: "oop-python",
    title: "OOP Practice",
    description: "A single-file Python exercise practicing object-oriented programming concepts.",
    technologies: ["Python"],
    github: "https://github.com/mohammedasim-ee/top",
    liveDemo: null,
    status: "practice",
    statusLabel: "Coursework / practice",
    notes: "One file (oop.py), 1 commit.",
  },
  {
    id: "building-and-debugging",
    title: "Building and Debugging",
    description: "Repository created but no code has been pushed yet.",
    technologies: [],
    github: "https://github.com/mohammedasim-ee/Building-and-Debugging",
    liveDemo: null,
    status: "empty",
    statusLabel: "Empty repository",
    notes: "No files yet — flagged for your review rather than guessed at.",
  },
];
