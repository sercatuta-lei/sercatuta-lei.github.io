"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
    headline: "Qiping, Fadule & Jack have their paper titled \"SmartExecutor: Coverage-Driven Symbolic Execution Guided by a Function Dependency Graph\", being accepted by BRAINS 2023.",
  },
  {
    date: "March 1, 2023",
    keyword: "New Lab Member!",
    headline: "Welcome Arjun Dahal to our lab as a Ph.D. student.",
  },
  {
    date: "December 20, 2022",
    keyword: "New Published Paper!",
    headline: "Jack, Xiaolei & Qiping have their paper titled \"MagicMirror: Towards High-Coverage Fuzzing of Smart Contracts\", being accepted into ICST 2023. ICST is a major conference in Software Testing, and smart contract is an exciting application domain.",
  },
  {
    date: "July 11, 2022",
    keyword: "New Published Paper!",
    headline: "Mengfei has her extension work of the first project being accepted by ACM Journal Digital Threats: Research and Practice, titled \"Security Analysis of Zigbee Protocol Implementation\".",
  },
  {
    date: "June 17, 2022",
    keyword: "New Published Paper!",
    headline: "Sunny and Jagan's paper, titled \"DeltaExplainer: A Software Debugging Approach to Generating Counterfactual Explanations\", has been accepted to AITest 2022",
  },
  {
    date: "April 22, 2022",
    keyword: "Thesis Defense!",
    headline: "Ankita has successfully defended her Master's thesis.",
  },
  {
    date: "November 9, 2021",
    keyword: "New NIST Grant!",
    headline: "The National Institute Of Standards and Technology (NIST) supports our work on Explaining and Debugging decisions made by machine learning models with a three-year, $385,000 grant.",
  },
  {
    date: "August 18, 2021",
    keyword: "Thesis Defense!",
    headline: "Jaganmohan Chandrasekaran has successfully defended his Ph.D. dissertation titled \"Testing AI-based Software Systems\".",
  },
  {
    date: "May 24, 2021",
    keyword: "Congratulation!",
    headline: "Xiaolei Ren, Dr. Jiang Ming, and Dr. Jeff Lei won the PLDI 2021 Distinguished Paper Award for their paper Unleashing the Hidden Power of Compiler Optimization on Binary Code Difference: An Empirical Study. PLDI is the flagship conference in the field of programming languages and programming systems research.",
  },
  {
    date: "May 15, 2021",
    keyword: "Thesis Defense!",
    headline: "Feng Duan has successfully defended his Ph.D. dissertation.",
  },
  {
    date: "May 15, 2021",
    keyword: "Thesis Defense!",
    headline: "Huadong (Jack) Feng has successfully defended his Ph.D. dissertation.",
  },
  {
    date: "May 6, 2021",
    keyword: "New Published Paper!",
    headline: "Mengfei has her first paper accepted by WiSec'21. Her paper is titled as Z-Fuzzer: Device-agnostic Fuzzing of Zigbee Protocol Implementation.",
  },
  {
    date: "May 6, 2021",
    keyword: "New Published Paper!",
    headline: "Xiaolei has his first paper accepted by PLDI'21. His paper is titled as Unleashing the Hidden Power of Compiler Optimization on Binary Code Difference: An Empirical Study.",
  },
  {
    date: "May 5, 2021",
    keyword: "New Summer Dissertation Fellowship Award!",
    headline: "Jagan has received the \"Summer 2021 Dissertation Fellowship\" award at UTA.",
  },
  {
    date: "January 27, 2021",
    keyword: "New Testing Tool!",
    headline: "Congratulations Jack for his excellent work on testing smart contracts. He has just finished an external release of a tool called MagicMirror. NIST will make a public release of the tool.",
  },
];

export default function AllNewsPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">News</h1>
        <p className="text-slate-600 dark:text-gray-300 text-lg">
          Stay updated with the latest news, publications, and achievements from Jeff Lei Lab.
        </p>
      </motion.div>

      {/* News List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {news.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg hover:shadow-xl rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Date */}
                  <div className="flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base">
                      {item.date}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-slate-800 dark:text-white font-bold text-sm md:text-base">
                        {item.keyword}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                      {item.headline}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-600/20 dark:to-purple-600/20 border border-blue-500/30 dark:border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm">
          <p className="text-slate-700 dark:text-gray-300 text-lg">
            ... and more exciting news to come!
          </p>
          <Link 
            href="/" 
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 