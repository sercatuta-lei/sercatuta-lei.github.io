"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";


// News data
const newsData = [
  {
  date: "January 2026",
  headline:"Congratulations to Krishna for his paper titled 'A Combinatorial Approach to Synthetic Data Generation for Machine Learning' that has been published in Springer Nature Computer Science.",
  },
  {
  date: "November 2025",
  headline: "Congratulations to Krishna for his paper titled 'ABLE: Using Adversarial Pairs to Construct Local Models for Explaining Model Predictions', which has been accepted by ACM SIGKDD 2026!",
  },
  {
    date: "July 14, 2025",
    headline: "Congratulations to Qiping who has successfully defended her Ph.D. dissertation titled 'Enhancing Symbolic Execution for Solidity Smart Contracts'.",
  },
  {
    date: "2025",
    headline: "Welcome Sampada to our lab as Volunteer Research Assistant.",
  },
  {
    date: "November 18, 2024",
    headline: "Congratulations to Sunny who has successfully defended his Ph.D. dissertation titled 'Leveraging Software Testing Techniques to Explain, Analyze, and Debug Machine Learning Models'.",
  },
  {
    date: "2024",
    headline: "Welcome Samreen to our lab as an M.S. Thesis student.",
  },
  {
    date: "January 2024",
    headline: "Welcome Shovon Niverd to our lab as a Ph.D. student.",
  },
  {
    date: "January 2024",
    headline: "Welcome Saif Uddin Mahmud to our lab as a Ph.D. student.",
  },
  {
    date: "August 25, 2023",
    headline: "Welcome Pujan Budhathoki to our lab as a Ph.D. student.",
  },
  {
    date: "July 31, 2023",
    headline: "Congratulations to Qiping, Fadule & Jack who have their paper titled \"SmartExecutor: Coverage-Driven Symbolic Execution Guided by a Function Dependency Graph\", being accepted by BRAINS 2023.",
  },
  {
    date: "March 1, 2023",
    headline: "Welcome Arjun Dahal to our lab as a Ph.D. student.",
  },
  {
    date: "December 20, 2022",
    headline: "Congratulations to Jack, Xiaolei & Qiping who have their paper titled \"MagicMirror: Towards High-Coverage Fuzzing of Smart Contracts\", being accepted into ICST 2023.",
  },
  {
    date: "July 11, 2022",
    headline: "Congratulations to Mengfei who has her extension work of the first project being accepted by ACM Journal Digital Threats: Research and Practice.",
  },
];

// Animation variants - moved outside component to prevent recreation

export default function Home() {
  // Research areas
  const research = [
    {
      title: "AI/ML Interpretability",
      description: "Making AI and machine learning models more transparent and explainable"
    },
    {
      title: "AI/ML Security and Privacy",
      description: "Security analysis and protection of artificial intelligence systems"
    },
    {
      title: "Testing and Debugging ML Models",
      description: "Developing techniques to test, debug, and ensure reliability of machine learning models"
    },
    {
      title: "Blockchain and IoT Security",
      description: "Security analysis of blockchain systems and Internet of Things protocols"
    },
    {
      title: "Software Testing",
      description: "Developing advanced techniques for automated software testing and verification"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24">
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
              Engineering Trustworthy AI and Software Systems
            </motion.h1>

                          <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
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
      <section className="py-8 bg-slate-50/50 dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-indigo-900/10"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >

            <div className="max-w-4xl mx-auto">
              <motion.p 
                className="text-xl text-slate-700 dark:text-gray-200 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our research focuses on developing <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">trustworthy AI and software systems</span>. We are particularly interested in the intersection of Artificial Intelligence (AI) and Software Engineering (SE).
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                      AI for Software Engineering
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                      We leverage AI techniques to improve the analysis, testing, and debugging of software systems
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                      Software Engineering for AI
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                      We apply SE methods to ensure the trustworthiness of AI models and software
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Research Areas
            </h2>

          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {research.map((area, index) => (
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



      {/* News Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Latest News
            </h2>

          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.slice(0, 6).map((item, idx) => (
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
