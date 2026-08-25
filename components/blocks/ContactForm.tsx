"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { contactSchema, serviceOptions, type ContactInput } from "@/lib/validation";
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

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const startedAt = useMemo(() => Date.now(), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: "", website: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      window.gtag?.("event", "generate_lead", {
        service: values.service,
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-xl border border-mint/40 bg-mint/8 p-6 sm:p-8"
      >
        <CheckCircle2 aria-hidden className="size-8 text-mint" />
        <p className="type-display-sub text-xl text-ink">
          Thank you. We&apos;ve received your inquiry and our team will get
          back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name" error={errors.name?.message}>
          <input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
            {...register("name")}
          />
        </Field>
        <Field
          label="Company / Business Name"
          htmlFor="company"
          optional
          error={errors.company?.message}
        >
          <input
            id="company"
            autoComplete="organization"
            placeholder="Your company"
            className={inputClass}
            {...register("company")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email Address"
          htmlFor="email"
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
            {...register("email")}
          />
        </Field>
        <Field
          label="Phone / WhatsApp"
          htmlFor="phone"
          optional
          error={errors.phone?.message}
        >
          <input
            id="phone"
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
        htmlFor="service"
        error={errors.service?.message}
      >
        <select
          id="service"
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
        htmlFor="message"
        error={errors.message?.message}
      >
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your business, your goals, and the platform you're interested in."
          className={cn(inputClass, "resize-y")}
          {...register("message")}
        />
      </Field>

      {/* Honeypot — hidden from humans, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
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
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            Sending
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
          </>
        ) : (
          <>
            Submit Inquiry
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
