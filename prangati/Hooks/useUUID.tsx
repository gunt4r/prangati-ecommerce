import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export const useUUID = (): string => {
  const [uuid, setUuid] = useState<string>("");

  useEffect(() => {
    const storedUUId = localStorage.getItem("user_uuid");

    if (storedUUId) {
      setUuid(storedUUId);
    } else {
      const newUUID = uuidv4();

      setUuid(newUUID);

      localStorage.setItem("user_uuid", newUUID);
    }
    async function handlerUUID() {
      try {
        const uuidToSend = storedUUId || localStorage.getItem("user_uuid");
        const data = JSON.stringify({ uuid: uuidToSend });

        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}user/addUUID`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error sending UUID: " + error);
      }
    }

    handlerUUID();
  }, []);

  return uuid;
};
