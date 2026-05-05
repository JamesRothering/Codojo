"use client";

import { useState } from "react";

export interface LeadFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

interface LeadCaptureFormProps {
  onSubmit: (values: LeadFormValues) => Promise<void>;
  disabled?: boolean;
}

const initial: LeadFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
};

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/** Accepts common formats; requires enough digits for a phone-like string */
function isValidPhone(v: string): boolean {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function LeadCaptureForm({ onSubmit, disabled }: LeadCaptureFormProps) {
  const [values, setValues] = useState<LeadFormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormValues, string>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(): boolean {
    const next: Partial<Record<keyof LeadFormValues, string>> = {};
    if (!values.firstName.trim()) next.firstName = "First name is required.";
    if (!values.lastName.trim()) next.lastName = "Last name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(values.email)) next.email = "Enter a valid email.";
    if (!values.phone.trim()) next.phone = "Phone is required.";
    else if (!isValidPhone(values.phone))
      next.phone = "Enter a valid phone number.";
    if (!values.company.trim()) next.company = "Company is required.";
    if (!values.role.trim()) next.role = "Role is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    "block w-full rounded-lg border border-surface-border bg-surface px-3 py-3 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <section
      className="rounded-xl border border-surface-border bg-surface p-6 shadow-card sm:p-8"
      aria-labelledby="lead-heading"
    >
      <h2
        id="lead-heading"
        className="text-lg font-semibold tracking-tight text-ink"
      >
        Get your full assessment summary and book a free initial consultation.
      </h2>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        {submitError && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            {submitError}
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-ink">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              value={values.firstName}
              onChange={(e) =>
                setValues((v) => ({ ...v, firstName: e.target.value }))
              }
              className={field}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1.5 text-xs text-red-700">
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-ink">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              value={values.lastName}
              onChange={(e) =>
                setValues((v) => ({ ...v, lastName: e.target.value }))
              }
              className={field}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-1.5 text-xs text-red-700">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className={field}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-700">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className={field}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-700">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
            Company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) =>
              setValues((v) => ({ ...v, company: e.target.value }))
            }
            className={field}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p id="company-error" className="mt-1.5 text-xs text-red-700">
              {errors.company}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-ink">
            Role
          </label>
          <input
            id="role"
            name="role"
            autoComplete="organization-title"
            value={values.role}
            onChange={(e) => setValues((v) => ({ ...v, role: e.target.value }))}
            className={field}
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
          />
          {errors.role && (
            <p id="role-error" className="mt-1.5 text-xs text-red-700">
              {errors.role}
            </p>
          )}
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={disabled || submitting}
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white shadow-card transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Get My Results"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-ink-faint">
            I&apos;ll review your results and reach out to schedule your free
            initial consultation.
          </p>
        </div>
      </form>
    </section>
  );
}
