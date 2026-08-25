import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Clean wordmark per requirements doc §3.1.
 * Swap this component (or drop SVGs into /public/brand) when the
 * official logo files arrive — nothing else references the mark.
 */
export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ECOM BAND — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      {/* band glyph */}
      <span aria-hidden className="flex flex-col gap-[3px]">
        <span className="h-[3px] w-6 rounded-full bg-amber transition-transform duration-300 group-hover:translate-x-0.5" />
        <span
          className={cn(
            "h-[3px] w-6 rounded-full",
            dark ? "bg-paper" : "bg-ink",
          )}
        />
        <span className="h-[3px] w-4 rounded-full bg-amber transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span
        className={cn(
          "type-display text-lg tracking-tight",
          dark ? "text-paper" : "text-ink",
        )}
      >
        ECOM&nbsp;BAND
      </span>
    </Link>
  );
}
