"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  IndianRupee,
  ShoppingBag,
  Heart,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
    >
      <Card className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:shadow-[0_20px_60px_rgba(20,184,166,0.25)] dark:border-slate-800 dark:bg-slate-900">

        {/* Product Image */}

        <div className="relative overflow-hidden">

          <div className="flex h-64 items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

            <img
              src="https://placehold.co/500x500/png?text=PricePilot"
              alt={product.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

          </div>

          {/* Store Badge */}

          <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-1 text-xs font-bold text-white shadow-lg">

            {product.source}

          </span>

          {/* Wishlist */}

          <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition hover:scale-110 dark:bg-slate-800">

            <Heart
              size={18}
              className="text-slate-500 transition hover:text-red-500"
            />

          </button>

          {/* Trending */}

          <span className="absolute bottom-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">

            🔥 Trending

          </span>

          {/* Discount */}

          <span className="absolute bottom-4 right-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow">

            15% OFF

          </span>

        </div>

        <CardContent className="space-y-5 p-6">

          {/* Brand */}

          <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">

            {product.brand}

          </span>

          {/* Title */}

          <h2 className="line-clamp-2 text-xl font-bold text-slate-900 dark:text-white">

            {product.title}

          </h2>

          {/* Rating */}

          <div className="flex items-center gap-1">

            <Star
              className="fill-yellow-400 text-yellow-400"
              size={16}
            />

            <span className="font-semibold">

              4.8

            </span>

            <span className="text-sm text-slate-500">

              (1.2k Reviews)

            </span>

          </div>

          {/* Price */}

          <div className="flex items-center">

            <IndianRupee
              size={24}
              className="text-teal-600"
            />

            <span className="text-3xl font-extrabold text-teal-600">

              {product.price.toLocaleString()}

            </span>

          </div>

          {/* Bottom */}

          <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">

            <span className="flex items-center gap-2 text-sm text-slate-500">

              <ShoppingBag size={16} />

              {product.source}

            </span>

            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2 font-semibold text-white transition duration-300 hover:scale-105"
            >

              Compare Price

              <ExternalLink size={16} />

            </a>

          </div>

        </CardContent>

      </Card>
    </motion.div>
  );
}