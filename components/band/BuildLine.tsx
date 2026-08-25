"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Check, Package } from "lucide-react";
import { processSteps } from "@/content/process";
import { stationImages } from "@/content/images";
import { ImagePlaceholder } from "@/components/blocks/ImagePlaceholder";
import { cn } from "@/lib/cn";

/**
 * The How It Works page rendered as a vertical run of the Band.
 * The carrier crate from the homepage rail rides down a treaded belt as
 * the visitor scrolls; each station is a work-order docket whose status
 * flips QUEUED → IN PROGRESS → COMPLETE as the carrier passes, and the
 * run ends at a terminal "band output" node that lights when finished.
 * Collapses to a fully-lit static rail under prefers-reduced-motion.
 */

/** Micro-labels for each station's point list — the docket's line items. */
const DOCKETS = [
  "Discovery checklist",
  "Models on the table",
  "Launch scope",
  "Ongoing operations",
  "Growth levers",
];

type Status = "queued" | "active" | "done";

const STATUS_CHIP: Record<
  Status,
  { label: string; chip: string; dot: string }
> = {
  queued: {
    label: "Queued",
    chip: "border-ink/15 text-slate",
    dot: "bg-slate-light",
  },
  active: {
    label: "In progress",
    chip: "border-amber/45 bg-amber/10 text-amber-deep",
    dot: "animate-pulse bg-amber",
  },
  done: {
    label: "Complete",
    // mint darkened for AA on white; the token is tuned for dark grounds
    chip: "border-mint/35 bg-mint/10 text-[#1e7550]",
    dot: "bg-mint",
  },
};

