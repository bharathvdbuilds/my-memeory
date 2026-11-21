import { Link } from "react-router-dom";
import { CTABand } from "../components/CTABand";
import { EnquiryForm } from "../components/EnquiryForm";
import { PageHero } from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";

export function Civil() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Civil Construction"
        title="Civil packages planned for durable site performance"
        lead="From site development and structural civil works to coordinated packages that keep drainage, access and foundations aligned with the wider programme."
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <h2>Where civil conversations typically start</h2>
            <ul className="why-list" style={{ gridTemplateColumns: "1fr" }}>
              <li>
                <h3>Site development</h3>
                <p>Grading, access, utilities coordination and enabling works.</p>
              </li>
              <li>
                <h3>Structural civil packages</h3>
                <p>RCC and structural scopes framed around buildability and QA checkpoints.</p>
              </li>
              <li>
                <h3>Infrastructure support</h3>
                <p>Roads, drainage and related civil elements as programme requires.</p>
              </li>
            </ul>
            <p>
              Looking for commercial shells or PEB envelopes instead? See{" "}
              <Link to="/commercial-construction" className="link-arrow">
                Commercial
              </Link>{" "}
              or{" "}
              <Link to="/peb-industrial" className="link-arrow">
                PEB & Industrial
              </Link>
              .
            </p>
          </div>
          <div className="media-panel reveal">
            <span>Civil works imagery — placeholder</span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container" style={{ maxWidth: "40rem" }}>
          <EnquiryForm variant="construction" defaultProjectType="Civil construction" />
        </div>
      </section>

      <CTABand
        title="Discuss a civil construction scope"
        text="Share location, approximate scale and timeline so we can prepare clarifying questions."
      />
    </div>
  );
}
