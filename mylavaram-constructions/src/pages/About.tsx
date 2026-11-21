import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";

export function About() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="About"
        title="Built for clarity, coordination and credible growth"
        lead="Mylavaram Constructions focuses on civil, commercial and industrial delivery conversations — with honest staging of portfolio and partnership pathways until verified assets are ready."
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <h2>Who we are</h2>
            <p>
              We are a construction-focused organisation positioning ourselves for
              serious project discussions, material-brand collaborations and
              development partnership talks.
            </p>
            <p>
              Brand line: <strong>Designed. Engineered. Built.</strong> The emphasis
              is engineering-led planning and disciplined execution — not marketing
              theatre.
            </p>
            <div className="notice">
              This page intentionally omits invented years of experience, award
              counts, client logos and testimonials. Those details will appear only
              when verified.
            </div>
          </div>
          <div className="media-panel reveal" aria-hidden="true">
            <span>Structural atmosphere — placeholder</span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">How we work</p>
            <h2>Principles that shape every enquiry</h2>
          </div>
          <ul className="why-list">
            <li className="reveal">
              <h3>Scope before spectacle</h3>
              <p>
                We start with programme, constraints and decision timing so proposals
                stay grounded.
              </p>
            </li>
            <li className="reveal">
              <h3>Buildability in the room</h3>
              <p>
                Engineering and sequencing questions belong early — not after bids
                are locked.
              </p>
            </li>
            <li className="reveal">
              <h3>Transparent staging</h3>
              <p>
                Portfolio and contact details stay clearly labelled until authentic
                materials replace placeholders.
              </p>
            </li>
            <li className="reveal">
              <h3>Partnership channels</h3>
              <p>
                Material brands and JV counterparts get dedicated routes instead of
                generic contact forms alone.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <CTABand
        title="Start with a project conversation"
        text="Whether you need civil delivery, PEB capability or a partnership discussion, the contact form routes your enquiry by type."
        secondaryLabel="View services overview"
        secondaryTo="/civil-construction"
      />
    </div>
  );
}
