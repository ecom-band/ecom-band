import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "paper" | "paper-soft" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  "paper-soft": "bg-paper-soft text-ink",
  ink: "bg-ink text-paper",
};

export function Section({
  tone = "paper",
  className,
  containerClassName,
  id,
  children,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 md:py-28 lg:py-32", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
