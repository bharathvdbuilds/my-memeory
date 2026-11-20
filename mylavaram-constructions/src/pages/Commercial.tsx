import { CTABand } from "../components/CTABand";
import { EnquiryForm } from "../components/EnquiryForm";
import { PageHero } from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";

export function Commercial() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Commercial Construction"
        title="Workplaces and commercial environments with clear sequencing"
        lead="Office, retail, campus and institutional shells delivered with coordination between design intent, structure and finishing packages."
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <h2>Commercial delivery focus</h2>
            <p>
              Commercial projects succeed when programme, stakeholder decisions and
              site logistics stay aligned. We structure conversations around those
              realities rather than decorative claims.
            </p>
            <ul className="industry-list">
              <li>
                Workplace & office
                <span>Fit-out coordination as scoped</span>
              </li>
              <li>
                Retail & mixed-use
                <span>Phasing and access planning</span>
              </li>
              <li>
                Institutional
                <span>Education / civic shells</span>
              </li>
            </ul>
          </div>
          <div className="media-panel reveal">
            <span>Commercial structure — placeholder</span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container" style={{ maxWidth: "40rem" }}>
          <EnquiryForm
            variant="construction"
            defaultProjectType="Commercial construction"
          />
        </div>
      </section>

      <CTABand
        title="Outline your commercial project"
        text="Include built-up area band, location and decision timeline in the enquiry form."
        secondaryLabel="View projects template"
        secondaryTo="/projects"
      />
    </div>
  );
}
