import { cn } from "../../utils/cn";

export type ButtonVariant = "filled" | "tonal" | "outlined" | "text";

const BASE =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-shape-full px-6 py-2 text-sm font-semibold " +
  "aria-disabled:cursor-not-allowed aria-disabled:opacity-38 disabled:cursor-not-allowed disabled:opacity-38";

// Only colour pairs that tokens.test.ts checks for 7:1 contrast in every theme.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  filled: "bg-primary text-on-primary shadow-elevation-1",
  tonal: "bg-secondary-container text-on-secondary-container",
  outlined: "border border-outline text-primary",
  text: "px-4 text-primary",
};

export function buttonClasses(variant: ButtonVariant, className?: string): string {
  return cn(BASE, VARIANT_CLASSES[variant], className);
}
