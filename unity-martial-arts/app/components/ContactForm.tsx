"use client";

import { FormEvent, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

type Fields = {
  name: string;
  phone: string;
  email: string;
  age: string;
  message: string;
};

const empty: Fields = { name: "", phone: "", email: "", age: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [done, setDone] = useState<Fields | null>(null);

  function update(key: keyof Fields, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(input: Fields) {
    const next: Partial<Fields> = {};
    if (!input.name.trim()) next.name = "Enter your name.";
    if (!/^[0-9+()\-\s]{8,}$/.test(input.phone.trim())) {
      next.phone = "Enter a phone number.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
      next.email = "Enter an email address.";
    }
    if (!input.age) next.age = "Choose an age group.";
    if (input.message.trim().length < 2) next.message = "Add a short message.";
    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setDone(values);
  }

  if (done) {
    return (
      <div className="form-success" role="status">
        <p className="eyebrow">Enquiry ready</p>
        <h3>Thank you, {done.name.trim()}.</h3>
        <p>
          Your enquiry is confirmed on this page. Send it to the club on
          WhatsApp, or call {PHONE_DISPLAY}, and they will share class details.
        </p>
        <dl className="summary">
          <div>
            <dt>Phone</dt>
            <dd>{done.phone.trim()}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{done.email.trim()}</dd>
          </div>
          <div>
            <dt>Age group</dt>
            <dd>{done.age}</dd>
          </div>
          <div>
            <dt>Message</dt>
            <dd>{done.message.trim()}</dd>
          </div>
        </dl>
        <a className="btn btn-red" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Send on WhatsApp
        </a>
        <a className="btn btn-blue" href={PHONE_TEL}>
          Call {PHONE_DISPLAY}
        </a>
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            setDone(null);
            setValues(empty);
            setErrors({});
          }}
        >
          Write another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <Field id="name" label="Name" error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={(event) => update("name", event.target.value)}
        />
      </Field>
      <Field id="phone" label="Phone" error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          onChange={(event) => update("phone", event.target.value)}
        />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(event) => update("email", event.target.value)}
        />
      </Field>
      <Field id="age" label="Age group" error={errors.age}>
        <select
          id="age"
          name="age"
          value={values.age}
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? "age-error" : undefined}
          onChange={(event) => update("age", event.target.value)}
        >
          <option value="">Select age group</option>
          <option>Kids</option>
          <option>Teenagers</option>
          <option>Adults</option>
        </select>
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>
      <button className="btn btn-red" type="submit">
        Submit enquiry
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={error ? "field invalid" : "field"}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
