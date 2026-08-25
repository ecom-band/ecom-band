import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";

/**
 * Floating WhatsApp CTA (requirements doc §9).
 * Renders nothing until the number is confirmed in content/site.ts.
 */
export function WhatsAppWidget() {
  if (!site.whatsapp.display || !site.whatsapp.value) return null;

  const number = site.whatsapp.value.replace(/[^\d]/g, "");

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ECOM BAND on WhatsApp"
      className="fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex size-13 items-center justify-center rounded-full bg-mint text-paper shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <MessageCircle aria-hidden className="size-6" />
    </a>
  );
}
