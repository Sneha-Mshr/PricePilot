"use client";

import { Mail, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Logo */}
          <div>
            <h2 className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-3xl font-extrabold text-transparent">
              PricePilot
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              AI Powered Price Comparison Platform that helps users
              discover the best deals across multiple online stores.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Quick Links
            </h3>

            <div className="space-y-3 text-slate-500">
              <p className="cursor-pointer hover:text-teal-500">Home</p>
              <p className="cursor-pointer hover:text-teal-500">Products</p>
              <p className="cursor-pointer hover:text-teal-500">Compare</p>
              <p className="cursor-pointer hover:text-teal-500">Analytics</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="https://github.com/Sneha-Mshr"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border p-3 hover:bg-teal-500 hover:text-white transition"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="#"
                className="rounded-xl border p-3 hover:bg-teal-500 hover:text-white transition"
              >
                <FaLinkedin  size={20} />
              </a>

              <a
                href="mailto:example@gmail.com"
                className="rounded-xl border p-3 hover:bg-teal-500 hover:text-white transition"
              >
                <Mail size={20} />
              </a>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t pt-8 text-center text-slate-500">

          <p className="flex items-center justify-center gap-2">
            Built with
            <Heart size={18} className="fill-red-500 text-red-500" />
            by
            <span className="font-semibold text-teal-500">
              Sneha Mishra
            </span>
          </p>

          <p className="mt-3 text-sm">
            © 2026 PricePilot. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}