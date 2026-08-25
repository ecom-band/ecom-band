import { cn } from "@/lib/cn";
import type { Platform } from "@/content/site";
import { platformAccent } from "@/lib/platform";
import { PlatformLogo } from "@/components/brand/PlatformLogo";

/**
 * The hero visual — the Band rendered as a tilted conveyor of operation
 * tickets flowing at different speeds and directions. Pure CSS animation;
 * rows pause under prefers-reduced-motion (globals.css).
 * Labels are capabilities only — no invented order numbers or metrics.
 * The final row carries the five marketplaces with their official marks.
 */

type Tone = "amber" | "mint" | "neutral";
type Ticket = { label: string; tone: Tone; platform?: Platform };

const ROWS: Ticket[][] = [
  [
    { label: "Product Sourcing", tone: "amber" },
    { label: "Supplier Vetting", tone: "neutral" },
    { label: "Listing Optimization", tone: "mint" },
    { label: "Inventory Planning", tone: "neutral" },
  ],
  [
    { label: "FBA Fulfillment", tone: "amber" },
    { label: "Order Management", tone: "neutral" },
    { label: "Customer Support", tone: "mint" },
    { label: "Advertising", tone: "neutral" },
  ],
  [
    { label: "Account Health", tone: "amber" },
    { label: "Multi-Channel Growth", tone: "mint" },
    { label: "Marketplace Compliance", tone: "neutral" },
    { label: "Performance Monitoring", tone: "neutral" },
  ],
  [
    { label: "Amazon", tone: "neutral", platform: "Amazon" },
    { label: "Shopify", tone: "neutral", platform: "Shopify" },
    { label: "Walmart", tone: "neutral", platform: "Walmart" },
    { label: "eBay", tone: "neutral", platform: "eBay" },
    { label: "TikTok Shop", tone: "neutral", platform: "TikTok Shop" },
  ],
];

const dotTone: Record<Tone, string> = {
  amber: "bg-amber",
  mint: "bg-mint",
  neutral: "bg-slate-light",
};

function TicketRun({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="flex shrink-0 items-center gap-3.5 pr-3.5">
      {tickets.map((t) => (
        <span
          key={t.label}
          className="flex shrink-0 items-center gap-2.5 rounded-lg border border-white/12 bg-ink-soft/90 px-4.5 py-3 font-mono text-[0.72rem] font-medium tracking-[0.12em] text-paper/80 uppercase shadow-lg shadow-black/20"
        >
          {t.platform ? (
            <PlatformLogo
              platform={t.platform}
              className={cn(
                "size-4 shrink-0",
                platformAccent[t.platform].logoDark,
              )}
            />
          ) : (
            <span
              aria-hidden
              className={cn("size-1.5 rounded-full", dotTone[t.tone])}
            />
          )}
          {t.label}
        </span>
      ))}
    </div>
  );
}

export function BandConveyor({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative select-none", className)}>
      {/* warm glow behind the conveyor */}
      <div className="absolute -inset-x-20 -inset-y-16 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(224,141,38,0.16),transparent_70%)]" />

      <div className="relative -rotate-6 space-y-3.5 [mask-image:linear-gradient(to_right,transparent,black_26%,black_78%,transparent)]">
        {ROWS.map((tickets, i) => (
          <div key={i} className="overflow-hidden">
            <div
              className={cn(
                "band-row flex w-max",
                i % 2 === 1 && "band-row-reverse",
              )}
              style={
                { "--row-speed": `${[46, 62, 54, 70][i]}s` } as React.CSSProperties
              }
            >
              <TicketRun tickets={tickets} />
              <TicketRun tickets={tickets} />
              <TicketRun tickets={tickets} />
            </div>
          </div>
        ))}
      </div>

      {/* status caption pinned under the conveyor */}
      <p className="relative mt-7 flex items-center justify-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-slate-light/80 uppercase">
        <span className="size-1.5 animate-pulse rounded-full bg-mint" />
        The operation, running
      </p>
    </div>
  );
}
