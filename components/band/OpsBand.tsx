import { cn } from "@/lib/cn";

/**
 * The signature element — "the Band".
 * A continuous stream of operation tickets flowing along a rail,
 * representing the pipeline ECOM BAND runs behind every storefront.
 * Pure CSS animation (paused by prefers-reduced-motion via globals.css).
 * Labels are capabilities only — no invented order numbers or metrics.
 */

const TICKETS: { label: string; tone: "amber" | "mint" | "neutral" }[] = [
  { label: "Product Sourcing", tone: "amber" },
  { label: "Supplier Vetting", tone: "neutral" },
  { label: "Listing Optimization", tone: "mint" },
  { label: "Inventory Planning", tone: "neutral" },
  { label: "FBA Fulfillment", tone: "amber" },
  { label: "Order Management", tone: "neutral" },
  { label: "Customer Support", tone: "mint" },
  { label: "Advertising", tone: "neutral" },
  { label: "Account Health", tone: "amber" },
  { label: "Multi-Channel Growth", tone: "mint" },
];

const dotTone = {
  amber: "bg-amber",
  mint: "bg-mint",
  neutral: "bg-slate-light",
};

function TicketRow() {
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4">
      {TICKETS.map((t) => (
        <span
          key={t.label}
          className="flex shrink-0 items-center gap-2.5 rounded-md border border-ink-border bg-ink-soft/80 px-4 py-2.5 font-mono text-[0.7rem] font-medium tracking-[0.12em] text-paper/75 uppercase"
        >
          <span
            aria-hidden
            className={cn("size-1.5 rounded-full", dotTone[t.tone])}
          />
          {t.label}
        </span>
      ))}
    </div>
  );
}

export function OpsBand({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative select-none", className)}>
      {/* the rail */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-ink-border to-transparent" />
      <div className="relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="band-marquee flex w-max animate-band-flow">
          <TicketRow />
          <TicketRow />
        </div>
      </div>
    </div>
  );
}
