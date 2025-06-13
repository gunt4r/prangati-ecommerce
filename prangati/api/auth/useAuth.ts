import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { queryClient } from "../react-query";

import { REACT_QUERY_AUTH_KEY } from "@/config/const";

export function useGetAuth() {
  return useQuery({
    queryKey: [REACT_QUERY_AUTH_KEY],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return null;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}auth/check`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        return res;
      } catch (error) {
        if (
          (error as unknown as { response: { data: { message: string } } })
            .response?.data?.message === "jwt expired"
        ) {
          localStorage.removeItem("token");
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
export function usePostRegister() {
  return useMutation({
    mutationKey: [REACT_QUERY_AUTH_KEY],
    mutationFn: async (data: any) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}auth/register`,
        data,
      );

      if (res.data?.status === 400 || res.status === 400) {
        throw res.data;
      }

      return res.data;
    },
    retry: false,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_AUTH_KEY] });

      return response;
    },

    onError: (error) => {
      return error;
    },
  });
}
export function usePostLogin() {
  return useMutation({
    mutationKey: [REACT_QUERY_AUTH_KEY],
    mutationFn: async (data: any) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}auth/login`,
        data,
      );

      if (res.data?.status === 400 || res.status === 400) {
        throw res.data;
      }

      return res.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_AUTH_KEY] });

      return response;
    },
    onError: (error) => {
      return error;
    },
    retry: false,
  });
}
