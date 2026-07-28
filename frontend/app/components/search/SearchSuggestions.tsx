"use client";

import { useEffect, useRef, useMemo } from "react";
import { Search, TrendingUp, History, Clock, Sparkles } from "lucide-react";
import { getSearchHistory } from "@/services/history.service";
import { getToken } from "@/services/auth.service";

// Comprehensive product suggestions covering popular shopping items
const PRODUCT_SUGGESTIONS = [
  // Phones
  "iPhone 16", "iPhone 16 Pro", "iPhone 16 Pro Max", "iPhone 15",
  "Samsung Galaxy S25", "Samsung Galaxy S25 Ultra", "Samsung Galaxy S24",
  "Samsung Galaxy A55", "Samsung Galaxy M34",
  "OnePlus 13", "OnePlus 12", "OnePlus Nord 4",
  "Google Pixel 9", "Google Pixel 9 Pro",
  "Redmi Note 13 Pro", "Redmi 13C",
  "Vivo V40", "Vivo T3",
  "Realme GT 6T", "Realme Narzo 70",
  "iQOO 13", "iQOO Neo 9 Pro",
  "Nothing Phone 2a",
  "Motorola Edge 50",

  // Laptops
  "MacBook Air M3", "MacBook Air M2", "MacBook Pro M3",
  "MacBook Pro 14 inch", "MacBook Pro 16 inch",
  "HP Pavilion laptop", "HP Victus gaming laptop", "HP Spectre",
  "Dell Inspiron 15", "Dell XPS 13", "Dell G15 gaming",
  "Lenovo IdeaPad", "Lenovo ThinkPad", "Lenovo Legion gaming",
  "ASUS Vivobook", "ASUS ROG Strix", "ASUS Zenbook",
  "Acer Aspire", "Acer Nitro gaming laptop",
  "MSI gaming laptop",
  "Laptop under 30000", "Laptop under 50000", "Laptop under 70000",
  "Gaming laptop", "Laptop for students",

  // Tablets
  "iPad Air", "iPad Pro", "iPad Mini",
  "Samsung Galaxy Tab S9", "Samsung Galaxy Tab A9",
  "OnePlus Pad",

  // Audio
  "Sony WH-1000XM5", "Sony WF-1000XM5",
  "Apple AirPods Pro", "Apple AirPods 4",
  "Samsung Galaxy Buds",
  "JBL headphones", "JBL speaker", "JBL Flip 6",
  "boAt headphones", "boAt earbuds", "boAt speaker",
  "Noise earbuds", "Noise smart watch",
  "Bose headphones", "Bose speaker",
  "Marshall speaker",

  // Watches
  "Apple Watch Series 9", "Apple Watch Ultra",
  "Samsung Galaxy Watch 6",
  "Noise smart watch", "Fire-Boltt smart watch",
  "Titan watch", "Fastrack watch",
  "Casio watch", "G-Shock watch",

  // Shoes
  "Nike shoes", "Nike Air Max", "Nike Air Force 1", "Nike Jordan",
  "Nike running shoes", "Nike casual shoes",
  "Adidas shoes", "Adidas Ultraboost", "Adidas Originals",
  "Puma shoes", "Puma running shoes",
  "Reebok shoes",
  "Skechers shoes",
  "New Balance shoes",
  "Crocs",
  "Running shoes under 2000", "Running shoes under 5000",

  // Fashion
  "Men t-shirt", "Women dress", "Formal shirt",
  "Jeans", "Cargo pants", "Track pants",
  "Kurta", "Kurti", "Saree", "Lehenga",
  "Winter jacket", "Hoodie",
  "Sunglasses", "Ray-Ban sunglasses",
  "Backpack", "Handbag",

  // Gaming
  "PS5", "PlayStation 5", "PS5 controller",
  "Xbox Series X", "Xbox controller",
  "Nintendo Switch",
  "Gaming mouse", "Gaming keyboard", "Gaming chair",
  "Gaming monitor 144Hz",

  // Home & Kitchen
  "Air purifier", "Water purifier",
  "Washing machine", "Refrigerator",
  "Microwave oven", "Air fryer",
  "Mixer grinder", "Instant pot",
  "Vacuum cleaner", "Robot vacuum",

  // TV & Displays
  "Smart TV 43 inch", "Smart TV 55 inch",
  "Samsung TV", "LG TV", "Sony TV", "Mi TV",
  "Monitor 27 inch", "Monitor 4K",

  // Cameras
  "Canon DSLR", "Nikon DSLR",
  "Sony Alpha camera", "GoPro",
  "Fujifilm Instax",

  // Accessories
  "Power bank", "Wireless charger",
  "Phone case", "Screen protector",
  "USB C cable", "HDMI cable",
  "Keyboard", "Mouse", "Webcam",
  "External hard drive", "Pen drive", "SSD",
];

