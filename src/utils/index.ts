import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges Tailwind CSS class names with conditional logic.
 * @example
 * cn("bg-light-accent", isActive && "text-black", "px-4") → "bg-light-accent text-black px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
