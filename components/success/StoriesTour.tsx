"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { platforms, type Platform } from "@/content/site";
import {
  platformChapters,
  sortStories,
  storiesByPlatform,
  storiesDisclosure,
} from "@/content/success-stories";
import { services } from "@/content/services";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { platformAccent } from "@/lib/platform";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PlatformTabs } from "./PlatformTabs";
import { StoryCard } from "./StoryCard";
import { StoryLightbox } from "./StoryLightbox";

const slug = (p: Platform) => p.toLowerCase().replace(/\s+/g, "-");

/**
 * The dedicated page: a paper stage under the dark hero, a sticky platform
 * bar that both navigates and tracks scroll position, and one chapter per
 * marketplace — the same framed dashboards as the homepage strip.
 */
export function StoriesTour() {
  const chapters = useMemo(
    () =>
      platforms
        .filter((p) => storiesByPlatform(p).length > 0)
        .map((p) => ({ platform: p, stories: sortStories(storiesByPlatform(p)) })),
    [],
  );
  const all = useMemo(() => chapters.flatMap((c) => c.stories), [chapters]);
  const offsets = useMemo(() => {
    let n = 0;
    return chapters.map((c) => {
      const o = n;
      n += c.stories.length;
      return o;
    });
  }, [chapters]);

  const [active, setActive] = useState<Platform>(chapters[0].platform);
  const [open, setOpen] = useState<number | null>(null);
  const clickLock = useRef<number | null>(null);

  // Scroll-spy: the chapter crossing the upper-middle of the viewport wins.
  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(slug(c.platform)))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return;
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.platform as Platform);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  const jump = useCallback((key: string) => {
    const p = key as Platform;
    setActive(p);
    if (clickLock.current) window.clearTimeout(clickLock.current);
    clickLock.current = window.setTimeout(() => (clickLock.current = null), 900);
    document
      .getElementById(slug(p))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative bg-paper text-ink">
      {/* sticky platform bar — same switcher as the homepage strip */}
      <div className="sticky top-16 z-30 border-b border-ink/8 bg-paper/90 backdrop-blur-md md:top-[4.5rem]">
        <Container className="py-3">
          <PlatformTabs
            layoutId="tour-tab"
            active={active}
            onChange={jump}
            tabs={chapters.map((c) => ({
              key: c.platform,
              label: c.platform,
              platform: c.platform,
              count: c.stories.length,
            }))}
          />
        </Container>
      </div>

      {chapters.map((c, ci) => {
        const chapter = platformChapters[c.platform];
        const related = services.filter((s) => s.platform === c.platform);
        const models = [...new Set(c.stories.map((s) => s.model))];
        return (
          <section
            key={c.platform}
            id={slug(c.platform)}
            data-platform={c.platform}
            className={`relative scroll-mt-32 overflow-hidden border-b border-ink/8 py-16 md:scroll-mt-36 md:py-24 ${ci % 2 ? "bg-paper-soft" : "bg-paper"}`}
          >
            {/* platform-tinted glow, top-left of each chapter */}
            <span
              aria-hidden
              className={`absolute -top-40 -left-40 size-[34rem] rounded-full opacity-[0.10] blur-3xl ${platformAccent[c.platform].bar}`}
            />
            <Container className="relative">
              {/* chapter header */}
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
                <Reveal>
                  <p className="font-mono text-[0.65rem] tracking-[0.22em] text-amber-deep uppercase">
                    Chapter {String(ci + 1).padStart(2, "0")} /{" "}
                    {String(chapters.length).padStart(2, "0")}
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-ink/8 sm:size-14 ${platformAccent[c.platform].tile}`}>
                      <PlatformLogo
                        platform={c.platform}
                        className={`size-6 sm:size-7 ${platformAccent[c.platform].logo}`}
                      />
                    </span>
                    <h2 className="type-display text-[clamp(2rem,8vw,2.5rem)] sm:text-5xl">
                      {c.platform}
                    </h2>
                  </div>
                  <p className="type-display-sub mt-6 max-w-xl text-xl text-ink/85 sm:text-2xl">
                    {chapter.headline}
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="leading-relaxed text-slate">{chapter.blurb}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-ink/10 pt-5">
                    <div>
                      <dt className="font-mono text-[0.6rem] tracking-[0.2em] text-slate uppercase">
                        Dashboards
                      </dt>
                      <dd className="type-display-sub mt-1 text-2xl tabular-nums">
                        {String(c.stories.length).padStart(2, "0")}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.6rem] tracking-[0.2em] text-slate uppercase">
                        Models shown
                      </dt>
                      <dd className="mt-1.5 text-sm text-ink/80">{models.join(" · ")}</dd>
                    </div>
                  </dl>
                  {related.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {related.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="group/link inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate transition-colors hover:border-amber hover:text-ink"
                          >
                            {s.name}
                            <ArrowUpRight className="size-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </div>

              {/* the dashboards — same frames, same widths as the homepage */}
              <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 min-[400px]:-mx-5 min-[400px]:px-5 sm:mx-0 sm:flex-wrap sm:gap-5 sm:overflow-visible sm:px-0 md:mt-14">
                {c.stories.map((story, i) => (
                  <Reveal
                    key={story.id}
                    delay={(i % 4) * 0.06}
                    className="w-[76%] shrink-0 snap-center min-[400px]:w-[68%] sm:w-[calc(50%-0.625rem)] md:w-[calc(25%-0.9375rem)]"
                  >
                    <StoryCard
                      story={story}
                      crop
                      onOpen={() => setOpen(offsets[ci] + i)}
                    />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <Container className="py-8">
        <p className="mx-auto max-w-2xl text-center text-[0.7rem] leading-relaxed text-slate">
          {storiesDisclosure}
        </p>
      </Container>

      <StoryLightbox
        stories={all}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </div>
  );
}
