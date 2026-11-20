import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EnquiryForm, type EnquiryVariant } from "../components/EnquiryForm";
import { PageHero } from "../components/PageHero";
import { contactPlaceholders } from "../data/nav";
import { useReveal } from "../hooks/useReveal";

const intentMap: Record<string, EnquiryVariant> = {
  construction: "construction",
  peb: "peb",
  architecture: "architecture",
  material: "material",
  jv: "jv",
};

export function Contact() {
  const revealRef = useReveal<HTMLDivElement>();
  const [params] = useSearchParams();
  const variant = useMemo<EnquiryVariant>(() => {
    const intent = params.get("intent");
    if (intent && intent in intentMap) return intentMap[intent];
    return "general";
  }, [params]);

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Contact"
        title="Discuss your project or partnership"
        lead="Use the enquiry form for construction, PEB, architecture, material partnership or JV conversations. Phone, email and WhatsApp below are clearly marked placeholders until verified."
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <EnquiryForm variant={variant} />
          </div>
          <div className="reveal">
            <h2>Direct channels</h2>
            <dl className="contact-details">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={contactPlaceholders.phoneHref}>
                    {contactPlaceholders.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a
                    href={contactPlaceholders.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contactPlaceholders.whatsappDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={contactPlaceholders.emailHref}>
                    {contactPlaceholders.emailDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>{contactPlaceholders.address}</dd>
              </div>
            </dl>
            <p className="placeholder-note">{contactPlaceholders.note}</p>

            <h3 style={{ marginTop: "2rem" }}>Map</h3>
            <div className="map-placeholder" role="img" aria-label="Map placeholder">
              <div>
                <strong>Map placeholder</strong>
                <p>Embed Google Maps or equivalent once the verified address is confirmed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">Other enquiry paths</p>
            <h2>Jump to a focused form variant</h2>
          </div>
          <div className="grid-3">
            {(
              [
                ["construction", "Construction"],
                ["peb", "PEB & industrial"],
                ["architecture", "Architecture"],
                ["material", "Material partnership"],
                ["jv", "Joint venture"],
              ] as const
            ).map(([key, label]) => (
              <Link
                key={key}
                to={`/contact?intent=${key}`}
                className="link-arrow reveal"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
