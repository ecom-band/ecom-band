import type { Platform } from "@/content/site";
import { platformAccent } from "@/lib/platform";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { cn } from "@/lib/cn";

/** Compact platform tag: official mark + name. */
export function PlatformBadge({
  platform,
  className,
}: {
  platform: Platform;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-ink/10 bg-paper-soft px-2.5 py-1.5 text-xs font-semibold text-slate",
        className,
      )}
    >
      <PlatformLogo
        platform={platform}
        className={cn("size-3.5 shrink-0", platformAccent[platform].logo)}
      />
      {platform}
    </span>
  );
}
