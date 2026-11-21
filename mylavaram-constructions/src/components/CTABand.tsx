import { Link } from "react-router-dom";

type CTABandProps = {
  title: string;
  text: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
};

export function CTABand({
  title,
  text,
  primaryLabel = "Discuss Your Project",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
}: CTABandProps) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-group">
          <Link to={primaryTo} className="btn btn--primary">
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryTo ? (
            <Link to={secondaryTo} className="btn btn--secondary">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
