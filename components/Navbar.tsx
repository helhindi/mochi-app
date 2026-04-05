"use client";

import Link from "next/link";
import { useBasketStore } from "@/store/basketStore";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const items = useBasketStore((s) => s.items);

  return (
    <nav className="sticky top-0 z-50 bg-rose-50 dark:bg-zinc-900 border-b border-rose-200 dark:border-zinc-700 shadow-sm transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🐾</span>
          <span className="text-xl font-bold text-rose-700 dark:text-rose-400 group-hover:text-rose-900 dark:group-hover:text-rose-300 transition-colors">
            Mochi Cats
          </span>
          <span className="hidden sm:inline text-sm text-rose-400 dark:text-rose-500 font-medium">
            Oxfordshire
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-200 font-medium transition-colors"
          >
            Browse
          </Link>

          <ThemeToggle />

          <Link
            href="/basket"
            className="relative flex items-center gap-2 bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Basket</span>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
