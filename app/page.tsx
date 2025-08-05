"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const news = [
  {
    date: "August 25, 2023",
    keyword: "New Lab Member!",
    headline: "Welcome Pujan Budhathoki to our lab as a Ph.D. student.",
  },
  {
    date: "July 31, 2023",
    keyword: "New Published Paper!",
    headline: "Qiping, Fadule & Jack have their paper titled &quot;SmartExecutor: Coverage-Driven Symbolic Execution Guided by a Function Dependency Graph&quot;, being accepted by BRAINS 2023.",
  },
  {
    date: "March 1, 2023",
    keyword: "New Lab Member!",
    headline: "Welcome Arjun Dahal to our lab as a Ph.D. student.",
  },
  {
    date: "December 20, 2022",
    keyword: "New Published Paper!",
    headline: "Jack, Xiaolei & Qiping have their paper titled &quot;MagicMirror: Towards High-Coverage Fuzzing of Smart Contracts&quot;, being accepted into ICST 2023.",
  },
  {
    date: "July 11, 2022",
    keyword: "New Published Paper!",
    headline: "Mengfei has her extension work of the first project being accepted by ACM Journal Digital Threats: Research and Practice.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Software Engineering Research Center
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Software Engineering Research Group at the University of Texas at Arlington
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                asChild
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/team">Meet Our Team</Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-300"
              >
                <Link href="/publications">View Research</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-50/50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-6">
              Advancing Software Engineering Research
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our research group conducts cutting-edge research in software engineering, 
              focusing on software design, specification, analysis, verification, and testing. 
              We&apos;re part of the Software Engineering Research Center (SERC) at UTA.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500 p-8 rounded-xl max-w-4xl mx-auto shadow-sm"
          >
            <p className="text-xl font-semibold text-slate-800 dark:text-white text-center">
              <strong>We are looking for passionate new PhD students and Master students to join the team</strong>{" "}
              <Link href="/future" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                (more info)
              </Link>{" "}
              !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Research Areas
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              We focus on cutting-edge research in software engineering and related fields
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Software Testing",
                description: "Advanced testing methodologies and automated test generation",
                icon: "🧪",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Program Analysis",
                description: "Static and dynamic analysis techniques for software verification",
                icon: "🔍",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Smart Contracts",
                description: "Security analysis and testing of blockchain applications",
                icon: "⛓️",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "IoT Security",
                description: "Security analysis of Internet of Things protocols",
                icon: "🏠",
                color: "from-orange-500 to-red-500"
              },
              {
                title: "AI/ML Testing",
                description: "Testing and verification of machine learning systems",
                icon: "🤖",
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "Software Security",
                description: "Vulnerability analysis and security testing methodologies",
                icon: "🔒",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${area.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {area.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                      {area.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50/50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Research Impact
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our research contributions and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50+", label: "Published Papers", icon: "📄" },
              { number: "20+", label: "PhD Graduates", icon: "🎓" },
              { number: "15+", label: "Active Projects", icon: "🔬" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Latest News
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with our latest research achievements and lab activities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(0, 6).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                      {item.date}
                    </p>
                    <p className="text-slate-800 dark:text-white text-sm leading-relaxed">
                      <span className="font-semibold text-slate-800 dark:text-white">{item.keyword}</span>{" "}
                      {item.headline}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/allnews"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All News
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
