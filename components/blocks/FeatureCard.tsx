import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function FeatureCard({
  icon: Icon,
  title,
  body,
  dark,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border p-6 sm:p-7",
        dark
          ? "border-ink-border bg-ink-soft/60"
          : "border-ink/8 bg-white shadow-[0_1px_2px_rgba(13,19,33,0.05)]",
      )}
    >
      <span
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-lg",
          dark ? "bg-amber/15 text-amber-soft" : "bg-amber/12 text-amber-deep",
        )}
      >
        <Icon aria-hidden className="size-5" />
      </span>
      <h3 className="type-display-sub mt-4 text-lg">{title}</h3>
      <p
        className={cn(
          "mt-2.5 text-sm leading-relaxed",
          dark ? "text-slate-light" : "text-slate",
        )}
      >
        {body}
      </p>
    </div>
  );
}
