import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ChipTone = "done" | "partial" | "missing" | "neutral";

interface M3StatusChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: ChipTone;
}

// Status is always in the text, never in the colour alone.
const TONE_CLASSES: Record<ChipTone, string> = {
  done: "bg-tertiary-container text-on-tertiary-container",
  partial: "bg-secondary-container text-on-secondary-container",
  missing: "bg-error-container text-on-error-container",
  neutral: "bg-surface-variant text-on-surface-variant",
};

export function M3StatusChip({ tone = "neutral", className, ...rest }: M3StatusChipProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-shape-sm px-3 py-1 text-xs font-semibold", TONE_CLASSES[tone], className)}
      {...rest}
    />
  );
}
