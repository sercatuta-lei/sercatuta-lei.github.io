export interface MilestoneComment {
  author: string;
  content: string;
}

export interface Milestone {
  id: string;
  ownerName: string;
  ownerSlug: string;
  title: string;
  deadline: string | null;
  deadlineRaw?: string | null;
  status: string;
  completed: string | null;
  comments: MilestoneComment[];
  updated?: string;
}

export interface MilestonesData {
  last_updated: string | null;
  milestones: Milestone[];
}

export type Category = "on-time" | "late" | "overdue" | "upcoming" | "done" | "no-deadline";

export interface Classification {
  category: Category;
  label: string;
  /** tailwind classes for the badge */
  className: string;
}

/** Local YYYY-MM-DD for "today" (date-only comparison). */
export function todayISO(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

const STYLES: Record<Category, { label: string; className: string }> = {
  "on-time": { label: "✓ On time", className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700" },
  late: { label: "Completed late", className: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-300 dark:border-orange-700" },
  overdue: { label: "Missed / overdue", className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-700" },
  upcoming: { label: "Upcoming", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-700" },
  done: { label: "Done", className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700" },
  "no-deadline": { label: "No deadline", className: "bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-gray-300 border-slate-300 dark:border-gray-600" },
};

export function classify(m: Milestone, today: string): Classification {
  let category: Category;
  if (m.status === "done") {
    if (m.deadline && m.completed) category = m.completed <= m.deadline ? "on-time" : "late";
    else category = "done";
  } else if (!m.deadline) {
    category = "no-deadline";
  } else if (m.deadline < today) {
    category = "overdue";
  } else {
    category = "upcoming";
  }
  return { category, ...STYLES[category] };
}

/** Milestones that need the professor's attention: overdue or completed late. */
export function isMissed(m: Milestone, today: string): boolean {
  const c = classify(m, today).category;
  return c === "overdue" || c === "late";
}
