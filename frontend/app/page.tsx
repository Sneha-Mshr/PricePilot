"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Features from "@/app/components/home/Features";
import Categories from "@/app/components/home/Categories";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/home/Footer";
import SearchResults from "@/app/components/search/SearchResults";
import SearchLoading from "@/app/components/search/SearchLoading";
import SearchEmpty from "@/app/components/search/SearchEmpty";
import SearchSuggestions from "@/app/components/search/SearchSuggestions";
import PriceDropToast from "@/app/components/alerts/PriceDropToast";
import useSearch from "@/hooks/useSearch";
import { checkPriceDrops, PriceDropMatch } from "@/services/alerts.service";
import { getToken } from "@/services/auth.service";

function HomeContent() {
  const { results, loading: searchLoading, error: searchError, searched, search, clearResults } = useSearch();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [priceDrops, setPriceDrops] = useState<PriceDropMatch[]>([]);

  // Auto-search from shared URL (?q=...)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !searched) {
      setQuery(q);
      search(q);
    }
  }, [searchParams]);

  // Check for price drops when results come in
  useEffect(() => {
    if (results && results.products.length > 0 && getToken()) {
      const drops = checkPriceDrops(results.products);
      setPriceDrops(drops);
    }
  }, [results]);

  const handleSearch = () => {
    if (query.trim()) {
      search(query);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    clearResults();
    setPriceDrops([]);
    // Remove ?q= from URL
    window.history.replaceState(null, "", "/");
  };

  const handleCategoryClick = (categoryQuery: string) => {
    setQuery(categoryQuery);
    search(categoryQuery);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    search(suggestion);
    setShowSuggestions(false);
  };

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 dark:bg-slate-950">

        {/* ---------------- HERO ---------------- */}

        <section className="relative">

          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-teal-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />

          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2 text-sm shadow dark:border-slate-700 dark:bg-slate-900">
                <Sparkles size={16} className="text-teal-500" />
                AI Powered Shopping Assistant
              </div>

              <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">

                Compare Prices Across

                <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">

                  {" "}Every Store

                </span>

              </h1>

              <p className="mx-auto mt-8 max-w-3xl px-2 text-base text-slate-600 sm:text-lg lg:text-xl dark:text-slate-400">

                Search once and instantly compare prices from Amazon,
                Flipkart, Myntra and many more using AI.

              </p>

            </motion.div>

            {/* Search */}

            <div className="relative mt-12 w-full max-w-4xl">
              <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-slate-200 md:flex-row dark:bg-slate-900 dark:ring-slate-800">

                <input
                  className="flex-1 rounded-xl bg-transparent px-5 py-4 text-lg outline-none dark:text-white"
                  placeholder="Search iPhone 16, Nike Shoes, MacBook..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />

                {searched && (
                  <button
                    onClick={handleClear}
                    className="rounded-xl border border-slate-200 px-5 font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                  >
                    Clear
                  </button>
                )}

                <button
                  onClick={handleSearch}
                  disabled={searchLoading}
                  className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 font-semibold text-white transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {searchLoading ? "Searching..." : "Compare Prices"}
                </button>

              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && !searched && (
                <SearchSuggestions
                  query={query}
                  onSelect={handleSuggestionClick}
                  onClose={() => setShowSuggestions(false)}
                />
              )}
            </div>

            {/* Search error */}
            {searchError && (
              <p className="mt-4 text-sm font-medium text-red-500">{searchError}</p>
            )}



          </div>

        </section>

        {/* ---------------- SEARCH RESULTS ---------------- */}

        {searchLoading && <SearchLoading />}

        {/* Price Drop Alert Toast */}
        {searched && !searchLoading && priceDrops.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 pt-8">
            <PriceDropToast
              drops={priceDrops}
              onDismiss={() => setPriceDrops([])}
            />
          </div>
        )}

        {searched && !searchLoading && results && results.total > 0 && (
          <SearchResults data={results} />
        )}

        {searched && !searchLoading && results && results.total === 0 && (
          <SearchEmpty query={results.query} notice={results.notice} />
        )}

        {/* ---------------- BELOW: DEFAULT CONTENT (hidden during search) ---------------- */}

        {!searched && (
          <>
            <Categories onCategoryClick={handleCategoryClick} />

            <Features />
          </>
        )}

        <Footer />

      </main>
    </>
  );
}

// useSearchParams opts this tree into client-side rendering, so it needs a
// Suspense boundary for the route to prerender.
export default function Home() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="min-h-screen bg-slate-50 dark:bg-slate-950" />
        </>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
