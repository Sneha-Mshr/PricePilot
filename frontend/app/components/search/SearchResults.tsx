"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  IndianRupee,
  Star,
  ShoppingBag,
  Grid3X3,
  List,
  ArrowDownUp,
  Filter,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import { SearchResponse, ProductResult } from "@/types/search";
import { useAuth } from "@/context/AuthContext";
import { addToWishlist, isInWishlist } from "@/services/wishlist.service";
import ProductModal from "@/app/components/search/ProductModal";
import BestDealBanner from "@/app/components/search/BestDealBanner";

interface SearchResultsProps {
  data: SearchResponse;
}

type ViewMode = "grid" | "list";
type SortMode = "price_asc" | "price_desc" | "rating";

const SOURCE_COLORS: Record<string, string> = {
  Amazon: "from-amber-500 to-orange-500",
  Flipkart: "from-blue-500 to-indigo-500",
  Myntra: "from-pink-500 to-rose-500",
};

const SOURCE_BG: Record<string, string> = {
  Amazon: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Flipkart: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  Myntra: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
};

export default function SearchResults({ data }: SearchResultsProps) {
  const [activeSource, setActiveSource] = useState<string>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortMode, setSortMode] = useState<SortMode>("price_asc");
  const [selectedProduct, setSelectedProduct] = useState<ProductResult | null>(null);
  const { isAuthenticated } = useAuth();

  const getFilteredProducts = (): ProductResult[] => {
    let products =
      activeSource === "All"
        ? data.products
        : data.products.filter((p) => p.source === activeSource);

    // Sort
    products = [...products].sort((a, b) => {
      const priceA = parseFloat(a.price) || Infinity;
      const priceB = parseFloat(b.price) || Infinity;

      if (sortMode === "price_asc") return priceA - priceB;
      if (sortMode === "price_desc") return priceB - priceA;

      // Rating
      const ratingA = parseFloat(a.rating || "0");
      const ratingB = parseFloat(b.rating || "0");
      return ratingB - ratingA;
    });

    return products;
  };

  const filteredProducts = getFilteredProducts();

  const formatPrice = (price: string) => {
    if (!price) return "N/A";
    const num = parseFloat(price);
    if (isNaN(num)) return price;
    return num.toLocaleString("en-IN");
  };

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/?q=${encodeURIComponent(data.query)}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Best Deal Banner */}
      <BestDealBanner data={data} />

      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Results for &quot;{data.query}&quot;
        </h2>
        <div className="mt-2 flex items-center justify-center gap-3">
          <p className="text-slate-500 dark:text-slate-400">
            Found {data.total} products across {data.sources.length} stores
          </p>
          <button
            onClick={handleShare}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
              copied
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-slate-100 text-slate-600 hover:bg-teal-100 hover:text-teal-700 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {copied ? <Check size={12} /> : <Share2 size={12} />}
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </div>

      {/* Source Stats */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {data.sources.map((source) => (
          <div
            key={source.source}
            className={`rounded-xl border px-5 py-3 ${
              SOURCE_BG[source.source] || "bg-slate-50 border-slate-200"
            }`}
          >
            <span className="font-bold">{source.source}</span>
            <span className="ml-2 text-sm opacity-80">
              {source.count} products
            </span>
            {source.error && (
              <span className="ml-2 text-xs text-red-500">(error)</span>
            )}
          </div>
        ))}
      </div>

      {/* Filter & Sort Controls */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Source Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSource("All")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeSource === "All"
                ? "bg-teal-500 text-white shadow"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            <Filter size={14} className="mr-1 inline" />
            All ({data.total})
          </button>
          {data.sources.map((source) => (
            <button
              key={source.source}
              onClick={() => setActiveSource(source.source)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeSource === source.source
                  ? "bg-teal-500 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {source.source} ({source.count})
            </button>
          ))}
        </div>

        {/* View & Sort */}
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Best Rating</option>
          </select>

          {/* View toggle */}
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-teal-500 text-white"
                  : "text-slate-500"
              } rounded-l-lg`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-teal-500 text-white"
                  : "text-slate-500"
              } rounded-r-lg`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={`${product.source}-${index}`} product={product} index={index} isAuthenticated={isAuthenticated} onClick={() => setSelectedProduct(product)} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredProducts.map((product, index) => (
              <ProductListItem key={`${product.source}-${index}`} product={product} index={index} isAuthenticated={isAuthenticated} onClick={() => setSelectedProduct(product)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-slate-500">
            No products from this source
          </p>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}

// Product Card (Grid View)
function ProductCard({ product, index, isAuthenticated, onClick }: { product: ProductResult; index: number; isAuthenticated: boolean; onClick: () => void }) {
  const [wishlisted, setWishlisted] = useState(() =>
    isAuthenticated && product.url ? isInWishlist(product.url) : false
  );

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingBag size={48} className="text-slate-300 dark:text-slate-700" />
          </div>
        )}

        {/* Source badge */}
        <span
          className={`absolute left-3 top-3 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white shadow ${
            SOURCE_COLORS[product.source] || "from-slate-500 to-slate-600"
          }`}
        >
          {product.source}
        </span>

        {/* Best price indicator */}
        {index === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow">
            Best Price
          </span>
        )}

        {/* Wishlist button */}
        {isAuthenticated && (
          <button
            onClick={handleWishlist}
            className={`absolute right-3 ${index === 0 ? "top-12" : "top-3"} rounded-full p-2 shadow transition hover:scale-110 ${
              wishlisted
                ? "bg-red-50 text-red-500 dark:bg-red-950"
                : "bg-white/90 text-slate-400 hover:text-red-500 dark:bg-slate-800"
            }`}
          >
            <Heart size={16} className={wishlisted ? "fill-red-500" : ""} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 dark:text-white">
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {product.rating}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center">
          <IndianRupee size={18} className="text-teal-600" />
          <span className="text-2xl font-extrabold text-teal-600">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Action */}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
        >
          View on {product.source}
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}

// Product List Item (List View)
function ProductListItem({ product, index, isAuthenticated, onClick }: { product: ProductResult; index: number; isAuthenticated: boolean; onClick: () => void }) {
  const [wishlisted, setWishlisted] = useState(() =>
    isAuthenticated && product.url ? isInWishlist(product.url) : false
  );

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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className="flex cursor-pointer items-center gap-5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Image */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingBag size={28} className="text-slate-300" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full bg-gradient-to-r px-2.5 py-0.5 text-xs font-bold text-white ${
              SOURCE_COLORS[product.source] || "from-slate-500 to-slate-600"
            }`}
          >
            {product.source}
          </span>
          {product.rating && (
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              {product.rating}
            </span>
          )}
          {index === 0 && (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900 dark:text-green-300">
              Best Price
            </span>
          )}
        </div>
        <h3 className="mt-1 line-clamp-1 font-semibold text-slate-800 dark:text-white">
          {product.title}
        </h3>
      </div>

      {/* Price */}
      <div className="flex items-center gap-1">
        <IndianRupee size={16} className="text-teal-600" />
        <span className="text-xl font-extrabold text-teal-600">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Wishlist */}
      {isAuthenticated && (
        <button
          onClick={handleWishlist}
          className={`shrink-0 rounded-xl p-2.5 transition hover:scale-110 ${
            wishlisted
              ? "text-red-500"
              : "text-slate-400 hover:text-red-500"
          }`}
        >
          <Heart size={20} className={wishlisted ? "fill-red-500" : ""} />
        </button>
      )}

      {/* Action */}
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105"
      >
        <ExternalLink size={16} className="inline" /> Visit
      </a>
    </motion.div>
  );
}
