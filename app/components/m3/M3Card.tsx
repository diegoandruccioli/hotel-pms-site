import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type CardVariant = "elevated" | "filled" | "outlined";

interface M3CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  elevated: "bg-surface-container-low shadow-elevation-1",
  filled: "bg-surface-container-highest",
  outlined: "border border-outline-variant bg-surface",
};

export function M3Card({ variant = "outlined", className, ...rest }: M3CardProps) {
  return <div className={cn("rounded-shape-md p-6 text-on-surface", VARIANT_CLASSES[variant], className)} {...rest} />;
}
