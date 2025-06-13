import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";

import { useCreateCart } from "@/api/cart/useCart";

export const useUUID = (): string => {
  const [uuid, setUuid] = useState<string>("");
  const { mutate: createCart } = useCreateCart();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        let finalUUID = localStorage.getItem("user_uuid");

        if (!finalUUID) {
          finalUUID = uuidv4();
          localStorage.setItem("user_uuid", finalUUID);
        }

        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}user/addUUID`,
          { uuid: finalUUID },
          { headers: { "Content-Type": "application/json" } },
        );

        createCart(
          { newUUID: finalUUID },
          {
            onError: () => toast.error("Error creating cart"),
          },
        );

        if (isMounted) setUuid(finalUUID);
      } catch (error) {
        toast.error("Error creating user");
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [createCart]);

  return uuid;
};
