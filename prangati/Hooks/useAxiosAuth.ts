import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { api } from "@/api/api";
import { useRefreshToken } from "@/api/auth/useAuth";
export default function useAxiosAuth() {
  const router = useRouter();
  const { mutate } = useRefreshToken();

  useEffect(() => {
    let isRefreshing = false;
    let failedQueue: (() => void)[] = [];

    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest = error.config;

        console.log(originalRequest);
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;
            try {
              mutate();
              isRefreshing = false;
              failedQueue.forEach((cb) => cb());
              failedQueue = [];

              return api(originalRequest);
            } catch (error) {
              isRefreshing = false;
              failedQueue = [];
              router.push("/logIn");

              return Promise.reject(error);
            }
          } else {
            return new Promise((resolve) => {
              failedQueue.push(() => resolve(api(originalRequest)));
            });
          }
        }

        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [router]);
}
