"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordProtected from "@/components/PasswordProtected";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

interface StudentUpdateClientProps {
  slug: string;
}

export default function StudentUpdateClient({ slug }: StudentUpdateClientProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUpdate, setExpandedUpdate] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/updates.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch updates");
        return res.json();
      })
      .then((data: UpdatesData) => {
        const foundStudent = data.students.find((s) => s.slug === slug);
        if (foundStudent) {
          setStudent(foundStudent);
          // Expand the first update by default
          if (foundStudent.updates.length > 0) {
            setExpandedUpdate(foundStudent.updates[0].date);
          }
        } else {
          setError("Student not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching updates:", err);
        setError("Failed to load updates");
        setLoading(false);
      });
  }, [slug]);

  const toggleUpdate = (date: string) => {
    setExpandedUpdate(expandedUpdate === date ? null : date);
  };

  const content = (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link href="/updates">
          <Button
            variant="outline"
            className="mb-4 border-slate-300 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800"
          >
            ← Back to All Students
          </Button>
        </Link>
      </motion.div>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="mt-4 text-slate-600 dark:text-gray-300">Loading updates...</p>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-red-600 dark:text-red-400 text-lg mb-4">
            {error}
          </div>
          <Link href="/updates">
            <Button className="mt-4">Return to Updates</Button>
          </Link>
        </motion.div>
      )}

      {!loading && !error && student && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={`/images/teampic/${student.photo}`}
                alt={`${student.name} photo`}
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                  {student.name}
                </h1>
                <p className="text-slate-600 dark:text-gray-300">
                  {student.updates.length} {student.updates.length === 1 ? "update" : "updates"} available
                </p>
              </div>
            </div>
          </motion.div>

          {student.updates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <p className="text-slate-600 dark:text-gray-300">
                    No updates available yet for this student.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {student.updates.map((update, index) => (
                <motion.div
                  key={update.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border transition-all duration-300 ${
                      update.placeholder
                        ? "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10"
                        : "border-slate-200/60 dark:border-gray-700 hover:shadow-lg"
                    }`}
                  >
                    <button
                      onClick={() => toggleUpdate(update.date)}
                      className="w-full px-6 py-4 text-left bg-slate-50/50 dark:bg-gray-900/30 hover:bg-slate-100/50 dark:hover:bg-gray-900/50 transition-colors rounded-t-2xl"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                            {new Date(update.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h2>
                          {update.placeholder && (
                            <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                              No update provided
                            </p>
                          )}
                        </div>
                        <svg
                          className={`w-6 h-6 text-slate-600 dark:text-gray-300 transition-transform ${
                            expandedUpdate === update.date ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedUpdate === update.date && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="p-6">
                          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-800 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-slate-800 dark:prose-strong:text-white prose-code:text-slate-800 dark:prose-code:text-white">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {update.content}
                            </ReactMarkdown>
                          </div>
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
    </div>
  );

  return <PasswordProtected>{content}</PasswordProtected>;
}

