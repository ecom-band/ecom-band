"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { SuccessStory } from "@/content/success-stories";
import { storiesDisclosure } from "@/content/success-stories";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { platformAccent } from "@/lib/platform";

/**
 * Full-screen viewer for a list of stories. Keyboard: ← → navigate, Esc
 * closes. Locks page scroll while open.
 */
export function StoryLightbox({
  stories,
  index,
  onClose,
  onIndex,
}: {
  stories: SuccessStory[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const i = index ?? 0;
  const story = open ? stories[i] : null;
  const count = stories.length;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && count > 1) onIndex((i + 1) % count);
      if (e.key === "ArrowLeft" && count > 1)
        onIndex((i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, i, count, onClose, onIndex]);

  return (
    <AnimatePresence>
      {story && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${story.title} — ${story.platform}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/92 backdrop-blur-md"
          onClick={onClose}
        >
          {/* top bar */}
          <div
            className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/8">
                <PlatformLogo
                  platform={story.platform}
                  className={`size-4 ${platformAccent[story.platform].logoDark}`}
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-paper">
                  {story.title}
                </p>
                <p className="truncate font-mono text-[0.6rem] tracking-[0.14em] text-slate-light uppercase">
                  {story.platform} · {story.period}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {count > 1 && (
                <span className="hidden font-mono text-xs text-slate-light sm:block">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </span>
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-10 items-center justify-center rounded-md border border-white/15 text-paper transition-colors hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
            {count > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndex((i - 1 + count) % count);
                  }}
                  className="absolute top-1/2 left-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-paper transition-colors hover:bg-white/10 sm:left-4"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndex((i + 1) % count);
                  }}
                  className="absolute top-1/2 right-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-paper transition-colors hover:bg-white/10 sm:right-4"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={story.id}
                initial={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
                transition={{ duration: 0.22, ease: [0.21, 0.6, 0.35, 1] }}
                className="relative max-h-full max-w-full overflow-hidden rounded-xl bg-white shadow-2xl"
                style={{ aspectRatio: `${story.width} / ${story.height}` }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={story.src}
                  alt={story.alt}
                  width={story.width}
                  height={story.height}
                  sizes="100vw"
                  unoptimized={story.src.endsWith(".svg")}
                  className="block h-auto max-h-[calc(100dvh-9.5rem)] w-auto max-w-full"
                />
                <span aria-hidden className="wm-overlay absolute inset-0" />
                {story.placeholder && (
                  <span className="absolute top-3 right-3 rounded-md border border-amber/40 bg-paper/95 px-2 py-1 font-mono text-[0.55rem] font-semibold tracking-[0.18em] text-amber-deep uppercase">
                    Sample
                  </span>
                )}
              </motion.figure>
            </AnimatePresence>
          </div>

          <p
            className="px-6 pb-4 text-center text-[0.7rem] leading-relaxed text-slate-light/80"
            onClick={(e) => e.stopPropagation()}
          >
            {storiesDisclosure}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
