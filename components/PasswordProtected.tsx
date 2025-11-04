"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PasswordProtectedProps {
  children: ReactNode;
}

export default function PasswordProtected({ children }: PasswordProtectedProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(true);

  // Password hash (SHA-256 of "425SEL@bRC")
  const PASSWORD_HASH = "fe09819b017626806fc8b09ab5339098ea80dbd3cd36a5a8b0aeab94381c98bf";
  const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    // Check if session is still valid
    const sessionTimestamp = localStorage.getItem("sessionTimestamp");
    if (sessionTimestamp) {
      const now = Date.now();
      const elapsed = now - parseInt(sessionTimestamp);
      
      if (elapsed < SESSION_DURATION) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("sessionTimestamp");
      }
    }
    setIsChecking(false);
  }, []);

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter a password");
      return;
    }

    const hash = await hashPassword(password);
    
    if (hash === PASSWORD_HASH) {
      localStorage.setItem("sessionTimestamp", Date.now().toString());
      setIsAuthenticated(true);
      setPassword("");
    } else {
      setError("Invalid password. Please try again.");
      setPassword("");
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-lg text-slate-600 dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div
          key="login"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto py-12 px-4"
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-slate-200/60 dark:border-gray-800 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  Protected Content
                </h2>
                <p className="text-slate-600 dark:text-gray-300">
                  Enter password to access PhD student updates
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Enter
                </Button>
              </form>

              <div className="mt-6 text-center text-xs text-slate-500 dark:text-gray-400">
                Session expires after 5 minutes of inactivity
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

