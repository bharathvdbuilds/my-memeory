import { useState } from "react";
import type { FormEvent } from "react";

export type EnquiryVariant =
  | "construction"
  | "peb"
  | "architecture"
  | "material"
  | "jv"
  | "general";

const variantCopy: Record<
  EnquiryVariant,
  { title: string; intro: string; submit: string }
> = {
  general: {
    title: "Project enquiry",
    intro: "Share the essentials and we will follow up to clarify scope.",
    submit: "Send enquiry",
  },
  construction: {
    title: "Construction enquiry",
    intro: "Tell us about your civil or commercial construction requirement.",
    submit: "Request construction discussion",
  },
  peb: {
    title: "PEB & industrial enquiry",
    intro: "Outline shed, warehouse or industrial envelope needs.",
    submit: "Request PEB discussion",
  },
  architecture: {
    title: "Architecture enquiry",
    intro:
      "Describe design collaboration needs. We will clarify partner-led vs coordinated delivery after review.",
    submit: "Request design conversation",
  },
  material: {
    title: "Become a material partner",
    intro: "Introduce your brand category, coverage and collaboration interest.",
    submit: "Submit partnership interest",
  },
  jv: {
    title: "Development partnership enquiry",
    intro:
      "Share land, programme or partnership context. No returns or deal outcomes are promised via this form.",
    submit: "Discuss a development partnership",
  },
};

const projectTypes = [
  "Civil construction",
  "Commercial construction",
  "PEB / industrial",
  "Architecture & design",
  "Material partnership",
  "Joint venture / development",
  "Other / not sure",
];

type EnquiryFormProps = {
  variant?: EnquiryVariant;
  defaultProjectType?: string;
};

export function EnquiryForm({
  variant = "general",
  defaultProjectType,
}: EnquiryFormProps) {
  const copy = variantCopy[variant];
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form__success" role="status">
        <strong>Enquiry captured locally.</strong>
        <p>
          This demo form does not send data to a server yet. Connect it to your
          preferred endpoint or CRM before launch.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div>
        <h3>{copy.title}</h3>
        <p className="form__note">{copy.intro}</p>
      </div>

      <div className="form__row form__row--2">
        <div className="form-field">
          <label htmlFor={`${variant}-name`}>Full name</label>
          <input id={`${variant}-name`} name="name" type="text" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor={`${variant}-org`}>Organisation</label>
          <input id={`${variant}-org`} name="organisation" type="text" autoComplete="organization" />
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="form-field">
          <label htmlFor={`${variant}-email`}>Email</label>
          <input
            id={`${variant}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="form-field">
          <label htmlFor={`${variant}-phone`}>Phone</label>
          <input
            id={`${variant}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="form-field">
          <label htmlFor={`${variant}-type`}>Project type</label>
          <select
            id={`${variant}-type`}
            name="projectType"
            required
            defaultValue={defaultProjectType ?? ""}
          >
            <option value="" disabled>
              Select type
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor={`${variant}-location`}>Location</label>
          <input id={`${variant}-location`} name="location" type="text" required />
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="form-field">
          <label htmlFor={`${variant}-size`}>Approx. size / scale</label>
          <input
            id={`${variant}-size`}
            name="size"
            type="text"
            placeholder="e.g. built-up area, plot size, shed span"
          />
        </div>
        <div className="form-field">
          <label htmlFor={`${variant}-budget`}>Budget band</label>
          <select id={`${variant}-budget`} name="budget" defaultValue="">
            <option value="" disabled>
              Select band
            </option>
            <option>To be discussed</option>
            <option>Under ₹1 Cr</option>
            <option>₹1–5 Cr</option>
            <option>₹5–15 Cr</option>
            <option>₹15 Cr+</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${variant}-timeline`}>Timeline</label>
        <select id={`${variant}-timeline`} name="timeline" defaultValue="">
          <option value="" disabled>
            Select timeline
          </option>
          <option>Exploring / research</option>
          <option>0–3 months</option>
          <option>3–6 months</option>
          <option>6–12 months</option>
          <option>12+ months</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor={`${variant}-message`}>Project notes</label>
        <textarea
          id={`${variant}-message`}
          name="message"
          placeholder="Scope, constraints, drawings status, or partnership context"
        />
      </div>

      <p className="form__note">
        Submitting this form does not create a contract or guarantee availability.
        Placeholder contact channels will be replaced with verified details before launch.
      </p>

      <button type="submit" className="btn btn--dark">
        {copy.submit}
      </button>
    </form>
  );
}
