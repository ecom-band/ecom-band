import { cn } from "@/lib/cn";

/** Mono-face section label — the "operations data" voice. */
export function Eyebrow({
  children,
  dark,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "type-eyebrow mb-4 flex items-center gap-2.5",
        dark ? "text-amber-soft" : "text-amber-deep",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-px w-6",
          dark ? "bg-amber-soft" : "bg-amber",
        )}
      />
      {children}
    </p>
  );
}
