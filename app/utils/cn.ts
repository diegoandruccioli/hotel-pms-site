import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Compose class names; a caller's override wins over a component default (same as hotel-pms). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
