"use client";

import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/common/SearchBar";
import ProductCard from "@/components/product/ProductCard";
import useProducts from "@/hooks/useProducts";

export default function Home() {
  const { products, loading, error } = useProducts();

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-8">

        <SearchBar />

        <h2 className="mb-6 text-3xl font-bold">
          Trending Products
        </h2>

        {loading && (
          <p>Loading products...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            />
           ))}
          </div>
      </main>
    </>
  );
}