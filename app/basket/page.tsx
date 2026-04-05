"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBasketStore } from "@/store/basketStore";

export default function BasketPage() {
  const { items, removeItem, total } = useBasketStore();
  const [adopted, setAdopted] = useState(false);

  if (adopted) {
    return (
      <main className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-md border border-rose-100 p-10 max-w-md text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Request sent!</h1>
          <p className="text-gray-500 mb-6">
            In a real world, your adoption request would be on its way. Your future
            feline companions thank you for choosing them.
          </p>
          <Link
            href="/"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Browse more kittens
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-amber-50 pb-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Your basket</h1>
          <Link href="/" className="text-sm text-rose-500 hover:text-rose-700 transition-colors">
            ← Keep browsing
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-14 text-center">
            <p className="text-5xl mb-4">🐾</p>
            <p className="text-gray-400 text-lg mb-6">Your basket is empty.</p>
            <Link
              href="/"
              className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Browse kittens
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-8">
              {items.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-rose-100 shadow-sm flex gap-4 p-4 items-center"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">{cat.name}</p>
                    <p className="text-sm text-gray-500">{cat.breed}</p>
                    <p className="text-xs text-gray-400">{cat.location}, Oxfordshire</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-rose-700 text-lg">
                      £{cat.pricePounds.toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(cat.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2 text-gray-600">
                <span>
                  {items.length} kitten{items.length !== 1 ? "s" : ""}
                </span>
                <span className="font-semibold text-gray-900 text-xl">
                  £{total().toLocaleString()} total
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                This is a hypothetical basket. No payment will be taken.
              </p>
              <button
                onClick={() => setAdopted(true)}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Request to Adopt
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
