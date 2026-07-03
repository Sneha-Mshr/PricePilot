"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/home/Footer";
import useProducts from "@/hooks/useProducts";

export default function Home() {
  const { products, loading, error } = useProducts();

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 dark:bg-slate-950">

        {/* ---------------- HERO ---------------- */}

        <section className="relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />

          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2 text-sm shadow dark:border-slate-700 dark:bg-slate-900">
                <Sparkles size={16} className="text-teal-500" />
                AI Powered Shopping Assistant
              </div>

              <h1 className="mx-auto max-w-5xl text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">

                Compare Prices Across

                <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">

                  {" "}Every Store

                </span>

              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-600 dark:text-slate-400">

                Search once and instantly compare prices from Amazon,
                Flipkart, Myntra and many more using AI.

              </p>

            </motion.div>

            {/* Search */}

            <div className="mt-12 flex w-full max-w-4xl rounded-2xl bg-white p-3 shadow-2xl dark:bg-slate-900">

              <input
                className="flex-1 rounded-xl bg-transparent px-5 py-4 text-lg outline-none"
                placeholder="Search iPhone 16, Nike Shoes, MacBook..."
              />

              <button className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 font-semibold text-white transition hover:scale-105">

                Search

              </button>

            </div>

            {/* Stores */}

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              {[
                "Amazon",
                "Flipkart",
                "Myntra",
                "Ajio",
                "Meesho",
              ].map((store) => (
                <div
                  key={store}
                  className="rounded-full border bg-white px-5 py-2 shadow dark:border-slate-700 dark:bg-slate-900"
                >
                  {store}
                </div>
              ))}

            </div>

            {/* Buttons */}

            <div className="mt-10 flex gap-5">

              <button className="flex items-center gap-2 rounded-xl bg-teal-500 px-8 py-4 font-semibold text-white hover:bg-teal-600">

                Start Comparing

                <ArrowRight size={18} />

              </button>

              <button className="rounded-xl border px-8 py-4 font-semibold">

                Learn More

              </button>

            </div>

          </div>

        </section>

        {/* FEATURES */}

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-3">

          {[
            {
              icon: <Zap />,
              title: "Lightning Fast",
              desc: "Compare prices in seconds."
            },
            {
              icon: <ShieldCheck />,
              title: "Trusted Results",
              desc: "Reliable AI-powered comparison."
            },
            {
              icon: <Sparkles />,
              title: "Smart AI Search",
              desc: "Find the best deals automatically."
            },
          ].map((item) => (

            <div
              key={item.title}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 dark:bg-slate-900"
            >

              <div className="mb-5 text-teal-500">

                {item.icon}

              </div>

              <h3 className="mb-3 text-2xl font-bold">

                {item.title}

              </h3>

              <p className="text-slate-500">

                {item.desc}

              </p>

            </div>

          ))}

        </section>

        {/* PRODUCTS */}

        <section className="mx-auto max-w-7xl px-6 pb-24">

          <h2 className="mb-10 text-4xl font-bold">

            Trending Products

          </h2>

          {loading && <p>Loading...</p>}

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        </section>

        <Footer />

      </main>
    </>
  );
}