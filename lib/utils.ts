import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format a "YYYY-MM-DD" string for display. Parsed as a LOCAL calendar date,
// not UTC — `new Date("2026-06-04")` is UTC midnight, which renders as the
// previous day in western-hemisphere timezones. Splitting avoids that shift.
export function formatLocalDate(
  date: string,
  opts: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString("en-US", opts);
}
