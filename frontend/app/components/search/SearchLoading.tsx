"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const STORES = ["Amazon", "Flipkart", "Myntra"];

const STORE_COLORS: Record<string, string> = {
  Amazon: "bg-amber-500",
  Flipkart: "bg-blue-500",
  Myntra: "bg-pink-500",
};

export default function SearchLoading() {
  const [currentStore, setCurrentStore] = useState(0);
  const [checkedStores, setCheckedStores] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStore((prev) => {
        const next = prev + 1;
        if (prev < STORES.length) {
          setCheckedStores((checked) => [...checked, STORES[prev]]);
        }
        return next >= STORES.length ? STORES.length - 1 : next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Progress indicator */}
      <div className="mb-12 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-teal-500 border-t-transparent" />
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-200">
            Comparing prices across stores...
          </p>
        </div>

        {/* Store progress */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {STORES.map((store, i) => {
            const isChecked = checkedStores.includes(store);
            const isCurrent = i === currentStore && !isChecked;

            return (
              <motion.div
                key={store}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{
                  opacity: isChecked || isCurrent ? 1 : 0.5,
                  scale: isCurrent ? 1.05 : 1,
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  isChecked
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : isCurrent
                    ? "bg-slate-100 text-slate-700 ring-2 ring-teal-500 dark:bg-slate-800 dark:text-slate-200"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                }`}
              >
                {isChecked ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : isCurrent ? (
                  <div className={`h-2.5 w-2.5 animate-pulse rounded-full ${STORE_COLORS[store]}`} />
                ) : (
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                )}
                {store}
              </motion.div>
            );
          })}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          This may take a few seconds as we check multiple stores for the best deals
        </p>
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
    </section>
  );
}
