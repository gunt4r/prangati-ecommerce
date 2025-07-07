import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { queryClient } from "../react-query";

import { REACT_QUERY_SIZES_KEY } from "@/config/const";

export function useSizes() {
  return useQuery({
    queryKey: [REACT_QUERY_SIZES_KEY],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}sizes`,
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useProductSizes(id: string) {
  return useQuery({
    queryKey: [REACT_QUERY_SIZES_KEY, id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}sizes/${id}`,
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useCreateSize() {
  return useMutation({
    mutationFn: async (size: string) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}sizes`,
          { size },
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_SIZES_KEY] });
    },
  });
}

export function useUpdateSize() {
  return useMutation({
    mutationFn: async ({ id, size }: { id: string; size: string }) => {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVER}sizes/${id}`,
          { size },
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_SIZES_KEY] });
    },
  });
}

export function useRemoveSize() {
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER}sizes/remove/${id}`,
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_SIZES_KEY] });
    },
  });
}

export function useRemoveAllSizes() {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER}sizes/remove-all`,
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_SIZES_KEY] });
    },
  });
}
