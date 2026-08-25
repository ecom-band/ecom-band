import { ArrowDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { platformAccent } from "@/lib/platform";
import { platforms } from "@/content/site";
import {
  sortStories,
  storiesByPlatform,
  successStories,
} from "@/content/success-stories";
import { StoryFrame } from "./StoryFrame";

/**
 * Hero for the Success Stories page — dark ink like every page opener,
 * with a fanned stack of featured dashboards lifting toward the (paper)
 * tour below.
 */
export function StoriesHero() {
  const covered = platforms.filter((p) => storiesByPlatform(p).length > 0);
  const featured = sortStories(successStories)
    .filter((s) => s.featured)
    .slice(0, 3);

  // Three cards, each ~48% wide, fanned across ~92% of the stage and
  // inset so the tilted outer edges never clip the stage.
  const fan = [
    "z-30 rotate-[-4deg] translate-x-0 translate-y-6",
    "z-20 rotate-[3deg] translate-x-[46%] -translate-y-2",
    "z-10 rotate-[9deg] translate-x-[92%] translate-y-8",
  ];

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* soft grid + amber wash, mirroring the dark heroes in light */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(90,100,120,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(90,100,120,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 80% at 30% 20%, black, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-amber/10 blur-3xl"
      />

      <div className="hero-pad relative mx-auto grid w-full max-w-6xl gap-14 px-4 pt-28 pb-16 min-[400px]:px-5 sm:px-8 sm:pt-32 md:pt-40 md:pb-24 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10 2xl:max-w-7xl">
        <Reveal>
          <Eyebrow dark>Success Stories</Eyebrow>
          <h1 className="type-display max-w-2xl text-[clamp(2rem,9vw,2.25rem)] sm:text-5xl md:text-6xl 2xl:text-[4.25rem]">
            The Numbers Come From the Dashboard.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-light sm:text-lg">
            Seller dashboards from businesses ECOM BAND builds and operates.
            Follow the tour marketplace by marketplace, or jump straight to
            the one you sell on.
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5 border-t border-white/10 pt-7">
            <div>
              <dt className="font-mono text-[0.6rem] tracking-[0.2em] text-slate-light/70 uppercase">
                Dashboards
              </dt>
              <dd className="type-display mt-1 text-4xl tabular-nums sm:text-5xl">
                {String(successStories.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6rem] tracking-[0.2em] text-slate-light/70 uppercase">
                Marketplaces
              </dt>
              <dd className="mt-1 flex items-center gap-3">
                <span className="type-display text-4xl tabular-nums sm:text-5xl">
                  {String(covered.length).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-2 pt-2">
                  {covered.map((p) => (
                    <span
                      key={p}
                      title={p}
                      className="flex size-7 items-center justify-center rounded-md bg-white/8 ring-1 ring-white/10"
                    >
                      <PlatformLogo
                        platform={p}
                        className={`size-3.5 ${platformAccent[p].logoDark}`}
                      />
                    </span>
                  ))}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-col items-stretch gap-3 min-[400px]:flex-row min-[400px]:items-center">
            <ButtonLink href="#amazon" arrow={false}>
              Start the Tour
              <ArrowDown
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-dark">
              Talk to ECOM BAND
            </ButtonLink>
          </div>
        </Reveal>

        {/* fanned featured dashboards */}
        <Reveal delay={0.12} className="relative">
          <div className="relative mx-auto h-[20rem] w-full max-w-[26rem] px-[6%] min-[400px]:h-[24rem] sm:h-[28rem] lg:mx-0 lg:ml-auto lg:h-[30rem]">
            {featured.map((story, i) => (
              <div
                key={story.id}
                className={`absolute top-0 left-[6%] w-[46%] origin-bottom transition-transform duration-500 ease-out hover:z-40 hover:-translate-y-2 hover:rotate-0 ${fan[i]}`}
              >
                <StoryFrame
                  story={story}
                  crop
                  priority={i === 0}
                  sizes="(min-width: 1024px) 14rem, 45vw"
                  className="shadow-[0_28px_70px_-20px_rgba(0,0,0,0.7)]"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
