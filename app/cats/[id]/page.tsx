"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cats } from "@/data/cats";
import { useBasketStore } from "@/store/basketStore";

interface Props {
  params: Promise<{ id: string }>;
}

export default function CatProfilePage({ params }: Props) {
  const { id } = use(params);
  const cat = cats.find((c) => c.id === id);
  const { addItem, isInBasket } = useBasketStore();
  const [toastVisible, setToastVisible] = useState(false);

  if (!cat) notFound();

  const inBasket = isInBasket(cat.id);

  function handleAdd() {
    addItem(cat!);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }

  return (
    <main className="min-h-screen bg-amber-50 pb-16">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <Link href="/" className="text-sm text-rose-500 hover:text-rose-700 transition-colors">
          ← Back to browse
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
          <Image
            src={cat.imageUrl}
            alt={cat.name}
            fill
            className={`object-cover ${!cat.available ? "grayscale opacity-70" : ""}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {!cat.available && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-gray-800 text-white text-lg font-bold px-6 py-2 rounded-full">
                Rehomed
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{cat.name}</h1>
            <p className="text-rose-600 font-semibold text-lg mt-1">{cat.breed}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DetailChip label="Age" value={`${cat.ageWeeks} weeks`} />
            <DetailChip label="Gender" value={cat.gender === "female" ? "Female" : "Male"} />
            <DetailChip label="Colour" value={cat.colour} />
            <DetailChip label="Location" value={`${cat.location}, Oxon`} />
          </div>

          <div className="bg-white rounded-2xl border border-rose-100 p-4">
            <p className="text-gray-600 leading-relaxed text-sm">{cat.description}</p>
          </div>

          <div className="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-2xl p-4">
            <div>
              <p className="text-xs text-rose-400 font-medium uppercase tracking-wide">Adoption fee</p>
              <p className="text-3xl font-extrabold text-rose-700">
                £{cat.pricePounds.toLocaleString()}
              </p>
            </div>
            {cat.available ? (
              <button
                onClick={handleAdd}
                disabled={inBasket}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors ${
                  inBasket
                    ? "bg-green-100 text-green-700 cursor-default"
                    : "bg-rose-600 hover:bg-rose-700 text-white"
                }`}
              >
                {inBasket ? "✓ In basket" : "Add to basket"}
              </button>
            ) : (
              <span className="px-6 py-3 rounded-xl bg-gray-100 text-gray-500 font-bold text-sm">
                Unavailable
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center">
            This is a hypothetical listing. No real transaction will take place.
          </p>
        </div>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-full shadow-lg z-50">
          {cat.name} added to basket!
        </div>
      )}
    </main>
  );
}

function DetailChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-rose-100 px-3 py-2">
      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  );
}