export function BuildLine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Carrier position along the belt, scrubbed by scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.78", "end 0.68"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const carrierTop = useTransform(progress, (v) => `${v * 100}%`);
  // The crate leans against its direction of travel, like real cargo
  const tilt = useSpring(
    useTransform(useVelocity(progress), [-1.6, 1.6], [-8, 8]),
    { stiffness: 320, damping: 22 },
  );

  // Station the carrier has reached — measured against the crate's actual
  // position on the rail, so a station lights the moment the crate hits it
  const listRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);
  const [shipped, setShipped] = useState(false);
  useMotionValueEvent(progress, "change", (v) => {
    setShipped(v > 0.955);
    const wrap = ref.current;
    const list = listRef.current;
    if (!wrap || !list) return;
    const wrapRect = wrap.getBoundingClientRect();
    // rail spans top-4/5 → bottom-5 of the wrapper
    const carrierY = 18 + v * (wrapRect.height - 18 - 20);
    let r = -1;
    for (let i = 0; i < list.children.length; i++) {
      const liTop =
        list.children[i].getBoundingClientRect().top - wrapRect.top;
      if (carrierY >= liTop + 12) r = i;
    }
    setReached(r);
  });

  const lit = (i: number) => reduced || i <= reached;
  const statusOf = (i: number): Status =>
    shipped || i < reached ? "done" : i === reached ? "active" : "queued";

  return (
    <div ref={ref} className="relative">
      {/* ===== the vertical band: hairline, tread, amber fill, carrier ===== */}
      <div
        aria-hidden
        className="absolute bottom-5 left-[15px] top-4 w-px bg-ink/15 sm:left-[19px] sm:top-5"
      />
      <div
        aria-hidden
        className="absolute bottom-5 left-[11px] top-4 w-[9px] opacity-45 [mask-image:linear-gradient(to_bottom,black_92%,transparent)] [background-image:repeating-linear-gradient(180deg,rgba(13,19,33,0.14)_0,rgba(13,19,33,0.14)_1px,transparent_1px,transparent_10px)] sm:left-[15px] sm:top-5"
      />
      <motion.div
        aria-hidden
        className="absolute bottom-5 left-[14px] top-4 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber/60 to-amber sm:left-[18px] sm:top-5"
        style={{ scaleY: reduced ? 1 : progress }}
      />

      {/* the carrier — the client's business, moving down the band */}
      {!reduced && (
        <div
          aria-hidden
          className="absolute bottom-5 left-[15.5px] top-4 select-none sm:left-[19.5px] sm:top-5"
        >
          <motion.div className="absolute z-10" style={{ top: carrierTop }}>
            {/* the crate is "delivered" into the terminal node at the end */}
            <motion.span
              style={{ rotate: tilt }}
              animate={{ opacity: shipped ? 0 : 1, scale: shipped ? 0.5 : 1 }}
              transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
              className="flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-ink text-amber shadow-lg shadow-ink/30 sm:size-9"
            >
              <Package className="size-4" />
            </motion.span>
          </motion.div>
        </div>
      )}

      {/* ===== the five stations ===== */}
      <ol ref={listRef} className="space-y-10 md:space-y-14">
        {processSteps.map((step, i) => {
          const status = statusOf(i);
          const chip = STATUS_CHIP[status];
          return (
            <li key={step.number} className="relative pl-12 sm:pl-16">
              {/* station node on the rail */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-0 flex size-8 items-center justify-center rounded-full border-2 font-mono text-[0.65rem] font-bold transition-all duration-500 sm:size-10 sm:text-[0.7rem]",
                  lit(i)
                    ? "border-amber bg-amber text-ink shadow-md shadow-amber/40"
                    : "scale-90 border-ink/20 bg-paper text-slate",
                  !reduced && status === "active" && "ring-4 ring-amber/20",
                )}
              >
                {step.number}
              </span>
              {/* tick connecting the node to its docket */}
              <span
                aria-hidden
                className="absolute left-8 top-4 h-px w-4 bg-ink/15 sm:left-10 sm:top-5 sm:w-6"
              />

              {/* the work-order docket */}
              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.21, 0.6, 0.35, 1] }}
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-xl border bg-white/75 transition-all duration-500",
                    lit(i)
                      ? "border-ink/10 opacity-100 shadow-[0_1px_2px_rgba(13,19,33,0.05)]"
                      : "border-ink/10 opacity-45",
                    !reduced &&
                      status === "active" &&
                      "border-amber/45 shadow-lg shadow-amber/10",
                  )}
                >
                  {/* docket header — perforated strip with live status */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-dashed border-ink/15 px-5 py-3 sm:px-7">
                    <p className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] uppercase">
                      <span className="text-amber-deep">
                        Station {step.number}
                      </span>
                      <span className="text-slate"> — {step.name}</span>
                    </p>
                    {!reduced && (
                      <span
                        aria-hidden
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-500",
                          chip.chip,
                        )}
                      >
                        <span
                          className={cn("size-1.5 rounded-full", chip.dot)}
                        />
                        {chip.label}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-7 px-5 py-6 sm:px-7 sm:py-7 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
                    <div>
                      {/* IMG-08…12 — one environmental shot per station */}
                      <ImagePlaceholder
                        spec={stationImages[i]}
                        id={`IMG-${String(8 + i).padStart(2, "0")}`}
                        compact
                        className="mb-6"
                      />
                      <h2 className="type-display-sub text-xl min-[400px]:text-2xl sm:text-[1.65rem]">
                        {step.heading}
                      </h2>
                      <p className="mt-3.5 leading-relaxed text-slate">
                        {step.body}
                      </p>
                    </div>
                    <div className="lg:self-center">
                      <p className="font-mono text-[0.6rem] font-semibold tracking-[0.2em] text-slate uppercase">
                        {DOCKETS[i]} · {step.points.length} items
                      </p>
                      <ul className="mt-3 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                        {step.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2.5 rounded-md border border-ink/10 bg-paper/70 px-3 py-2 text-[0.84rem] text-ink"
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "size-1.5 shrink-0 rounded-full transition-colors duration-500",
                                lit(i) ? "bg-amber" : "bg-slate-light",
                              )}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>

      {/* ===== terminal — what comes off the band ===== */}
      <div className="relative mt-12 pl-12 sm:mt-14 sm:pl-16">
        <span
          aria-hidden
          className={cn(
            "absolute left-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all duration-500 sm:size-10",
            reduced || shipped
              ? "border-mint bg-mint text-paper shadow-md shadow-mint/30"
              : "border-ink/20 bg-paper text-slate-light",
          )}
        >
          <Check className="size-4" strokeWidth={3} />
        </span>
        <p className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] text-slate uppercase">
          Band output
        </p>
        <p className="type-display-sub mt-1 text-lg sm:text-xl">
          A running e-commerce operation — built to scale.
        </p>
      </div>
    </div>
  );
}
