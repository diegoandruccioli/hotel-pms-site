import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export type SectionTone = "default" | "muted";

interface SectionBandProps {
  id: string;
  headingId: string;
  tone?: SectionTone;
  /** Overrides the default max-w-3xl inner column, e.g. a wider grid of screenshots. */
  innerClassName?: string;
  children: ReactNode;
}

const TONE_CLASSES: Record<SectionTone, string> = {
  default: "bg-surface",
  muted: "bg-surface-container-low",
};

/**
 * Full-width band for one home-page section: the background spans the whole viewport (giving
 * the page rhythm between sections) while the content stays in a centred, readable column.
 * Alternating `tone` between sections is what replaces the old stack of identical narrow cards.
 */
export function SectionBand({ id, headingId, tone = "default", innerClassName, children }: SectionBandProps) {
  return (
    <section id={id} aria-labelledby={headingId} className={cn("border-t border-outline-variant py-16", TONE_CLASSES[tone])}>
      <div className={cn("mx-auto max-w-3xl px-6", innerClassName)}>{children}</div>
    </section>
  );
}
