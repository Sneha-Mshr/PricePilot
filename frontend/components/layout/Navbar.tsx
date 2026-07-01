import Link from "next/link";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-black dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          PricePilot
        </h1>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
          >
            Dashboard
          </Link>

          <Link
            href="/products"
            className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
          >
            Products
          </Link>

          <Link
            href="/analytics"
            className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
          >
            Analytics
          </Link>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
}