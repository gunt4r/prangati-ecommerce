import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useUUID = (): string => {
  const [uuid, setUuid] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let userUUID = localStorage.getItem("user_uuid");

      if (!userUUID) {
        userUUID = uuidv4();
        localStorage.setItem("user_uuid", userUUID);
      }
      setUuid(userUUID);
    }
  }, []);

  return uuid;
};
