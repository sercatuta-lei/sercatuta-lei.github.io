"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function SmartContractsPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Button asChild variant="outline" size="sm" className="text-slate-700 dark:text-white border-slate-300 dark:border-gray-600">
            <Link href="/projects">← Back to Projects</Link>
          </Button>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Security Analysis of Ethereum Smart Contracts</h1>
        <div className="flex items-center gap-4 mb-6">
          <Badge className="bg-yellow-500 text-white">Blockchain</Badge>
          <Badge className="bg-green-500 text-white">Active</Badge>
          <span className="text-slate-600 dark:text-gray-300">Lead by Qiping Wei</span>
        </div>
      </motion.div>

      {/* Project Description */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
              Ethereum blockchain is the decentralized platform for Ether (ETH, cryptocurrency ether) and smart contracts. 
              Ether is second only to Bitcoin in market capitalization. Smart contracts enable Ethereum to remove the need 
              for a third party to handle transactions between peers, which can reduce the time and save money.
            </p>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
              They are either all or part of the backends of the distributed applications (Dapps). Since smart contracts 
              are mainly involved in financially based transactions, security is a major concern for wide application. 
              The immutable nature makes this concern more serious as they are rather difficult to patch. Therefore, 
              security analysis of smart contracts is critical.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Key Research Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-slate-800 dark:text-white font-semibold mb-3">Smart Contract Security</h4>
                <ul className="space-y-2 text-slate-600 dark:text-gray-300 text-sm">
                  <li>• Vulnerability detection and analysis</li>
                  <li>• Automated security testing</li>
                  <li>• Formal verification methods</li>
                  <li>• Static and dynamic analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-white font-semibold mb-3">DeFi Security</h4>
                <ul className="space-y-2 text-slate-600 dark:text-gray-300 text-sm">
                  <li>• Decentralized finance protocols</li>
                  <li>• Flash loan attack prevention</li>
                  <li>• Reentrancy vulnerability detection</li>
                  <li>• Access control mechanisms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Publications */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Related Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-slate-100/60 dark:bg-gray-700 rounded-xl">
                <h4 className="text-slate-800 dark:text-white font-semibold mb-2">
                  SmartExecutor: Coverage-Driven Symbolic Execution Guided via State Prioritization and Function Selection
                </h4>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-2">
                  Qiping Wei, Fadul Sikder, Huadong Feng, Yu Lei, Raghu Kacker, Richard Kuhn
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  ACM Transactions on Software Engineering and Methodology (TOSEM)
                </p>
              </div>
              <div className="p-4 bg-slate-100/60 dark:bg-gray-700 rounded-xl">
                <h4 className="text-slate-800 dark:text-white font-semibold mb-2">
                  MagicMirror: Towards High-Coverage Fuzzing of Smart Contracts
                </h4>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-2">
                  Huadong Feng, Xiaolei Ren, Qiping Wei, Yu Lei, Raghu Kacker, D Richard Kuhn, Dimitris E Simos
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  Proceedings of the 2023 IEEE International Conference on Software Architecture (ICSA)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tools and Technologies */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Tools & Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30 bg-blue-600/10 dark:bg-blue-400/10">
                  Solidity
                </Badge>
                              <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30 bg-blue-600/10 dark:bg-blue-400/10">
                  Ethereum
                </Badge>
              <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30 bg-blue-600/10 dark:bg-blue-400/10">
                Symbolic Execution
              </Badge>
              <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30 bg-blue-600/10 dark:bg-blue-400/10">
                Fuzzing
              </Badge>
              <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30 bg-blue-600/10 dark:bg-blue-400/10">
                Static Analysis
              </Badge>
              <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30 bg-blue-600/10 dark:bg-blue-400/10">
                DeFi Protocols
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Impact */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Research Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">$2B+</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Protected Assets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">50+</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Vulnerabilities Found</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">100+</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Smart Contracts Analyzed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 