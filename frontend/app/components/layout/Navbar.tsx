"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, LogOut, Heart, History, ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "@/app/components/common/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-300"
          >
            Home
          </Link>

          <Link
            href="/wishlist"
            className="font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-300"
          >
            Wishlist
          </Link>

          <Link
            href="/history"
            className="font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-300"
          >
            History
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <ThemeToggle />

          {isAuthenticated && user ? (
            /* Logged in - Show user menu */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:border-teal-500 dark:border-slate-700"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-xs font-bold text-white">
                  {getInitials(user.name)}
                </div>
                <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-300 lg:block">
                  {user.name}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/wishlist"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Heart size={16} className="text-rose-500" />
                      My Wishlist
                    </Link>

                    <Link
                      href="/history"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <History size={16} className="text-blue-500" />
                      Search History
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 py-1 dark:border-slate-800">
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            /* Not logged in - Show login/signup buttons */
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-300 lg:flex"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-105 sm:flex"
              >
                <Sparkles size={16} />
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 lg:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Home
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Wishlist
              </Link>
              <Link
                href="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                History
              </Link>

              {!isAuthenticated && (
                <div className="flex gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 text-center font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
