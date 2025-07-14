import { useQuery, useMutation } from "@tanstack/react-query";

import { api } from "../api";

import { REACT_QUERY_COLORS_KEY } from "@/config/const";
export function useColors() {
  return useQuery({
    queryKey: [REACT_QUERY_COLORS_KEY],
    queryFn: async () => {
      try {
        const response = await api.get(`/colors`);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useGetColorById(colorId: string) {
  return useQuery({
    queryKey: [REACT_QUERY_COLORS_KEY, colorId],
    queryFn: async () => {
      try {
        const response = await api.get(`/colors/${colorId}`);

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch color by ID");
      }
    },
  });
}

export function usePostColor() {
  return useMutation({
    mutationKey: [REACT_QUERY_COLORS_KEY],
    mutationFn: async (formData: FormData) => {
      try {
        const response = await api.post(`/colors`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}
export function useUpdateColorById(colorId: string) {
  return useMutation({
    mutationKey: [REACT_QUERY_COLORS_KEY, colorId],
    mutationFn: async (formData: FormData) => {
      try {
        const response = await api.patch(`/colors/${colorId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useDeleteColorById(colorId: string) {
  return useMutation({
    mutationKey: [REACT_QUERY_COLORS_KEY, colorId],
    mutationFn: async () => {
      try {
        const response = await api.delete(`/colors/${colorId}`);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useDeleteAllColors() {
  return useMutation({
    mutationKey: [REACT_QUERY_COLORS_KEY],
    mutationFn: async () => {
      try {
        const response = await api.delete(`/colors/remove-all`);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}
