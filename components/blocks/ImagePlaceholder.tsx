import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Blueprint-style placeholder for an image that has not been supplied yet.
 *
 * Dotted frame, hatch ground, corner ticks, and a spec card that tells
 * whoever is sourcing imagery exactly what belongs here: subject, framing,
 * aspect ratio, and minimum size. Swap each instance for `next/image`
 * once the asset exists — the wrapper keeps the same box, so nothing
 * around it moves.
 */
export type ImageSpec = {
  /** Short label — what the image is, e.g. "Team photo". */
  title: string;
  /** What to shoot / source, framing notes, mood. */
  description: string;
  /** Aspect ratio as W/H, e.g. "16/9". Drives the box shape when no height is set. */
  aspect?: string;
  /** Minimum pixel size to supply, e.g. "1600 × 900". */
  minSize?: string;
  /** Free-form extra spec: "JPG/WebP", "no text overlay", etc. */
  format?: string;
};

export function ImagePlaceholder({
  spec,
  dark = false,
  compact = false,
  fill = false,
  minimal = false,
  align = "center",
  id,
  className,
}: {
  spec: ImageSpec;
  /** Dark (ink) surroundings — inverts the frame palette. */
  dark?: boolean;
  /** Tighter type + padding for small slots (cards, thumbnails). */
  compact?: boolean;
  /** Fill the parent (parent sets the size) instead of using `aspect`. */
  fill?: boolean;
  /** Backdrop mode: frame + hatch only, spec shrinks to a corner chip. */
  minimal?: boolean;
  /** Where the spec card sits — "top" when something overlaps the lower part. */
  align?: "center" | "top";
  /** Optional reference id shown in the corner tag, e.g. "IMG-07". */
  id?: string;
  className?: string;
}) {
  const aspect = spec.aspect ?? "16/9";

  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${spec.title}. ${spec.description}`}
      style={fill ? undefined : { aspectRatio: aspect }}
      className={cn(
        "relative isolate overflow-hidden rounded-xl border-2 border-dashed",
        fill && "h-full w-full",
        dark
          ? "border-amber/45 bg-ink-soft/60 text-paper"
          : "border-amber/60 bg-white/50 text-ink",
        className,
      )}
    >
      {/* hatch ground */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: dark
            ? "repeating-linear-gradient(135deg, rgba(239,169,74,0.10) 0 1px, transparent 1px 14px)"
            : "repeating-linear-gradient(135deg, rgba(224,141,38,0.14) 0 1px, transparent 1px 14px)",
        }}
      />
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: dark
            ? "linear-gradient(to right, rgba(239,169,74,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,169,74,0.16) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(13,19,33,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,19,33,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* diagonals — the classic "image goes here" cross */}
      <svg
        aria-hidden
        className={cn(
          "absolute inset-0 h-full w-full",
          dark ? "text-amber-soft/25" : "text-amber/35",
        )}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="currentColor"
          strokeWidth="0.35"
          strokeDasharray="1.2 1.2"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke="currentColor"
          strokeWidth="0.35"
          strokeDasharray="1.2 1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* corner ticks */}
      {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={cn(
              "absolute size-3.5 rounded-[2px]",
              dark ? "border-amber-soft/70" : "border-amber",
              pos,
            )}
          />
        ),
      )}

      {/* reference tag */}
      {!minimal && (
      <span
        aria-hidden
        className={cn(
          "absolute top-3 left-1/2 -translate-x-1/2 rounded-full border px-2.5 py-1 font-mono text-[0.55rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase",
          dark
            ? "border-amber/40 bg-ink/80 text-amber-soft"
            : "border-amber/50 bg-paper/95 text-amber-deep",
        )}
      >
        {compact ? (id ?? "Image") : `${id ? `${id} · ` : ""}Image placeholder`}
      </span>
      )}

      {/* minimal: one corner chip carries the brief */}
      {minimal && (
        <div
          className={cn(
            "absolute right-4 bottom-4 max-w-xs rounded-lg border px-3.5 py-2.5 text-left backdrop-blur-[2px] sm:right-6 sm:bottom-6",
            dark ? "border-amber/30 bg-ink/80" : "border-amber/50 bg-paper/92",
          )}
        >
          <p
            className={cn(
              "font-mono text-[0.55rem] font-semibold tracking-[0.2em] uppercase",
              dark ? "text-amber-soft" : "text-amber-deep",
            )}
          >
            {id ? `${id} · ` : ""}Backdrop image
          </p>
          <p className="type-display-sub mt-1 text-sm">{spec.title}</p>
          <p
            className={cn(
              "mt-1 text-[0.7rem] leading-snug",
              dark ? "text-slate-light" : "text-slate",
            )}
          >
            {spec.description}
          </p>
          <p
            className={cn(
              "mt-1.5 font-mono text-[0.55rem] tracking-[0.14em] uppercase",
              dark ? "text-amber-soft/80" : "text-amber-deep/90",
            )}
          >
            {aspect.replace("/", ":")}
            {spec.minSize ? ` · min ${spec.minSize}` : ""}
          </p>
        </div>
      )}

      {/* spec card */}
      {!minimal && (
      <div
        className={cn(
          "absolute inset-0 flex justify-center px-4 pt-10 pb-4 sm:px-6 sm:pt-11 sm:pb-6",
          align === "top" ? "items-start pt-12 sm:pt-14" : "items-center",
        )}
      >
        <div
          className={cn(
            "flex w-full max-w-sm flex-col items-center rounded-lg border text-center shadow-sm backdrop-blur-[2px]",
            compact ? "gap-1.5 px-3 py-3" : "gap-2.5 px-5 py-5",
            dark
              ? "border-white/10 bg-ink/85"
              : "border-ink/10 bg-paper/92",
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-md",
              compact ? "size-8" : "size-11",
              dark ? "bg-amber/15 text-amber-soft" : "bg-amber/12 text-amber-deep",
            )}
          >
            <ImageIcon aria-hidden className={compact ? "size-4" : "size-5"} />
          </span>
          <p
            className={cn(
              "type-display-sub",
              compact ? "text-sm" : "text-base sm:text-lg",
            )}
          >
            {spec.title}
          </p>
          <p
            className={cn(
              "leading-snug",
              compact ? "text-[0.7rem]" : "text-xs sm:text-[0.8rem]",
              dark ? "text-slate-light" : "text-slate",
            )}
          >
            {spec.description}
          </p>
          <p
            className={cn(
              "mt-0.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[0.58rem] tracking-[0.14em] uppercase",
              dark ? "text-amber-soft/80" : "text-amber-deep/90",
            )}
          >
            <span>{aspect.replace("/", ":")}</span>
            {spec.minSize && !compact && (
              <>
                <span aria-hidden>·</span>
                <span>min {spec.minSize}</span>
              </>
            )}
            {spec.format && !compact && (
              <>
                <span aria-hidden>·</span>
                <span>{spec.format}</span>
              </>
            )}
          </p>
        </div>
      </div>
      )}
    </div>
  );
}
