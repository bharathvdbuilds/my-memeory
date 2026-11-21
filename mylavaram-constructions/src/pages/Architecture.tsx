import { CTABand } from "../components/CTABand";
import { EnquiryForm } from "../components/EnquiryForm";
import { PageHero } from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";

export function Architecture() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Architecture & Design"
        title="Design collaboration with honest role clarity"
        lead="Architecture support may be partner-led, client-appointed, or coordinated alongside Mylavaram construction delivery. Exact in-house vs partner scope will be confirmed per project — this page does not invent studio credentials."
      />

      <section className="section">
        <div className="container">
          <div className="notice reveal">
            <strong>Placeholder wording:</strong> Until studio structure, partner
            roster and sample drawings are verified, treat design capability claims
            as pathways for discussion — not as a published in-house architecture
            practice profile.
          </div>
          <div className="grid-2">
            <article className="reveal">
              <h2>Partner-led design</h2>
              <p>
                When an architect of record is appointed by the client or introduced
                through a trusted partner, Mylavaram focuses on buildability reviews,
                sequencing and construction coordination.
              </p>
            </article>
            <article className="reveal">
              <h2>Coordinated delivery</h2>
              <p>
                Where design and construction need tighter coupling, we help align
                concept decisions with structural strategy, material availability and
                site realities.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container split">
          <div className="media-panel reveal">
            <span>Design study imagery — placeholder</span>
          </div>
          <div className="reveal" style={{ maxWidth: "36rem" }}>
            <EnquiryForm
              variant="architecture"
              defaultProjectType="Architecture & design"
            />
          </div>
        </div>
      </section>

      <CTABand
        title="Start a design conversation"
        text="Tell us whether you already have an architect, need introductions, or want construction-led coordination."
        secondaryLabel="See project templates"
        secondaryTo="/projects"
      />
    </div>
  );
}
