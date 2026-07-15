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
  { name: "Phones", icon: Smartphone },
  { name: "Laptops", icon: Laptop },
  { name: "Fashion", icon: Shirt },
  { name: "Watches", icon: Watch },
  { name: "Audio", icon: Headphones },
  { name: "Cameras", icon: Camera },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Home", icon: Home },
];

export default function Categories() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="text-teal-400 font-semibold uppercase tracking-widest">
            Explore
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Shop By Category
          </h2>

          <p className="mt-4 text-slate-400 text-lg">
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
                className="group cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg hover:border-teal-500 hover:bg-slate-800"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {item.name}
                </h3>

                <p className="mt-2 text-slate-400">
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