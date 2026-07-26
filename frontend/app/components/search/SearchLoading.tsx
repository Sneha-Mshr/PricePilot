"use client";

import { motion } from "framer-motion";

export default function SearchLoading() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Header skeleton */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 h-8 w-72 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="mx-auto h-5 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Source tabs skeleton */}
      <div className="mb-8 flex justify-center gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Searching message */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
          <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
            Searching across Amazon, Flipkart & Myntra...
          </p>
        </div>
        <p className="text-sm text-slate-500">
          This may take a few seconds as we check multiple stores
        </p>
      </div>
    </section>
  );
}
