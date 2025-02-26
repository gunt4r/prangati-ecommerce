import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export const useUUID = (): string => {
  const [uuid, setUuid] = useState<string>(() => {
    if (typeof window === "undefined") return "";

    return localStorage.getItem("user_uuid") || "";
  });

  useEffect(() => {
    async function handlerUUID() {
      if (!uuid && typeof window !== "undefined") {
        const newUUID = uuidv4();

        localStorage.setItem("user_uuid", newUUID);
        setUuid(newUUID);
        const data = JSON.stringify({ uuid: newUUID });

        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}user/addUUID`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
    }
    handlerUUID();
  }, [uuid]);

  return uuid;
};
