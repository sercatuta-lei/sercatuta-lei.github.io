"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const news = [
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
    headline: "Congratulations to Jack, Xiaolei & Qiping who have their paper titled \"MagicMirror: Towards High-Coverage Fuzzing of Smart Contracts\", being accepted into ICST 2023. ICST is a major conference in Software Testing, and smart contract is an exciting application domain.",
  },
  {
    date: "July 11, 2022",
    headline: "Congratulations to Mengfei who has her extension work of the first project being accepted by ACM Journal Digital Threats: Research and Practice, titled \"Security Analysis of Zigbee Protocol Implementation\".",
  },
  {
    date: "June 17, 2022",
    headline: "Sunny and Jagan's paper, titled \"DeltaExplainer: A Software Debugging Approach to Generating Counterfactual Explanations\", has been accepted to AITest 2022",
  },
  {
    date: "April 22, 2022",
    headline: "Ankita has successfully defended her Master's thesis.",
  },
  {
    date: "November 9, 2021",
    headline: "The National Institute Of Standards and Technology (NIST) supports our work on Explaining and Debugging decisions made by machine learning models with a three-year, $385,000 grant.",
  },
  {
    date: "August 18, 2021",
    headline: "Congratulations to Jaganmohan Chandrasekaran who has successfully defended his Ph.D. dissertation titled \"Testing AI-based Software Systems\".",
  },
  {
    date: "May 24, 2021",
    headline: "Congratulations to Xiaolei Ren, Dr. Jiang Ming, and Dr. Jeff Lei who won the PLDI 2021 Distinguished Paper Award for their paper Unleashing the Hidden Power of Compiler Optimization on Binary Code Difference: An Empirical Study. PLDI is the flagship conference in the field of programming languages and programming systems research.",
  },
  {
    date: "May 15, 2021",
    headline: "Congratulations to Feng Duan who has successfully defended his Ph.D. dissertation.",
  },
  {
    date: "May 15, 2021",
    headline: "Congratulations to Huadong (Jack) Feng who has successfully defended his Ph.D. dissertation.",
  },
  {
    date: "May 6, 2021",
    headline: "Congratulations to Mengfei who has her first paper accepted by WiSec'21. Her paper is titled as Z-Fuzzer: Device-agnostic Fuzzing of Zigbee Protocol Implementation.",
  },
  {
    date: "May 6, 2021",
    headline: "Congratulations to Xiaolei who has his first paper accepted by PLDI'21. His paper is titled as Unleashing the Hidden Power of Compiler Optimization on Binary Code Difference: An Empirical Study.",
  },
  {
    date: "May 5, 2021",
    headline: "Congratulations to Jagan who has received the \"Summer 2021 Dissertation Fellowship\" award at UTA.",
  },
  {
    date: "January 27, 2021",
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
             whileHover={{ y: -5, scale: 1.02 }}
           >
                         <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg hover:shadow-2xl rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 backdrop-blur-sm group cursor-pointer hover:border-blue-300 dark:hover:border-blue-600">
               <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row md:items-start gap-4">
                   {/* Date */}
                   <div className="flex-shrink-0">
                     <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                       {item.date}
                     </span>
                   </div>
                   
                   {/* Content */}
                   <div className="flex-1">
                     <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300">
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
                 <motion.div 
           className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-600/20 dark:to-purple-600/20 border border-blue-500/30 dark:border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm group"
           whileHover={{ scale: 1.02, y: -2 }}
           transition={{ duration: 0.3 }}
         >
           <Link 
             href="/" 
             className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
           >
             <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
             Back to Home
           </Link>
         </motion.div>
      </motion.div>
    </div>
  );
} 
