"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/services/product.service";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (query?: string) => {
    try {
      setLoading(true);

      const data = await getProducts(query);

      setProducts(data);
      setError("");
    } catch (err: any) {
      console.error("Failed to load products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
}