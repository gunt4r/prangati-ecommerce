import { useQuery, useMutation } from "@tanstack/react-query";

import { api } from "../api";
import { queryClient } from "../react-query";

import { REACT_QUERY_AUTH_KEY } from "@/config/const";

export function useGetAuth() {
  return useQuery({
    queryKey: [REACT_QUERY_AUTH_KEY],
    queryFn: async () => {
      try {
        const response = await api.get(`/auth/check`, {
          withCredentials: true,
        });

        if (response.data?.status !== 200 || response.status !== 200) {
          return false;
        }

        return true;
      } catch (error) {
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
      const response = await api.post(`/auth/register`, data, {
        withCredentials: true,
      });

      if (response.data?.status === 400 || response.status === 400) {
        throw response.data;
      }

      return response.data;
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
      const response = await api.post(`/auth/login`, data, {
        withCredentials: true,
      });

      if (response.data?.status === 400 || response.status === 400) {
        throw response.data;
      }

      return response.data;
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
export function useLogout() {
  return useMutation({
    mutationKey: [REACT_QUERY_AUTH_KEY],
    mutationFn: async () => {
      try {
        const response = await api.post(`/auth/logout`, null, {
          withCredentials: true,
        });

        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_AUTH_KEY] }),
    onError: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_AUTH_KEY] }),
    retry: false,
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationKey: [REACT_QUERY_AUTH_KEY],

    mutationFn: async () => {
      try {
        const response = await api.post(`/auth/refresh`, null, {
          withCredentials: true,
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });
}
