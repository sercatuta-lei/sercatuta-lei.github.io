"use client";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getPublications, getTags, getAllTags } from "./data";
import { toBibTeX, toAPA } from "@/lib/citations";

export default function PublicationsPage() {
  // Sort by year (most recent first), then by ID descending
  const publications = useMemo(() => {
    const pubs = getPublications();
    return [...pubs].sort((a, b) => (b.year !== a.year ? b.year - a.year : b.id - a.id));
  }, []);

  const years = useMemo(
    () => [...new Set(publications.map((pub) => pub.year))].sort((a, b) => b - a),
    [publications]
  );

  // Tags derived from each paper's title/venue — no manual tagging.
  const tagsById = useMemo(
    () => new Map(publications.map((pub) => [pub.id, getTags(pub)])),
    [publications]
  );
  const allTags = useMemo(() => getAllTags(), []);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [citeOpen, setCiteOpen] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filteredPublications = useMemo(() => {
    const q = search.trim().toLowerCase();
    return publications.filter((pub) => {
      const yearMatch = selectedYear === null || pub.year === selectedYear;
      const searchMatch =
        q === "" ||
        `${pub.title} ${pub.authors} ${pub.venue} ${pub.year}`.toLowerCase().includes(q);
      const tags = tagsById.get(pub.id) ?? [];
      const tagMatch = selectedTags.length === 0 || selectedTags.some((t) => tags.includes(t));
      return yearMatch && searchMatch && tagMatch;
    });
  }, [publications, selectedYear, search, selectedTags, tagsById]);

  const toggleTag = (tag: string) =>
    setSelectedTags((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]));

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Publications</h1>
        <p className="text-slate-600 dark:text-gray-300 text-lg">
          Our research publications displayed chronologically (most recent first). For a complete list, visit our{" "}
          <a
            href="https://scholar.google.com/citations?hl=en&user=UEHiYcoAAAAJ"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar profile
          </a>
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8 space-y-5"
      >
        <div className="flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-[240px]">
            <label className="text-slate-700 dark:text-gray-300 text-sm font-medium mb-2 block">Search:</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Title, author, venue, or year…"
                className="w-full px-3 py-2 pr-9 bg-white/80 dark:bg-gray-800 border border-slate-200/60 dark:border-gray-600 rounded-lg text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="text-slate-700 dark:text-gray-300 text-sm font-medium mb-2 block">Filter by year:</label>
            <select
              value={selectedYear || ""}
              onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
              className="w-44 px-3 py-2 bg-white/80 dark:bg-gray-800 border border-slate-200/60 dark:border-gray-600 rounded-lg text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Topic tags */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <label className="text-slate-700 dark:text-gray-300 text-sm font-medium">Filter by topic:</label>
            {selectedTags.length > 0 && (
              <button onClick={() => setSelectedTags([])} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                Clear ({selectedTags.length})
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    active
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white/70 dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Publications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {filteredPublications.length === 0 ? (
          <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 dark:text-gray-400 text-lg">No publications found with the selected filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredPublications.map((pub, index) => {
            const tags = tagsById.get(pub.id) ?? [];
            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, x: -30, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: "easeOut" }}
                className="relative"
                style={{ zIndex: citeOpen === pub.id ? 30 : undefined }}
              >
                <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg hover:shadow-xl rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline decoration-2 underline-offset-4 mb-3 leading-relaxed block"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 leading-relaxed">
                            {pub.title}
                          </h3>
                        )}
                        <p className="text-slate-600 dark:text-gray-300 mb-3 text-sm">{pub.authors}</p>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">{pub.venue}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-6">
                        <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">{pub.year}</span>
                      </div>
                    </div>

                    {/* Tags + Cite toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                              selectedTags.includes(tag)
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setCiteOpen((c) => (c === pub.id ? null : pub.id))}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 bg-white/70 dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 11h8M8 15h5M5 5h14v14H5z" />
                          </svg>
                          Cite this
                        </button>

                        {citeOpen === pub.id && (
                          <div className="absolute right-0 mt-2 w-44 z-10 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl p-1.5">
                            <button
                              onClick={() => copy(toBibTeX(pub), `${pub.id}-bib`)}
                              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              {copied === `${pub.id}-bib` ? "✓ Copied!" : "Copy BibTeX"}
                            </button>
                            <button
                              onClick={() => copy(toAPA(pub), `${pub.id}-apa`)}
                              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              {copied === `${pub.id}-apa` ? "✓ Copied!" : "Copy APA"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
