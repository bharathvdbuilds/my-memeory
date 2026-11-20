import { contactPlaceholders } from "../data/nav";

export function StickyMobileCTA() {
  return (
    <div className="sticky-cta" role="navigation" aria-label="Quick contact">
      <a className="sticky-cta__call" href={contactPlaceholders.phoneHref}>
        Call
        <span className="sr-only"> ({contactPlaceholders.phoneDisplay})</span>
      </a>
      <a
        className="sticky-cta__wa"
        href={contactPlaceholders.whatsappHref}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
        <span className="sr-only"> ({contactPlaceholders.whatsappDisplay})</span>
      </a>
    </div>
  );
}
