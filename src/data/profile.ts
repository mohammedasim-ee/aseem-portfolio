export const profile = {
  name: "Mohammed Aseem",
  github: "https://github.com/mohammedasim-ee",
  university: "Atria University",
  program: "Digital Transformation",
  year: "3rd Year",
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Full-Stack Development",
    "Data",
    "Digital Transformation",
  ],
  // No verified biography has been provided yet. This is a placeholder -
  // replace it in this file, not by asking the AI to invent one.
  bioPlaceholder:
    "[Add a short personal bio here — a sentence or two about what you're working on and what you care about.]",
  contact: {
    email: null, // e.g. "you@example.com" - not filled in, do not fabricate
    linkedin: null,
  },
  resume: {
    available: false, // set true once you add /public/resume.pdf
  },
  notes:
    "This file is the single source of truth for personal facts the AI Digital Twin may state. Anything not listed here is unknown to the Twin.",
};

export type Profile = typeof profile;
