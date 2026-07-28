"use client";

import { motion } from "framer-motion";
import { Trophy, IndianRupee, TrendingDown } from "lucide-react";
import { SearchResponse } from "@/types/search";

interface BestDealBannerProps {
  data: SearchResponse;
}

export default function BestDealBanner({ data }: BestDealBannerProps) {
  // Find cheapest product with a valid price
  const productsWithPrice = data.products.filter(
    (p) => p.price && !isNaN(parseFloat(p.price))
  );

  if (productsWithPrice.length < 2) return null;

  const sorted = [...productsWithPrice].sort(
    (a, b) => parseFloat(a.price) - parseFloat(b.price)
  );

  const cheapest = sorted[0];
  const secondCheapest = sorted.find((p) => p.source !== cheapest.source);

  if (!secondCheapest) return null;

  const bestPrice = parseFloat(cheapest.price);
  const nextPrice = parseFloat(secondCheapest.price);
  const savings = nextPrice - bestPrice;

  if (savings <= 0) return null;

  const formatPrice = (price: number) => price.toLocaleString("en-IN");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mb-6 max-w-4xl rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 shadow-sm dark:border-teal-800 dark:from-teal-950 dark:to-cyan-950"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 text-center">
        <Trophy size={20} className="text-teal-600 dark:text-teal-400" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Best price:
        </span>
        <span className="inline-flex items-center font-bold text-teal-700 dark:text-teal-300">
          <IndianRupee size={14} />
          {formatPrice(bestPrice)}
        </span>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          on <span className="font-semibold">{cheapest.source}</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900 dark:text-green-300">
          <TrendingDown size={12} />
          ₹{formatPrice(savings)} cheaper than {secondCheapest.source}
        </span>
      </div>
    </motion.div>
  );
}
