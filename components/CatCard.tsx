"use client";

import Link from "next/link";
import Image from "next/image";
import { Cat } from "@/types/cat";
import { useBasketStore } from "@/store/basketStore";

interface CatCardProps {
  cat: Cat;
}

export default function CatCard({ cat }: CatCardProps) {
  const { addItem, isInBasket } = useBasketStore();
  const inBasket = isInBasket(cat.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div className="relative h-52">
        <Image
          src={cat.imageUrl}
          alt={cat.name}
          fill
          className={`object-cover ${!cat.available ? "grayscale opacity-60" : ""}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!cat.available && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gray-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
              Rehomed
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-rose-700 font-bold text-sm px-2 py-1 rounded-lg">
          £{cat.pricePounds.toLocaleString()}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-bold text-gray-900">{cat.name}</h2>
          <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
            {cat.gender === "female" ? "♀ Girl" : "♂ Boy"}
          </span>
        </div>

        <p className="text-sm text-gray-500 font-medium">{cat.breed}</p>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {cat.location}, Oxfordshire
        </div>

        <p className="text-xs text-gray-400">{cat.ageWeeks} weeks old · {cat.colour}</p>

        <div className="mt-auto pt-3 flex gap-2">
          <Link
            href={`/cats/${cat.id}`}
            className="flex-1 text-center text-sm font-medium text-rose-600 hover:text-rose-800 border border-rose-200 hover:border-rose-400 rounded-xl py-2 transition-colors"
          >
            View Profile
          </Link>
          {cat.available && (
            <button
              onClick={() => addItem(cat)}
              disabled={inBasket}
              className={`flex-1 text-sm font-medium rounded-xl py-2 transition-colors ${
                inBasket
                  ? "bg-green-100 text-green-700 cursor-default"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }`}
            >
              {inBasket ? "✓ In basket" : "Add to basket"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
