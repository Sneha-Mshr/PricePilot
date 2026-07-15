"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold text-white">

              Price<span className="text-teal-400">Pilot</span>

            </h2>

            <p className="mt-4 leading-7 text-slate-400">

              AI-powered product price comparison platform built to help
              shoppers discover the best deals across multiple online stores.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">

              Product

            </h3>

            <div className="space-y-3">

              <Link href="/" className="block text-slate-400 hover:text-teal-400">
                Home
              </Link>

              <Link href="/" className="block text-slate-400 hover:text-teal-400">
                Categories
              </Link>

              <Link href="/" className="block text-slate-400 hover:text-teal-400">
                Trending Products
              </Link>

            </div>

          </div>

          {/* Technologies */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">

              Technologies

            </h3>

            <div className="space-y-3">

              <p className="text-slate-400">Next.js</p>

              <p className="text-slate-400">FastAPI</p>

              <p className="text-slate-400">Spring Boot</p>

              <p className="text-slate-400">Hybrid RAG</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">

              Connect

            </h3>

            <div className="space-y-3">

              <a
                href="https://github.com/Sneha-Mshr"
                target="_blank"
                className="block text-slate-400 hover:text-teal-400"
              >
                GitHub
              </a>

              <a
                href="#"
                className="block text-slate-400 hover:text-teal-400"
              >
                LinkedIn
              </a>

              <a
                href="mailto:example@gmail.com"
                className="block text-slate-400 hover:text-teal-400"
              >
                Email
              </a>

            </div>

          </div>

        </div>

        <div className="mt-16 border-t border-slate-800 pt-8">

          <p className="flex flex-wrap items-center justify-center gap-2 text-center text-slate-500">

            © 2026 PricePilot • Built with

            <Heart className="h-4 w-4 fill-red-500 text-red-500" />

            by

            <span className="font-semibold text-white">

              Sneha Mishra

            </span>

          </p>

        </div>

      </div>

    </footer>
  );
}