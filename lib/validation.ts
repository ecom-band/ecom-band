import { z } from "zod";
import { services } from "@/content/services";

/** Dropdown options per requirements doc, Contact §2 — the nine services plus "Not Sure". */
export const serviceOptions = [...services.map((s) => s.name), "Not Sure"];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z
    .string()
    .refine((v) => serviceOptions.includes(v), "Please select a service."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about your business or goals.")
    .max(4000),
  /** Honeypot — must stay empty. Bots fill it, humans never see it. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Time trap — ms timestamp when the form was rendered. */
  startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
