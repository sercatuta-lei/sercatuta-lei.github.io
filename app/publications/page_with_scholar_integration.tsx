"use client";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getPublications } from "./data";

// Interface for Google Scholar fetched publications
interface ScholarPublication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  url: string;
  year: number;
  type: "conference" | "journal" | "workshop" | "book";
  citations?: number;
}

export default function PublicationsPage() {
  // State for managing publications
  const [existingPublications, setExistingPublications] = useState(getPublications());
  const [scholarPublications, setScholarPublications] = useState<ScholarPublication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [showScholarOnly, setShowScholarOnly] = useState(false);

  // Combined publications (existing + new from Scholar)
  const allPublications = useMemo(() => {
    if (showScholarOnly) {
      return scholarPublications;
    }
    
    // Merge existing and scholar publications, avoiding duplicates
    const existingTitles = new Set(existingPublications.map(pub => pub.title.toLowerCase()));
    const newFromScholar = scholarPublications.filter(pub => 
      !existingTitles.has(pub.title.toLowerCase())
    );
    
    return [...existingPublications, ...newFromScholar];
  }, [existingPublications, scholarPublications, showScholarOnly]);

  // Sort publications by year (most recent first)
  const sortedPublications = useMemo(() => {
    return allPublications.sort((a, b) => b.year - a.year);
  }, [allPublications]);

  // Get unique years for filtering
  const years = useMemo(() => 
    [...new Set(sortedPublications.map(pub => pub.year))].sort((a, b) => b - a), 
    [sortedPublications]
  );

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Filter publications by selected year
  const filteredPublications = useMemo(() => {
    return sortedPublications.filter(pub => {
      const yearMatch = selectedYear === null || pub.year === selectedYear;
      return yearMatch;
    });
  }, [sortedPublications, selectedYear]);

  // Fetch publications from Google Scholar
  const fetchScholarPublications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/scholar?author_id=UEHiYcoAAAAJ');
      const data = await response.json();
      
      if (data.success) {
        setScholarPublications(data.publications);
        setLastUpdate(new Date());
      } else {
        console.error('Failed to fetch publications:', data.message);
      }
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check for new publications on component mount
  useEffect(() => {
    fetchScholarPublications();
  }, []);

  // Auto-refresh every hour
  useEffect(() => {
    const interval = setInterval(() => {
      fetchScholarPublications();
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, []);

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
        <p className="text-slate-600 dark:text-gray-300 text-lg mb-6">
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

        {/* Control Panel */}
        <div className="bg-slate-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={fetchScholarPublications}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Updating...' : 'Check for New Publications'}
            </button>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showScholarOnly"
                checked={showScholarOnly}
                onChange={(e) => setShowScholarOnly(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="showScholarOnly" className="text-sm text-slate-600 dark:text-gray-300">
                Show only Google Scholar publications
              </label>
            </div>

            {lastUpdate && (
              <span className="text-sm text-slate-500 dark:text-gray-400">
                Last updated: {lastUpdate.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-slate-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Total Publications</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{allPublications.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-slate-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">From Google Scholar</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{scholarPublications.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-slate-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">New This Year</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {allPublications.filter(pub => pub.year === new Date().getFullYear()).length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Year Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedYear === null
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-600'
            }`}
          >
            All Years
          </button>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedYear === year
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-600'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Publications List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {filteredPublications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-gray-400 text-lg">
              No publications found for the selected year.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={`${pub.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            pub.type === 'conference' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            pub.type === 'journal' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            pub.type === 'workshop' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}>
                            {pub.type.charAt(0).toUpperCase() + pub.type.slice(1)}
                          </span>
                          {scholarPublications.some(sp => sp.id === pub.id) && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                              From Google Scholar
                            </span>
                          )}
                        </div>
                        
                        {pub.url ? (
                          <a 
                            href={pub.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white hover:underline mb-2">
                              {pub.title}
                            </h3>
                          </a>
                        ) : (
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                            {pub.title}
                          </h3>
                        )}
                        
                        <p className="text-slate-600 dark:text-gray-300 mb-2">
                          <strong>Authors:</strong> {pub.authors}
                        </p>
                        <p className="text-slate-600 dark:text-gray-300">
                          <strong>Venue:</strong> {pub.venue}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-6">
                        <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">{pub.year}</span>
                        {pub.citations !== undefined && (
                          <span className="text-slate-500 dark:text-gray-400 text-sm">
                            {pub.citations} citations
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!pub.url && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-slate-500 dark:text-gray-400 text-sm italic">
                          Link coming soon
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

