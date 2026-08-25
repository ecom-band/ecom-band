import { platforms } from "@/content/site";
import { platformAccent } from "@/lib/platform";
import { PlatformLogo } from "@/components/brand/PlatformLogo";

/**
 * The Band reappearing between major sections — a slow marquee of the
 * five channels ECOM BAND operates across, each with its official mark.
 * Decorative; hidden from AT.
 */
export function BandDivider() {
  const row = (
    <div className="flex shrink-0 items-center">
      {platforms.map((p) => (
        <span key={p} className="flex shrink-0 items-center">
          <span className="flex items-center gap-2.5 px-8">
            <PlatformLogo
              platform={p}
              className={`size-4 opacity-80 ${platformAccent[p].logo}`}
            />
            <span className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-slate/70 uppercase">
              {p}
            </span>
          </span>
          <span
            aria-hidden
            className={`size-1.5 rounded-full ${platformAccent[p].dot}`}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className="select-none overflow-hidden border-y border-ink/10 bg-paper-soft py-4"
    >
      <div className="band-marquee flex w-max animate-band-flow-slow">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
