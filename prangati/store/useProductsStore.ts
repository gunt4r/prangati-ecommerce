import { create } from "zustand";
import Cookies from "js-cookie";

import { queryClient } from "@/api/react-query";
import {
  PriceRange as OriginalPriceRange,
  ProductCart,
  Product,
} from "@/config/interfaces";
import { COOKIE_PRODUCT_KEY } from "@/config/const";
interface PriceRange extends OriginalPriceRange {
  [key: string]: number | undefined;
}
export interface ProductState {
  sortParams: Record<string, string>;
  filterParams: Record<string, string[]>;
  priceRange?: PriceRange;
  wishlistProducts: Product[];
  cartProducts: ProductCart[];
  setSortParams: (params: Record<string, string>) => void;
  setFilterParams: (params: Record<string, string>) => void;
  setPriceRange?: (range: PriceRange) => void;
  setWishlistProducts: (products: Product[]) => void;
  setCartProducts: (products: ProductCart[]) => void;
  getQueryParams: () => any;
}

export const useProductsStore = create<ProductState>((set, get) => ({
  sortParams: {},
  filterParams: (() => {
    const cookieValue = Cookies.get(COOKIE_PRODUCT_KEY);

    if (!cookieValue) return {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _price, ...rest } = JSON.parse(cookieValue);

    return JSON.parse(rest);
  })(),
  wishlistProducts: [],
  cartProducts: [],

  setSortParams: (params: Record<string, string>) => {
    return set({ sortParams: params });
  },
  setFilterParams: (params: Record<string, string>) =>
    set((state) => {
      const updated = { ...state.filterParams };

      for (const key in params) {
        const value = params[key];
        const existing = updated[key] || [];

        if (value === undefined || value === null || value === "") {
          delete updated[key];
          continue;
        }
        if (existing.includes(value)) {
          updated[key] = existing.filter((v) => v !== value);
        } else {
          updated[key] = [...existing, value];
        }
      }

      return { filterParams: updated };
    }),
  setWishlistProducts: (products: Product[]) =>
    set({ wishlistProducts: products }),
  setCartProducts: (products: ProductCart[]) => set({ cartProducts: products }),
  getQueryParams: () => {
    const allParams = {
      ...get().sortParams,
      ...get().filterParams,
      ...get().priceRange,
    };
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
    set((state) => {
      const currentRange = get().priceRange;

      if (
        currentRange &&
        currentRange.minPrice === range.minPrice &&
        currentRange.maxPrice === range.maxPrice
      ) {
        return state;
      }

      return {
        ...state,
        priceRange: {
          minPrice: Number.isNaN(range.minPrice) ? 0 : range.minPrice,
          maxPrice: Number.isNaN(range.maxPrice) ? 1000 : range.maxPrice,
        },
      };
    }),
}));
