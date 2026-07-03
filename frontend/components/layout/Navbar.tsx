"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30">
            <Search className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              PricePilot
            </h1>

            <p className="text-xs text-slate-500">
              AI Price Comparison
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-300"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-300"
          >
            Products
          </Link>

          <Link
            href="/analytics"
            className="font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-300"
          >
            Analytics
          </Link>

          <Link
            href="/compare"
            className="font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-300"
          >
            Compare
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          <button className="hidden items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 lg:flex">
            Login
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-105">
            <Sparkles size={16} />
            Get Started
          </button>

        </div>
      </div>
    </motion.header>
  );
}