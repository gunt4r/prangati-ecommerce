/* eslint-disable no-console */
import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "../api";
import { queryClient } from "../react-query";

import { REACT_QUERY_CART_KEY } from "@/config/const";
import { useUUID } from "@/hooks/useUUID";
export function useCartItems() {
  const userUUID = useUUID();

  return useQuery({
    queryKey: [REACT_QUERY_CART_KEY],
    queryFn: async () => {
      if (!userUUID) throw new Error("UUID not ready");
      try {
        const res = await api.get(`/cart/${userUUID}`);

        return res.data || [];
      } catch (error) {
        console.error("Error:", error);

        return [];
      }
    },
    enabled: !!userUUID,
    retry: (failureCount, error) => {
      return error.message !== "UUID не готов" && failureCount < 3;
    },
  });
}
export function useCreateCart() {
  return useMutation({
    mutationKey: [REACT_QUERY_CART_KEY],
    mutationFn: async (userId: any) => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      try {
        const res = await api.post(`/cart`, userId);

        return res.data;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating cart:", error);
        }

        throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CART_KEY] }),
  });
}
export function useAddProductToCart() {
  return useMutation({
    mutationKey: [REACT_QUERY_CART_KEY],
    mutationFn: async (data: any) => {
      const res = await api.post(`/cart/add-product`, data);

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CART_KEY] }),
  });
}
export function useUpdateProductToCart() {
  return useMutation({
    mutationKey: [REACT_QUERY_CART_KEY],
    mutationFn: async (data: any) => {
      const res = await api.patch(`/cart`, data);

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CART_KEY] }),
  });
}

export function useDeleteProductFromCart() {
  return useMutation({
    mutationKey: [REACT_QUERY_CART_KEY],
    mutationFn: async (data: any) => {
      const res = await api.delete(`/cart/remove-item`, { data: data });

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CART_KEY] }),
  });
}
export function useDeleteProductAddToWishlist() {
  return useMutation({
    mutationKey: [REACT_QUERY_CART_KEY],
    mutationFn: async (data: any) => {
      const res = await api.delete(`/cart/remove-and-add-to-wishlist`, {
        data: data,
      });

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CART_KEY] }),
  });
}
export function useDeleteAllProductsFromCart() {
  return useMutation({
    mutationKey: [REACT_QUERY_CART_KEY],
    mutationFn: async (data: any) => {
      const res = await api.delete(`/cart/remove-items`, { data: data });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CART_KEY] });
    },
  });
}