const TRENDING = [
  "iPhone 16 Pro",
  "MacBook Air M3",
  "Nike Air Force 1",
  "Samsung Galaxy S25",
  "Sony WH-1000XM5",
  "PS5",
  "Air fryer",
  "Smart watch",
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
  const recentSearches = useMemo(() => {
    return getToken()
      ? [...new Set(getSearchHistory().slice(0, 5).map((h) => h.query))]
      : [];
  }, []);

  // Filter suggestions based on query — prefix match first, then includes
  const filteredSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // Only prefix matches — suggestion must START with the query
    // This is how Google/Amazon autocomplete works
    const prefixMatches = PRODUCT_SUGGESTIONS.filter((s) =>
      s.toLowerCase().startsWith(q)
    );

    return prefixMatches.slice(0, 8);
  }, [query]);

  // Filter recent searches
  const filteredRecent = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recentSearches.slice(0, 3);
    return recentSearches.filter((s) =>
      s.toLowerCase().includes(q)
    ).slice(0, 3);
  }, [query, recentSearches]);

  // When query is empty, show trending + recent
  const showTrending = !query.trim();

  // Don't show if nothing to display
  if (!showTrending && filteredSuggestions.length === 0 && filteredRecent.length === 0) {
    return null;
  }

  // Highlight matching part in suggestion
  const highlightMatch = (text: string) => {
    const q = query.trim();
    if (!q) return text;

    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;

    return (
      <>
        {text.slice(0, idx)}
        <span className="font-bold text-teal-600 dark:text-teal-400">
          {text.slice(idx, idx + q.length)}
        </span>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-full z-40 mt-2 max-h-[400px] overflow-y-auto overflow-x-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
    >
      {/* Recent Searches */}
      {filteredRecent.length > 0 && (
        <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
            <Clock size={12} />
            Recent
          </p>
          <div className="space-y-0.5">
            {filteredRecent.map((item, i) => (
              <button
                key={`recent-${i}`}
                onClick={() => onSelect(item)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <History size={14} className="shrink-0 text-slate-400" />
                {highlightMatch(item)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Autocomplete Suggestions (when typing) */}
      {filteredSuggestions.length > 0 && (
        <div className="px-4 py-3">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
            <Sparkles size={12} />
            Suggestions
          </p>
          <div className="space-y-0.5">
            {filteredSuggestions.map((item, i) => (
              <button
                key={`suggest-${i}`}
                onClick={() => onSelect(item)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Search size={14} className="shrink-0 text-slate-400" />
                {highlightMatch(item)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trending (when input is empty) */}
      {showTrending && (
        <div className="px-4 py-3">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
            <TrendingUp size={12} />
            Trending
          </p>
          <div className="space-y-0.5">
            {TRENDING.map((item, i) => (
              <button
                key={`trending-${i}`}
                onClick={() => onSelect(item)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <TrendingUp size={14} className="shrink-0 text-teal-500" />
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
