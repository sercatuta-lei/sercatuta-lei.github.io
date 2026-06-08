"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import PasswordProtected from "@/components/PasswordProtected";
import { PEOPLE } from "@/lib/people";

interface Student {
  slackId: string;
  name: string;
  slug: string;
  photo: string;
  updates: Array<{
    date: string;
    content: string;
    placeholder: boolean;
  }>;
}

interface UpdatesData {
  students: Student[];
  last_updated: string | null;
}

export default function UpdatesPage() {
  const [data, setData] = useState<UpdatesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/updates.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch updates");
        return res.json();
      })
      .then((data: UpdatesData) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching updates:", err);
        setError("Failed to load updates");
        setLoading(false);
      });
  }, []);

  const content = (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
          PhD Student Weekly Updates
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-300 mb-2">
          Weekly progress updates from our PhD students
        </p>
        {data?.last_updated && (
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Last updated: {new Date(data.last_updated).toLocaleString()}
          </p>
        )}
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
          <p className="text-slate-600 dark:text-gray-300">
            Please try refreshing the page
          </p>
        </motion.div>
      )}

      {!loading && !error && (() => {
        const bySlug = new Map((data?.students ?? []).map((s) => [s.slug, s]));
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PEOPLE.map((person, index) => {
              const student = bySlug.get(person.slug);
              const count = student?.updates.length ?? 0;
              const latest = student?.updates[0]?.date;
              return (
                <motion.div
                  key={person.slug}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.6) }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/updates/${person.slug}`}>
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-gray-700 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="relative mb-4 mx-auto w-32 h-32">
                            <img
                              src={`/images/teampic/${person.photo}`}
                              alt={`${person.name} photo`}
                              className="w-full h-full object-cover rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                            />
                            {count > 0 && (
                              <div className="absolute -top-2 -right-2 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                                {count}
                              </div>
                            )}
                          </div>

                          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {person.name}
                          </h3>

                          <p className="text-sm text-slate-600 dark:text-gray-300">
                            {count > 0
                              ? `${count} weekly ${count === 1 ? "update" : "updates"}`
                              : "View research"}
                          </p>

                          {latest && (
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-2">
                              Latest: {new Date(latest).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );

  return <PasswordProtected>{content}</PasswordProtected>;
}
