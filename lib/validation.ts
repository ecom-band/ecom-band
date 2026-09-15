import { z } from "zod";
import { services } from "@/content/services";

/** Dropdown options per requirements doc, Contact §2 — the nine services plus "Not Sure". */
export const serviceOptions = [...services.map((s) => s.name), "Not Sure"];

/** Where a lead was captured — surfaced in the notification email and GA. */
export const leadSources = ["contact", "popup"] as const;
export type LeadSource = (typeof leadSources)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .max(40),
  service: z
    .string()
    .refine((v) => serviceOptions.includes(v), "Please select a service."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about your business or goals.")
    .max(4000),
  /**
   * Explicit, unchecked-by-default consent to receive marketing email.
   * Only opted-in leads are added to the mailing list (see api/contact).
   */
  marketingOptIn: z.boolean().optional(),
  /** Which form captured the lead; defaults to the contact page. */
  source: z.enum(leadSources).optional(),
  /** Honeypot — must stay empty. Bots fill it, humans never see it. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Time trap — ms timestamp when the form was rendered. */
  startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
