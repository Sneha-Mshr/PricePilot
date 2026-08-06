"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, Heart, LogIn, Search, TrendingUp } from "lucide-react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/home/Footer";
import { useAuth } from "@/context/AuthContext";
import { getSearchHistory } from "@/services/history.service";
import { getWishlist } from "@/services/wishlist.service";

interface Stats {
  totalSearches: number;
  uniqueQueries: number;
  avgResults: number;
  wishlistCount: number;
  topQueries: { query: string; count: number }[];
}

export default function AnalyticsPage() {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const history = getSearchHistory();
    const wishlist = getWishlist();

    const counts = new Map<string, number>();
    for (const item of history) {
      const key = item.query.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    const topQueries = [...counts.entries()]
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const totalResults = history.reduce((sum, h) => sum + h.resultsCount, 0);

    setStats({
      totalSearches: history.length,
      uniqueQueries: counts.size,
      avgResults: history.length
        ? Math.round(totalResults / history.length)
        : 0,
      wishlistCount: wishlist.length,
      topQueries,
    });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
          <div className="mb-6 rounded-full bg-slate-100 p-6 dark:bg-slate-800">
            <BarChart3 size={48} className="text-slate-400" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-slate-800 dark:text-white">
            Sign in to see your insights
          </h1>
          <p className="mb-8 max-w-md text-center text-slate-500 dark:text-slate-400">
            Your search analytics are built from your own activity.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 font-semibold text-white transition hover:scale-105"
          >
            <LogIn size={18} />
            Log in
          </Link>
        </main>
      </>
    );
  }

  const cards = [
    { label: "Total searches", value: stats?.totalSearches ?? 0, icon: Search },
    { label: "Unique products", value: stats?.uniqueQueries ?? 0, icon: TrendingUp },
    { label: "Avg. results / search", value: stats?.avgResults ?? 0, icon: BarChart3 },
    { label: "Saved items", value: stats?.wishlistCount ?? 0, icon: Heart },
  ];

  const maxCount = stats?.topQueries[0]?.count ?? 1;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <section className="mx-auto max-w-7xl px-6 py-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Your Shopping Insights
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Based on your search history on this device.
            </p>
          </motion.div>

          {/* Stat cards */}
          <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
              >
                <Icon size={22} className="mb-4 text-teal-500" />
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {value}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Most searched */}
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            Most searched
          </h2>

          {stats && stats.topQueries.length > 0 ? (
            <div className="space-y-4 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              {stats.topQueries.map(({ query, count }) => (
                <div key={query} className="flex items-center gap-4">
                  <span className="w-40 shrink-0 truncate text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
                    {query}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-sm font-semibold text-slate-500">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800">
              Search for a few products and your insights will show up here.
            </p>
          )}

        </section>

        <Footer />
      </main>
    </>
  );
}
