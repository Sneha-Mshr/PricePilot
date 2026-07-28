"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, X, IndianRupee, ExternalLink } from "lucide-react";
import { PriceDropMatch } from "@/services/alerts.service";

interface PriceDropToastProps {
  drops: PriceDropMatch[];
  onDismiss: () => void;
}

export default function PriceDropToast({ drops, onDismiss }: PriceDropToastProps) {
  const [expanded, setExpanded] = useState(false);

  if (drops.length === 0) return null;

  const formatPrice = (price: number) => price.toLocaleString("en-IN");
  const visibleDrops = expanded ? drops : drops.slice(0, 3);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="mx-auto mb-6 max-w-4xl overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg dark:border-green-800 dark:from-green-950 dark:to-emerald-950"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-green-100 px-5 py-3 dark:border-green-900">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
              <TrendingDown size={16} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-green-800 dark:text-green-200">
                Price Drop Alert!
              </h4>
              <p className="text-xs text-green-600 dark:text-green-400">
                {drops.length} {drops.length === 1 ? "product" : "products"} from your alerts {drops.length === 1 ? "is" : "are"} now cheaper
              </p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="rounded-full p-1.5 text-green-600 transition hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drops list */}
        <div className="divide-y divide-green-100 dark:divide-green-900">
          {visibleDrops.map((drop, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                  {drop.title}
                </p>
                <div className="mt-1 flex items-center gap-3 text-sm">
                  <span className="text-slate-400 line-through">
                    <IndianRupee size={12} className="inline" />
                    {formatPrice(drop.savedPrice)}
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    <IndianRupee size={12} className="inline" />
                    {formatPrice(drop.currentPrice)}
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900 dark:text-green-300">
                    Save {formatPrice(drop.savings)}
                  </span>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {drop.source}
              </span>
            </div>
          ))}
        </div>

        {!expanded && drops.length > 3 && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full cursor-pointer border-t border-green-100 px-5 py-2.5 text-center text-sm font-medium text-green-600 transition hover:bg-green-50 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900"
          >
            +{drops.length - 3} more price drops
          </button>
        )}

        {expanded && drops.length > 3 && (
          <button
            onClick={() => setExpanded(false)}
            className="w-full cursor-pointer border-t border-green-100 px-5 py-2.5 text-center text-sm font-medium text-green-600 transition hover:bg-green-50 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900"
          >
            Show less
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
