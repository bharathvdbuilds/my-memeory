import type { Project } from "../data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card reveal">
      <div className="project-card__media" aria-hidden="true">
        <span className="project-card__label badge badge--warn">Placeholder</span>
      </div>
      <div className="project-card__meta">
        {project.categories.map((cat) => (
          <span key={cat} className="badge">
            {cat}
          </span>
        ))}
      </div>
      <div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <p className="placeholder-note">{project.location}</p>
      </div>
    </article>
  );
}
