import { motion } from "framer-motion";
import "./styleLikeProduct.scss";
import { useEffect, useState } from "react";
import axios from "axios";

import { useUUID } from "@/Hooks/useUUID";
import { Product } from "@/config/interfaces";

export default function LikeProduct({
  product,
  style,
}: {
  product: Product;
  style?: { [key: string]: string };
}) {
  const [isLiked, setIsLiked] = useState(false);
  const userID = useUUID();

  useEffect(() => {
    async function checkWishlist() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}wishlist/check/${product.id}/${userID}`,
        );

        setIsLiked(response.data.status === 200);
      } catch (error) {
        setIsLiked(false);
      }
    }
    if (userID) checkWishlist();
  }, [product.id, userID]);
  const handleToggleLike = async () => {
    setIsLiked((prev) => !prev);
    const data = JSON.stringify({ userID: userID, productID: product.id });

    if (!isLiked) {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER}wishlist`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}wishlist`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });
    }
  };

  return (
    <div className="section-card__wish" style={{ ...style }}>
      <motion.div
        style={{
          cursor: "pointer",
          display: "inline-block",
          width: "24px",
          height: "24px",
          position: "relative",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleLike}
      >
        <motion.svg
          animate={{
            fill: isLiked ? "#1e1e1e" : "transparent",
            stroke: "#7a7a7a",
            strokeWidth: isLiked ? 0 : 1,
          }}
          initial={false}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          transition={{ duration: 0.5 }}
          viewBox="0 0 16 16"
        >
          <motion.path
            key="outline-heart"
            d={
              isLiked
                ? "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                : "M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z"
            }
            fillRule="evenodd"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
