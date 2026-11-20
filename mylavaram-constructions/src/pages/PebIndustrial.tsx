import { CTABand } from "../components/CTABand";
import { EnquiryForm } from "../components/EnquiryForm";
import { PageHero } from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";

export function PebIndustrial() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="PEB & Industrial"
        title="Pre-engineered and industrial envelopes for productive sites"
        lead="Warehouse, shed and factory conversations focused on span, clear height, loading, crane needs and programme — without unsupported cost or speed claims."
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <h2>Industrial scopes we discuss</h2>
            <div className="feature-list">
              <div className="feature-list__item">
                <span className="feature-list__index">01</span>
                <div className="feature-list__body">
                  <h3>PEB warehouses & sheds</h3>
                  <p>
                    Envelope packages for logistics and storage, coordinated with
                    foundations and utilities.
                  </p>
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__index">02</span>
                <div className="feature-list__body">
                  <h3>Production facilities</h3>
                  <p>
                    Industrial shells where process layout, access and services
                    drive structural decisions.
                  </p>
                </div>
              </div>
              <div className="feature-list__item">
                <span className="feature-list__index">03</span>
                <div className="feature-list__body">
                  <h3>Expansion & retrofit envelopes</h3>
                  <p>
                    Conversations about extending or upgrading industrial capacity
                    on active sites.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="media-panel reveal">
            <span>Industrial / PEB atmosphere — placeholder</span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container" style={{ maxWidth: "40rem" }}>
          <EnquiryForm variant="peb" defaultProjectType="PEB / industrial" />
        </div>
      </section>

      <CTABand
        title="Request a PEB discussion"
        text="Share clear height targets, plot constraints and timeline. Comparative method claims (PEB vs RCC) will be handled carefully with verified data only."
      />
    </div>
  );
}
