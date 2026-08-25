import {
  Store,
  PackageSearch,
  ScrollText,
  Boxes,
  Headset,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Depth diagram for the Why ECOM BAND section: the storefront is the
 * visible tip; beneath it, the layers of the operation ECOM BAND runs,
 * each hanging off the amber thread — the Band. Decorative; capability
 * labels only, no invented metrics.
 */

const STRATA: { icon: LucideIcon; label: string }[] = [
  { icon: PackageSearch, label: "Product Sourcing & Supply" },
  { icon: ScrollText, label: "Listings & Storefront Content" },
  { icon: Boxes, label: "Inventory & Fulfillment" },
  { icon: Headset, label: "Customer Support & Account Health" },
  { icon: TrendingUp, label: "Advertising & Growth" },
];

export function OperationStack({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("select-none", className)}>
      <div className="relative">
        {/* the Band, threading from the storefront down through the layers */}
        <span className="absolute top-6 bottom-4 left-4 w-px bg-gradient-to-b from-amber via-amber/40 to-transparent" />

        {/* the visible tip — what customers see */}
        <Reveal>
          <div className="relative z-10 flex w-fit items-center gap-3.5 rounded-xl bg-paper px-5 py-3.5 shadow-xl shadow-black/35">
            <span className="flex size-9 items-center justify-center rounded-lg bg-amber/15 text-amber-deep">
              <Store className="size-4.5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">
                Your Storefront
              </span>
              <span className="mt-0.5 block font-mono text-[0.58rem] font-medium tracking-[0.16em] text-slate uppercase">
                What customers see
              </span>
            </span>
          </div>
        </Reveal>

        {/* the layers — what runs underneath */}
        <div className="mt-5 space-y-2.5">
          {STRATA.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={0.08 + i * 0.07}>
              <div
                className="relative ml-9 flex items-center gap-3.5 rounded-xl border border-white/10 bg-ink-soft/60 px-4 py-3"
                style={{ opacity: 1 - i * 0.09 }}
              >
                {/* node on the thread + connector into the card */}
                <span className="absolute top-1/2 -left-[23px] size-[5px] -translate-y-1/2 rounded-full bg-amber" />
                <span className="absolute top-1/2 -left-5 h-px w-5 bg-gradient-to-r from-amber/50 to-white/10" />
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-amber-soft">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 truncate font-mono text-[0.62rem] font-medium tracking-[0.16em] text-paper/75 uppercase">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.48}>
        <p className="mt-5 ml-9 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] text-slate-light/80 uppercase">
          <span className="size-1.5 animate-pulse rounded-full bg-mint" />
          Run end-to-end by ECOM BAND
        </p>
      </Reveal>
    </div>
  );
}
