export type ProjectCategory =
  | "Civil"
  | "Commercial"
  | "Industrial/PEB"
  | "Architecture"
  | "Ongoing"
  | "Completed";

export type Project = {
  id: string;
  title: string;
  summary: string;
  categories: ProjectCategory[];
  location: string;
};

/** Placeholder portfolio entries only — not real completed work. */
export const placeholderProjects: Project[] = [
  {
    id: "ph-civil-01",
    title: "Placeholder — Civil infrastructure scope",
    summary:
      "Template card for a roads, drainage or site-development case study. Replace with verified project photography and facts.",
    categories: ["Civil", "Completed"],
    location: "Location TBD",
  },
  {
    id: "ph-civil-02",
    title: "Placeholder — Structural civil package",
    summary:
      "Reserved slot for an RCC / structural civil assignment once assets and client permissions are available.",
    categories: ["Civil", "Ongoing"],
    location: "Location TBD",
  },
  {
    id: "ph-com-01",
    title: "Placeholder — Commercial built environment",
    summary:
      "Template for office, retail or mixed-use commercial delivery. Do not treat as a live reference project.",
    categories: ["Commercial", "Completed"],
    location: "Location TBD",
  },
  {
    id: "ph-com-02",
    title: "Placeholder — Campus / institutional shell",
    summary:
      "Awaiting authentic photographs, scope notes and completion status before publication.",
    categories: ["Commercial", "Ongoing"],
    location: "Location TBD",
  },
  {
    id: "ph-peb-01",
    title: "Placeholder — PEB warehouse envelope",
    summary:
      "Industrial / pre-engineered building showcase slot. Content pending verified PEB case material.",
    categories: ["Industrial/PEB", "Completed"],
    location: "Location TBD",
  },
  {
    id: "ph-peb-02",
    title: "Placeholder — Factory / shed package",
    summary:
      "Template for manufacturing or logistics shed work. Labelled placeholder until real assets arrive.",
    categories: ["Industrial/PEB", "Ongoing"],
    location: "Location TBD",
  },
  {
    id: "ph-arch-01",
    title: "Placeholder — Design collaboration study",
    summary:
      "Architecture & design partnership example. Clarify partner-led vs in-house roles when real work is published.",
    categories: ["Architecture", "Completed"],
    location: "Location TBD",
  },
  {
    id: "ph-arch-02",
    title: "Placeholder — Concept-to-build coordination",
    summary:
      "Reserved for coordinated design-and-build narratives once documentation is approved.",
    categories: ["Architecture", "Ongoing"],
    location: "Location TBD",
  },
];

export const projectFilters: Array<"All" | ProjectCategory> = [
  "All",
  "Civil",
  "Commercial",
  "Industrial/PEB",
  "Architecture",
  "Ongoing",
  "Completed",
];
