import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { queryClient } from "../react-query";

import { REACT_QUERY_PRODUCTS_KEY } from "@/config/const";
import {
  AdvancedFilters,
  PaginatedResponse,
  ProductFilters,
  Product,
} from "@/config/interfaces";
const productApi = {
  getProducts: async (
    filters: ProductFilters = {},
  ): Promise<PaginatedResponse<Product>> => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}product?${params.toString()}`,
    );

    return response.data;
  },

  // Get single product
  getProduct: async (id: string): Promise<Product> => {
    const response = await axios.get(`/product/${id}`);

    return response.data;
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await axios.get(
      `/product/search?query=${encodeURIComponent(query)}`,
    );

    return response.data;
  },

  // Create product
  createProduct: async (data: FormData): Promise<Product> => {
    const response = await axios.post("/product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Update product
  updateProduct: async ({
    id,
    data,
  }: {
    id: string;
    data: any;
  }): Promise<Product> => {
    const response = await axios.patch(`/product/${id}`, data);

    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await axios.delete(`/product/${id}`);
  },
};

export function useGetProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [REACT_QUERY_PRODUCTS_KEY, filters],
    queryFn: () => productApi.getProducts(filters),
    refetchOnWindowFocus: false,
  });
}

export function usePostProduct() {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}product`,
          data,
        );

        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_PRODUCTS_KEY] });
    },
  });
}
export const useProductsAdvanced = (filters: AdvancedFilters = {}) => {
  return useQuery({
    queryKey: ["products-advanced", filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      try {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            if (Array.isArray(value)) {
              value.forEach((v) => params.append(key, v));
            } else {
              params.append(key, String(value));
            }
          }
        });

        const finalUrl = `${process.env.NEXT_PUBLIC_SERVER}product/advanced-search?${params.toString()}`;

        const response = await axios.get(finalUrl);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook for getting a single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProduct(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductSearch = (query: string) => {
  return useQuery({
    queryKey: ["product-search", query],
    queryFn: () => productApi.searchProducts(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000,
  });
};

// Hook for updating a product
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: (data, variables) => {
      // Update the specific product in cache
      queryClient.setQueryData(["product", variables.id], data);
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-advanced"] });
    },
  });
};

// Hook for deleting a product
export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ["product", deletedId] });
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-advanced"] });
    },
  });
};

// Utility hook for building filter parameters
export const useProductFilters = () => {
  const buildBasicFilters = (params: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    priceRange?: [number, number];
    minRating?: number;
    featured?: boolean;
    sortBy?: string;
  }): ProductFilters => {
    const filters: ProductFilters = {};

    if (params.page) filters.page = params.page;
    if (params.limit) filters.limit = params.limit;
    if (params.search) filters.search = params.search;
    if (params.categoryId) filters["filter.category.id"] = params.categoryId;
    if (params.colorId) filters["filter.colors.id"] = params.colorId;
    if (params.sizeId) filters["filter.sizes.id"] = params.sizeId;
    if (params.priceRange) {
      filters["filter.price"] =
        `$gte:${params.priceRange[0]},$lte:${params.priceRange[1]}`;
    }
    if (params.minRating) filters["filter.rating"] = `$gte:${params.minRating}`;
    if (params.featured !== undefined)
      filters["filter.isFeatured"] = params.featured;
    if (params.sortBy) filters.sortBy = params.sortBy;

    return filters;
  };

  const buildAdvancedFilters = (params: {
    page?: number;
    limit?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    colorIds?: string[];
    sizeIds?: string[];
    categoryIds?: string[];
    inStock?: boolean;
    featured?: boolean;
    minRating?: number;
    sortBy?: string;
  }): AdvancedFilters => {
    const filters: AdvancedFilters = {};

    if (params.page) filters.page = params.page;
    if (params.limit) filters.limit = params.limit;
    if (params.search) filters.search = params.search;
    if (params.minPrice) filters.minPrice = params.minPrice;
    if (params.maxPrice) filters.maxPrice = params.maxPrice;
    if (params.colorIds?.length) filters.colorIds = params.colorIds;
    if (params.sizeIds?.length) filters.sizeIds = params.sizeIds;
    if (params.categoryIds?.length) filters.categoryIds = params.categoryIds;
    if (params.inStock !== undefined) filters.inStock = params.inStock;
    if (params.featured !== undefined) filters.featured = params.featured;
    if (params.minRating) filters.minRating = params.minRating;
    if (params.sortBy) filters.sortBy = params.sortBy;

    return filters;
  };

  return { buildBasicFilters, buildAdvancedFilters };
};
