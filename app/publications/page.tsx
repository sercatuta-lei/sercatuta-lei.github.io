"use client";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { publications } from "./data";

const years = [...new Set(publications.map(pub => pub.year))].sort((a, b) => b - a);

export default function PublicationsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const yearMatch = selectedYear === null || pub.year === selectedYear;
      const typeMatch = selectedType === "all" || pub.type === selectedType;
      return yearMatch && typeMatch;
    });
  }, [selectedYear, selectedType]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "conference": return "bg-blue-500";
      case "journal": return "bg-green-500";
      case "workshop": return "bg-purple-500";
      case "book": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "conference": return "Conference";
      case "journal": return "Journal";
      case "workshop": return "Workshop";
      case "book": return "Book Chapter";
      default: return type;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Publications</h1>
        <p className="text-slate-600 dark:text-gray-300 text-lg">
          For a full list of publications, visit our{" "}
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
        className="mb-8"
      >
        <div className="flex flex-wrap gap-6 items-end">
          <div>
            <label className="text-slate-700 dark:text-gray-300 text-sm font-medium mb-2 block">Filter by year:</label>
            <select
              value={selectedYear || ""}
              onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
              className="w-48 px-3 py-2 bg-white/80 dark:bg-gray-800 border border-slate-200/60 dark:border-gray-600 rounded-lg text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-slate-700 dark:text-gray-300 text-sm font-medium mb-2 block">Filter by type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-48 px-3 py-2 bg-white/80 dark:bg-gray-800 border border-slate-200/60 dark:border-gray-600 rounded-lg text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="conference">Conference</option>
              <option value="journal">Journal</option>
              <option value="workshop">Workshop</option>
              <option value="book">Book Chapter</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Publications List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-8"
      >
        {filteredPublications.length === 0 ? (
          <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 dark:text-gray-400 text-lg">No publications found with the selected filters.</p>
            </CardContent>
          </Card>
        ) : (
          (() => {
            // Group publications by type
            const groupedPublications = filteredPublications.reduce((groups, pub) => {
              const type = pub.type;
              if (!groups[type]) {
                groups[type] = [];
              }
              groups[type].push(pub);
              return groups;
            }, {} as Record<string, typeof filteredPublications>);

            // Sort types in desired order
            const typeOrder = ["conference", "journal", "workshop", "book"];
            
            return typeOrder.map(type => {
              const publications = groupedPublications[type];
              if (!publications || publications.length === 0) return null;

              return (
                <div key={type} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Badge className={`${getTypeColor(type)} text-white px-4 py-2 text-sm font-medium`}>
                      {getTypeLabel(type)}
                    </Badge>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-gray-600"></div>
                  </div>
                  
                  <div className="space-y-6">
                    {publications.map((pub, index) => (
                      <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, x: -50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          x: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg hover:shadow-xl rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm">
                          <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 leading-relaxed">
                                  {pub.title}
                                </h3>
                                <p className="text-slate-600 dark:text-gray-300 mb-3 text-sm">
                                  {pub.authors}
                                </p>
                                <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">
                                  {pub.venue}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-2 ml-6">
                                <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">{pub.year}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500 dark:text-gray-400 text-sm italic">
                                Link coming soon
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            });
          })()
        )}
      </motion.div>
    </div>
  );
} 