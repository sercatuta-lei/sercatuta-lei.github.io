"use client";
import { Suspense, lazy } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Lazy load the publications component
const PublicationsContent = lazy(() => import('./PublicationsContent'));

// Loading skeleton component
function PublicationsLoading() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-12">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-6 items-end">
          <div className="w-48 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="w-48 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="bg-white/80 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
                <div className="flex flex-col items-end gap-2 ml-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function LazyPublications() {
  return (
    <Suspense fallback={<PublicationsLoading />}>
      <PublicationsContent />
    </Suspense>
  );
}
