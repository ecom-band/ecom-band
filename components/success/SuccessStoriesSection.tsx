"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { platforms, type Platform } from "@/content/site";
import {
  sortStories,
  storiesByPlatform,
  storiesDisclosure,
  successStories,
} from "@/content/success-stories";
import { PlatformTabs } from "./PlatformTabs";
import { StoryCard } from "./StoryCard";
import { StoryLightbox } from "./StoryLightbox";

const HOME_LIMIT = 4;

/** Homepage strip: one platform at a time, up to four dashboards. */
export function SuccessStoriesSection() {
  const reduced = useReducedMotion();
  const withStories = platforms.filter((p) => storiesByPlatform(p).length > 0);
  const [active, setActive] = useState<Platform>(withStories[0]);
  const [open, setOpen] = useState<number | null>(null);

  const visible = sortStories(storiesByPlatform(active)).slice(0, HOME_LIMIT);
  const total = successStories.length;

  return (
    <Section
      tone="ink"
      id="success-stories"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(224,141,38,0.10),transparent_70%)]"
    >
      {/* faint grid, same language as the inner-page heroes */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(90,100,120,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(90,100,120,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 0%, black, transparent)",
        }}
      />
      <div className="relative">
        <Reveal>
          <SectionHeading
            dark
            center
            eyebrow="Success Stories"
            title="Real Dashboards. Real Client Growth."
            lead="No stock charts, no invented percentages. These are the seller dashboards our clients log into every morning — across every marketplace we operate on."
            className="mb-10 md:mb-12"
          />
        </Reveal>

        <Reveal delay={0.05}>
          <PlatformTabs
            dark
            layoutId="home-story-tab"
            active={active}
            onChange={(k) => {
              setActive(k as Platform);
              setOpen(null);
            }}
            tabs={withStories.map((p) => ({
              key: p,
              label: p,
              platform: p,
              count: storiesByPlatform(p).length,
            }))}
          />
        </Reveal>

        <div className="mt-10 md:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -6 }}
              transition={{ duration: 0.28, ease: [0.21, 0.6, 0.35, 1] }}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 min-[400px]:-mx-5 min-[400px]:px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-5 sm:overflow-visible sm:px-0"
            >
              {visible.map((story, i) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  crop
                  dark
                  onOpen={() => setOpen(i)}
                  className="w-[76%] shrink-0 snap-center min-[400px]:w-[68%] sm:w-[calc(50%-0.625rem)] md:w-[calc(25%-0.9375rem)]"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-5 text-center md:mt-14">
          <ButtonLink href="/success-stories" variant="outline-dark">
            View All {total} Success Stories
          </ButtonLink>
          <p className="max-w-xl text-[0.7rem] leading-relaxed text-slate-light/75">
            {storiesDisclosure}
          </p>
        </Reveal>
      </div>

      <StoryLightbox
        stories={visible}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </Section>
  );
}
