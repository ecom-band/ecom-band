import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 min-[400px]:px-5 sm:px-8 2xl:max-w-7xl", className)}>
      {children}
    </div>
  );
}
