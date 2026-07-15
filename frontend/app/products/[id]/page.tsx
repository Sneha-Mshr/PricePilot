"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { getProductById } from "@/services/product.service";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id as string);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl">
        Product not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 rounded-lg border px-4 py-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid gap-12 lg:grid-cols-2">

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <img
              src="https://placehold.co/700x700/png?text=PricePilot"
              alt={product.title}
              className="w-full"
            />
          </div>

          <div>

            <span className="rounded-full bg-teal-500 px-4 py-2 text-white">
              {product.source}
            </span>

            <h1 className="mt-6 text-5xl font-bold">
              {product.title}
            </h1>

            <p className="mt-4 text-lg text-slate-500">
              {product.brand}
            </p>

            <h2 className="mt-8 text-4xl font-bold text-teal-600">
              ₹ {product.price.toLocaleString()}
            </h2>

            <p className="mt-8 text-slate-600">
              Premium AI-powered product comparison from multiple stores.
            </p>

            <div className="mt-10 flex gap-4">

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-teal-500 px-8 py-4 font-semibold text-white"
              >
                Compare Price
                <ExternalLink size={18} />
              </a>

              <button className="rounded-xl border px-8 py-4">
                <Heart />
              </button>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}