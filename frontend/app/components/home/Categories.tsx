"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Shirt,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  Home,
} from "lucide-react";

const categories = [
  { name: "Phones", icon: Smartphone, query: "iPhone Samsung phone" },
  { name: "Laptops", icon: Laptop, query: "laptop" },
  { name: "Fashion", icon: Shirt, query: "men clothing" },
  { name: "Watches", icon: Watch, query: "smart watch" },
  { name: "Audio", icon: Headphones, query: "headphones" },
  { name: "Cameras", icon: Camera, query: "camera" },
  { name: "Gaming", icon: Gamepad2, query: "gaming laptop" },
  { name: "Home", icon: Home, query: "air fryer" },
];

interface CategoriesProps {
  onCategoryClick?: (query: string) => void;
}

export default function Categories({ onCategoryClick }: CategoriesProps) {
  return (
    <section className="bg-slate-100 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="text-teal-500 font-semibold uppercase tracking-widest dark:text-teal-400">
            Explore
          </p>

          <h2 className="mt-4 text-5xl font-bold text-slate-900 dark:text-white">
            Shop By Category
          </h2>

          <p className="mt-4 text-slate-600 text-lg dark:text-slate-400">
            Compare prices across your favourite shopping categories.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                whileHover={{
                  y: -8,
                  scale: 1.04,
                }}
                transition={{ duration: 0.2 }}
                onClick={() => onCategoryClick?.(item.query)}
                className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-8 shadow-lg hover:border-teal-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                  {item.name}
                </h3>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Discover the best prices with AI-powered comparison.
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
