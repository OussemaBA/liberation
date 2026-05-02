import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and filters Tailwind CSS classes with clsx and tailwind-merge.
 * Critical for enterprise-grade dynamic styling.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
