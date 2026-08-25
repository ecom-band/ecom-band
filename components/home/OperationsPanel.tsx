import { platforms } from "@/content/site";
import { platformAccent } from "@/lib/platform";
import { PlatformLogo } from "@/components/brand/PlatformLogo";

/**
 * Decorative "live ops console" for the What We Do split section.
 * Deliberately abstract: capability states only — no invented numbers,
 * revenue figures, or fake dashboard data (requirements doc §8 bans those).
 */
const CHANNEL_STATES = [
  "Sourcing active",
  "Listings optimized",
  "Inventory planned",
  "Orders fulfilled",
  "Support live",
] as const;

const PIPELINE = [
  "Sourcing",
  "Listings",
  "Inventory",
  "Fulfillment",
  "Support",
  "Growth",
] as const;

/** Per-row equalizer bar delays — staggered so channels feel independent. */
const EQ_DELAYS = ["0s", "-0.5s", "-0.9s", "-0.3s", "-0.7s"];

export function OperationsPanel() {
  return (
    <div aria-hidden className="relative select-none">
      {/* stacked ghost panels — the console sits on top of the operation */}
      <div className="absolute inset-x-6 -bottom-3 top-6 rotate-2 rounded-2xl bg-ink/15" />
      <div className="absolute inset-x-3 -bottom-1.5 top-3 -rotate-1 rounded-2xl bg-ink/30" />

      <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-ink p-5 shadow-2xl shadow-ink/25 min-[400px]:p-6 sm:p-7">
        {/* warm corner glow + faint console grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_100%_0%,rgba(224,141,38,0.14),transparent_62%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(90,100,120,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(90,100,120,0.12) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 0%, black, transparent)",
          }}
        />

        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-slate-light uppercase">
              Managed Channels
            </p>
            <span className="flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.14em] text-mint uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-mint" />
              Operating
            </span>
          </div>

          <ul className="mt-6 space-y-2.5">
            {platforms.map((p, i) => {
              const accent = platformAccent[p];
              return (
                <li
                  key={p}
                  className="group flex items-center gap-3.5 rounded-xl border border-ink-border bg-ink-soft/70 px-4 py-3 transition-colors duration-300 hover:border-white/20 hover:bg-ink-soft"
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/8 ${accent.tile}`}
                  >
                    <PlatformLogo
                      platform={p}
                      className={`size-4.5 ${accent.logoDark}`}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-paper/95">
                      {p}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[0.58rem] tracking-[0.14em] text-slate-light uppercase">
                      {CHANNEL_STATES[i]}
                    </span>
                  </span>
                  {/* abstract activity equalizer — motion, not metrics */}
                  <span
                    className={`flex h-4 shrink-0 items-end gap-[3px] ${accent.logoDark}`}
                  >
                    {[0, 1, 2].map((b) => (
                      <span
                        key={b}
                        className="eq-bar w-[3px] rounded-full bg-current"
                        style={{
                          height: `${[100, 62, 82][b]}%`,
                          animationDelay: `calc(${EQ_DELAYS[i]} - ${b * 0.22}s)`,
                        }}
                      />
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* the pipeline — one lit segment traveling through the operation */}
          <div className="mt-6 border-t border-ink-border pt-5">
            <div className="grid grid-cols-6 gap-1.5">
              {PIPELINE.map((stage, i) => (
                <div key={stage} className="min-w-0">
                  <span
                    className="seg block h-[3px] rounded-full bg-amber"
                    style={{ animationDelay: `${i * 1.2}s` }}
                  />
                  <span className="mt-1.5 block truncate text-center font-mono text-[0.5rem] tracking-[0.08em] text-slate-light/80 uppercase">
                    {stage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* amber band edge */}
        <span className="absolute -left-px top-8 h-16 w-0.5 rounded-full bg-amber" />
      </div>
    </div>
  );
}
