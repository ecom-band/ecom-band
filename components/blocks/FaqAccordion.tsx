import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/** Native <details>/<summary> — accessible with zero JS. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white/60">
      {items.map((item) => (
        <details key={item.question} className="group px-4 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden
              className="size-4 shrink-0 text-slate transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-slate">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
