import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/common/SearchBar";
import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-8">

        <SearchBar />

        <h2 className="mb-6 text-3xl font-bold">
          Trending Products
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <ProductCard />
          <ProductCard />
          <ProductCard />

        </div>

      </main>
    </>
  );
}