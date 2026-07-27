"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Trash2,
  ExternalLink,
  IndianRupee,
  Star,
  ShoppingBag,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/home/Footer";
import { useAuth } from "@/context/AuthContext";
import { WishlistItem } from "@/types/wishlist";
import { getWishlist, removeFromWishlist } from "@/services/wishlist.service";

const SOURCE_COLORS: Record<string, string> = {
  Amazon: "from-amber-500 to-orange-500",
  Flipkart: "from-blue-500 to-indigo-500",
  Myntra: "from-pink-500 to-rose-500",
};

export default function WishlistPage() {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      setItems(getWishlist());
    }
  }, [isAuthenticated]);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatPrice = (price: string) => {
    if (!price) return "N/A";
    const num = parseFloat(price);
    if (isNaN(num)) return price;
    return num.toLocaleString("en-IN");
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Heart size={40} className="text-slate-400" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
              Sign in to view your wishlist
            </h2>
            <p className="mb-8 max-w-md text-slate-500 dark:text-slate-400">
              Save products you love and track their prices across stores.
              Create a free account to get started.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <LogIn size={18} />
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              My Wishlist
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="mb-6 rounded-full bg-slate-100 p-6 dark:bg-slate-800">
                <Heart size={48} className="text-slate-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-700 dark:text-slate-300">
                Your wishlist is empty
              </h3>
              <p className="mb-6 max-w-sm text-slate-500">
                Search for products and click the heart icon to save them here for later.
              </p>
              <Link
                href="/"
                className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 font-semibold text-white transition hover:scale-105"
              >
                Start Searching
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain p-4"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag size={40} className="text-slate-300" />
                      </div>
                    )}

                    <span
                      className={`absolute left-3 top-3 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white ${
                        SOURCE_COLORS[item.source] || "from-slate-500 to-slate-600"
                      }`}
                    >
                      {item.source}
                    </span>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-red-500 shadow transition hover:scale-110 hover:bg-red-50 dark:bg-slate-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 p-5">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 dark:text-white">
                      {item.title}
                    </h3>

                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {item.rating}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <IndianRupee size={16} className="text-teal-600" />
                      <span className="text-xl font-extrabold text-teal-600">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
                    >
                      View on {item.source}
                      <ExternalLink size={14} />
                    </a>

                    <p className="text-xs text-slate-400">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
