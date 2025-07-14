import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { api } from "../api";
import { queryClient } from "../react-query";

import { useUUID } from "@/hooks/useUUID";
import { REACT_QUERY_CHECKOUT_KEY } from "@/config/const";

export function useGetOrder() {
  return useQuery({
    queryKey: [REACT_QUERY_CHECKOUT_KEY],

    queryFn: async (data: any) => {
      const { userUUID, orderId } = data;
      const res = await api.get(`/order/${userUUID}/${orderId}`);

      return res.data;
    },
  });
}

export function useGetOrders() {
  const userUUID = useUUID();

  return useQuery({
    queryKey: [REACT_QUERY_CHECKOUT_KEY],
    queryFn: async () => {
      const res = await api.get(`/order/all/${userUUID}`);

      return res.data;
    },
  });
}

export function useGetAllOrders() {
  return useQuery({
    queryKey: [REACT_QUERY_CHECKOUT_KEY],
    queryFn: async () => {
      const res = await api.get(`/order`);

      return res.data;
    },
  });
}

export function usePostOrder() {
  return useMutation({
    mutationKey: [REACT_QUERY_CHECKOUT_KEY],
    mutationFn: async (data: any) => {
      try {
        const res = await api.post(`/order`, data);

        if (res.data?.status === 400 || res.status === 400) {
          throw res.data;
        }

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CHECKOUT_KEY] }),
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const axiosErr = error as AxiosError<{
          errors: Record<string, string>;
        }>;

        if (
          axiosErr.response &&
          axiosErr.response.data &&
          "errors" in axiosErr.response.data
        ) {
          const serverPayload = axiosErr.response.data;

          return serverPayload;
        }
      }
    },
  });
}

export function useUpdateOrder() {
  return useMutation({
    mutationKey: [REACT_QUERY_CHECKOUT_KEY],
    mutationFn: async (data: any) => {
      const res = await api.patch(`/order`, data);

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CHECKOUT_KEY] }),
  });
}

export function useDeleteOrder() {
  return useMutation({
    mutationKey: [REACT_QUERY_CHECKOUT_KEY],
    mutationFn: async (data: any) => {
      const { userId, orderId } = data;
      const res = await api.delete(`/order/${userId}/${orderId}`, {
        data: data,
      });

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CHECKOUT_KEY] }),
  });
}

export function useDeleteOrders() {
  return useMutation({
    mutationKey: [REACT_QUERY_CHECKOUT_KEY],
    mutationFn: async (data: any) => {
      const { userId } = data;
      const res = await api.delete(`/order/all/${userId}`, {
        data: data,
      });

      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CHECKOUT_KEY] }),
  });
}
