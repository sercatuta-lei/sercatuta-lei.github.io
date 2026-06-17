"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordProtected from "@/components/PasswordProtected";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatLocalDate } from "@/lib/utils";
import { classify, isMissed, todayISO, type Milestone, type MilestonesData } from "@/lib/milestones";

export default function MilestonesPage() {
  const [data, setData] = useState<MilestonesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const today = useMemo(() => todayISO(), []);

  useEffect(() => {
    fetch("/data/milestones.json")
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
  const missed = useMemo(() => milestones.filter((m) => isMissed(m, today)), [milestones, today]);

  // Group by student, preserving deadline sort within each.
  const byOwner = useMemo(() => {
    const map = new Map<string, Milestone[]>();
    for (const m of milestones) {
      if (!map.has(m.ownerName)) map.set(m.ownerName, []);
      map.get(m.ownerName)!.push(m);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [milestones]);

  const Badge = ({ m }: { m: Milestone }) => {
    const c = classify(m, today);
    return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${c.className}`}>{c.label}</span>;
  };

  const content = (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <Link href="/updates">
          <Button variant="outline" className="mb-6 border-slate-300 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800">
            ← Back to Archive
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">Milestones</h1>
        <p className="text-slate-600 dark:text-gray-300 mt-2">
          Student milestones and deadlines, logged in Slack. Read-only.
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
          <p className="mt-4 text-slate-600 dark:text-gray-300">Loading milestones…</p>
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
          {/* Missed deadlines summary */}
          {missed.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <Card className="border border-red-300 dark:border-red-800 bg-red-50/60 dark:bg-red-900/10">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-red-700 dark:text-red-300 mb-3">
                    ⚠️ Missed deadlines ({missed.length})
                  </h2>
                  <ul className="space-y-2">
                    {missed.map((m) => (
                      <li key={m.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                        <span className="font-semibold text-slate-800 dark:text-white">{m.ownerName}</span>
                        <span className="text-slate-600 dark:text-gray-300">— {m.title}</span>
                        {m.deadline && <span className="text-slate-500 dark:text-gray-400">(due {formatLocalDate(m.deadline, { year: "numeric", month: "short", day: "numeric" })})</span>}
                        <Badge m={m} />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Per-student milestones */}
          <div className="space-y-10">
            {byOwner.map(([owner, list]) => (
              <div key={owner}>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{owner}</h2>
                <div className="space-y-4">
                  {list.map((m) => (
                    <Card key={m.id} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{m.title}</h3>
                          <Badge m={m} />
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500 dark:text-gray-400 mb-1">
                          <span>
                            Deadline:{" "}
                            <span className="text-slate-700 dark:text-gray-200">
                              {m.deadline ? formatLocalDate(m.deadline) : (m.deadlineRaw || "—")}
                            </span>
                          </span>
                          <span>
                            Status: <span className="text-slate-700 dark:text-gray-200 capitalize">{m.status}</span>
                          </span>
                          {m.completed && (
                            <span>
                              Completed: <span className="text-slate-700 dark:text-gray-200">{formatLocalDate(m.completed)}</span>
                            </span>
                          )}
                        </div>

                        {m.comments.length > 0 && (
                          <div className="mt-4 space-y-3 pt-3 border-t border-slate-200 dark:border-gray-700">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-gray-400">
                              Review &amp; comments
                            </p>
                            {m.comments.map((c, i) => (
                              <div key={i} className="border-l-2 border-slate-200 dark:border-gray-700 pl-3">
                                <p className="text-sm font-semibold text-slate-700 dark:text-gray-200 mb-1">{c.author}</p>
                                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-a:text-blue-600 dark:prose-a:text-blue-400">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{c.content}</ReactMarkdown>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return <PasswordProtected>{content}</PasswordProtected>;
}
