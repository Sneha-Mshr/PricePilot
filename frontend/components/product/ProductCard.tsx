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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* Image */}

        <div className="relative">

          <div className="flex h-60 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">

            <span className="text-slate-400">
              Product Image
            </span>

          </div>

          {/* Wishlist */}

          <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:scale-110 dark:bg-slate-900">

            <Heart
              size={18}
              className="text-slate-500 hover:text-red-500"
            />

          </button>

          {/* Store */}

          <span className="absolute left-4 top-4 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white">

            {product.source}

          </span>

        </div>

        <CardContent className="space-y-5 p-6">

          <div>

            <h2 className="line-clamp-2 text-xl font-bold text-slate-900 dark:text-white">

              {product.title}

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              {product.brand}

            </p>

          </div>

          {/* Rating */}

          <div className="flex items-center gap-1">

            <Star
              className="fill-yellow-400 text-yellow-400"
              size={16}
            />

            <span className="text-sm font-medium">

              4.8

            </span>

            <span className="text-xs text-slate-500">

              (1.2k reviews)

            </span>

          </div>

          {/* Price */}

          <div className="flex items-center">

            <IndianRupee
              size={22}
              className="text-teal-600"
            />

            <span className="text-3xl font-extrabold text-teal-600">

              {product.price.toLocaleString()}

            </span>

          </div>

          {/* Buttons */}

          <div className="flex items-center justify-between">

            <span className="flex items-center gap-2 text-sm text-slate-500">

              <ShoppingBag size={16} />

              {product.source}

            </span>

            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
            >

              Visit

              <ExternalLink size={16} />

            </a>

          </div>

        </CardContent>

      </Card>
    </motion.div>
  );
}