"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch, Search } from "lucide-react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/home/Footer";
import ProductCard from "@/app/components/product/ProductCard";
import useProducts from "@/hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, error, fetchProducts } = useProducts();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    fetchProducts(query.trim() || undefined);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <section className="mx-auto max-w-7xl px-6 py-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Product Catalogue
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Products stored in the PricePilot database.
            </p>
          </motion.div>

          {/* Filter */}
          <div className="mx-auto mb-12 flex max-w-2xl gap-3 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <input
              className="flex-1 rounded-xl bg-transparent px-4 py-3 outline-none dark:text-white"
              placeholder="Filter by title or brand..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 font-semibold text-white transition hover:scale-105"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {loading && (
            <p className="text-center text-slate-500 dark:text-slate-400">
              Loading products...
            </p>
          )}

          {!loading && error && (
            <p className="text-center font-medium text-red-500">{error}</p>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="mb-6 rounded-full bg-slate-100 p-6 dark:bg-slate-800">
                <PackageSearch size={48} className="text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                No products found in the catalogue.
              </p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </section>

        <Footer />
      </main>
    </>
  );
}
