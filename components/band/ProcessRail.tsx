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
import { Package } from "lucide-react";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

const LAST = processSteps.length - 1;

/**
 * The 5-step process rendered as stations along the Band — and the Band
 * actually runs: a carrier crate rides the belt as the visitor scrolls,
 * lighting each station as it passes. Vertical variant below lg, where
 * the crate rides down the growing amber line and stations light as
 * they enter the viewport.
 * Collapses to a fully-lit static rail under prefers-reduced-motion.
 */
export function ProcessRail() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Desktop — carrier position along the belt, scrubbed by scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const carrierLeft = useTransform(progress, (v) => `${v * 100}%`);
  // The crate leans against its direction of travel, like real cargo
  const tilt = useSpring(
    useTransform(useVelocity(progress), [-1.6, 1.6], [7, -7]),
    { stiffness: 320, damping: 22 },
  );

  // Mobile — the amber line grows down the rail as the list scrolls through
  const { scrollYProgress: mobileProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.7"],
  });
  const mobileFill = useSpring(mobileProgress, { stiffness: 90, damping: 26 });
  const carrierTop = useTransform(mobileFill, (v) => `${v * 100}%`);
  const mobileTilt = useSpring(
    useTransform(useVelocity(mobileFill), [-1.6, 1.6], [-7, 7]),
    { stiffness: 320, damping: 22 },
  );

  const [reached, setReached] = useState(-1);
  const [mReached, setMReached] = useState(-1);

  useMotionValueEvent(progress, "change", (v) => {
    setReached(v <= 0.01 ? -1 : Math.min(LAST, Math.floor((v + 0.03) * LAST)));
  });

  const litDesktop = (i: number) => reduced || i <= reached;
  const litMobile = (i: number) => reduced || i <= mReached;

  return (
    <div ref={ref}>
      {/* ===== lg+ : the horizontal band ===== */}
      <div className="hidden lg:block">
        <div aria-hidden className="relative h-14 select-none">
          {/* belt hairline + tread, running off the right edge of the page */}
          <div className="absolute inset-0 [mask-image:linear-gradient(to_right,black_86%,transparent)]">
            <div className="absolute inset-x-0 top-1/2 h-px bg-ink/15" />
            <div className="absolute inset-x-0 top-1/2 h-[10px] -translate-y-1/2 opacity-45 [background-image:repeating-linear-gradient(90deg,rgba(13,19,33,0.14)_0,rgba(13,19,33,0.14)_1px,transparent_1px,transparent_10px)]" />
          </div>

          {/* active track spanning station 1 → station 5 */}
          <div className="absolute inset-y-0 left-4 w-4/5">
            <motion.div
              className="absolute inset-x-0 top-1/2 h-[3px] origin-left -translate-y-1/2 rounded-full bg-gradient-to-r from-amber/60 to-amber"
              style={{ scaleX: reduced ? 1 : progress }}
            />

            {processSteps.map((step, i) => (
              <span
                key={step.number}
                className={cn(
                  "absolute top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[0.68rem] font-bold transition-all duration-300",
                  litDesktop(i)
                    ? "border-amber bg-amber text-ink shadow-md shadow-amber/40"
                    : "scale-90 border-ink/20 bg-paper text-slate",
                  !reduced && i === reached && "ring-4 ring-amber/20",
                )}
                style={{ left: `${(i / LAST) * 100}%` }}
              >
                {step.number}
              </span>
            ))}

            {/* the carrier — the client's business, moving down the band */}
            {!reduced && (
              <motion.div
                className="absolute top-1/2 z-10"
                style={{ left: carrierLeft }}
              >
                <div className="-translate-x-1/2 -translate-y-[128%]">
                  <motion.span
                    style={{ rotate: tilt }}
                    className="flex size-8 items-center justify-center rounded-lg bg-ink text-amber shadow-lg shadow-ink/30"
                  >
                    <Package className="size-4" />
                  </motion.span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <ol className="mt-6 grid grid-cols-5">
          {processSteps.map((step, i) => (
            <li
              key={step.number}
              className={cn(
                "pr-5 transition-opacity duration-500 xl:pr-7",
                litDesktop(i) ? "opacity-100" : "opacity-45",
              )}
            >
              <p className="font-mono text-[0.65rem] font-medium tracking-[0.18em] text-amber-deep uppercase">
                {step.heading}
              </p>
              <h3 className="type-display-sub mt-2.5 text-lg">{step.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate">
                {step.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* ===== below lg : the vertical band ===== */}
      <div className="relative lg:hidden">
        <div
          aria-hidden
          className="absolute bottom-2 left-[15px] top-2 w-px bg-ink/15"
        />
        <motion.div
          aria-hidden
          className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-amber"
          style={{ scaleY: reduced ? 1 : mobileFill }}
        />

        {/* the carrier — riding the vertical band, same as desktop */}
        {!reduced && (
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-2 left-[15px] top-2 z-10"
          >
            <motion.div className="absolute" style={{ top: carrierTop }}>
              <div className="-translate-x-1/2 -translate-y-1/2">
                <motion.span
                  style={{ rotate: mobileTilt }}
                  className="flex size-8 items-center justify-center rounded-lg bg-ink text-amber shadow-lg shadow-ink/30"
                >
                  <Package className="size-4" />
                </motion.span>
              </div>
            </motion.div>
          </div>
        )}

        <ol className="space-y-11">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.number}
              className="relative pl-12"
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              onViewportEnter={() => setMReached((m) => Math.max(m, i))}
              transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-0 flex size-8 items-center justify-center rounded-full border font-mono text-[0.65rem] font-bold transition-all duration-500",
                  litMobile(i)
                    ? "border-amber bg-amber text-ink shadow-md shadow-amber/30"
                    : "border-ink/20 bg-paper text-slate",
                )}
              >
                {step.number}
              </span>
              <h3 className="type-display-sub text-lg">{step.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate">
                {step.summary}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
