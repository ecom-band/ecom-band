"use client";

import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SuccessStory } from "@/content/success-stories";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { platformAccent } from "@/lib/platform";
import { StoryFrame } from "./StoryFrame";

export function StoryCard({
  story,
  crop = false,
  dark = false,
  onOpen,
  className,
}: {
  story: SuccessStory;
  crop?: boolean;
  dark?: boolean;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <article className={cn("group flex flex-col", className)}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open screenshot: ${story.title} on ${story.platform}`}
        className="relative block w-full cursor-zoom-in rounded-xl text-left transition-transform duration-300 ease-out group-hover:-translate-y-1"
      >
        <StoryFrame story={story} crop={crop} />
        {/* hover affordance */}
        <span
          aria-hidden
          className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-md bg-ink/85 text-paper opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="size-3.5" />
        </span>
      </button>

      <div className="mt-3.5 flex items-start gap-3 px-0.5">
        <span
          className={cn(
            "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md",
            dark ? "bg-white/8" : platformAccent[story.platform].tile,
          )}
        >
          <PlatformLogo
            platform={story.platform}
            className={cn(
              "size-3.5",
              dark
                ? platformAccent[story.platform].logoDark
                : platformAccent[story.platform].logo,
            )}
          />
        </span>
        <div className="min-w-0">
          <h3
            className={cn(
              "type-display-sub text-[0.95rem] leading-snug",
              dark ? "text-paper" : "text-ink",
            )}
          >
            {story.title}
          </h3>
          <p
            className={cn(
              "mt-1 truncate font-mono text-[0.6rem] tracking-[0.14em] uppercase",
              dark ? "text-slate-light/80" : "text-slate",
            )}
          >
            {story.period}
          </p>
        </div>
      </div>
    </article>
  );
}
