"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordProtected from "@/components/PasswordProtected";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPerson } from "@/lib/people";

interface Update {
  date: string;
  content: string;
  placeholder: boolean;
}

interface Student {
  slackId: string;
  name: string;
  slug: string;
  photo: string;
  updates: Update[];
}

interface UpdatesData {
  students: Student[];
  last_updated: string | null;
}

interface ResearchMessage {
  id: string;
  date: string;
  content: string;
  reply_count?: number;
}

interface ResearchData {
  slug: string;
  name: string;
  channel: string;
  last_updated: string | null;
  messages: ResearchMessage[];
}

type Tab = "weekly" | "research";

interface StudentUpdateClientProps {
  slug: string;
}

export default function StudentUpdateClient({ slug }: StudentUpdateClientProps) {
  const person = getPerson(slug);

  const [weekly, setWeekly] = useState<Update[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const [tab, setTab] = useState<Tab>("weekly");

  // Research is lazy-loaded the first time the Research tab is opened.
  const [research, setResearch] = useState<ResearchMessage[] | null>(null);
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchLoaded, setResearchLoaded] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/updates.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch updates");
        return res.json();
      })
      .then((data: UpdatesData) => {
        const found = data.students.find((s) => s.slug === slug);
        // A person may exist for research only (no weekly-status updates).
        setWeekly(found ? found.updates : []);
        if (found && found.updates.length > 0) {
          setExpanded(found.updates[0].date);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching updates:", err);
        // Missing weekly data is not fatal — the page can still show research.
        setWeekly([]);
        setLoading(false);
      });
  }, [slug]);

  const loadResearch = useCallback(() => {
    if (researchLoaded || researchLoading) return;
    setResearchLoading(true);
    fetch(`/data/research/${slug}.json`)
      .then((res) => {
        if (res.status === 404) return null; // no research feed for this person yet
        if (!res.ok) throw new Error("Failed to fetch research");
        return res.json();
      })
      .then((data: ResearchData | null) => {
        setResearch(data ? data.messages : []);
        setResearchLoaded(true);
        setResearchLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching research:", err);
        setResearchError("Failed to load research updates");
        setResearchLoading(false);
      });
  }, [slug, researchLoaded, researchLoading]);

  const selectTab = (next: Tab) => {
    setTab(next);
    setExpanded(null);
    if (next === "research") loadResearch();
  };

  const toggle = (key: string) => setExpanded((cur) => (cur === key ? null : key));

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const notFound = !person;

  const content = (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/updates">
            <Button
              variant="outline"
              className="border-slate-300 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800"
            >
              ← Back to All Students
            </Button>
          </Link>
          {!notFound && <TabToggle tab={tab} onSelect={selectTab} />}
        </div>
      </motion.div>

      {notFound && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="text-red-600 dark:text-red-400 text-lg mb-4">Student not found</div>
          <Link href="/updates">
            <Button className="mt-4">Return to Updates</Button>
          </Link>
        </motion.div>
      )}

      {!notFound && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4">
              <img
                src={`/images/teampic/${person!.photo}`}
                alt={`${person!.name} photo`}
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                  {person!.name}
                </h1>
              </div>
            </div>
          </motion.div>

          {/* WEEKLY TAB */}
          {tab === "weekly" && (
            <>
              {loading && <Spinner label="Loading updates..." />}
              {!loading && weekly && weekly.length === 0 && (
                <EmptyCard text="No weekly updates available for this person." />
              )}
              {!loading && weekly && weekly.length > 0 && (
                <div className="space-y-4">
                  {weekly.map((update, index) => (
                    <motion.div
                      key={update.date}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                    >
                      <Card
                        className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border transition-all duration-300 ${
                          update.placeholder
                            ? "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10"
                            : "border-slate-200/60 dark:border-gray-700 hover:shadow-lg"
                        }`}
                      >
                        <button
                          onClick={() => toggle(update.date)}
                          className="w-full px-6 py-4 text-left bg-slate-50/50 dark:bg-gray-900/30 hover:bg-slate-100/50 dark:hover:bg-gray-900/50 transition-colors rounded-t-2xl"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                                {formatDate(update.date)}
                              </h2>
                              {update.placeholder && (
                                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                                  No update provided
                                </p>
                              )}
                            </div>
                            <Chevron open={expanded === update.date} />
                          </div>
                        </button>
                        {expanded === update.date && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="p-6">
                              <Markdown>{update.content}</Markdown>
                            </CardContent>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* RESEARCH TAB */}
          {tab === "research" && (
            <>
              {researchLoading && <Spinner label="Loading research updates..." />}
              {researchError && <EmptyCard text={researchError} />}
              {!researchLoading && !researchError && research && research.length === 0 && (
                <EmptyCard text="No research-channel updates available for this person yet." />
              )}
              {!researchLoading && !researchError && research && research.length > 0 && (
                <div className="space-y-4">
                  {research.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
                    >
                      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                        <button
                          onClick={() => toggle(msg.id)}
                          className="w-full px-6 py-4 text-left bg-slate-50/50 dark:bg-gray-900/30 hover:bg-slate-100/50 dark:hover:bg-gray-900/50 transition-colors rounded-t-2xl"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                                {formatDate(msg.date)}
                              </h2>
                              {!!msg.reply_count && msg.reply_count > 0 && (
                                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                                  {msg.reply_count} {msg.reply_count === 1 ? "reply" : "replies"}
                                </p>
                              )}
                            </div>
                            <Chevron open={expanded === msg.id} />
                          </div>
                        </button>
                        {expanded === msg.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="p-6">
                              <Markdown>{msg.content}</Markdown>
                            </CardContent>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );

  return <PasswordProtected>{content}</PasswordProtected>;
}

function TabToggle({ tab, onSelect }: { tab: Tab; onSelect: (t: Tab) => void }) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 dark:bg-gray-800 p-1 border border-slate-200 dark:border-gray-700">
      {(["weekly", "research"] as Tab[]).map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
            tab === t
              ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow"
              : "text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white"
          }`}
        >
          {t === "weekly" ? "Weekly" : "Research"}
        </button>
      ))}
    </div>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
      <p className="mt-4 text-slate-600 dark:text-gray-300">{label}</p>
    </div>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-gray-700">
        <CardContent className="p-8 text-center">
          <p className="text-slate-600 dark:text-gray-300">{text}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-6 h-6 text-slate-600 dark:text-gray-300 transition-transform ${open ? "transform rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-800 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-slate-800 dark:prose-strong:text-white prose-code:text-slate-800 dark:prose-code:text-white">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
