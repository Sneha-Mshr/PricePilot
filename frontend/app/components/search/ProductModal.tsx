"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  IndianRupee,
  Star,
  ShoppingBag,
  Heart,
  Tag,
} from "lucide-react";
import { ProductResult } from "@/types/search";
import { useAuth } from "@/context/AuthContext";
import { addToWishlist, isInWishlist } from "@/services/wishlist.service";
import { useState } from "react";

const SOURCE_COLORS: Record<string, string> = {
  Amazon: "from-amber-500 to-orange-500",
  Flipkart: "from-blue-500 to-indigo-500",
  Myntra: "from-pink-500 to-rose-500",
};

interface ProductModalProps {
  product: ProductResult | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { isAuthenticated } = useAuth();
  const [wishlisted, setWishlisted] = useState(() =>
    isAuthenticated && product?.url ? isInWishlist(product.url) : false
  );

  if (!product) return null;

  const handleWishlist = () => {
    if (!isAuthenticated) return;
    const result = addToWishlist({
      title: product.title,
      price: product.price,
      url: product.url,
      image: product.image,
      source: product.source,
      rating: product.rating,
    });
    if (result) setWishlisted(true);
  };

  const formatPrice = (price: string) => {
    if (!price) return "N/A";
    const num = parseFloat(price);
    if (isNaN(num)) return price;
    return num.toLocaleString("en-IN");
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-500 shadow transition hover:bg-slate-100 hover:text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-8"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ShoppingBag size={64} className="text-slate-300 dark:text-slate-700" />
                </div>
              )}

              {/* Source badge */}
              <span
                className={`absolute left-4 top-4 rounded-full bg-gradient-to-r px-4 py-1.5 text-xs font-bold text-white shadow ${
                  SOURCE_COLORS[product.source] || "from-slate-500 to-slate-600"
                }`}
              >
                {product.source}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-4 p-6">
              {/* Title */}
              <h2 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                {product.title}
              </h2>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 dark:bg-yellow-950">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                      {product.rating}
                    </span>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-1">
                <IndianRupee size={24} className="text-teal-600" />
                <span className="text-3xl font-extrabold text-teal-600">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Source info */}
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Tag size={14} />
                <span>Available on {product.source}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Visit {product.source}
                  <ExternalLink size={16} />
                </a>

                {isAuthenticated && (
                  <button
                    onClick={handleWishlist}
                    className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:scale-[1.02] ${
                      wishlisted
                        ? "border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950"
                        : "border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-500 dark:border-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Heart size={18} className={wishlisted ? "fill-red-500" : ""} />
                    {wishlisted ? "Saved" : "Save"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
