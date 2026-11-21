import { useMemo, useState } from "react";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { ProjectCard } from "../components/ProjectCard";
import {
  placeholderProjects,
  projectFilters,
  type ProjectCategory,
} from "../data/projects";
import { useReveal } from "../hooks/useReveal";

export function Projects() {
  const revealRef = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "All") return placeholderProjects;
    return placeholderProjects.filter((p) =>
      p.categories.includes(filter as ProjectCategory),
    );
  }, [filter]);

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Projects"
        title="Filterable portfolio template — placeholders only"
        lead="Categories: Civil, Commercial, Industrial/PEB, Architecture, Ongoing and Completed. Every card is labelled as a placeholder until real photography and permissions arrive."
      />

      <section className="section">
        <div className="container">
          <div className="notice reveal">
            Do not present these entries as completed contracts or client references.
            Replace titles, locations and media with verified project data before launch.
          </div>

          <div
            className="filter-bar"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-btn${filter === item ? " is-active" : ""}`}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="placeholder-note">No placeholders in this category yet.</p>
          ) : null}
        </div>
      </section>

      <CTABand
        title="Have a project that should appear here?"
        text="Once assets are approved, we will replace placeholders with authentic case material."
        primaryLabel="Discuss Your Project"
        primaryTo="/contact"
      />
    </div>
  );
}
