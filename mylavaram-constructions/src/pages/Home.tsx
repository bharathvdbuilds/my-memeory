import { Link } from "react-router-dom";
import { CTABand } from "../components/CTABand";
import { ProjectCard } from "../components/ProjectCard";
import { homeServices, industries, processSteps, whyUs } from "../data/services";
import { placeholderProjects } from "../data/projects";
import { useReveal } from "../hooks/useReveal";

export function Home() {
  const revealRef = useReveal<HTMLDivElement>();
  const featured = placeholderProjects.slice(0, 3);

  return (
    <div ref={revealRef}>
      <section className="hero" aria-label="Hero">
        <div className="hero__media" />
        <p className="hero__placeholder-label">Atmospheric structural placeholder</p>
        <div className="hero__content">
          <p className="hero__brand">Mylavaram Constructions</p>
          <p className="hero__tagline">Designed. Engineered. Built.</p>
          <h1 className="hero__headline">
            Building Strong Foundations. Creating Bigger Possibilities.
          </h1>
          <p className="hero__support">
            Explore civil, commercial and industrial construction solutions,
            architecture services and development partnership opportunities with
            Mylavaram Constructions.
          </p>
          <div className="btn-group">
            <Link to="/contact" className="btn btn--primary">
              Discuss Your Project
            </Link>
            <Link to="/projects" className="btn btn--secondary">
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">Introduction</p>
            <h2>Construction capability framed for serious conversations</h2>
            <p className="section__lead">
              This site is built as a B2B credibility and enquiry platform —
              service clarity, partnership pathways and honest portfolio staging —
              not a brochure of invented claims.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">Services</p>
            <h2>What we build and coordinate</h2>
            <p className="section__lead">
              Four focused pathways from first conversation through delivery.
            </p>
          </div>
          <div className="feature-list">
            {homeServices.map((service) => (
              <div key={service.path} className="feature-list__item reveal">
                <span className="feature-list__index">{service.index}</span>
                <div className="feature-list__body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <Link to={service.path} className="link-arrow">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">Featured projects</p>
            <h2>Portfolio slots awaiting verified assets</h2>
            <p className="section__lead">
              Cards below are labelled placeholders. They are not completed
              projects and should not be presented as references.
            </p>
          </div>
          <div className="project-grid">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link to="/projects" className="link-arrow">
              Browse all project templates
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">Process</p>
            <h2>From discovery to handover</h2>
            <p className="section__lead">
              A disciplined sequence that keeps scope, engineering and site
              realities aligned.
            </p>
          </div>
          <div className="process-steps">
            {processSteps.map((step) => (
              <article key={step.title} className="process-step reveal">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <p className="section__eyebrow">Industries</p>
            <h2>Where conversations typically begin</h2>
            <p className="section__lead">
              Sector labels help route your enquiry — not a claim of exclusive
              vertical dominance.
            </p>
          </div>
          <ul className="industry-list reveal">
            {industries.map((item) => (
              <li key={item.name}>
                {item.name}
                <span>{item.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">Why us</p>
            <h2>How we earn the next meeting</h2>
          </div>
          <ul className="why-list">
            {whyUs.map((item) => (
              <li key={item.title} className="reveal">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="teaser-block reveal">
            <p className="section__eyebrow">Material collaborations</p>
            <h2>Build with brands that strengthen specification</h2>
            <p className="section__lead">
              A dedicated pathway for material manufacturers and distributors
              exploring specification, sampling and site-trial collaboration.
            </p>
            <Link to="/material-collaborations" className="link-arrow">
              Become a Material Partner
            </Link>
          </div>
          <div className="teaser-block reveal">
            <p className="section__eyebrow">Joint ventures & development</p>
            <h2>Land, programme and partnership discussions</h2>
            <p className="section__lead">
              For landowners, developers and co-builders exploring structured
              conversations — without promised returns or fabricated deal stories.
            </p>
            <Link to="/joint-ventures" className="link-arrow">
              Discuss a Development Partnership
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to outline your project?"
        text="Share type, location, scale and timeline. We will respond with clarifying questions — not inflated claims."
        primaryLabel="Discuss Your Project"
        primaryTo="/contact"
        secondaryLabel="Explore Our Work"
        secondaryTo="/projects"
      />
    </div>
  );
}
