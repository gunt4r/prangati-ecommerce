import { create } from "zustand";

import { queryClient } from "@/api/react-query";
import { PriceRange as OriginalPriceRange } from "@/config/interfaces";

interface PriceRange extends OriginalPriceRange {
  [key: string]: number | undefined;
}
export interface ProductState {
  sortParams: Record<string, string>;
  filterParams: Record<string, string[]>;
  priceRange?: PriceRange;
  setSortParams: (params: Record<string, string>) => void;
  setFilterParams: (params: Record<string, string>) => void;
  setPriceRange?: (range: PriceRange) => void;
  getQueryParams: () => any;
}

export const useProductsStore = create<ProductState>((set, get) => ({
  sortParams: {},
  filterParams: {},
  setSortParams: (params: Record<string, string>) => {
    return set({ sortParams: params });
  },
  setFilterParams: (params: Record<string, string>) =>
    set((state) => {
      const updated = { ...state.filterParams };

      for (const key in params) {
        const value = params[key];
        const existing = updated[key] || [];

        if (existing.includes(value)) {
          updated[key] = existing.filter((v) => v !== value);
        } else {
          updated[key] = [...existing, value];
        }
      }

      return { filterParams: updated };
    }),
  getQueryParams: () => {
    const allParams = { ...get().sortParams, ...get().filterParams, ...get().priceRange };
    const query: Record<string, string | number | undefined> = {};

    for (const key in allParams) {
      const val = allParams[key];

      query[key] = Array.isArray(val) ? val.join(",") : val;
    }
    queryClient.invalidateQueries({
      queryKey: ["products-advanced", query],
    });

    return query;
  },
  setPriceRange: (range: PriceRange) =>
    set((state) => ({
      ...state,
      priceRange: range,
    })),
}));
