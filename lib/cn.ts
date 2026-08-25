/** Minimal className joiner — no conditional-object syntax needed at this scope. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
