/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import classNames from "classnames";
import { Link } from "@heroui/link";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import style from "./styleCardProduct.module.css";
import LikeProduct from "./LikeProduct/LikeProduct";

import { oswald, poppins } from "@/config/fonts";
import { addItemToCart } from "@/store/slices/cartSlice";
import { Product } from "@/config/interfaces";
export default function CardProduct({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const descriptionProduct = product.description;
  const [isAddedCart, setisAddedCart] = useState(false);

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
          href={`/product/${product.id}`}
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
      <LikeProduct
        product={product}
        style={{
          position: "absolute",
          top: "8%",
          right: "9%",
          zIndex: "10",
        }}
      />
    </div>
  );
}
