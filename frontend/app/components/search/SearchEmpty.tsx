"use client";

import { SearchX } from "lucide-react";

interface SearchEmptyProps {
  query: string;
  notice?: string | null;
}

export default function SearchEmpty({ query, notice }: SearchEmptyProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-slate-100 p-6 dark:bg-slate-800">
          <SearchX size={48} className="text-slate-400" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-slate-800 dark:text-white">
          No results found
        </h3>
        <p className="max-w-md text-slate-500 dark:text-slate-400">
          {notice ? (
            notice
          ) : (
            <>
              We couldn&apos;t find any products matching &quot;{query}&quot;
              across our supported stores. Try a different search term.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
