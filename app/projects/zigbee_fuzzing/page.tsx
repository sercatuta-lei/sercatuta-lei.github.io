"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ZigbeeFuzzingPage() {
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
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Fuzz Testing of Zigbee Protocol Implementation</h1>
        <div className="flex items-center gap-4 mb-6">
          <Badge className="bg-green-500 text-white">IoT</Badge>
          <Badge className="bg-green-500 text-white">Active</Badge>
          <span className="text-slate-600 dark:text-gray-300">Lead by Mengfei Ren</span>
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
              Zigbee protocol is one of global most popular IoT wireless standards used by million devices and customers. 
              It has also been deployed in NASA Mars mission as communication radio between flying drone and Perseverance rover.
            </p>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
              Recently, server vulnerabilities in Zigbee protocol implementations have compromised IoT devices from different 
              manufacturers. It becomes imperative to perform security testing on Zigbee protocol implementations. Thus, 
              this research project aims to apply existing state-of-art vulnerability detection techniques, such as fuzzing 
              and data flow analysis, to Zigbee protocol implementations.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Why Zigbee */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Why Zigbee?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-slate-800 dark:text-white font-semibold mb-3">Low-Power IoT Communication</h4>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  Though WiFi and Bluetooth have been worked very well for many years, they are not ideal communication 
                  solutions for resource-constraint IoT devices. Zigbee is designed as a low-power, low-cost, and 
                  low-speed wireless protocol, for the communication between resource-constraint embedded devices.
                </p>
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-white font-semibold mb-3">Security Challenges</h4>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  However, when both simplicity and low cost are goals, security often suffers since productivity has 
                  high priority and security service may have limited resources. Fuzz testing is a mainstream for 
                  assessing security problems since 2000.
                </p>
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
              <div className="p-4 bg-slate-100/60 dark:bg-gray-800 rounded-xl">
                <h4 className="text-slate-800 dark:text-white font-semibold mb-2">
                  Intelligent Zigbee Protocol Fuzzing via Constraint-Field Dependency Inference
                </h4>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-2">
                  Mengfei Ren, Haotian Zhang, Xiaolei Ren, Jiang Ming, Yu Lei
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">
                  Proceedings of the 2023 European Symposium of Research in Computer Security (ESORICS &apos;23)
                </p>
                <Badge className="bg-green-500 text-white text-xs">Just Accepted</Badge>
              </div>
              <div className="p-4 bg-slate-100/60 dark:bg-gray-800 rounded-xl">
                <h4 className="text-slate-800 dark:text-white font-semibold mb-2">
                  Security Analysis of Zigbee Protocol Implementation via Device-agnostic Fuzzing
                </h4>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-2">
                  Mengfei Ren, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">
                  ACM Digital Threats: Research and Practice, Volume 4, Issue 1, Article No.: 9pp 1–24
                </p>
                <div className="flex gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 dark:text-gray-400 text-xs">Functional</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 dark:text-gray-400 text-xs">Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 dark:text-gray-400 text-xs">Reproduced</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-100/60 dark:bg-gray-800 rounded-xl">
                <h4 className="text-slate-800 dark:text-white font-semibold mb-2">
                  Z-Fuzzer: Device-agnostic Fuzzing of Zigbee Protocol Implementation
                </h4>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-2">
                  Mengfei Ren, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">
                  Proceedings of the 14th ACM Conference on Security and Privacy in Wireless and Mobile Networks (WiSec &apos;21)
                </p>
                <div className="mt-2">
                  <h5 className="text-red-500 dark:text-red-400 font-medium text-sm mb-2">Zero-day Vulnerabilities Detected:</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-red-500 dark:text-red-400 border-red-500/30 dark:border-red-400/30 bg-red-500/10 dark:bg-red-400/10 text-xs">
                      <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27890" target="_blank" rel="noopener noreferrer">
                        CVE-2020-27890
                      </a>
                    </Badge>
                    <Badge variant="outline" className="text-red-500 dark:text-red-400 border-red-500/30 dark:border-red-400/30 bg-red-500/10 dark:bg-red-400/10 text-xs">
                      <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27891" target="_blank" rel="noopener noreferrer">
                        CVE-2020-27891
                      </a>
                    </Badge>
                    <Badge variant="outline" className="text-red-500 dark:text-red-400 border-red-500/30 dark:border-red-400/30 bg-red-500/10 dark:bg-red-400/10 text-xs">
                      <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27892" target="_blank" rel="noopener noreferrer">
                        CVE-2020-27892
                      </a>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technical Approach */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Technical Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-slate-800 dark:text-white font-semibold mb-3">Fuzzing Techniques</h4>
                <ul className="space-y-2 text-slate-600 dark:text-gray-300 text-sm">
                  <li>• Device-agnostic fuzzing approach</li>
                  <li>• Constraint-field dependency inference</li>
                  <li>• Intelligent protocol mutation</li>
                  <li>• Coverage-guided testing</li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-white font-semibold mb-3">Security Analysis</h4>
                <ul className="space-y-2 text-slate-600 dark:text-gray-300 text-sm">
                  <li>• Vulnerability detection in IoT devices</li>
                  <li>• Protocol implementation testing</li>
                  <li>• Zero-day vulnerability discovery</li>
                  <li>• Real-world impact assessment</li>
                </ul>
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">3</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Zero-day CVEs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">1000+</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">IoT Devices Tested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">3</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">ACM Badges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">NASA</div>
                <div className="text-slate-500 dark:text-gray-400 text-sm">Mars Mission</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 