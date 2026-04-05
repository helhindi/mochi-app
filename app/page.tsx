"use client";

import { useState, useMemo } from "react";
import CatCard from "@/components/CatCard";
import { cats, breeds, locations } from "@/data/cats";

export default function BrowsePage() {
  const [breedFilter, setBreedFilter] = useState<string>("All");
  const [locationFilter, setLocationFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      cats.filter(
        (c) =>
          (breedFilter === "All" || c.breed === breedFilter) &&
          (locationFilter === "All" || c.location === locationFilter)
      ),
    [breedFilter, locationFilter]
  );

  return (
    <main className="min-h-screen bg-amber-50">
      {/* Hero */}
      <section className="bg-rose-600 text-white py-12 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          Kittens from Oxfordshire
        </h1>
        <p className="text-rose-200 text-lg max-w-xl mx-auto">
          A small, carefully chosen collection of kittens raised in loving homes across
          Oxfordshire. Find your perfect companion.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="breed" className="text-sm font-medium text-gray-600">
            Breed
          </label>
          <select
            id="breed"
            value={breedFilter}
            onChange={(e) => setBreedFilter(e.target.value)}
            className="text-sm border border-rose-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <option value="All">All breeds</option>
            {breeds.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="location" className="text-sm font-medium text-gray-600">
            Location
          </label>
          <select
            id="location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="text-sm border border-rose-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <option value="All">All locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <span className="text-sm text-gray-400 ml-auto">
          {filtered.length} kitten{filtered.length !== 1 ? "s" : ""} found
        </span>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🐾</p>
            <p className="text-lg">No kittens match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
