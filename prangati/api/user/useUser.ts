/* eslint-disable no-console */
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";

import { api } from "../api";
import { queryClient } from "../react-query";

import {
  REACT_QUERY_USER_KEY,
  REACT_QUERY_USER_UUID_KEY,
} from "@/config/const";
import { useUUID } from "@/hooks/useUUID";
export function useGetUser() {
  const userID = useUUID();

  return useQuery({
    queryKey: [REACT_QUERY_USER_KEY],
    queryFn: async () => {
      if (!userID) throw new Error("User ID not found");
      try {
        const res = await api.get(`/user/${userID}`);
        const data = res.data;

        return data;
      } catch (error) {
        return null;
      }
    },
  });
}
export function useGetUsers() {
  return useQuery({
    queryKey: [REACT_QUERY_USER_KEY],
    queryFn: async () => {
      try {
        const res = await api.get(`/user`);

        return res.data;
      } catch (error) {
        return null;
      }
    },
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationKey: [REACT_QUERY_USER_KEY],
    mutationFn: async (data: any) => {
      try {
        const { userId } = data;
        const res = await api.patch(`/user/${userId}`, data);

        if (res.data?.status === 400 || res.status === 400) {
          throw res.data;
        }

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_USER_KEY] }),
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

export function useGetOrCreateUUID() {
  return useQuery({
    queryKey: [REACT_QUERY_USER_UUID_KEY],
    queryFn: async () => {
      if (typeof window === "undefined") return null;

      let finalUUID = localStorage.getItem("user_uuid");

      if (!finalUUID) {
        finalUUID = uuidv4();
        localStorage.setItem("user_uuid", finalUUID);
      }

      try {
        const res = await api.post(
          `/user/addUUID`,
          { uuid: finalUUID },
          { headers: { "Content-Type": "application/json" } },
        );

        if (res.data?.status === 400 || res.status === 400) {
          throw res.data;
        }

        return finalUUID;
      } catch (error) {
        console.error("Error sending UUID to server:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
}

export function useAddUUID() {
  return useMutation({
    mutationKey: [REACT_QUERY_USER_UUID_KEY],
    mutationFn: async () => {
      try {
        let finalUUID = localStorage.getItem("user_uuid");

        if (!finalUUID) {
          finalUUID = uuidv4();
          localStorage.setItem("user_uuid", finalUUID);
        }

        const res = await api.post(
          `/user/addUUID`,
          { uuid: finalUUID },
          { headers: { "Content-Type": "application/json" } },
        );

        if (res.data?.status === 400 || res.status === 400) {
          throw res.data;
        }

        return finalUUID;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_USER_UUID_KEY] }),
  });
}
