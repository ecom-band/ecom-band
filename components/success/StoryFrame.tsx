import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SuccessStory } from "@/content/success-stories";

/**
 * A dashboard screenshot in a "window" frame: chrome bar, watermark overlay,
 * sample badge for placeholders. `crop` fixes the frame to a portrait
 * aspect and anchors the image top-left (the homepage strip); otherwise the
 * image keeps its natural aspect (the gallery + lightbox).
 */
export function StoryFrame({
  story,
  crop = false,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw",
  className,
}: {
  story: SuccessStory;
  crop?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const landscape = story.width > story.height;
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_1px_2px_rgba(13,19,33,0.06),0_12px_32px_-16px_rgba(13,19,33,0.35)]",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-ink/8 bg-paper-soft/80 px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <i className="block size-2 rounded-full bg-ink/12" />
          <i className="block size-2 rounded-full bg-ink/12" />
          <i className="block size-2 rounded-full bg-ink/12" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[0.6rem] tracking-[0.12em] text-slate uppercase">
          {story.view}
        </span>
        <span aria-hidden className="w-7" />
      </div>

      <div
        className={cn(
          "relative overflow-hidden bg-[#f3f4f6]",
          crop && "aspect-[4/5]",
        )}
      >
        <Image
          src={story.src}
          alt={story.alt}
          width={story.width}
          height={story.height}
          sizes={sizes}
          priority={priority}
          unoptimized={story.src.endsWith(".svg")}
          className={cn(
            "block",
            crop
              ? landscape
                ? "h-full w-auto max-w-none!"
                : "h-full w-full object-cover object-top"
              : "h-auto w-full",
          )}
        />
        <span aria-hidden className="wm-overlay absolute inset-0" />
        {crop && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent"
          />
        )}
        {story.placeholder && (
          <span className="absolute top-2.5 right-2.5 rounded-md border border-amber/40 bg-paper/95 px-2 py-1 font-mono text-[0.55rem] font-semibold tracking-[0.18em] text-amber-deep uppercase shadow-sm">
            Sample
          </span>
        )}
      </div>
    </figure>
  );
}
