/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import classNames from "classnames";
import { Link } from "@heroui/link";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import style from "./styleCardProduct.module.css";

import { oswald, poppins } from "@/config/fonts";
import { addItemToCart } from "@/store/slices/cartSlice";
import { addItemToWishlist } from "@/store/slices/wishlistSlice";
import { Product } from "@/config/interfaces";
import { useUUID } from "@/Hooks/useUUID";
export default function CardProduct({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const descriptionProduct = product.description.substring(0, 10);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedCart, setisAddedCart] = useState(false);
  const userID = useUUID();
  const handleToggleLike = async () => {
    setIsLiked((prev) => !prev);
    dispatch(
      addItemToWishlist({
        ...product,
        images: Array.isArray(product.images)
          ? product.images.map((image) => image.path)
          : [],
      }),
    );
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

  useEffect(() => {
    async function checkWishlist() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}wishlist/check/${product.id}/${userID}`,
        );

        setIsLiked(response.status === 200);
      } catch (error) {
        setIsLiked(false);
      }
    }
    if (userID) checkWishlist();
  }, [product.id, userID]);
  const handleToggleCart = () => {
    if (isAddedCart) {
      toast.error(`You removed ${product.name} from the cart`);
    } else {
      toast.success(`You successfully added ${product.name} to the cart`);
    }
    setisAddedCart((prev) => !prev);
    dispatch(
      addItemToCart({
        ...product,
        images: Array.isArray(product.images)
          ? product.images.map((image) => ({ path: image.path }))
          : [],
      }),
    );
  };

  return (
    <div className={classNames(style["section-card"])}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "15px",
          },
        }}
      />
      <Link
        className={classNames(style["section-card__wrapper"])}
        href={`/product/${product.id}`}
      >
        <img
          alt=""
          className={classNames(style["section-card__image"])}
          src={
            product.images && product.images.length > 0
              ? product.images[0].path
              : "https://via.placeholder.com/150"
          }
        />
      </Link>
      <hr className={classNames(style["section-card__line"])} />
      <Link
        className={classNames(style["section-card__wrapper"])}
        href={`/product/${product.id}`}
      >
        <p
          className={classNames(
            style["section-card__title"],
            poppins.className,
          )}
        >
          {product.name}
        </p>
      </Link>
      <div className={classNames(style["section-card__wrapper-details"])}>
        <Link
          className={classNames(style["section-card__wrapper"])}
          href={`/product/${product.id}`}
        >
          <p
            className={classNames(
              style["section-card__wrapper-details__description"],
              poppins.className,
            )}
          >
            {descriptionProduct}
          </p>
        </Link>
        <Link
          className={classNames(style["section-card__wrapper"])}
          href={`/product/${product.id}`}
        >
          <p
            className={classNames(
              style["section-card__wrapper-details__price"],
            )}
          >
            ${product.price}
          </p>
        </Link>
      </div>
      <div className={classNames(style["section-card__bottom"])}>
        <Link
          className={classNames(style["section-card__link"], oswald.className)}
        >
          READ MORE
        </Link>
        <div
          className={classNames(
            style["section-nav__helpers-cart"],
            "text-slate-500 text-2xl",
            isAddedCart ? style["section-nav__helpers-cart-clicked"] : "",
          )}
          onClick={handleToggleCart}
        >
          <IoCartOutline
            className={classNames(
              style["section-nav__helpers-cart-icon"],
              "text-slate-500 text-2xl",
            )}
          />
        </div>
      </div>
      <div className={classNames(style["section-card__wish"])}>
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
    </div>
  );
}
