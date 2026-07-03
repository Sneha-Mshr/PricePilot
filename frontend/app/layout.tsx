import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PricePilot | AI Price Comparison Platform",
  description:
    "Compare product prices across Amazon, Flipkart, Myntra and more with AI-powered search.",
  keywords: [
    "Price Comparison",
    "AI Shopping",
    "Amazon",
    "Flipkart",
    "Myntra",
    "PricePilot",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}