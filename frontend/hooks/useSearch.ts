"use client";

import { useState } from "react";
import { SearchResponse } from "@/types/search";
import { searchProducts } from "@/services/search.service";
import { addToHistory } from "@/services/history.service";
import { getToken } from "@/services/auth.service";

export default function useSearch() {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const search = async (query: string) => {
    if (!query || query.trim().length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const data = await searchProducts(query.trim());
      setResults(data);

      // Save to history if user is logged in
      if (getToken()) {
        addToHistory(query.trim(), data.total);
      }
    } catch (err: any) {
      console.error("Search error:", err);

      if (err.response?.status === 400) {
        setError(err.response.data.detail || "Invalid search query");
      } else {
        setError("Search failed. Please try again.");
      }

      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setSearched(false);
    setError("");
  };

  return {
    results,
    loading,
    error,
    searched,
    search,
    clearResults,
  };
}
