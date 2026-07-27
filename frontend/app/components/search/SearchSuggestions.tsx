"use client";

import { useEffect, useRef } from "react";
import { Search, TrendingUp, History, Clock } from "lucide-react";
import { getSearchHistory } from "@/services/history.service";
import { getToken } from "@/services/auth.service";

const POPULAR_SEARCHES = [
  "iPhone 16",
  "MacBook Air",
  "Nike Shoes",
  "Samsung Galaxy S25",
  "Sony Headphones",
  "Laptop under 50000",
  "Running Shoes",
  "Smart Watch",
];

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export default function SearchSuggestions({
  query,
  onSelect,
  onClose,
}: SearchSuggestionsProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Get recent searches if logged in
  const recentSearches = getToken()
    ? getSearchHistory()
        .slice(0, 5)
        .map((h) => h.query)
    : [];

  // Filter suggestions based on query
  const filteredPopular = query.trim()
    ? POPULAR_SEARCHES.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : POPULAR_SEARCHES;

  const filteredRecent = query.trim()
    ? recentSearches.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : recentSearches;

  // Don't show if nothing to display
  if (filteredPopular.length === 0 && filteredRecent.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
    >
      {/* Recent Searches */}
      {filteredRecent.length > 0 && (
        <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
            <Clock size={12} />
            Recent
          </p>
          <div className="space-y-1">
            {filteredRecent.map((item) => (
              <button
                key={item}
                onClick={() => onSelect(item)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <History size={14} className="shrink-0 text-slate-400" />
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Searches */}
      <div className="px-4 py-3">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
          <TrendingUp size={12} />
          Popular
        </p>
        <div className="space-y-1">
          {filteredPopular.slice(0, 5).map((item) => (
            <button
              key={item}
              onClick={() => onSelect(item)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Search size={14} className="shrink-0 text-slate-400" />
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
