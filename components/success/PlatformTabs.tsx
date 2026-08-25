"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import type { Platform } from "@/content/site";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { platformAccent } from "@/lib/platform";

type Tab = { key: string; label: string; platform?: Platform; count: number };

/**
 * Segmented platform switcher. The active pill slides between tabs
 * (shared-layout animation). Horizontally scrollable on narrow screens.
 */
export function PlatformTabs({
  tabs,
  active,
  onChange,
  dark = false,
  layoutId = "platform-tab",
  className,
}: {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
  dark?: boolean;
  layoutId?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);

  // Keep the active pill visible when the strip overflows (narrow screens):
  // scroll-spy can flip `active` to a tab that sits off-screen, so nudge the
  // strip — never the page — to center it.
  useEffect(() => {
    const wrap = scroller.current;
    if (!wrap || wrap.scrollWidth <= wrap.clientWidth + 1) return;
    const btn = wrap.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!btn) return;
    const target =
      btn.offsetLeft - wrap.clientWidth / 2 + btn.offsetWidth / 2;
    wrap.scrollTo({
      left: Math.max(0, target),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  return (
    <div
      ref={scroller}
      role="tablist"
      aria-label="Filter by platform"
      className={cn(
        "no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 min-[400px]:-mx-5 min-[400px]:px-5 sm:mx-0 sm:justify-center sm:px-0",
        // soft edge fades hint at more tabs off-screen; removed once centered (sm+)
        "[mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%-1.25rem),transparent)] sm:[mask-image:none]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-1 rounded-xl p-1",
          dark ? "bg-white/6 ring-1 ring-white/10" : "bg-ink/5 ring-1 ring-ink/8",
        )}
      >
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              data-tab={t.key}
              aria-selected={isActive}
              onClick={() => onChange(t.key)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 sm:px-4",
                isActive
                  ? dark
                    ? "text-ink"
                    : "text-paper"
                  : dark
                    ? "text-slate-light hover:text-paper"
                    : "text-slate hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  aria-hidden
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 36 }
                  }
                  className={cn(
                    "absolute inset-0 rounded-lg shadow-md",
                    dark ? "bg-paper" : "bg-ink",
                  )}
                />
              )}
              <span className="relative flex items-center gap-2">
                {t.platform && (
                  <PlatformLogo
                    platform={t.platform}
                    className={cn(
                      "size-3.5",
                      isActive
                        ? t.platform === "TikTok Shop"
                          ? dark
                            ? "text-ink"
                            : "text-paper"
                          : platformAccent[t.platform].logo
                        : "opacity-70",
                    )}
                  />
                )}
                {t.label}
                <span
                  className={cn(
                    "font-mono text-[0.6rem] font-medium tabular-nums",
                    isActive ? "opacity-60" : "opacity-50",
                  )}
                >
                  {t.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
