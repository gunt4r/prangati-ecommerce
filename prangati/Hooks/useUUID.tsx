/* eslint-disable no-console */
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetOrCreateUUID } from "@/api/user/useUser";

export const useUUID = (): string => {
  const { data: finalUUID, isLoading, error } = useGetOrCreateUUID();

  useEffect(() => {
    const handleUUID = async () => {
      if (isLoading) return;

      if (error) {
        toast.error("Error getting user UUID");
        console.error(error);

        return;
      }

      if (!finalUUID) {
        toast.error("Error with user UUID");

        return;
      }
    };

    handleUUID();
  }, [finalUUID, isLoading, error]);

  return finalUUID || "";
};
