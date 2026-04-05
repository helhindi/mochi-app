"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cat } from "@/types/cat";

interface BasketStore {
  items: Cat[];
  addItem: (cat: Cat) => void;
  removeItem: (id: string) => void;
  isInBasket: (id: string) => boolean;
  total: () => number;
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (cat) => {
        if (!get().isInBasket(cat.id)) {
          set((state) => ({ items: [...state.items, cat] }));
        }
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((c) => c.id !== id) })),
      isInBasket: (id) => get().items.some((c) => c.id === id),
      total: () => get().items.reduce((sum, c) => sum + c.pricePounds, 0),
    }),
    { name: "mochi-basket" }
  )
);
