import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outline-dark" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-amber text-ink hover:bg-amber-soft",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-dark":
    "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  ghost: "text-ink underline-offset-4 hover:underline",
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  arrow = true,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  arrow = true,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  arrow?: boolean;
}) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </button>
  );
}
