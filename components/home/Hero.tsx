"use client";

import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { OpsBand } from "@/components/band/OpsBand";
import { BandConveyor } from "@/components/band/BandConveyor";
import { ImagePlaceholder } from "@/components/blocks/ImagePlaceholder";
import { homeImages } from "@/content/images";

const WORDS = ["Build.", "Scale.", "Grow."];

/** Orchestrated load sequence: eyebrow → headline words → copy → CTAs → the Band starts flowing. */
export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.21, 0.6, 0.35, 1] as const },
  });

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* IMG-00 — full-bleed backdrop photo. Once real: render as a cover image at
          ~12–18% opacity with the same gradient veil below so the text stays AA. */}
      <div aria-hidden className="absolute inset-0">
        <ImagePlaceholder
          spec={homeImages.heroBackdrop}
          id="IMG-00"
          dark
          fill
          minimal
          className="rounded-none border-0 opacity-80"
        />
        {/* veil — keeps the headline legible and fades the photo toward the band */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,19,33,0.92)_0%,rgba(13,19,33,0.78)_45%,rgba(13,19,33,0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* faint grid ground — the ops infrastructure feel */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(90,100,120,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(90,100,120,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent)",
        }}
      />

      <div className="hero-pad relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pt-28 pb-14 min-[400px]:px-5 sm:px-8 sm:pt-32 sm:pb-16 md:pt-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:pb-24 2xl:max-w-7xl 2xl:gap-12">
        <div>
          <motion.p
            {...rise(0.05)}
            className="type-eyebrow flex items-center gap-2.5 text-amber-soft"
          >
            <span aria-hidden className="inline-block h-px w-6 bg-amber-soft" />
            E-Commerce Growth &amp; Management · United States
          </motion.p>

          <h1 className="type-display mt-7 text-[clamp(2.9rem,11.5vw,3.6rem)] leading-[0.98] sm:text-[4.4rem] lg:text-[clamp(3.6rem,4.6vw,4.8rem)] 2xl:text-[5.2rem]">
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="block"
                initial={{ opacity: 0, y: reduced ? 0 : 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.18 + i * 0.14,
                  ease: [0.21, 0.6, 0.35, 1],
                }}
              >
                {word === "Grow." ? (
                  <span className="text-amber">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...rise(0.65)}
            className="type-display-sub mt-7 text-lg text-paper/90 min-[400px]:text-xl sm:text-2xl"
          >
            Your E-Commerce Business, Built for Growth.
          </motion.p>

          <motion.p
            {...rise(0.78)}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-light"
          >
            We build and scale e-commerce operations across Amazon, Shopify,
            Walmart, eBay, and TikTok Shop — from wholesale and private label
            to full marketplace management.
          </motion.p>

          <motion.div
            {...rise(0.92)}
            className="mt-9 flex flex-col items-stretch gap-3 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center min-[400px]:gap-4"
          >
            <ButtonLink href="/contact">Get Started</ButtonLink>
            <ButtonLink href="/services" variant="outline-dark">
              Explore Services
            </ButtonLink>
          </motion.div>
        </div>

        {/* the Band — the operation flowing behind every storefront */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.05 }}
          className="hidden md:block md:-mx-6 lg:mx-0 lg:-mr-16 xl:-mr-24"
        >
          <BandConveyor />
        </motion.div>
      </div>

      {/* mobile / tablet: single band strip in place of the conveyor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.05 }}
        className="relative pb-12 md:hidden"
      >
        <OpsBand />
      </motion.div>
    </section>
  );
}
