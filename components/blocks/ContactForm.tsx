"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import {
  contactSchema,
  serviceOptions,
  type ContactInput,
  type LeadSource,
} from "@/lib/validation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const inputClass =
  "w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate/60 transition-colors focus:border-amber focus:outline-none";

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-baseline justify-between font-mono text-[0.65rem] font-semibold tracking-[0.14em] text-slate uppercase"
      >
        {label}
        {optional && (
          <span className="font-normal normal-case tracking-normal text-slate/70">
            optional
          </span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The one inquiry form, used on /contact and inside the consultation popup.
 *
 * - `source`   tags the lead ("contact" | "popup") for the email + GA event
 * - `compact`  tightens spacing for the popup
 * - `idPrefix` keeps input ids unique if two forms ever share a page
 * - `onSuccess` fires after the API accepts the inquiry
 * - `successActions` renders below the thank-you message (e.g. a Close button)
 */
export function ContactForm({
  source = "contact",
  compact = false,
  idPrefix,
  onSuccess,
  successActions,
  className,
}: {
  source?: LeadSource;
  compact?: boolean;
  idPrefix?: string;
  onSuccess?: (values: ContactInput) => void;
  successActions?: React.ReactNode;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const startedAt = useMemo(() => Date.now(), []);
  const id = (field: string) => (idPrefix ? `${idPrefix}-${field}` : field);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: "", website: "", marketingOptIn: false },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, startedAt }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      window.gtag?.("event", "generate_lead", {
        service: values.service,
        source,
        marketing_opt_in: values.marketingOptIn ? "yes" : "no",
      });
      onSuccess?.(values);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-start gap-4 rounded-xl border border-mint/40 bg-mint/8 p-6 sm:p-8",
          className,
        )}
      >
        <CheckCircle2 aria-hidden className="size-8 text-mint" />
        <p className="type-display-sub text-xl text-ink">
          Thank you. We&apos;ve received your inquiry and our team will get
          back to you shortly.
        </p>
        {successActions}
      </div>
    );
  }

  const gap = compact ? "gap-4" : "gap-5";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(compact ? "space-y-4" : "space-y-5", className)}
    >
      <div className={cn("grid sm:grid-cols-2", gap)}>
        <Field label="Full Name" htmlFor={id("name")} error={errors.name?.message}>
          <input
            id={id("name")}
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
            {...register("name")}
          />
        </Field>
        <Field
          label="Company / Business Name"
          htmlFor={id("company")}
          optional
          error={errors.company?.message}
        >
          <input
            id={id("company")}
            autoComplete="organization"
            placeholder="Your company"
            className={inputClass}
            {...register("company")}
          />
        </Field>
      </div>

      <div className={cn("grid sm:grid-cols-2", gap)}>
        <Field
          label="Email Address"
          htmlFor={id("email")}
          error={errors.email?.message}
        >
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
            {...register("email")}
          />
        </Field>
        <Field label="Phone" htmlFor={id("phone")} error={errors.phone?.message}>
          <input
            id={id("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            className={inputClass}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field
        label="Service Interested In"
        htmlFor={id("service")}
        error={errors.service?.message}
      >
        <select
          id={id("service")}
          className={cn(inputClass, "appearance-none")}
          {...register("service")}
        >
          <option value="" disabled>
            Select a service…
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message / Business Goals"
        htmlFor={id("message")}
        error={errors.message?.message}
      >
        <textarea
          id={id("message")}
          rows={compact ? 3 : 5}
          placeholder="Tell us about your business, your goals, and the platform you're interested in."
          className={cn(inputClass, "resize-y")}
          {...register("message")}
        />
      </Field>

      {/* Marketing consent — explicit, unchecked by default (CAN-SPAM / GDPR-safe) */}
      <label
        htmlFor={id("marketingOptIn")}
        className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink/10 bg-white/60 p-3.5 text-xs leading-relaxed text-slate transition-colors hover:border-ink/20"
      >
        <input
          id={id("marketingOptIn")}
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-amber"
          {...register("marketingOptIn")}
        />
        <span>
          Yes, send me e-commerce growth tips, marketplace updates, and offers
          from {site.name} by email. You can unsubscribe at any time. See our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-amber-deep underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {/* Honeypot — hidden from humans, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          Something went wrong sending your inquiry. Please try again, or
          email us directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-60",
          !compact && "sm:w-auto",
        )}
      >
        {status === "sending" ? (
          <>
            Sending
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
          </>
        ) : (
          <>
            {compact ? "Request My Consultation" : "Submit Inquiry"}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  );
}
