"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Store,
  BadgeDollarSign,
  Brain,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Powered Search",
    desc: "Smart product discovery using AI and future Hybrid RAG.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Comparison",
    desc: "Compare prices from multiple shopping platforms instantly.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized backend built with FastAPI and Spring Boot.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    desc: "JWT authentication with encrypted passwords using BCrypt.",
  },
  {
    icon: Store,
    title: "Multiple Stores",
    desc: "Amazon, Flipkart, Myntra, Ajio and more in one search.",
  },
  {
    icon: Sparkles,
    title: "Future AI Assistant",
    desc: "Personalized recommendations and semantic search coming soon.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-teal-400">
            Why PricePilot
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Built For Smart Shopping
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
            PricePilot combines AI, modern backend technologies and
            intelligent search to help you discover the best deals across
            multiple online stores.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl hover:border-teal-500"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}