import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryClient } from "../react-query";

import { REACT_QUERY_USER_KEY } from "@/config/const";
import { useUUID } from "@/Hooks/useUUID";

export function useGetUser() {
  const userID = useUUID();

  return useQuery({
    queryKey: [REACT_QUERY_USER_KEY],
    queryFn: async () => {
      if (!userID) throw new Error("User ID not found");
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}user/${userID}`,
        );
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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}user`);

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
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVER}user/${userId}`,
          data,
        );
        console.log(res);
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
      console.log(error);
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
          console.log(serverPayload);
          return serverPayload;
        }
      }
    },
  });
}
