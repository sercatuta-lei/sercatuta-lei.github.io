"use client";

export default function ArchivePage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-slate-800 dark:text-white">PhD Student Weekly Archive</h1>
      <p className="text-lg text-slate-600 dark:text-gray-300 mb-10 text-center">Access archived weekly updates from our PhD students. (Password protection coming soon)</p>
      <div className="rounded-xl shadow-lg bg-white/80 dark:bg-gray-900 p-6 border border-slate-200/60 dark:border-gray-800 text-center backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <div className="font-semibold text-lg mb-2 text-slate-800 dark:text-white">Protected Content</div>
        <div className="text-slate-600 dark:text-gray-300">This section will be password protected in the future. Please check back soon.</div>
      </div>
    </div>
  );
} 