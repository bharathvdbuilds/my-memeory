import { CTABand } from "../components/CTABand";
import { EnquiryForm } from "../components/EnquiryForm";
import { PageHero } from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";

export function Materials() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Material Brand Collaborations"
        title="Specify stronger. Sample smarter. Collaborate on site."
        lead="A dedicated channel for manufacturers and distributors exploring specification support, sampling and responsible site trials with Mylavaram Constructions."
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <h2>What collaboration can look like</h2>
            <ul className="why-list" style={{ gridTemplateColumns: "1fr" }}>
              <li>
                <h3>Specification conversations</h3>
                <p>
                  Introduce category fit for civil, commercial or industrial scopes
                  without implying exclusive preferred-vendor status.
                </p>
              </li>
              <li>
                <h3>Sampling & technical support</h3>
                <p>
                  Align datasheets, mock-ups and site practicality before wider
                  rollout discussions.
                </p>
              </li>
              <li>
                <h3>Co-branded learning content</h3>
                <p>
                  Optional educational content once partnerships and approvals are
                  real — never invented logos or case studies.
                </p>
              </li>
            </ul>
          </div>
          <div className="reveal">
            <EnquiryForm
              variant="material"
              defaultProjectType="Material partnership"
            />
          </div>
        </div>
      </section>

      <CTABand
        title="Become a Material Partner"
        text="Share brand category, geography and the collaboration model you have in mind."
        primaryLabel="Become a Material Partner"
        primaryTo="/contact?intent=material"
        secondaryLabel="Back to home"
        secondaryTo="/"
      />
    </div>
  );
}
