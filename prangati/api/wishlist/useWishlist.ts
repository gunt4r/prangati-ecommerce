import { useQuery, useMutation } from "@tanstack/react-query";

import { api } from "../api";
import { queryClient } from "../react-query";

import { REACT_QUERY_WISHLIST_KEY } from "@/config/const";
export function useWishlist(userID: string) {
  {
    return useQuery({
      queryKey: [REACT_QUERY_WISHLIST_KEY],
      queryFn: async () => {
        if (!userID) throw new Error("User ID not found");
        try {
          const response = await api.get(`/wishlist/getAllWishlist/${userID}`);

          if (!response.data) {
            throw new Error("Wishlist not found");
          }

          return response.data;
        } catch (error) {
          throw error;
        }
      },
      staleTime: 60 * 60 * 1000,
    });
  }
}

export function useIsProductInWishlist(productID: string, userID: string) {
  return useQuery({
    queryKey: [REACT_QUERY_WISHLIST_KEY, productID, userID],
    queryFn: async () => {
      try {
        const response = await api.get(`/wishlist/${productID}/${userID}`);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useAddToWishlist() {
  return useMutation({
    mutationFn: async (data: { productID: string; userID: string }) => {
      try {
        const response = await api.post(`/wishlist`, data);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_WISHLIST_KEY] }),
  });
}

export function useRemoveProductFromWishlist() {
  return useMutation({
    mutationFn: async (data: { productID: string; userID: string }) => {
      try {
        const response = await api.delete(`/wishlist`, {
          data,
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_WISHLIST_KEY] }),
  });
}

export function useRemoveAllUserWishlist(userId: string) {
  return useMutation({
    mutationKey: [REACT_QUERY_WISHLIST_KEY],
    mutationFn: async () => {
      try {
        const response = await api.delete(`/wishlist/remove-all/${userId}`);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_WISHLIST_KEY] }),
  });
}
