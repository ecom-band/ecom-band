import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark,
  center,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl md:mb-16",
        center && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow dark={dark} className={cn(center && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="type-display-sub text-[clamp(1.7rem,7.5vw,1.875rem)] sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-slate-light" : "text-slate",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
