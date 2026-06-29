"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordProtected from "@/components/PasswordProtected";
import { formatLocalDate } from "@/lib/utils";
import { classify, todayISO, type Category, type Milestone, type MilestonesData } from "@/lib/milestones";

const shortDate = (d: string) => formatLocalDate(d, { year: "numeric", month: "short", day: "numeric" });
const daysOverdue = (deadline: string, today: string) =>
  Math.round((Date.parse(today) - Date.parse(deadline)) / 86400000);

export default function MilestonesBoardPage() {
  const [data, setData] = useState<MilestonesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const today = useMemo(() => todayISO(), []);

  useEffect(() => {
    fetch("/data/milestones.json", { cache: "no-store" })
      .then((res) => {
        if (res.status === 404) return { last_updated: null, milestones: [] } as MilestonesData;
        if (!res.ok) throw new Error("Failed to fetch milestones");
        return res.json();
      })
      .then((d: MilestonesData) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching milestones:", err);
        setError("Failed to load milestones");
        setLoading(false);
      });
  }, []);

  const milestones = data?.milestones ?? [];

  // Bucket each milestone into a board column by its computed category.
  const columns = useMemo(() => {
    const missed: Milestone[] = [];
    const upcoming: Milestone[] = [];
    const completed: Milestone[] = [];
    for (const m of milestones) {
      const cat: Category = classify(m, today).category;
      if (cat === "overdue") missed.push(m);
      else if (cat === "upcoming" || cat === "no-deadline") upcoming.push(m);
      else completed.push(m);
    }
    return { missed, upcoming, completed };
  }, [milestones, today]);

  const stat = (label: string, count: number, cls: string) => (
    <div className={`flex-1 min-w-[120px] rounded-xl border p-4 text-center ${cls}`}>
      <div className="text-3xl font-bold">{count}</div>
      <div className="text-sm font-medium mt-1">{label}</div>
    </div>
  );

  const Column = ({
    title,
    items,
    headerCls,
    render,
  }: {
    title: string;
    items: Milestone[];
    headerCls: string;
    render: (m: Milestone) => React.ReactNode;
  }) => (
    <div className="flex-1 min-w-[260px]">
      <div className={`rounded-t-xl px-4 py-3 font-bold text-sm ${headerCls}`}>
        {title} ({items.length})
      </div>
      <div className="space-y-3 p-3 bg-slate-50/60 dark:bg-gray-900/40 rounded-b-xl border border-t-0 border-slate-200 dark:border-gray-700 min-h-[120px] max-h-[65vh] overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-gray-500 text-center py-6">None</p>
        ) : (
          items.map((m) => (
            <div key={m.id} className="rounded-lg bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 p-3 shadow-sm">
              {render(m)}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const content = (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <Link href="/updates">
            <Button variant="outline" className="border-slate-300 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800">
              ← Back to Archive
            </Button>
          </Link>
          <Link href="/milestones/details">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">View full details →</Button>
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">Milestones Board</h1>
        <p className="text-slate-600 dark:text-gray-300 mt-2">
          Group-meeting view — upcoming and missed milestones at a glance.
          {data?.last_updated && (
            <span className="block text-sm text-slate-500 dark:text-gray-400 mt-1">
              Last updated: {new Date(data.last_updated).toLocaleString()}
            </span>
          )}
        </p>
      </motion.div>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="mt-4 text-slate-600 dark:text-gray-300">Loading board…</p>
        </div>
      )}

      {error && <p className="text-center py-20 text-red-600 dark:text-red-400">{error}</p>}

      {!loading && !error && milestones.length === 0 && (
        <Card className="bg-white/90 dark:bg-gray-800/90 border border-slate-200/60 dark:border-gray-700">
          <CardContent className="p-8 text-center text-slate-600 dark:text-gray-300">
            No milestones logged yet. Post one in the <span className="font-semibold">#milestones</span> Slack channel.
          </CardContent>
        </Card>
      )}

      {!loading && !error && milestones.length > 0 && (
        <>
          {/* Summary tiles */}
          <div className="flex flex-wrap gap-4 mb-8">
            {stat("Missed", columns.missed.length, "border-red-300 dark:border-red-800 bg-red-50/70 dark:bg-red-900/15 text-red-700 dark:text-red-300")}
            {stat("Upcoming", columns.upcoming.length, "border-blue-300 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-900/15 text-blue-700 dark:text-blue-300")}
            {stat("Completed", columns.completed.length, "border-green-300 dark:border-green-800 bg-green-50/70 dark:bg-green-900/15 text-green-700 dark:text-green-300")}
          </div>

          {/* Board */}
          <div className="flex flex-col md:flex-row gap-5">
            <Column
              title="⚠️ Missed"
              items={columns.missed}
              headerCls="bg-red-600 text-white"
              render={(m) => (
                <>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{m.title}</p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{m.ownerName}</p>
                  {m.deadline && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">
                      due {shortDate(m.deadline)} · {daysOverdue(m.deadline, today)}d overdue
                    </p>
                  )}
                </>
              )}
            />
            <Column
              title="⏳ Upcoming"
              items={columns.upcoming}
              headerCls="bg-blue-600 text-white"
              render={(m) => (
                <>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{m.title}</p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{m.ownerName}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                    {m.deadline ? `due ${shortDate(m.deadline)}` : "no deadline"}
                  </p>
                </>
              )}
            />
            <Column
              title="✓ Completed"
              items={columns.completed}
              headerCls="bg-green-600 text-white"
              render={(m) => {
                const c = classify(m, today);
                return (
                  <>
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">{m.title}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{m.ownerName}</p>
                    <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${c.className}`}>
                      {c.label}
                    </span>
                  </>
                );
              }}
            />
          </div>
        </>
      )}
    </div>
  );

  return <PasswordProtected>{content}</PasswordProtected>;
}
