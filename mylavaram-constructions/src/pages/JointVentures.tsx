import { CTABand } from "../components/CTABand";
import { EnquiryForm } from "../components/EnquiryForm";
import { PageHero } from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";

export function JointVentures() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Joint Ventures & Development"
        title="Structured conversations for land, programme and partnership"
        lead="For landowners, developers and co-builders exploring development partnerships. This page does not promise returns, list fake deals or publish unverified investment claims."
      />

      <section className="section">
        <div className="container">
          <div className="notice reveal">
            No projected IRRs, guaranteed returns or fabricated JV case studies.
            Partnership outcomes depend on diligence, documentation and mutual
            agreement after direct discussion.
          </div>
          <div className="grid-2">
            <article className="reveal">
              <h2>Who typically reaches out</h2>
              <ul className="industry-list">
                <li>
                  Landowners
                  <span>Plot / parcel context</span>
                </li>
                <li>
                  Developers
                  <span>Programme partners</span>
                </li>
                <li>
                  Co-builders
                  <span>Delivery collaboration</span>
                </li>
              </ul>
            </article>
            <article className="reveal">
              <h2>What to prepare</h2>
              <p>
                Location, land status (as you can share), intended use, approximate
                scale and decision timeline. Sensitive documents stay offline until
                an appropriate NDA or process is agreed.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container" style={{ maxWidth: "40rem" }}>
          <EnquiryForm
            variant="jv"
            defaultProjectType="Joint venture / development"
          />
        </div>
      </section>

      <CTABand
        title="Discuss a Development Partnership"
        text="Start with context — not commitments. We will respond with clarifying questions."
        primaryLabel="Discuss a Development Partnership"
        primaryTo="/contact?intent=jv"
      />
    </div>
  );
}
