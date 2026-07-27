"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { History, Trash2, Search, LogIn, X } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/home/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  SearchHistoryItem,
  getSearchHistory,
  removeFromHistory,
  clearHistory,
} from "@/services/history.service";

export default function HistoryPage() {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      setItems(getSearchHistory());
    }
  }, [isAuthenticated]);

  const handleRemove = (id: string) => {
    removeFromHistory(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    clearHistory();
    setItems([]);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <History size={40} className="text-slate-400" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
              Sign in to view search history
            </h2>
            <p className="mb-8 max-w-md text-slate-500 dark:text-slate-400">
              Keep track of your past searches and quickly revisit them anytime.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <LogIn size={18} />
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Search History
              </h1>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {items.length} {items.length === 1 ? "search" : "searches"} recorded
              </p>
            </div>

            {items.length > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="mb-6 rounded-full bg-slate-100 p-6 dark:bg-slate-800">
                <History size={48} className="text-slate-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-700 dark:text-slate-300">
                No search history yet
              </h3>
              <p className="mb-6 max-w-sm text-slate-500">
                Your searches will appear here after you compare products.
              </p>
              <Link
                href="/"
                className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 font-semibold text-white transition hover:scale-105"
              >
                Start Searching
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-950">
                    <Search size={18} className="text-teal-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {item.query}
                    </p>
                    <p className="text-sm text-slate-500">
                      {item.resultsCount} results &middot;{" "}
                      {new Date(item.searchedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <Link
                    href={`/?q=${encodeURIComponent(item.query)}`}
                    className="shrink-0 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    Search Again
                  </Link>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
