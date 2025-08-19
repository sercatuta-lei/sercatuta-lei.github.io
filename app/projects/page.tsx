"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "./data";

export default function ProjectsPage() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">Research Projects</h1>
        <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover our ongoing and completed research projects across various domains including AI/ML, Security, IoT, Blockchain, and Software Testing.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Card className="h-full bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg hover:shadow-xl rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">
<<<<<<< HEAD
                        {project.link ? (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                          >
                            {project.name}
                          </a>
                        ) : (
                          project.name
                        )}
=======
                        {project.name}
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {expandedProjects.has(project.id) ? project.summary : truncateText(project.summary)}
                  </p>

                  {expandedProjects.has(project.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 mb-4"
                    >
                    </motion.div>
                  )}

                  <div className="mt-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleProject(project.id)}
                        className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30 hover:bg-blue-600/10 dark:hover:bg-blue-400/10"
                      >
                        {expandedProjects.has(project.id) ? "Show Less" : "Learn More"}
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 